// src/fetchPadel.js
import { createClient } from '@supabase/supabase-js';

const PADEL_URL = 'https://dnoupmrhnyhcmxyqjzxs.supabase.co';
const PADEL_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRub3VwbXJobnloY214eXFqenhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NjI3MTksImV4cCI6MjA1NDQzODcxOX0.VY5ZETCzubFU0jVc77SAOImW-aaC7Z_qfVV5m5DZnN8';

const padelSupabase = createClient(PADEL_URL, PADEL_KEY);

// ─── GROUP IDs ──────────────────────────────────────────────────────────────
const GROUP_IDS = {
  'A': 260247,
  'B': 260237,
  'C': 260239,
  'D': 260240,
  'E': 260242,
  'F': 260243,
  'G': 260245,
};

// ─── VENUE NAMES ────────────────────────────────────────────────────────────
function getVenueName(courtId) {
  if (courtId === 400034) return 'Timur Social Club - Arka Court';
  if (courtId === 400035) return 'Timur Social Club - Pavana Court';
  return 'Timur Social Club';
}

// ─── SCHEDULE CONFIG ──────────────────────────────────────────────────────
const SCHEDULE = {
  groupOrder: ['F', 'G', 'A', 'B', 'C', 'D', 'E'],
  startTime: '08:00',
  durationPerSession: 11,
  roundsPerGroup: 6,
  date: '2026-08-08',
};

// ─── HELPERS ────────────────────────────────────────────────────────────────
function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function getSessionTime(group, round) {
  const order = SCHEDULE.groupOrder;
  const groupIndex = order.indexOf(group);
  const pairIndex = Math.floor(groupIndex / 2);
  const sessionsPerPair = SCHEDULE.roundsPerGroup * 2;
  const sessionOffset = groupIndex % 2;
  
  const sessionIndex = (pairIndex * sessionsPerPair) + ((round - 1) * 2) + sessionOffset;
  const totalMinutes = timeToMinutes(SCHEDULE.startTime) + sessionIndex * SCHEDULE.durationPerSession;
  return minutesToTime(totalMinutes);
}

// ─── FETCH FUNCTION ─────────────────────────────────────────────────────────
export async function fetchPadelMatches() {
  try {
    const allMatches = [];
    const baseDate = SCHEDULE.date || '2026-08-08';
    
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
        
        const roundNumber = round.round_number;
        const timeStr = getSessionTime(group, roundNumber);
        
        round.matches.forEach(match => {
          const teamA = match.team_a || {};
          const teamB = match.team_b || {};
          const aPlayers = (teamA.participants || []).map(p => p.name || 'TBD');
          const bPlayers = (teamB.participants || []).map(p => p.name || 'TBD');
          
          const hasScoreA = teamA.score !== undefined && teamA.score !== null && teamA.score > 0;
          const hasScoreB = teamB.score !== undefined && teamB.score !== null && teamB.score > 0;
          
          const scoreA = hasScoreA ? teamA.score : null;
          const scoreB = hasScoreB ? teamB.score : null;
          const isFinished = hasScoreA && hasScoreB;
          
          allMatches.push({
            id: `padel-${group}-r${roundNumber}-c${match.court_id || 0}`,
            sport: 'Padel',
            pA: aPlayers.join(' / ') || 'TBD',
            pB: bPlayers.join(' / ') || 'TBD',
            scoreA: scoreA,
            scoreB: scoreB,
            status: isFinished ? 'finished' : 'scheduled',
            round: `Group ${group} - Round ${roundNumber}`,
            date: baseDate,
            time: timeStr,
            venue: getVenueName(match.court_id),
            kind: 'match',
            _raw: match
          });
        });
      });
    }
    
    console.log('✅ Padel matches fetched:', allMatches.length);
    console.log('🔍 Padel venue sample:', allMatches.slice(0, 3).map(m => ({
  venue: m.venue,
  sport: m.sport,
  court_id: m._raw?.court_id
})));
    return allMatches;
  } catch (err) {
    console.error('❌ Error fetching Padel matches:', err);
    return [];
  }
}
