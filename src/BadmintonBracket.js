// src/BadmintonBracket.js
import React from 'react';

// ─── STYLES ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#FBF7F4",
  surface: "#FDF5F5",
  card: "#FFFFFF",
  border: "#EDD5D5",
  red: "#B71C1C",
  redFaint: "#FDECEC",
  ink: "#1A0505",
  body: "#3D1515",
  muted: "#8B6060",
  faint: "#C09090",
  white: "#FFFFFF",
  greenBg: "#F0FDF4",
  greenBorder: "#BBF7D0",
};

// ─── TOURNAMENT ORDER ──────────────────────────────────────────────────────
const TOURNAMENT_ORDER = [
  "Women's Tournament",
  "Men's Group A Tournament",
  "Men's Group B Tournament"
];

const getTournamentDisplayName = (name) => {
  if (!name) return 'Unknown';
  return name.replace(/ Tournament$/i, '').trim();
};

// ─── MATCH NODE ─────────────────────────────────────────────────────────────
const MatchNode = ({ match, label = "" }) => {
  if (!match) {
    return (
      <div style={{
        border: `1.5px dashed ${C.border}`,
        borderRadius: 6,
        padding: "6px 10px",
        minWidth: 120,
        minHeight: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: C.faint,
        fontSize: 12,
      }}>
        TBD
      </div>
    );
  }

  const p1 = match.pA?.name || match.pA || 'TBD';
  const p2 = match.pB?.name || match.pB || 'TBD';
  const isFinished = match.status === 'finished';
  
  // Determine winner name
  let winnerName = null;
  if (match.winnerName) {
    winnerName = match.winnerName;
  } else if (match.result === 'A') {
    winnerName = typeof match.pA === 'object' ? match.pA?.name : match.pA;
  } else if (match.result === 'B') {
    winnerName = typeof match.pB === 'object' ? match.pB?.name : match.pB;
  }

  // Score display
  let scoreDisplay = '';
  if (isFinished && match.scoreA !== null && match.scoreB !== null) {
    scoreDisplay = `${match.scoreA} - ${match.scoreB}`;
  }

  const isWinner = (name) => name && winnerName && name === winnerName;

  return (
    <div style={{
      background: isFinished && winnerName ? C.greenBg : C.white,
      border: `1.5px solid ${isFinished && winnerName ? C.greenBorder : C.border}`,
      borderRadius: 6,
      padding: "6px 10px",
      minWidth: 120,
      minHeight: 48,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      boxShadow: isFinished && winnerName ? "0 0 0 2px rgba(22,101,52,0.15)" : "none",
    }}>
      {label && (
        <div style={{
          fontSize: 9,
          fontWeight: 700,
          color: C.muted,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 2,
        }}>
          {label}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
        <div style={{ 
          fontSize: 13, 
          fontWeight: isWinner(p1) ? 700 : 500,
          color: isWinner(p1) ? C.red : C.body,
          wordBreak: "break-word",
          flex: 1,
        }}>
          {p1}
          {isWinner(p1) && <span style={{ marginLeft: 4 }}>🏆</span>}
        </div>
        {scoreDisplay && (
          <div style={{ 
            fontSize: 12, 
            fontWeight: 700, 
            color: C.muted,
            flexShrink: 0,
            minWidth: 28,
            textAlign: "right",
          }}>
            {scoreDisplay}
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
        <div style={{ 
          fontSize: 13, 
          fontWeight: isWinner(p2) ? 700 : 500,
          color: isWinner(p2) ? C.red : C.body,
          wordBreak: "break-word",
          flex: 1,
        }}>
          {p2}
          {isWinner(p2) && <span style={{ marginLeft: 4 }}>🏆</span>}
        </div>
        {scoreDisplay && (
          <div style={{ 
            fontSize: 12, 
            fontWeight: 700, 
            color: C.muted,
            flexShrink: 0,
            minWidth: 28,
            textAlign: "right",
          }}>
            {/* Empty to keep alignment */}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── SINGLE TOURNAMENT BRACKET ────────────────────────────────────────────
const SingleTournamentBracket = ({ tournamentName, semifinal1, semifinal2, finalMatch }) => {
  const displayName = getTournamentDisplayName(tournamentName);

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
        <span>🏆</span> {displayName}
      </div>

      <div style={{
        display: "flex",
        gap: 24,
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}>
        {/* Left: Semifinals */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          flex: 1,
          minWidth: 140,
        }}>
          <MatchNode match={semifinal1} label="Semifinal 1" />
          <MatchNode match={semifinal2} label="Semifinal 2" />
        </div>

        {/* Arrow/Connector */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          color: C.muted,
          fontSize: 20,
        }}>
          <div>⬇️</div>
          <div>⬇️</div>
        </div>

        {/* Right: Final */}
        <div style={{
          flex: 1,
          minWidth: 140,
        }}>
          <MatchNode match={finalMatch} label="Final" />
        </div>
      </div>
    </div>
  );
};

// ─── MAIN BADMINTON BRACKET ──────────────────────────────────────────────
const BadmintonBracket = ({ matches }) => {
  if (!matches || matches.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: 48,
        color: C.muted,
        fontSize: 14,
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🏸</div>
        <div>No Badminton matches available.</div>
      </div>
    );
  }

  // Filter only Badminton matches
  const badmintonMatches = matches.filter(m => m.sport === "Badminton");

  // Group by tournament
  const tournamentGroups = {};
  badmintonMatches.forEach(m => {
    const key = m.tournamentName || 'Unknown';
    if (!tournamentGroups[key]) tournamentGroups[key] = [];
    tournamentGroups[key].push(m);
  });

  // Sort tournaments
  const sortedTournaments = Object.keys(tournamentGroups).sort((a, b) => {
    const aIdx = TOURNAMENT_ORDER.indexOf(a);
    const bIdx = TOURNAMENT_ORDER.indexOf(b);
    if (aIdx === -1 && bIdx === -1) return a.localeCompare(b);
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  });

  // For each tournament, find Semifinal 1, Semifinal 2, and Final
  const tournamentData = sortedTournaments.map(tournamentName => {
    const tournamentMatches = tournamentGroups[tournamentName];
    
    // Get all knockout matches
    const knockoutMatches = tournamentMatches.filter(m => 
      m.round === "Semifinal" || m.round === "Final"
    );

    // Separate Semifinals and Finals
    const semifinals = knockoutMatches.filter(m => m.round === "Semifinal");
    const finals = knockoutMatches.filter(m => m.round === "Final");

    // Sort semifinals by date/time (assuming first is SF1, second is SF2)
    const sortedSemifinals = [...semifinals].sort((a, b) => {
      return (a.date || '').localeCompare(b.date || '') || 
             (a.time || '').localeCompare(b.time || '');
    });

    return {
      tournamentName,
      semifinal1: sortedSemifinals[0] || null,
      semifinal2: sortedSemifinals[1] || null,
      finalMatch: finals[0] || null,
    };
  });

  return (
    <div style={{
      background: C.surface,
      borderRadius: 12,
      padding: 16,
    }}>
      {tournamentData.map(data => (
        <SingleTournamentBracket
          key={data.tournamentName}
          tournamentName={data.tournamentName}
          semifinal1={data.semifinal1}
          semifinal2={data.semifinal2}
          finalMatch={data.finalMatch}
        />
      ))}
    </div>
  );
};

export default BadmintonBracket;
