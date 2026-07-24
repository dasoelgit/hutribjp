// src/DominoStandings.js
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
  greenText: "#166534",
  greenBg: "#F0FDF4",
  greenBorder: "#BBF7D0",
  gold: "#C8960C",
};

// ─── HELPER: Get All Teams from Schedule ──────────────────────────────────
function getAllTeams(matches) {
  const teams = {};
  matches.forEach(match => {
    if (match.pA) {
      teams[match.pA] = { name: match.pA, rt: match.rtA || '' };
    }
    if (match.pB) {
      teams[match.pB] = { name: match.pB, rt: match.rtB || '' };
    }
  });
  return Object.values(teams);
}

// ─── HELPER: Calculate Standings ──────────────────────────────────────────
function calculateStandings(matches, allTeams) {
  const stats = {};
  
  // Initialize all teams with 0 stats
  allTeams.forEach(team => {
    stats[team.name] = {
      name: team.name,
      rt: team.rt || '',
      wins: 0,
      losses: 0,
      points: 0,
      diff: 0,
      played: 0,
    };
  });
  
  const headToHead = {};
  
  // Process only finished matches
  matches.forEach(match => {
    if (match.status !== 'finished' || match.scoreA === null || match.scoreB === null) return;
    
    const teamA = match.pA;
    const teamB = match.pB;
    const scoreA = match.scoreA;
    const scoreB = match.scoreB;
    
    if (!stats[teamA] || !stats[teamB]) return;
    
    if (scoreA > scoreB) {
      stats[teamA].wins += 1;
      stats[teamA].points += 2;
      stats[teamB].losses += 1;
      headToHead[`${teamA}|||${teamB}`] = teamA;
    } else if (scoreB > scoreA) {
      stats[teamB].wins += 1;
      stats[teamB].points += 2;
      stats[teamA].losses += 1;
      headToHead[`${teamA}|||${teamB}`] = teamB;
    }
    
    stats[teamA].diff += (scoreA - scoreB);
    stats[teamB].diff += (scoreB - scoreA);
    stats[teamA].played += 1;
    stats[teamB].played += 1;
  });
  
  // Sort
  const sorted = Object.values(stats).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.diff !== a.diff) return b.diff - a.diff;
    const h2hKey = `${a.name}|||${b.name}`;
    const h2hKeyReverse = `${b.name}|||${a.name}`;
    if (headToHead[h2hKey]) return headToHead[h2hKey] === a.name ? -1 : 1;
    if (headToHead[h2hKeyReverse]) return headToHead[h2hKeyReverse] === a.name ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  
  return sorted;
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
const DominoStandings = ({ matches }) => {
  // Filter only Domino Round Robin matches
  const rrMatches = matches.filter(m => 
    m.sport === 'Domino' && 
    m.round && m.round.toLowerCase().includes('round')
  );
  
  // Get all teams from the schedule
  const allTeams = getAllTeams(rrMatches);
  const standings = calculateStandings(rrMatches, allTeams);
  
  const totalMatches = rrMatches.length;
  const finishedMatches = rrMatches.filter(m => m.status === 'finished').length;
  
  // Top 2
  const top2 = standings.slice(0, 2);
  const rest = standings.slice(2);
  
  return (
    <div style={{ 
      background: C.white, 
      borderRadius: 12, 
      padding: 16,
      border: `1.5px solid ${C.border}`,
    }}>
      {/* ─── HEADER ────────────────────────────────────────────────────────── */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: 12,
        flexWrap: "wrap",
        gap: 8,
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: C.red, margin: 0 }}>
          🀱 Turnamen Gaple HUT RI BJP 2026
        </h3>
        <span style={{ fontSize: 12, color: C.muted }}>
          {finishedMatches} / {totalMatches} pertandingan selesai
        </span>
      </div>
      
      {standings.length === 0 ? (
        <div style={{ textAlign: "center", padding: 32, color: C.muted, fontSize: 14 }}>
          Belum ada pertandingan yang selesai.
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            fontSize: 14,
            minWidth: 500,
          }}>
            <thead>
              <tr style={{ 
                background: C.surface, 
                borderBottom: `2px solid ${C.border}`,
              }}>
                <th style={{ padding: '10px 8px', textAlign: 'center', width: 56 }}>#</th>
                <th style={{ padding: '10px 8px', textAlign: 'left' }}>Tim</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', width: 40 }}>P</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', width: 40 }}>W</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', width: 40 }}>L</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', width: 48 }}>Pts</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', width: 56 }}>Diff</th>
              </tr>
            </thead>
            <tbody>
              {/* ─── TOP 2 ──────────────────────────────────────────────────── */}
              {top2.map((team, index) => {
                const isFirst = index === 0;
                return (
                  <tr key={team.name} style={{ 
                    borderBottom: `1px solid ${C.border}`,
                    background: isFirst ? `linear-gradient(135deg, #FFF8E7, #FFEECC)` : `linear-gradient(135deg, #F5F7F9, #E8ECF0)`,
                  }}>
                    <td style={{ padding: '10px 8px', textAlign: 'center', fontSize: 20 }}>
                      {isFirst ? '🥇' : '🥈'}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 700 }}>
                      {team.name}
                      {team.rt && (
                        <span style={{ fontSize: 11, color: C.muted, marginLeft: 6, fontWeight: 400 }}>
                          ({team.rt})
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>{team.played}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center', color: C.greenText, fontWeight: 600 }}>
                      {team.wins}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center', color: C.red, fontWeight: 600 }}>
                      {team.losses}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 800 }}>
                      {team.points}
                    </td>
                    <td style={{ 
                      padding: '10px 8px', 
                      textAlign: 'center',
                      color: team.diff > 0 ? C.greenText : team.diff < 0 ? C.red : C.muted,
                      fontWeight: team.diff !== 0 ? 700 : 400,
                    }}>
                      {team.diff > 0 ? '+' : ''}{team.diff}
                    </td>
                  </tr>
                );
              })}
              
              {/* ─── REST OF TEAMS ──────────────────────────────────────────── */}
              {rest.map((team, index) => (
                <tr key={team.name} style={{ 
                  borderBottom: `1px solid ${C.border}`,
                  background: 'transparent',
                }}>
                  <td style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 600 }}>
                    {index + 3}
                  </td>
                  <td style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 500 }}>
                    {team.name}
                    {team.rt && (
                      <span style={{ fontSize: 11, color: C.muted, marginLeft: 6, fontWeight: 400 }}>
                        ({team.rt})
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '10px 8px', textAlign: 'center' }}>{team.played}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'center', color: C.greenText }}>
                    {team.wins}
                  </td>
                  <td style={{ padding: '10px 8px', textAlign: 'center', color: C.red }}>
                    {team.losses}
                  </td>
                  <td style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 700 }}>
                    {team.points}
                  </td>
                  <td style={{ 
                    padding: '10px 8px', 
                    textAlign: 'center',
                    color: team.diff > 0 ? C.greenText : team.diff < 0 ? C.red : C.muted,
                  }}>
                    {team.diff > 0 ? '+' : ''}{team.diff}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* ─── LEGEND ─────────────────────────────────────────────────────────── */}
      <div style={{ 
        marginTop: 12, 
        paddingTop: 10, 
        borderTop: `1px solid ${C.border}`,
        fontSize: 11,
        color: C.muted,
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
      }}>
        <span>🏅 Peringkat berdasarkan: Poin → Selisih Skor → Head-to-Head</span>
        <span>• Win = 2 poin, Loss = 0 poin</span>
        <span>• Penentuan 🥇 Juara 1 & 🥈 Juara 2 bersifat mutlak berdasarkan hasil klasemen</span>
      </div>
    </div>
  );
};

export default DominoStandings;
