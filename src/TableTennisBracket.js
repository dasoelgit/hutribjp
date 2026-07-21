// src/TableTennisBracket.js
import React from 'react';

const TableTennisBracket = () => {
  return (
    <div style={{
      width: '100%',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <iframe
        src="https://tenismeja.vercel.app/?bracket=true"
        width="100%"
        height="800"
        frameBorder="0"
        style={{
          border: 'none',
          borderRadius: '12px',
          display: 'block',
        }}
        title="🏓 TURNAMEN TENIS MEJA"
      />
    </div>
  );
};

export default TableTennisBracket;
