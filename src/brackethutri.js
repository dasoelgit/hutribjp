// src/brackethutri.js
import React, { useState } from 'react';
import BadmintonBracket from './BadmintonBracket';
import TableTennisBracket from './TableTennisBracket';

// ─── STYLES ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#FBF7F4",
  border: "#EDD5D5",
  red: "#B71C1C",
  redFaint: "#FDECEC",
  white: "#FFFFFF",
  body: "#3D1515",
  muted: "#8B6060",
  faint: "#C09090",
};

// ─── SPORT FILTER (No "All") ─────────────────────────────────────────────
const SPORT_FILTERS = [
  { id: 'badminton', label: '🏸 Badminton', value: 'badminton' },
  { id: 'tabletennis', label: '🏓 Tenis Meja', value: 'tabletennis' },
  { id: 'chess', label: '♟️ Catur', value: 'chess' },
  { id: 'domino', label: '🀱 Gaple', value: 'domino' },
];

// ─── MAIN BRACKET PAGE ────────────────────────────────────────────────────
const BracketHutri = ({ matches }) => {
  const [selectedSport, setSelectedSport] = useState('badminton');

  // Filter matches by selected sport
  const filteredMatches = matches.filter(m => {
    if (selectedSport === 'badminton') return m.sport === 'Badminton';
    if (selectedSport === 'tabletennis') return m.sport === 'Table Tennis';
    if (selectedSport === 'chess') return m.sport === 'Chess';
    if (selectedSport === 'domino') return m.sport === 'Domino';
    return true;
  });

  return (
    <div style={{ 
      background: C.bg, 
      borderRadius: 12, 
      padding: 16,
      minHeight: 200,
    }}>
      {/* ─── SPORT FILTER (No "All") ───────────────────────────────────── */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: 6, 
        marginBottom: 16 
      }}>
        {SPORT_FILTERS.map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedSport(filter.id)}
            style={{
              padding: "3px 8px",
              borderRadius: 99,
              border: `1.5px solid ${selectedSport === filter.id ? C.red : C.border}`,
              background: selectedSport === filter.id ? C.redFaint : C.white,
              color: selectedSport === filter.id ? C.red : C.body,
              fontWeight: selectedSport === filter.id ? 700 : 500,
              fontSize: 10,
              cursor: "pointer",
              minHeight: 26,
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* ─── BRACKET CONTENT ───────────────────────────────────────────── */}
      {selectedSport === 'badminton' && (
        <BadmintonBracket matches={filteredMatches} />
      )}
      
      {selectedSport === 'tabletennis' && (
        <TableTennisBracket />
      )}
      
      {selectedSport === 'chess' && (
        <div style={{ 
          textAlign: "center", 
          padding: 48, 
          color: C.muted,
          background: C.white,
          borderRadius: 12,
          border: `1.5px solid ${C.border}`,
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>♟️</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.body }}>Chess Bracket</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Coming soon...</div>
        </div>
      )}
      
      {selectedSport === 'domino' && (
        <div style={{ 
          textAlign: "center", 
          padding: 48, 
          color: C.muted,
          background: C.white,
          borderRadius: 12,
          border: `1.5px solid ${C.border}`,
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🀱</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.body }}>Domino Bracket</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Coming soon...</div>
        </div>
      )}
    </div>
  );
};

export default BracketHutri;
