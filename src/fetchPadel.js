// src/fetchPadel.js
import { createClient } from '@supabase/supabase-js';

const PADEL_URL = 'https://dnoupmrhnyhcmxyqjzxs.supabase.co';
const PADEL_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRub3VwbXJobnloY214eXFqenhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NjI3MTksImV4cCI6MjA1NDQzODcxOX0.VY5ZETCzubFU0jVc77SAOImW-aaC7Z_qfVV5m5DZnN8';

const padelSupabase = createClient(PADEL_URL, PADEL_KEY);

const GROUP_IDS = {
  'A': 260247,
  'B': 260237,
  'C': 260239,
  'D': 260240,
  'E': 260242,
  'F': 260243,
  'G': 260245,
};

const VENUE_NAMES = {
  0: 'Timur Social Club - Arka Court',
  1: 'Timur Social Club - Pavana Court',
};

export async function fetchPadelMatches() {
  try {
    const allMatches = [];
    
    for (const [group, gameId] of Object.entries(GROUP_IDS)) {
      const { data, error } = await padelSupabase
        .rpc('get_game_rounds', { game_id: gameId });
      
      if (error) {
        console.error(`Error fetching Padel group ${group}:`, error);
        continue;
      }
      
      if (!data || !Array.isArray(data)) continue;
      
      data.forEach(round => {
        if (!round.matches) return;
        
        round.matches.forEach(match => {
          const teamA = match.team_a || {};
          const teamB = match.team_b || {};
          const aPlayers = (teamA.participants || []).map(p => p.name || 'TBD');
          const bPlayers = (teamB.participants || []).map(p => p.name || 'TBD');
          
          const scoreA = teamA.score !== undefined && teamA.score !== null ? teamA.score : null;
          const scoreB = teamB.score !== undefined && teamB.score !== null ? teamB.score : null;
          
          allMatches.push({
            id: `padel-${group}-r${round.round_number}-c${match.court_id || 0}`,
            sport: 'Padel',
            pA: aPlayers.join(' / ') || 'TBD',
            pB: bPlayers.join(' / ') || 'TBD',
            scoreA: scoreA,
            scoreB: scoreB,
            status: (scoreA !== null && scoreB !== null) ? 'finished' : 'scheduled',
            round: `Group ${group} - Round ${round.round_number}`,
            date: null,
            time: null,
            venue: VENUE_NAMES[match.court_id] || 'Timur Social Club',
            kind: 'match',
            _raw: match
          });
        });
      });
    }
    
    return allMatches;
  } catch (err) {
    console.error('Error fetching Padel matches:', err);
    return [];
  }
}
