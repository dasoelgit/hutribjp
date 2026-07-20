// src/brackethutri.js
import React from 'react';

// ─── STYLES ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#FBF7F4",
  surface: "#FDF5F5",
  card: "#FFFFFF",
  border: "#EDD5D5",
  borderMid: "#DDB8B8",
  red: "#B71C1C",
  redFaint: "#FDECEC",
  ink: "#1A0505",
  body: "#3D1515",
  muted: "#8B6060",
  faint: "#C09090",
  white: "#FFFFFF",
  greenText: "#166534",
  greenBg: "#F0FDF4",
  greenBorder: "#BBF7D0",
};

// ─── HELPER ──────────────────────────────────────────────────────────────────
const getStageLabel = (stage) => {
  const labels = {
    'group': 'Group Stage',
    'next': 'Next Stage',
    'championship': 'Championship',
    'semifinal': 'Semifinal',
    'final': 'Final',
    'quarterfinal': 'Quarterfinal',
    'round_1': 'Round 1',
    'round_2': 'Round 2',
    'round_3': 'Round 3',
  };
  return labels[stage] || stage || '';
};

const getTournamentDisplayName = (name) => {
  if (!name) return 'Unknown';
  return name
    .replace(/ Tournament$/i, '')
    .replace(/Men's\s*/i, '')
    .replace(/Women's\s*/i, '')
    .trim();
};

// ─── MATCH NODE ─────────────────────────────────────────────────────────────
const MatchNode = ({ match, isWinner = false }) => {
  const p1 = match?.p1 || 'TBD';
  const p2 = match?.p2 || 'TBD';
  const winner = match?.winner || null;
  const isFinished = match?.status === 'finished' || !!winner;
  
  let scoreDisplay = '';
  if (isFinished && match?.sets && Array.isArray(match.sets)) {
    let s1 = 0, s2 = 0;
    match.sets.forEach(s => {
      if (s.p1 > s.p2) s1++;
      else if (s.p2 > s.p1) s2++;
    });
    if (s1 > 0 || s2 > 0) {
      scoreDisplay = `${s1} - ${s2}`;
    }
  }
  
  return (
    <div style={{
      background: isWinner ? C.greenBg : C.white,
      border: `1.5px solid ${isWinner ? C.greenBorder : C.border}`,
      borderRadius: 6,
      padding: "6px 10px",
      minWidth: 120,
      minHeight: 48,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      boxShadow: isWinner ? "0 0 0 2px rgba(22,101,52,0.15)" : "none",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ 
          fontSize: 13, 
          fontWeight: winner === p1 ? 700 : 500,
          color: winner === p1 ? C.red : C.body,
          wordBreak: "break-word",
          flex: 1,
        }}>
          {p1}
          {winner === p1 && <span style={{ marginLeft: 4 }}>🏆</span>}
        </div>
        {scoreDisplay && (
          <div style={{ 
            fontSize: 12, 
            fontWeight: 700, 
            color: C.muted,
            flexShrink: 0,
            minWidth: 32,
            textAlign: "right",
          }}>
            {scoreDisplay}
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ 
          fontSize: 13, 
          fontWeight: winner === p2 ? 700 : 500,
          color: winner === p2 ? C.red : C.body,
          wordBreak: "break-word",
          flex: 1,
        }}>
          {p2}
          {winner === p2 && <span style={{ marginLeft: 4 }}>🏆</span>}
        </div>
        {scoreDisplay && (
          <div style={{ 
            fontSize: 12, 
            fontWeight: 700, 
            color: C.muted,
            flexShrink: 0,
            minWidth: 32,
            textAlign: "right",
          }}>
            {/* Empty to keep alignment */}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── ROUND COLUMN ──────────────────────────────────────────────────────────
const RoundColumn = ({ title, matches, roundIndex, totalRounds }) => {
  const isLast = roundIndex === totalRounds - 1;
  
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 24,
      flex: 1,
      minWidth: 140,
      padding: "0 8px",
      position: "relative",
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        color: C.muted,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        textAlign: "center",
        marginBottom: 4,
      }}>
        {title}
      </div>
      
      {matches.map((match, idx) => (
        <MatchNode key={idx} match={match} />
      ))}
      
      {!isLast && matches.length > 1 && (
        <div style={{
          position: "absolute",
          right: -8,
          top: "50%",
          transform: "translateY(-50%)",
          width: 16,
          height: "calc(100% - 32px)",
          borderRight: `2px solid ${C.border}`,
          borderTop: `2px solid ${C.border}`,
          borderBottom: `2px solid ${C.border}`,
          borderRadius: "0 4px 4px 0",
          opacity: 0.5,
        }} />
      )}
    </div>
  );
};

// ─── SINGLE TOURNAMENT BRACKET ────────────────────────────────────────────
const SingleTournamentBracket = ({ matches, title }) => {
  if (!matches || matches.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: 24,
        color: C.muted,
        fontSize: 13,
        background: C.surface,
        borderRadius: 8,
        border: `1px dashed ${C.border}`,
      }}>
        No matches for {title}
      </div>
    );
  }

  // Group by stage
  const groupedByStage = {};
  matches.forEach(m => {
    const stage = m.stage || 'unknown';
    if (!groupedByStage[stage]) groupedByStage[stage] = [];
    groupedByStage[stage].push(m);
  });

  const stageOrder = ['group', 'quarterfinal', 'semifinal', 'final'];
  const sortedStages = Object.keys(groupedByStage).sort((a, b) => {
    const aIdx = stageOrder.indexOf(a);
    const bIdx = stageOrder.indexOf(b);
    if (aIdx === -1 && bIdx === -1) return a.localeCompare(b);
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  });

  if (sortedStages.length === 0) {
    return null;
  }

  return (
    <div style={{ 
      background: C.card, 
      border: `1.5px solid ${C.border}`, 
      borderRadius: 10, 
      padding: 16,
      marginBottom: 16,
    }}>
      <div style={{ 
        fontWeight: 700, 
        fontSize: 14, 
        color: C.ink, 
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        <span>🏆</span> {title}
      </div>
      
      {sortedStages.length === 1 ? (
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          gap: 12,
          maxWidth: 400,
          margin: "0 auto",
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase" }}>
            {getStageLabel(sortedStages[0])}
          </div>
          {groupedByStage[sortedStages[0]].map((match, idx) => (
            <MatchNode key={idx} match={match} />
          ))}
        </div>
      ) : (
        <div style={{ 
          display: "flex", 
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 12,
          minWidth: "fit-content",
          padding: "4px 0",
          overflowX: "auto",
        }}>
          {sortedStages.map((stage, idx) => (
            <RoundColumn
              key={stage}
              title={getStageLabel(stage)}
              matches={groupedByStage[stage]}
              roundIndex={idx}
              totalRounds={sortedStages.length}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── MAIN BRACKET ──────────────────────────────────────────────────────────
const BracketHutri = ({ matches, title = "Tournament Bracket" }) => {
  if (!matches || matches.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: 48,
        color: C.muted,
        fontSize: 14,
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🏆</div>
        <div>No matches available for bracket view.</div>
      </div>
    );
  }

  // Group by tournament (for Badminton: Men's A, Men's B, Women's)
  // For other sports, use a single group
  const tournamentGroups = {};
  
  matches.forEach(m => {
    // Use tournamentName if available, otherwise use sport name
    const key = m.tournamentName || m.sport || 'Unknown';
    if (!tournamentGroups[key]) tournamentGroups[key] = [];
    tournamentGroups[key].push(m);
  });

  // Sort tournament names for consistent display
  const sortedTournaments = Object.keys(tournamentGroups).sort((a, b) => {
    // Custom sort: Men's A, Men's B, Women's
    const order = ['Men\'s Group A Tournament', 'Men\'s Group B Tournament', 'Women\'s Tournament'];
    const aIdx = order.indexOf(a);
    const bIdx = order.indexOf(b);
    if (aIdx === -1 && bIdx === -1) return a.localeCompare(b);
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  });

  return (
    <div style={{ 
      background: C.surface, 
      borderRadius: 12, 
      padding: 16,
    }}>
      {title && (
        <div style={{ 
          fontWeight: 800, 
          fontSize: 18, 
          color: C.ink, 
          marginBottom: 16,
          textAlign: "center",
        }}>
          {title}
        </div>
      )}
      
      {sortedTournaments.map(tournament => (
        <SingleTournamentBracket
          key={tournament}
          matches={tournamentGroups[tournament]}
          title={getTournamentDisplayName(tournament)}
        />
      ))}
    </div>
  );
};

export default BracketHutri;
