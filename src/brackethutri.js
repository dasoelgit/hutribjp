// src/brackethutri.js
import React, { useState } from 'react';
import BadmintonBracket from './BadmintonBracket';

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

// ─── SPORT FILTER ──────────────────────────────────────────────────────────
const SPORT_FILTERS = [
  { id: 'all', label: '📋 Semua', value: 'all' },
  { id: 'badminton', label: '🏸 Badminton', value: 'badminton' },
  { id: 'tabletennis', label: '🏓 Tenis Meja', value: 'tabletennis' },
  { id: 'chess', label: '♟️ Catur', value: 'chess' },
  { id: 'domino', label: '🀱 Gaple', value: 'domino' },
];

// ─── MAIN BRACKET PAGE ────────────────────────────────────────────────────
const BracketHutri = ({ matches }) => {
  const [selectedSport, setSelectedSport] = useState('all');

  // Filter matches by selected sport
  const filteredMatches = matches.filter(m => {
    if (selectedSport === 'all') return true;
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
      {/* Sport Filter */}
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
              padding: "4px 12px",
              borderRadius: 99,
              border: `1.5px solid ${selectedSport === filter.id ? C.red : C.border}`,
              background: selectedSport === filter.id ? C.redFaint : C.white,
              color: selectedSport === filter.id ? C.red : C.body,
              fontWeight: selectedSport === filter.id ? 700 : 500,
              fontSize: 12,
              cursor: "pointer",
              minHeight: 32,
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Sport-specific Bracket */}
      {selectedSport === 'badminton' || selectedSport === 'all' ? (
        <BadmintonBracket matches={filteredMatches} />
      ) : selectedSport === 'tabletennis' ? (
        <div style={{ textAlign: "center", padding: 40, color: C.muted }}>
          🏓 Table Tennis bracket coming soon...
        </div>
      ) : selectedSport === 'chess' ? (
        <div style={{ textAlign: "center", padding: 40, color: C.muted }}>
          ♟️ Chess bracket coming soon...
        </div>
      ) : selectedSport === 'domino' ? (
        <div style={{ textAlign: "center", padding: 40, color: C.muted }}>
          🀱 Domino bracket coming soon...
        </div>
      ) : null}
    </div>
  );
};

export default BracketHutri;
