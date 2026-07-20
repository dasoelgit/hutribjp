import { useState, useRef, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const LOGO_URL = "/logo.jpg";

// ─── BADMINTON SUPABASE ──────────────────────────────────────────────────
const BADMINTON_URL = "https://wrikykevhzwppsqrsxch.supabase.co";
const BADMINTON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyaWt5a2V2aHp3cHBzcXJzeGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4ODk3OTAsImV4cCI6MjA5ODQ2NTc5MH0.YI6Aee8WMOvyLNRbe28PcMpueKt6cE_RnASAZP6NX6A";
const badmintonSupabase = createClient(BADMINTON_URL, BADMINTON_KEY);

// ─── CHESS & DOMINO SUPABASE ──────────────────────────────────────────────
const SPORTS_URL = "https://iutaonvfytlfqxqzrasv.supabase.co";
const SPORTS_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dGFvbnZmeXRsZnF4cXpyYXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNDY2NjEsImV4cCI6MjA5NzYyMjY2MX0._4kfSi97ZbWDUq_GL4UU0tGJB7trj8fz781QHpE64V0";
const sportsSupabase = createClient(SPORTS_URL, SPORTS_KEY);

const CHESS_TABLE = "hut_ri_bjp_2026_chess";
const DOMINO_TABLE = "hut_ri_bjp_2026_domino";

// ─── VENUE CONFIG ──────────────────────────────────────────────────────────
const VENUES = {
  "Badminton": "GOR RW 011 BJP",
  "Table Tennis": "Lapangan Tenis Meja BJP",
  "Chess": "Kantor RW 011",
  "Domino": "Gedung Serbaguna BJP",
};

const PROGRAM_VENUES = [
  "GOR RW 011 BJP",
  "Lapangan Tenis Meja BJP",
  "Kantor RW 011",
  "Gedung Serbaguna BJP",
  "Lapangan Utama RW 011",
  "Komplek Bintara Jaya Permai",
];

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const C = {
  bg:"#FBF7F4", surface:"#FDF5F5", card:"#FFFFFF", border:"#EDD5D5", borderMid:"#DDB8B8",
  red:"#B71C1C", redLight:"#FF4444", redDeep:"#8B0000", redFaint:"#FDECEC", redGlow:"rgba(183,28,28,0.12)",
  ink:"#1A0505", body:"#3D1515", muted:"#8B6060", faint:"#C09090", white:"#FFFFFF",
  gold:"#C8960C", silver:"#6B7280", bronze:"#92400E",
  greenText:"#166534", greenBg:"#F0FDF4", greenBorder:"#BBF7D0",
  bluText:"#1E40AF", bluBg:"#EFF6FF", bluBorder:"#BFDBFE",
  amberText:"#92400E", amberBg:"#FFFBEB", amberBorder:"#FDE68A",
};

// ─── SPORT CONFIG ────────────────────────────────────────────────────────────
const SPORT_META = {
  "Badminton":            { emoji:"🏸", scoringType:"sets",    matchType:"doubles", bestOf:3,  pointsPerSet:21 },
  "Table Tennis":         { emoji:"🏓", scoringType:"sets",    matchType:"doubles", bestOf:5,  pointsPerSet:11 },
  "Chess":                { emoji:"♟️", scoringType:"chess",   matchType:"singles", bestOf:1 },
  "Domino":               { emoji:"🀱", scoringType:"points",  matchType:"doubles", bestOf:1 },
};
const SPORTS = Object.keys(SPORT_META);

// ─── SPORT DISPLAY NAMES (Indonesian for visitors) ─────────────────────────
const SPORT_DISPLAY = {
  "Badminton": "Badminton",
  "Table Tennis": "Tenis Meja",
  "Chess": "Catur",
  "Domino": "Gaple",
};

// ─── RT OPTIONS ────────────────────────────────────────────────────────────
const RT_OPTIONS = ["RT 01", "RT 02", "RT 03", "RT 04", "RT 05", "RT 06", "RT 07", "RT 08", "RT 09"];

// ─── ACCOUNTS ──────────────────────────────────────────────────────────────
const ACCOUNTS = [
  { id:"admin", username:"admin", password:"giobjp26", role:"admin", badge:"🛡️", label:"Super Admin" },
  { id:"chess", username:"chess", password:"catur26", role:"chess_admin", badge:"♟️", label:"Chess Admin" },
  { id:"domino", username:"domino", password:"balak6", role:"domino_admin", badge:"🀱", label:"Domino Admin" },
  { id:"event", username:"event", password:"hutri26", role:"event_admin", badge:"📌", label:"Event Admin" },
];

// ─── INITIAL DATA ──────────────────────────────────────────────────────────
const CLUBS_INIT = [
  { id:1, name:"RT 01", color:"#DC2626", flag:"01" },
  { id:2, name:"RT 02", color:"#2563EB", flag:"02" },
  { id:3, name:"RT 03", color:"#16A34A", flag:"03" },
  { id:4, name:"RT 04", color:"#D97706", flag:"04" },
  { id:5, name:"RT 05", color:"#7C3AED", flag:"05" },
  { id:6, name:"RT 06", color:"#EA580C", flag:"06" },
  { id:7, name:"RT 07", color:"#0891B2", flag:"07" },
  { id:8, name:"RT 08", color:"#BE185D", flag:"08" },
  { id:9, name:"RT 09", color:"#475569", flag:"09" },
];

const PLAYERS_INIT = [];
const PAIRS_INIT = [];
const seedProgram = () => [];

// ─── HELPERS ────────────────────────────────────────────────────────────────
const fmtDate = d => { 
  try { 
    return new Date(d+"T00:00:00").toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long"}); 
  } catch { 
    return d; 
  } 
};

const fmtTime = t => {
  if (!t) return '';
  try {
    if (t.includes(':')) {
      return t.substring(0, 5);
    }
    return t;
  } catch {
    return t;
  }
};

const fmtDateWithYear = d => { 
  try { 
    return new Date(d+"T00:00:00").toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"}); 
  } catch { 
    return d; 
  } 
};

// ─── FETCH BADMINTON MATCHES ─────────────────────────────────────────────
async function fetchBadmintonMatches() {
  try {
    const { data, error } = await badmintonSupabase
      .from('matches')
      .select(`
        id,
        team1_players,
        team2_players,
        team1_score,
        team2_score,
        status,
        scheduled_date,
        scheduled_time,
        tournament_matches!inner(
          stage,
          round,
          tournament_id,
          tournaments!inner(name)
        )
      `)
      .order('scheduled_date', { ascending: true })
      .order('scheduled_time', { ascending: true });

    if (error) {
      console.error('Badminton fetch error:', error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map(match => {
      const buildSide = (teamPlayers) => {
        if (!Array.isArray(teamPlayers) || teamPlayers.length === 0) return null;
        const valid = teamPlayers.filter(p => p && p.name);
        if (!valid.length) return null;
        return {
          name: valid.map(p => p.name).join(' / '),
        };
      };

      const pA = buildSide(match.team1_players);
      const pB = buildSide(match.team2_players);

      let status = 'scheduled';
      if (match.status === 'completed' || match.status === 'finished') status = 'finished';
      else if (match.status === 'in_progress' || match.status === 'live') status = 'live';
      else if (match.status === 'scheduled' || match.status === 'pending') status = 'scheduled';

      const hasScore = match.team1_score != null && match.team2_score != null;
      const result = (status === 'finished' && hasScore)
        ? (match.team1_score > match.team2_score ? 'A'
          : match.team2_score > match.team1_score ? 'B'
          : 'draw')
        : null;
      const sets = hasScore ? [{ sA: match.team1_score, sB: match.team2_score }] : [];

      let tournamentName = '';
      let roundLabel = '';
      if (match.tournament_matches && Array.isArray(match.tournament_matches) && match.tournament_matches.length > 0) {
        const tm = match.tournament_matches[0];
        if (tm) {
          if (tm.tournaments) {
              tournamentName = (tm.tournaments.name || '').replace(/\s+Tournament/i, '');
            }
          const { stage, round } = tm;
          if (stage === 'group' && round === 1) roundLabel = 'Group Stage';
          else if (stage === 'knockout' && round === 1) roundLabel = 'Final';
          else if (stage === 'knockout' && round === 2) roundLabel = 'Semifinal';
          else roundLabel = `${stage || ''} Round ${round || ''}`;
        }
      }

      const venue = match.venue || VENUES["Badminton"];

      return {
        id: match.id,
        sport: 'Badminton',
        tournamentName: tournamentName,
        round: roundLabel,
        pA: pA ?? { name: 'TBD', isTbd: true },
        pB: pB ?? { name: 'TBD', isTbd: true },
        date: match.scheduled_date || '',
        time: match.scheduled_time || '',
        venue: venue,
        scoreA: match.team1_score ?? null,
        scoreB: match.team2_score ?? null,
        result: result,
        sets: sets,
        status: status,
        kind: 'match',
        _raw: match
      };
    });
  } catch (err) {
    console.error('Error fetching Badminton:', err);
    return [];
  }
}

// ─── FETCH TABLE TENNIS MATCHES ──────────────────────────────────────────

// Dedupe function (keeps latest row per logical match)
function dedupeLatestMatches(rows, keyFn) {
  const byKey = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    const existing = byKey.get(key);
    if (!existing || new Date(row.created_at || 0) >= new Date(existing.created_at || 0)) {
      byKey.set(key, row);
    }
  }
  return Array.from(byKey.values());
}

const STAGE_LABELS = {
  group: 'Group Stage',
  next: 'Next Stage',
  championship: 'Championship',
  semifinal: 'Semifinal',
  final: 'Final',
};

async function fetchTableTennisMatches() {
  try {
    // ─── FETCH GROUP STAGE ──────────────────────────────────────────────
    const { data: singlesGroup, error: singlesError } = await sportsSupabase
      .from('tt_singles_matches')
      .select('*')
      .order('created_at', { ascending: true });

    if (singlesError) {
      console.error('TT Singles fetch error:', singlesError);
    }

    const { data: doublesGroup, error: doublesError } = await sportsSupabase
      .from('tt_doubles_matches')
      .select('*')
      .order('created_at', { ascending: true });

    if (doublesError) {
      console.error('TT Doubles fetch error:', doublesError);
    }

    // Dedupe group matches (append-only tables)
    const dedupedSingles = dedupeLatestMatches(singlesGroup || [], m =>
      `${m.group_id}-${m.player1}-${m.player2}`
    );
    const dedupedDoubles = dedupeLatestMatches(doublesGroup || [], m =>
      `${m.group_id}-${m.team1_p1}/${m.team1_p2}-${m.team2_p1}/${m.team2_p2}`
    );

    // ─── FETCH KNOCKOUT MATCHES ──────────────────────────────────────────
    const { data: knockoutData, error: knockoutError } = await sportsSupabase
      .from('tt_knockout_matches')
      .select('*')
      .order('scheduled_date', { ascending: true })
      .order('scheduled_time', { ascending: true });

    if (knockoutError) {
      console.error('TT Knockout fetch error:', knockoutError);
    }

    // ─── FETCH SCHEDULE SLOTS FROM TT_STATE ─────────────────────────────
    const { data: stateData, error: stateError } = await sportsSupabase
      .from('tt_state')
      .select('slot_schedule')
      .order('created_at', { ascending: false })
      .limit(1);

    // ─── CREATE LOOKUP OF EXISTING MATCH KEYS ───────────────────────────
    const existingMatchKeys = new Set();
    const existingMatchIds = new Set();
    (knockoutData || []).forEach(m => {
      if (m.match_key) existingMatchKeys.add(m.match_key);
      if (m.id) existingMatchIds.add(String(m.id));
    });

    // ─── CREATE PLACEHOLDER MATCHES FROM SCHEDULE SLOTS ────────────────
    let schedulePlaceholders = [];

    if (!stateError && stateData && stateData.length > 0) {
      const slotSchedule = stateData[0].slot_schedule;
      
      if (slotSchedule) {
        // ─── SINGLES NEXT STAGE ──────────────────────────────────────────
        if (slotSchedule.singles?.next) {
          Object.entries(slotSchedule.singles.next).forEach(([slotId, slotData]) => {
            // Extract the part after SLOT- and before -1/-2/-3
            // SLOT-NEXT-X-1 → NEXT-X
            // SLOT-NEXT-X-2 → NEXT-X
            const matchKeyBase = slotId.replace('SLOT-', '').replace(/-\d+$/, '');
            
            // Check if this slot already has a match
            // We can't match by exact key because player names are in the key
            // So we check if any match_key starts with the base
            const hasMatch = (knockoutData || []).some(m => 
              m.match_key && m.match_key.startsWith(matchKeyBase + '-')
            );
            
            if (!hasMatch) {
              schedulePlaceholders.push({
                id: `slot-${slotId}`,
                _category: 'Singles',
                _isKnockout: true,
                _isPlaceholder: true,
                _slotId: slotId,
                _matchKeyBase: matchKeyBase,
                p1: 'Winner A',
                p2: 'Winner B',
                stage: 'next',
                scheduled_date: slotData.scheduled_date || null,
                scheduled_time: slotData.scheduled_time || null,
                table_number: slotData.table_number || null,
                sets: null,
                winner: null,
              });
            }
          });
        }
        
        // ─── SINGLES CHAMPIONSHIP ────────────────────────────────────────
        if (slotSchedule.singles?.championship) {
          Object.entries(slotSchedule.singles.championship).forEach(([slotId, slotData]) => {
            // SLOT-CHAMP-1 → CHAMP
            const matchKeyBase = slotId.replace('SLOT-', '').replace(/-\d+$/, '');
            
            const hasMatch = (knockoutData || []).some(m => 
              m.match_key && m.match_key.startsWith(matchKeyBase + '-')
            );
            
            if (!hasMatch) {
              schedulePlaceholders.push({
                id: `slot-${slotId}`,
                _category: 'Singles',
                _isKnockout: true,
                _isPlaceholder: true,
                _slotId: slotId,
                _matchKeyBase: matchKeyBase,
                p1: 'Winner A',
                p2: 'Winner B',
                stage: 'championship',
                scheduled_date: slotData.scheduled_date || null,
                scheduled_time: slotData.scheduled_time || null,
                table_number: slotData.table_number || null,
                sets: null,
                winner: null,
              });
            }
          });
        }
        
        // ─── DOUBLES SEMIFINALS ──────────────────────────────────────────
        if (slotSchedule.doubles?.semifinal) {
          Object.entries(slotSchedule.doubles.semifinal).forEach(([slotId, slotData]) => {
            // SLOT-SF-1 → SF1
            const matchKeyBase = slotId.replace('SLOT-', '');
            
            const hasMatch = (knockoutData || []).some(m => 
              m.match_key && m.match_key.startsWith(matchKeyBase + '-')
            );
            
            if (!hasMatch) {
              schedulePlaceholders.push({
                id: `slot-${slotId}`,
                _category: 'Doubles',
                _isKnockout: true,
                _isPlaceholder: true,
                _slotId: slotId,
                _matchKeyBase: matchKeyBase,
                p1: 'Winner A',
                p2: 'Winner B',
                stage: 'semifinal',
                scheduled_date: slotData.scheduled_date || null,
                scheduled_time: slotData.scheduled_time || null,
                table_number: slotData.table_number || null,
                sets: null,
                winner: null,
              });
            }
          });
        }
        
        // ─── DOUBLES FINAL ───────────────────────────────────────────────
        if (slotSchedule.doubles?.final) {
          Object.entries(slotSchedule.doubles.final).forEach(([slotId, slotData]) => {
            // SLOT-FINAL-1 → FINAL
            const matchKeyBase = slotId.replace('SLOT-', '').replace(/-\d+$/, '');
            
            const hasMatch = (knockoutData || []).some(m => 
              m.match_key && m.match_key.startsWith(matchKeyBase + '-')
            );
            
            if (!hasMatch) {
              schedulePlaceholders.push({
                id: `slot-${slotId}`,
                _category: 'Doubles',
                _isKnockout: true,
                _isPlaceholder: true,
                _slotId: slotId,
                _matchKeyBase: matchKeyBase,
                p1: 'Winner A',
                p2: 'Winner B',
                stage: 'final',
                scheduled_date: slotData.scheduled_date || null,
                scheduled_time: slotData.scheduled_time || null,
                table_number: slotData.table_number || null,
                sets: null,
                winner: null,
              });
            }
          });
        }
      }
    }

    // ─── MAP REAL KNOCKOUT MATCHES ───────────────────────────────────────
    const existingKnockout = (knockoutData || []).map(m => ({
      ...m,
      _category: m.match_type === 'singles' ? 'Singles' : 'Doubles',
      _isKnockout: true,
      _isPlaceholder: false,
    }));

    // ─── COMBINE ALL ──────────────────────────────────────────────────────
    const singles = dedupedSingles.map(m => ({ ...m, _category: 'Singles' }));
    const doubles = dedupedDoubles.map(m => ({ ...m, _category: 'Doubles' }));
    const knockout = [...existingKnockout, ...schedulePlaceholders];

    const allData = [...singles, ...doubles, ...knockout];

    if (!allData || allData.length === 0) {
      return [];
    }

    // Sort by date/time
    allData.sort((a, b) =>
      (a.scheduled_date || '').localeCompare(b.scheduled_date || '') ||
      (a.scheduled_time || '').localeCompare(b.scheduled_time || '')
    );

    // ─── MAP TO APP FORMAT ──────────────────────────────────────────────
    return allData.map(match => {
      let pA = null;
      let pB = null;
      let roundLabel = '';
      let isKnockout = match._isKnockout || false;
      let isPlaceholder = match._isPlaceholder || false;

      if (isKnockout) {
        if (isPlaceholder) {
          pA = { name: match.p1 || 'Winner A', flag: null, club: null };
          pB = { name: match.p2 || 'Winner B', flag: null, club: null };
        } else {
          if (match.p1) pA = { name: match.p1, flag: null, club: null };
          if (match.p2) pB = { name: match.p2, flag: null, club: null };
        }
        roundLabel = STAGE_LABELS[match.stage] || match.stage || '';
      } else if (match._category === 'Singles') {
        if (match.player1) pA = { name: match.player1, flag: null, club: null };
        if (match.player2) pB = { name: match.player2, flag: null, club: null };
        const group = match.group_id || '';
        roundLabel = `Group ${group}`;
      } else {
        const team1 = [match.team1_p1, match.team1_p2].filter(Boolean);
        const team2 = [match.team2_p1, match.team2_p2].filter(Boolean);
        if (team1.length > 0) pA = { name: team1.join(' / '), flag: null, club: null };
        if (team2.length > 0) pB = { name: team2.join(' / '), flag: null, club: null };
        const group = match.group_id || '';
        roundLabel = `Group ${group}`;
      }

      // Status
      let status = 'scheduled';
      if (match.winner !== null && match.winner !== undefined && match.winner !== '') {
        status = 'finished';
      } else if (isPlaceholder) {
        status = 'scheduled';
      }

      // Sets & scores
      let sets = [];
      let scoreA = 0;
      let scoreB = 0;
      let result = null;

      if (match.sets && Array.isArray(match.sets) && match.sets.length > 0) {
        sets = match.sets
          .filter(s => s && (s.p1 !== undefined || s.p2 !== undefined))
          .map(s => ({
            sA: parseInt(s.p1) || 0,
            sB: parseInt(s.p2) || 0
          }));
        sets.forEach(s => {
          if (s.sA > s.sB) scoreA++;
          else if (s.sB > s.sA) scoreB++;
        });
      }

      if (status === 'finished' && (scoreA > 0 || scoreB > 0)) {
        result = scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'draw';
      }

      // Venue
      const venue = VENUES["Table Tennis"];

      return {
        id: match.id,
        sport: 'Table Tennis',
        category: match._category,
        tournamentName: 'Turnamen Tenis Meja - HUT RI 2026 Bintara Jaya Permai',
        round: roundLabel,
        pA: pA ?? { name: 'TBD', flag: null, club: null, isTbd: true },
        pB: pB ?? { name: 'TBD', flag: null, club: null, isTbd: true },
        date: match.scheduled_date || '',
        time: match.scheduled_time || '',
        venue: venue,
        scoreA: scoreA,
        scoreB: scoreB,
        result: result,
        winnerName: match.winner || null,
        sets: sets,
        status: status,
        kind: 'match',
        isKnockout: isKnockout,
        isPlaceholder: isPlaceholder,
        _raw: match
      };
    });
  } catch (err) {
    console.error('Error fetching Table Tennis:', err);
    return [];
  }
}

// ─── FETCH SPORT MATCHES (Chess & Domino) ──────────────────────────────────
async function fetchSportMatches(table, sportName) {
  try {
    const { data, error } = await sportsSupabase
      .from(table)
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      console.error(`Error fetching ${sportName}:`, error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map(match => {
      let status = 'scheduled';
      if (match.status === 'completed' || match.status === 'finished') status = 'finished';
      else if (match.status === 'in_progress' || match.status === 'live') status = 'live';
      else if (match.status === 'scheduled' || match.status === 'pending') status = 'scheduled';

      // Derive result from scores (same for both Chess & Domino)
      const hasScore = match.scoreA != null && match.scoreB != null;
      const result = (status === 'finished' && hasScore)
        ? (match.scoreA > match.scoreB ? 'A'
          : match.scoreB > match.scoreA ? 'B'
          : 'draw')
        : null;

      // For Domino: single score, for Chess: single score
      const sets = hasScore ? [{ sA: match.scoreA, sB: match.scoreB }] : [];

      // Get clean player names (without RT in name)
      let pA = match.pA || 'TBD';
      let pB = match.pB || 'TBD';

      // Clean RT from name if it exists (for existing data)
      pA = pA.replace(/\s*\(RT\s*\d+\)\s*/i, '').trim();
      pB = pB.replace(/\s*\(RT\s*\d+\)\s*/i, '').trim();

      return {
        id: match.id,
        sport: sportName,
        round: match.round || '',
        pA: pA,
        rtA: match.rtA || match.rta || '',
        pB: pB,
        rtB: match.rtB || match.rtb || '',
        date: match.date || '',
        time: match.time || '',
        venue: match.venue || VENUES[sportName] || '',
        scoreA: match.scoreA ?? null,
        scoreB: match.scoreB ?? null,
        result: result,
        sets: sets,
        status: status,
        kind: 'match',
        _raw: match
      };
    });
  } catch (err) {
    console.error(`Error fetching ${sportName}:`, err);
    return [];
  }
}

// ─── SAVE SPORT MATCH (Chess & Domino) ────────────────────────────────────
async function saveSportMatch(table, match) {
  try {
    const { error } = await sportsSupabase
      .from(table)
      .update({
        round: match.round,
        pA: match.pA,
        rtA: match.rtA,
        pB: match.pB,
        rtB: match.rtB,
        date: match.date,
        time: match.time,
        venue: match.venue,
        scoreA: match.scoreA,
        scoreB: match.scoreB,
        status: match.status
      })
      .eq('id', match.id);

    if (error) {
      console.error('Save error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving match:', err);
    return false;
  }
}

// ─── DELETE SPORT MATCH ──────────────────────────────────────────────────
async function deleteSportMatch(table, id) {
  try {
    const { error } = await sportsSupabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error deleting match:', err);
    return false;
  }
}

// ─── ADD SPORT MATCH ─────────────────────────────────────────────────────
async function addSportMatch(table, match) {
  try {
    const { data, error } = await sportsSupabase
      .from(table)
      .insert([{
        round: match.round,
        pA: match.pA,
        rtA: match.rtA,
        pB: match.pB,
        rtB: match.rtB,
        date: match.date,
        time: match.time,
        venue: match.venue,
        scoreA: null,
        scoreB: null,
        status: 'scheduled'
      }])
      .select();

    if (error) {
      console.error('Add error:', error);
      return null;
    }
    return data?.[0] || null;
  } catch (err) {
    console.error('Error adding match:', err);
    return null;
  }
}

// ─── STATUS CONFIG ──────────────────────────────────────────────────────────
const STATUS = {
  scheduled:{ text:"#1E40AF", bg:"#EFF6FF", border:"#BFDBFE", label:"Scheduled" },
  live:     { text:C.red,     bg:C.redFaint, border:"#FECACA", label:"Live" },
  finished: { text:"#166534", bg:"#F0FDF4",  border:"#BBF7D0", label:"Finished" },
};

// ─── UI ATOMS ──────────────────────────────────────────────────────────────
const Pill = ({status}) => {
  const s=STATUS[status];
  return <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 11px",borderRadius:99,fontSize:13,fontWeight:700,background:s.bg,color:s.text,border:`1px solid ${s.border}`}}>
    {status==="live"&&<span style={{width:7,height:7,borderRadius:99,background:C.red,display:"inline-block",animation:"pulse 1s infinite"}}/>}
    {s.label}
  </span>;
};

const SportBadge = ({sport}) => {
  const meta=SPORT_META[sport]??{emoji:"🏅"};
  const typeColors={singles:["#F5F3FF","#6D28D9"],doubles:["#FFF7ED","#C2410C"]};
  const [bg,color]=typeColors[meta.matchType]??["#F9FAFB","#374151"];
  return <span style={{
    display:"inline-flex",
    alignItems:"center",
    gap:4,
    padding:"4px 11px",
    borderRadius:99,
    fontSize:13,
    fontWeight:700,
    background:bg,
    color:color,
    border:`1px solid ${color}33`
  }}>{meta.emoji} {SPORT_DISPLAY[sport] || sport}</span>;
};

// ─── LOGIN MODAL ────────────────────────────────────────────────────────────
function LoginModal({ onLogin, onCancel, accounts }) {
  const [u,setU]=useState(""), [p,setP]=useState(""), [err,setErr]=useState("");
  const attempt=()=>{ const c=accounts.find(x=>x.username===u && x.password===p); c?onLogin(c):setErr("Invalid credentials."); };
  const inp={background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:8,color:C.ink,padding:"10px 14px",fontSize:14,width:"100%",boxSizing:"border-box",outline:"none"};
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(26,5,5,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,backdropFilter:"blur(6px)"}}>
      <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:20,padding:36,width:380,boxShadow:"0 20px 60px rgba(139,0,0,0.18)"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:60,height:60,borderRadius:16,background:`linear-gradient(135deg,${C.redDeep},${C.red})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 14px",boxShadow:`0 4px 20px ${C.redGlow}`}}>🔐</div>
          <div style={{fontWeight:900,fontSize:20,color:C.ink}}>Officials Login</div>
          <div style={{fontSize:11,color:C.muted,marginTop:4,letterSpacing:1.5,textTransform:"uppercase"}}>HUT RI BJP 2026</div>
        </div>
        <div style={{marginBottom:12}}>
          <label style={{fontSize:11,color:C.muted,fontWeight:700,display:"block",marginBottom:5,letterSpacing:1}}>USERNAME</label>
          <input style={inp} value={u} onChange={e=>{setU(e.target.value);setErr("");}} placeholder="username"/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={{fontSize:11,color:C.muted,fontWeight:700,display:"block",marginBottom:5,letterSpacing:1}}>PASSWORD</label>
          <input style={inp} type="password" value={p} onChange={e=>{setP(e.target.value);setErr("");}} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&attempt()}/>
        </div>
        {err&&<div style={{color:C.red,fontSize:13,marginBottom:14,textAlign:"center",background:C.redFaint,padding:"8px 12px",borderRadius:8,border:"1px solid #FECACA"}}>{err}</div>}
        <div style={{display:"flex",gap:10}}>
          <button onClick={onCancel} style={{flex:1,padding:"11px",borderRadius:9,border:`1.5px solid ${C.border}`,background:C.white,color:C.muted,cursor:"pointer",fontWeight:600,fontSize:13}}>Cancel</button>
          <button onClick={attempt} style={{flex:2,padding:"11px",borderRadius:9,border:"none",background:`linear-gradient(135deg,${C.redDeep},${C.red})`,color:C.white,cursor:"pointer",fontWeight:800,fontSize:14,boxShadow:`0 4px 16px ${C.redGlow}`}}>Sign In →</button>
        </div>
      </div>
    </div>
  );
}

// ─── EDIT MODAL ─────────────────────────────────────────────────────────────
function EditModal({ item, clubs, players, pairs, onSave, onClose }) {
  const [form, setForm] = useState({ ...item });
  const f = (k,v) => setForm(p=>({...p,[k]:v}));

  const inp={background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:8,color:C.ink,padding:"9px 12px",fontSize:13,width:"100%",boxSizing:"border-box"};
  const lbl={fontSize:10,color:C.muted,fontWeight:700,display:"block",marginBottom:4,letterSpacing:1};

  const poolFor = sport => {
    const meta=SPORT_META[sport];
    if(meta?.matchType==="doubles") return pairs;
    return players;
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(26,5,5,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,backdropFilter:"blur(4px)"}}>
      <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:16,padding:28,width:520,maxWidth:"95vw",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <div style={{fontWeight:800,fontSize:16,color:C.ink}}>{item.kind==="match"?"Edit Match":"Edit Program Event"}</div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:C.muted,lineHeight:1}}>✕</button>
        </div>

        {item.kind==="match" ? (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{gridColumn:"1/-1"}}><label style={lbl}>SPORT</label>
              <select style={inp} value={form.sport} onChange={e=>f("sport",e.target.value)}>
                {SPORTS.map(s=><option key={s} value={s}>{SPORT_META[s].emoji} {s}</option>)}
              </select>
            </div>
            {(()=>{
              const pool=poolFor(form.sport);
              return <>
                <div><label style={lbl}>PARTICIPANT A</label>
                  <select style={inp} value={form.pA} onChange={e=>f("pA",+e.target.value)}>
                    {pool.map(p=><option key={p.id} value={p.id}>{p.flag} · {p.name}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>PARTICIPANT B</label>
                  <select style={inp} value={form.pB} onChange={e=>f("pB",+e.target.value)}>
                    {pool.filter(p=>p.id!==+form.pA).map(p=><option key={p.id} value={p.id}>{p.flag} · {p.name}</option>)}
                  </select>
                </div>
              </>;
            })()}
            <div><label style={lbl}>DATE</label><input style={inp} type="date" value={form.date} onChange={e=>f("date",e.target.value)}/></div>
            <div><label style={lbl}>TIME</label><input style={inp} type="time" value={form.time} onChange={e=>f("time",e.target.value)}/></div>
            <div><label style={lbl}>VENUE</label><input style={inp} value={form.venue||""} onChange={e=>f("venue",e.target.value)}/></div>
            <div><label style={lbl}>ROUND</label><input style={inp} value={form.round||""} onChange={e=>f("round",e.target.value)} placeholder="Group Stage, Semi-final…"/></div>
            <div style={{gridColumn:"1/-1"}}><label style={lbl}>STATUS</label>
              <select style={inp} value={form.status} onChange={e=>f("status",e.target.value)}>
                <option value="scheduled">Scheduled</option>
                <option value="live">Live</option>
                <option value="finished">Finished</option>
              </select>
            </div>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{gridColumn:"1/-1"}}><label style={lbl}>TITLE</label><input style={inp} value={form.title||""} onChange={e=>f("title",e.target.value)}/></div>
            <div><label style={lbl}>AUDIENCE</label><input style={inp} value={form.audience||""} onChange={e=>f("audience",e.target.value)}/></div>
            <div><label style={lbl}>DATE</label><input style={inp} type="date" value={form.date} onChange={e=>f("date",e.target.value)}/></div>
            <div><label style={lbl}>TIME</label><input style={inp} type="time" value={form.time} onChange={e=>f("time",e.target.value)}/></div>
            <div style={{gridColumn:"1/-1"}}><label style={lbl}>VENUE</label><input style={inp} value={form.venue||""} onChange={e=>f("venue",e.target.value)}/></div>
            <div style={{gridColumn:"1/-1"}}><label style={lbl}>DESCRIPTION</label><input style={inp} value={form.description||""} onChange={e=>f("description",e.target.value)}/></div>
          </div>
        )}

        <div style={{display:"flex",gap:10,marginTop:20}}>
          <button onClick={onClose} style={{flex:1,padding:"10px",borderRadius:9,border:`1.5px solid ${C.border}`,background:C.white,color:C.muted,cursor:"pointer",fontWeight:600}}>Cancel</button>
          <button onClick={()=>onSave(form)} style={{flex:2,padding:"10px",borderRadius:9,border:"none",background:`linear-gradient(135deg,${C.redDeep},${C.red})`,color:C.white,cursor:"pointer",fontWeight:800,fontSize:14,boxShadow:`0 4px 16px ${C.redGlow}`}}>💾 Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ─── SCORE MODAL ────────────────────────────────────────────────────────────
function ScoreModal({ match, onSave, onClose }) {
  const [form, setForm] = useState({
    scoreA: match.scoreA !== null ? String(match.scoreA) : "",
    scoreB: match.scoreB !== null ? String(match.scoreB) : "",
    status: match.status || "scheduled"
  });

  const handleSave = () => {
    const sA = form.scoreA !== "" ? parseInt(form.scoreA) : null;
    const sB = form.scoreB !== "" ? parseInt(form.scoreB) : null;
    onSave({
      ...match,
      scoreA: sA,
      scoreB: sB,
      status: form.status
    });
  };

  const isChess = match.sport === "Chess";

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(26,5,5,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 500,
      backdropFilter: "blur(4px)",
      padding: 16
    }}>
      <div style={{
        background: C.white,
        borderRadius: 16,
        padding: 24,
        width: "100%",
        maxWidth: 420,
        maxHeight: "95vh",
        overflowY: "auto",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.ink }}>
              {SPORT_META[match.sport]?.emoji} {SPORT_DISPLAY[match.sport] || match.sport}
            </div>
            {match.round && <div style={{ fontSize: 13, color: C.muted }}>{match.round}</div>}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: C.muted, padding: 4 }}>✕</button>
        </div>

        <div style={{
          background: C.surface,
          borderRadius: 10,
          padding: 14,
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, wordBreak: "break-word" }}>{match.pA || "TBD"}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: isChess ? 20 : 24, fontWeight: 900, color: C.ink }}>vs</span>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0, textAlign: "right" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, wordBreak: "break-word" }}>{match.pB || "TBD"}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 4 }}>{match.pA || "A"}</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={form.scoreA}
              onChange={e => setForm({ ...form, scoreA: e.target.value })}
              style={{
                width: "100%",
                padding: "14px 10px",
                fontSize: 22,
                fontWeight: 700,
                textAlign: "center",
                border: `2px solid ${C.border}`,
                borderRadius: 10,
                background: C.white,
                color: C.ink,
                outline: "none",
                minHeight: 56
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 4 }}>{match.pB || "B"}</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={form.scoreB}
              onChange={e => setForm({ ...form, scoreB: e.target.value })}
              style={{
                width: "100%",
                padding: "14px 10px",
                fontSize: 22,
                fontWeight: 700,
                textAlign: "center",
                border: `2px solid ${C.border}`,
                borderRadius: 10,
                background: C.white,
                color: C.ink,
                outline: "none",
                minHeight: 56
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 4 }}>Status</label>
          <div style={{ display: "flex", gap: 6 }}>
            {["scheduled", "live", "finished"].map(s => {
              const st = STATUS[s];
              const active = form.status === s;
              return (
                <button
                  key={s}
                  onClick={() => setForm({ ...form, status: s })}
                  style={{
                    flex: 1,
                    padding: "10px 6px",
                    borderRadius: 8,
                    border: `2px solid ${active ? st.color : C.border}`,
                    background: active ? st.bg : C.white,
                    color: active ? st.color : C.muted,
                    fontWeight: active ? 700 : 500,
                    fontSize: 13,
                    cursor: "pointer",
                    minHeight: 44
                  }}
                >
                  {s === "live" && "🔴"} {st.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: 10,
              border: `2px solid ${C.border}`,
              background: C.white,
              color: C.muted,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 16,
              minHeight: 48
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 2,
              padding: "12px",
              borderRadius: 10,
              border: "none",
              background: `linear-gradient(135deg,${C.redDeep},${C.red})`,
              color: C.white,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 16,
              boxShadow: `0 4px 16px ${C.redGlow}`,
              minHeight: 48
            }}
          >
            💾 Save Score
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SPORT MATCH MODAL (Add/Edit) ──────────────────────────────────────────
function SportMatchModal({ sport, match, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(match || {
    round: '',
    pA: '',
    rtA: '',
    pB: '',
    rtB: '',
    date: '',
    time: '',
    venue: VENUES[sport] || '',
    status: 'scheduled'
  });
  const isEdit = !!match?.id;

  const handleSubmit = () => {
    if (!form.round || !form.pA || !form.pB || !form.date) {
      alert('Please fill in Round, Player A, Player B, and Date');
      return;
    }
    onSave(form);
  };

  const inp = { background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 8, color: C.ink, padding: "10px 12px", fontSize: 14, width: "100%", boxSizing: "border-box", minHeight: 44 };
  const lbl = { fontSize: 11, color: C.muted, fontWeight: 600, display: "block", marginBottom: 4 };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(26,5,5,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, backdropFilter: "blur(4px)", padding: 16 }}>
      <div style={{ background: C.white, borderRadius: 16, padding: 24, width: "100%", maxWidth: 480, maxHeight: "95vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: C.ink }}>{isEdit ? "Edit" : "Add"} {SPORT_DISPLAY[sport] || sport}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: C.muted, padding: 4 }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div><label style={lbl}>Round *</label><input style={inp} value={form.round} onChange={e => setForm({ ...form, round: e.target.value })} placeholder="Round 1, Final..." /></div>
          <div><label style={lbl}>Venue</label>
            <select style={inp} value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })}>
              {PROGRAM_VENUES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div><label style={lbl}>Player A *</label><input style={inp} value={form.pA} onChange={e => setForm({ ...form, pA: e.target.value })} placeholder="Player A" /></div>
          <div><label style={lbl}>RT A</label>
            <select style={inp} value={form.rtA} onChange={e => setForm({ ...form, rtA: e.target.value })}>
              <option value="">Select RT</option>
              {RT_OPTIONS.map(rt => <option key={rt} value={rt}>{rt}</option>)}
            </select>
          </div>
          <div><label style={lbl}>Player B *</label><input style={inp} value={form.pB} onChange={e => setForm({ ...form, pB: e.target.value })} placeholder="Player B" /></div>
          <div><label style={lbl}>RT B</label>
            <select style={inp} value={form.rtB} onChange={e => setForm({ ...form, rtB: e.target.value })}>
              <option value="">Select RT</option>
              {RT_OPTIONS.map(rt => <option key={rt} value={rt}>{rt}</option>)}
            </select>
          </div>
          <div><label style={lbl}>Date *</label><input style={inp} type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
          <div><label style={lbl}>Time</label><input style={inp} type="time" value={form.time || ''} onChange={e => setForm({ ...form, time: e.target.value })} /></div>
        </div>

        {isEdit && (
          <div style={{ marginTop: 12 }}>
            <label style={lbl}>Status</label>
            <select style={inp} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="scheduled">Scheduled</option>
              <option value="live">Live</option>
              <option value="finished">Finished</option>
            </select>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: 10, border: `2px solid ${C.border}`, background: C.white, color: C.muted, cursor: "pointer", fontWeight: 600, fontSize: 15, minHeight: 48 }}>Cancel</button>
          <button onClick={handleSubmit} style={{ flex: 2, padding: "12px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.redDeep},${C.red})`, color: C.white, cursor: "pointer", fontWeight: 700, fontSize: 15, boxShadow: `0 4px 16px ${C.redGlow}`, minHeight: 48 }}>
            {isEdit ? "💾 Save" : "➕ Add"}
          </button>
        </div>
        {isEdit && (
          <button onClick={onDelete} style={{ marginTop: 10, width: "100%", padding: "10px", borderRadius: 10, border: "2px solid #FECACA", background: C.redFaint, color: C.red, cursor: "pointer", fontWeight: 600, fontSize: 14, minHeight: 44 }}>
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  );
}

// ─── SPORT MANAGEMENT VIEW ────────────────────────────────────────────────
function SportManagement({ sport, matches, onAdd, onEdit, onDelete, onRefresh, showToast }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);

  const handleSave = async (form) => {
    if (editingMatch) {
      const updated = await onEdit(editingMatch.id, form);
      if (updated) showToast(`${SPORT_DISPLAY[sport] || sport} match updated!`);
    } else {
      const added = await onAdd(form);
      if (added) showToast(`${SPORT_DISPLAY[sport] || sport} match added!`);
    }
    setShowAddModal(false);
    setEditingMatch(null);
    onRefresh();
  };

  const handleDelete = async () => {
    if (editingMatch && window.confirm(`Delete this ${sport} match?`)) {
      const deleted = await onDelete(editingMatch.id);
      if (deleted) showToast(`${sport} match deleted!`);
      setEditingMatch(null);
      setShowAddModal(false);
      onRefresh();
    }
  };

  const icon = sport === 'Chess' ? '♟️' : '🀱';

  const sorted = [...matches].sort((a, b) => (a.date || '').localeCompare(b.date || '') || (a.time || '').localeCompare(b.time || ''));

  return (
    <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontWeight: 800, fontSize: 16, color: C.ink }}>{icon} {SPORT_DISPLAY[sport] || sport}</div>
        <button onClick={() => { setEditingMatch(null); setShowAddModal(true); }} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: `linear-gradient(135deg,${C.redDeep},${C.red})`, color: C.white, cursor: "pointer", fontWeight: 700, fontSize: 14, minHeight: 44 }}>+ Add</button>
      </div>

      {sorted.length === 0 ? (
        <div style={{ textAlign: "center", color: C.faint, padding: 32, fontSize: 14 }}>No {sport} matches yet.</div>
      ) : (
        <div style={{ maxHeight: 400, overflowY: "auto" }}>
          {sorted.map(m => (
            <div key={m.id} style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 140 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.muted }}>{m.round || '—'}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, wordBreak: "break-word" }}>{m.pA}</span>
                <span style={{ color: C.faint }}>vs</span>
      
                <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, wordBreak: "break-word" }}>{m.pB}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.muted, flexWrap: "wrap" }}>
                <span>{m.date || '—'}</span>
                <span>{m.time ? fmtTime(m.time) : '—'}</span>
                <Pill status={m.status} />
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => { setEditingMatch(m); setShowAddModal(true); }} style={{ fontSize: 13, padding: "4px 10px", borderRadius: 6, border: `1.5px solid ${C.border}`, background: C.white, cursor: "pointer", minHeight: 36 }}>✏️</button>
                <button onClick={async () => { if (window.confirm(`Delete this match?`)) { await onDelete(m.id); onRefresh(); showToast(`Match deleted!`); } }} style={{ fontSize: 13, padding: "4px 10px", borderRadius: 6, border: "1.5px solid #FECACA", background: C.redFaint, color: C.red, cursor: "pointer", minHeight: 36 }}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <SportMatchModal
          sport={sport}
          match={editingMatch}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => { setShowAddModal(false); setEditingMatch(null); }}
        />
      )}
    </div>
  );
}

// ─── PROGRAM CARD ───────────────────────────────────────────────────────────
function ProgramCard({ e }) {
  return (
    <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6,flexWrap:"wrap"}}>
        <span style={{fontSize:12,fontWeight:700,color:C.red,textTransform:"uppercase",letterSpacing:1}}>📋 Program</span>
        {e.audience&&e.audience!=="All"&&<span style={{fontSize:12,color:C.muted,background:C.surface,border:`1px solid ${C.border}`,borderRadius:99,padding:"2px 10px"}}>👤 {e.audience}</span>}
      </div>
      <div style={{fontWeight:800,fontSize:16,color:C.ink,marginBottom:4,wordBreak:"break-word"}}>{e.title||<span style={{color:C.faint,fontStyle:"italic"}}>Event title</span>}</div>
      {e.description&&<div style={{fontSize:13,color:C.body,lineHeight:1.5,marginBottom:6,wordBreak:"break-word"}}>{e.description}</div>}
      <div style={{fontSize:13,color:C.muted}}>📍 {e.venue||"TBA"}</div>
    </div>
  );
}

// ─── MATCH CARD ─────────────────────────────────────────────────────────────
function MatchCard({ m, lookupParticipant, onClick, official, view = "schedule" }) {
  let pA, pB;

  // Handle different sport types
  if (m.sport === 'Badminton') {
    pA = typeof m.pA === 'object' ? m.pA : { name: m.pA || 'TBD', isTbd: true };
    pB = typeof m.pB === 'object' ? m.pB : { name: m.pB || 'TBD', isTbd: true };
  } else if (m.sport === 'Table Tennis') {
    if (m.pA && typeof m.pA === 'object' && m.pA.name) {
      pA = m.pA;
    } else {
      pA = { name: m.pA || 'TBD', isTbd: true };
    }
    if (m.pB && typeof m.pB === 'object' && m.pB.name) {
      pB = m.pB;
    } else {
      pB = { name: m.pB || 'TBD', isTbd: true };
    }
  } else {
    pA = lookupParticipant(m.sport, m.pA);
    pB = lookupParticipant(m.sport, m.pB);
  }

  const res = m.result;
  const isResults = view === "results";

  // Permission check
  const canClick = official &&
    (official.role === "admin" ||
     (official.role === "chess_admin" && m.sport === "Chess") ||
     (official.role === "domino_admin" && m.sport === "Domino")) &&
    m.status !== "finished";

  const rtColor = (rt) => {
    const palette = ["#DC2626","#2563EB","#16A34A","#D97706","#7C3AED","#EA580C","#0891B2","#BE185D","#475569","#CA8A04"];
    const n = String(rt || "").replace(/\D/g, "");
    return palette[(parseInt(n, 10) || 0) % palette.length];
  };

  // ─── RT Badge Component ──────────────────────────────────────────────────
  const RtBadge = ({ rt }) => {
    if (!rt) return null;
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          flexShrink: 0,
          fontSize: 11,
          fontWeight: 600,
          color: C.body,
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 99,
          padding: "3px 8px",
          whiteSpace: "nowrap"
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: 99, background: rtColor(rt), display: "inline-block", flexShrink: 0 }} />
        {rt}
      </span>
    );
  };

  // ─── Team Row Component (Results only) ──────────────────────────────────
  const TeamRow = ({ p, rt, side, score }) => {
    const won = res === side;
    const isTbd = !p || p.isTbd;
    const showScore = isResults && score !== undefined && score !== null;
    
    return (
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        width: "100%",
        gap: 8
      }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 6,
          flex: "1 1 auto",
          minWidth: 0
        }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: won ? 800 : 600,
              color: isTbd ? C.faint : won ? C.red : C.ink,
              wordBreak: "break-word",
              overflowWrap: "break-word",
              lineHeight: 1.3,
              flexShrink: 1,
              minWidth: 0
            }}
          >
            {isTbd ? "TBD" : p.name}
          </span>
          <RtBadge rt={rt} />
          {won && <span style={{ fontSize: 14, flexShrink: 0 }}>🏆</span>}
        </div>
        {showScore && (
          <span style={{
            fontSize: 18,
            fontWeight: 800,
            color: C.ink,
            flexShrink: 0,
            minWidth: 32,
            textAlign: "right"
          }}>
            {score}
          </span>
        )}
      </div>
    );
  };

  // ─── Score Component (Schedule only) ──────────────────────────────────────
  const Score = () => {
    if (isResults) return null;
    
    if (m.status === "scheduled") {
      return <div style={{ color: C.red, fontWeight: 700, fontSize: 14, width: 48, textAlign: "center", flexShrink: 0 }}>vs</div>;
    }

    if (m.sport === 'Domino') {
      if (m.scoreA === null || m.scoreB === null) {
        return <div style={{ color: C.red, fontWeight: 700, fontSize: 14, width: 48, textAlign: "center", flexShrink: 0 }}>vs</div>;
      }
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 2, width: 48, justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: m.scoreA > m.scoreB ? C.ink : C.muted }}>{m.scoreA}</span>
          <span style={{ color: C.faint, fontSize: 13 }}>–</span>
          <span style={{ fontSize: 16, fontWeight: 900, color: m.scoreB > m.scoreA ? C.ink : C.muted }}>{m.scoreB}</span>
        </div>
      );
    }

    if (m.sport === 'Chess') {
      if (m.scoreA === null || m.scoreB === null) {
        return <div style={{ color: C.red, fontWeight: 700, fontSize: 14, width: 48, textAlign: "center", flexShrink: 0 }}>vs</div>;
      }
      const label = res === 'A' ? '1–0' : res === 'B' ? '0–1' : '½–½';
      return <div style={{ fontSize: 16, fontWeight: 800, color: C.ink, width: 48, textAlign: "center", flexShrink: 0 }}>{label}</div>;
    }

    if (m.sport === 'Badminton') {
      if (m.scoreA === null || m.scoreB === null) {
        return <div style={{ color: C.red, fontWeight: 700, fontSize: 14, width: 48, textAlign: "center", flexShrink: 0 }}>vs</div>;
      }
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 2, width: 48, justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: m.scoreA > m.scoreB ? C.ink : C.muted }}>{m.scoreA}</span>
          <span style={{ color: C.faint, fontSize: 13 }}>–</span>
          <span style={{ fontSize: 16, fontWeight: 900, color: m.scoreB > m.scoreA ? C.ink : C.muted }}>{m.scoreB}</span>
        </div>
      );
    }

    if (m.sport === 'Table Tennis') {
      if (m.status === 'scheduled' || !m.sets || m.sets.length === 0) {
        return <div style={{ color: C.red, fontWeight: 700, fontSize: 14, width: 48, textAlign: "center", flexShrink: 0 }}>vs</div>;
      }
      let setsWonA = 0, setsWonB = 0;
      m.sets.forEach(s => {
        if (s.sA > s.sB) setsWonA++;
        else if (s.sB > s.sA) setsWonB++;
      });
      if (setsWonA === 0 && setsWonB === 0) {
        return <div style={{ color: C.red, fontWeight: 700, fontSize: 14, width: 48, textAlign: "center", flexShrink: 0 }}>vs</div>;
      }
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 48, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 16, fontWeight: 900, color: setsWonA > setsWonB ? C.ink : C.muted }}>{setsWonA}</span>
            <span style={{ color: C.faint, fontSize: 13 }}>–</span>
            <span style={{ fontSize: 16, fontWeight: 900, color: setsWonB > setsWonA ? C.ink : C.muted }}>{setsWonB}</span>
          </div>
          {m.winnerName && (
            <div style={{ fontSize: 8, color: C.greenText, fontWeight: 600, marginTop: 1 }}>
              🏆 {m.winnerName}
            </div>
          )}
        </div>
      );
    }

    return <div style={{ color: C.red, fontWeight: 700, fontSize: 14, width: 48, textAlign: "center", flexShrink: 0 }}>vs</div>;
  };

  // ─── Badges ──────────────────────────────────────────────────────────────
  const tournamentBadge = m.sport === 'Badminton' && m.tournamentName ? (
    <span style={{ fontSize: 10, fontWeight: 700, color: C.red, background: C.redFaint, border: `1px solid #FECACA`, borderRadius: 99, padding: "1px 10px" }}>
      {m.tournamentName}
    </span>
  ) : null;

  const categoryBadge = m.sport === 'Table Tennis' && m.category ? (
    <span style={{ fontSize: 10, fontWeight: 700, color: C.bluText, background: C.bluBg, border: `1px solid ${C.bluBorder}`, borderRadius: 99, padding: "1px 10px" }}>
      {m.category}
    </span>
  ) : null;

  // ─── Return ──────────────────────────────────────────────────────────────
  return (
    <div
      onClick={canClick ? onClick : undefined}
      style={{
        background: C.white,
        border: `1.5px solid ${m.status === "live" ? "#FECACA" : m.status === "finished" ? C.greenBorder : C.border}`,
        borderRadius: 10,
        padding: "12px 14px",
        marginBottom: 8,
        boxShadow: m.status === "live" ? `0 0 0 3px ${C.redFaint},0 2px 8px rgba(139,0,0,0.08)` : "0 1px 3px rgba(0,0,0,0.06)",
        cursor: canClick ? "pointer" : "default",
        position: "relative"
      }}
    >
      {canClick && (
        <span style={{ position: "absolute", top: 6, right: 10, fontSize: 9, color: C.faint, fontWeight: 600, letterSpacing: 0.5, background: C.surface, padding: "1px 8px", borderRadius: 99 }}>
          tap to score
        </span>
      )}

      {/* ─── BADGES ROW ───────────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <SportBadge sport={m.sport} />
        {categoryBadge}
        {tournamentBadge}
        {m.round && (
          <span style={{ fontSize: 11, color: C.muted, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 99, padding: "1px 8px" }}>
            {m.round}
          </span>
        )}
      </div>

      {/* ─── BODY ──────────────────────────────────────────────────────────── */}
      {isResults ? (
        // ─── RESULTS LAYOUT ────────────────────────────────────────────────
        <>
          <TeamRow p={pA} rt={m.rtA} side="A" score={m.scoreA} />
          <div style={{ borderTop: `1px solid ${C.border}`, margin: "6px 0" }} />
          <TeamRow p={pB} rt={m.rtB} side="B" score={m.scoreB} />
        </>
      ) : (
        // ─── SCHEDULE LAYOUT - HORIZONTAL ─────────────────────────────────
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 6, 
          marginTop: 0,
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {/* Player A */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "1 1 auto", minWidth: 0, justifyContent: "flex-end" }}>
            <span
              style={{
                fontSize: 15,
                fontWeight: res === 'A' ? 800 : 600,
                color: !pA || pA.isTbd ? C.faint : res === 'A' ? C.red : C.ink,
                wordBreak: "break-word",
                overflowWrap: "break-word",
                lineHeight: 1.3,
                flexShrink: 1,
                minWidth: 0,
                textAlign: "right"
              }}
            >
              {!pA || pA.isTbd ? "TBD" : pA.name}
            </span>
            <RtBadge rt={m.rtA} />
            {res === 'A' && <span style={{ fontSize: 14, flexShrink: 0 }}>🏆</span>}
          </div>

          <Score />

          {/* Player B */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "1 1 auto", minWidth: 0, justifyContent: "flex-start" }}>
            {res === 'B' && <span style={{ fontSize: 14, flexShrink: 0 }}>🏆</span>}
            <RtBadge rt={m.rtB} />
            <span
              style={{
                fontSize: 15,
                fontWeight: res === 'B' ? 800 : 600,
                color: !pB || pB.isTbd ? C.faint : res === 'B' ? C.red : C.ink,
                wordBreak: "break-word",
                overflowWrap: "break-word",
                lineHeight: 1.3,
                flexShrink: 1,
                minWidth: 0,
                textAlign: "left"
              }}
            >
              {!pB || pB.isTbd ? "TBD" : pB.name}
            </span>
          </div>
        </div>
      )}

      {/* ─── DIVIDER LINE ────────────────────────────────────────────────── */}
      <div style={{ 
        borderTop: `1px solid ${C.border}`, 
        margin: "10px 0 8px 0",
        width: "100%"
      }} />

      {/* ─── DATE/TIME/VENUE ─────────────────────────────────────────────── */}
      <div style={{ 
        fontSize: 12, 
        color: C.muted, 
        display: "flex", 
        flexDirection: "column",
        gap: 2
      }}>
        <div style={{ display: "flex", gap: 12 }}>
          <span>📅 {m.date ? fmtDateWithYear(m.date) : "—"}</span>
          <span>🕐 {m.time ? fmtTime(m.time) : "—"}</span>
        </div>
        <div>📍 {m.venue || "—"}</div>
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [officialAccounts] = useState(ACCOUNTS);
  const [clubs] = useState(CLUBS_INIT);
  const [players] = useState(PLAYERS_INIT);
  const [pairs] = useState(PAIRS_INIT);
  const [programEvents, setProgramEvents] = useState(() => {
    try {
      const saved = localStorage.getItem("hutribjp_program");
      return saved ? JSON.parse(saved) : seedProgram();
    } catch { return seedProgram(); }
  });
  const [badmintonMatches, setBadmintonMatches] = useState([]);
  const [ttMatches, setTtMatches] = useState([]);
  const [chessMatches, setChessMatches] = useState([]);
  const [dominoMatches, setDominoMatches] = useState([]);
  const [scoreModal, setScoreModal] = useState(null);

  useEffect(() => {
    try { localStorage.setItem("hutribjp_program", JSON.stringify(programEvents)); } catch {}
  }, [programEvents]);

  const [view, setView] = useState("schedule");
  const [showAllResults, setShowAllResults] = useState(false);
  const [officialTab, setOfficialTab] = useState("program");
  const [filterSport, setFilterSport] = useState("All");
  const [filterKind, setFilterKind] = useState("All");
  const [editProgItem, setEditProgItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [npForm, setNpForm] = useState({title:"",date:"",time:"09:00",venue:"",description:"",audience:"All"});
  const [toast, setToast] = useState(null);
  const [official, setOfficial] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const progIdRef = useRef(10);
  const logoClickCount = useRef(0);
  const logoClickTimer = useRef(null);

  // ─── TRIPLE CLICK LOGIN ──────────────────────────────────────────────────
  const handleLogoClick = () => {
    logoClickCount.current += 1;
    clearTimeout(logoClickTimer.current);
    logoClickTimer.current = setTimeout(() => {
      logoClickCount.current = 0;
    }, 500);
    if (logoClickCount.current >= 3) {
      logoClickCount.current = 0;
      clearTimeout(logoClickTimer.current);
      setShowLogin(true);
    }
  };

  // ─── LOAD BADMINTON DATA ──────────────────────────────────────────────────
  useEffect(() => {
    async function loadBadminton() {
      const data = await fetchBadmintonMatches();
      setBadmintonMatches(data);
      console.log('Badminton matches loaded:', data.length);
    }
    loadBadminton();
  }, []);

  // ─── LOAD TABLE TENNIS DATA ────────────────────────────────────────────────
  useEffect(() => {
    async function loadTableTennis() {
      const data = await fetchTableTennisMatches();
      setTtMatches(data);
      console.log('Table Tennis matches loaded:', data.length);
    }
    loadTableTennis();
  }, []);

  // ─── LOAD CHESS & DOMINO DATA ─────────────────────────────────────────────
  const loadChess = async () => {
    const data = await fetchSportMatches(CHESS_TABLE, 'Chess');
    setChessMatches(data);
    console.log('Chess matches loaded:', data.length);
  };

  const loadDomino = async () => {
    const data = await fetchSportMatches(DOMINO_TABLE, 'Domino');
    setDominoMatches(data);
    console.log('Domino matches loaded:', data.length);
  };

  useEffect(() => {
    loadChess();
    loadDomino();
  }, []);

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const lookupParticipant = (sport, idOrObj) => {
    if(idOrObj && typeof idOrObj === "object" && !idOrObj.isTbd) return idOrObj;
    if(typeof idOrObj === "string" && idOrObj && idOrObj !== "TBD")
      return { name: idOrObj, flag: null, club: "" };
    const id = typeof idOrObj === "object" ? idOrObj?.id : idOrObj;
    const meta = SPORT_META[sport];
    if(meta?.matchType==="doubles") return pairs.find(p=>p.id===id);
    return players.find(p=>p.id===id);
  };

  // ── Derive all matches ──────────────────────────────────────────────────
  const allMatches = () => {
    const out = [];
    badmintonMatches.forEach(m => out.push({ ...m, kind: 'match' }));
    ttMatches.forEach(m => out.push({ ...m, kind: 'match' }));
    chessMatches.forEach(m => out.push({ ...m, kind: 'match' }));
    dominoMatches.forEach(m => out.push({ ...m, kind: 'match' }));
    return out;
  };

  // ── Live ticker ────────────────────────────────────────────────────────────
  const liveNow = allMatches().filter(m=>m.status==="live");

  // ── Schedule matches ──────────────────────────────────────────────────────
  const scheduleMatches = allMatches().filter(m=>m.date&&m.status!=="finished");

  // ── Results ──────────────────────────────────────────────────────────────
  const resultMatches = allMatches().filter(m=>m.status==="finished");

  // ── Combined schedule items ──────────────────────────────────────────────
  const allScheduleItems = [
    ...scheduleMatches.map(m=>({...m, _date:m.date, _time:m.time||""})),
    ...programEvents.map(e=>({...e,  _date:e.date,  _time:e.time||""})),
  ].filter(item=>{
    if(filterKind==="match"  &&item.kind!=="match")   return false;
    if(filterKind==="program"&&item.kind!=="program") return false;
    if(item.kind==="match" && filterSport!=="All" && item.sport!==filterSport) return false;
    
    if(searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      if(item.kind==="match") {
        const pA = typeof item.pA === 'object' ? item.pA.name || '' : item.pA || '';
        const pB = typeof item.pB === 'object' ? item.pB.name || '' : item.pB || '';
        if(!pA.toLowerCase().includes(q) && !pB.toLowerCase().includes(q)) {
          return false;
        }
      } else {
        if(!(item.title || '').toLowerCase().includes(q) && 
           !(item.description || '').toLowerCase().includes(q)) {
          return false;
        }
      }
    }
    
    return true;
  }).sort((a,b)=>a._date.localeCompare(b._date)||a._time.localeCompare(b._time));

  const grouped = allScheduleItems.reduce((acc,item)=>{
    if(!acc[item._date]) acc[item._date]=[];
    acc[item._date].push(item); return acc;
  },{});

  // ── Program event helpers ─────────────────────────────────────────────────
  const handleAddProgram = () => {
    if(!npForm.title.trim()){showToast("Enter a title","error");return;}
    if(!npForm.date){showToast("Set a date","error");return;}
    const id=`p${progIdRef.current++}`;
    setProgramEvents(p=>[...p,{id,kind:"program",...npForm,title:npForm.title.trim()}]);
    setNpForm({title:"",date:"",time:"09:00",venue:"",description:"",audience:"All"});
    showToast("Program event added!");
  };

  const handleSaveProgram = (form) => {
    setProgramEvents(p=>p.map(e=>e.id===form.id?{...e,...form}:e));
    setEditProgItem(null); showToast("Event updated!");
  };

  // ── Sport management handlers ─────────────────────────────────────────────
  const handleChessAdd = async (form) => {
    const result = await addSportMatch(CHESS_TABLE, form);
    if (result) await loadChess();
    return result;
  };

  const handleChessEdit = async (id, form) => {
    const result = await saveSportMatch(CHESS_TABLE, { ...form, id });
    if (result) await loadChess();
    return result;
  };

  const handleChessDelete = async (id) => {
    const result = await deleteSportMatch(CHESS_TABLE, id);
    if (result) await loadChess();
    return result;
  };

  const handleDominoAdd = async (form) => {
    const result = await addSportMatch(DOMINO_TABLE, form);
    if (result) await loadDomino();
    return result;
  };

  const handleDominoEdit = async (id, form) => {
    const result = await saveSportMatch(DOMINO_TABLE, { ...form, id });
    if (result) await loadDomino();
    return result;
  };

  const handleDominoDelete = async (id) => {
    const result = await deleteSportMatch(DOMINO_TABLE, id);
    if (result) await loadDomino();
    return result;
  };

  // ─── Score modal handlers ────────────────────────────────────────────────
  const handleScoreSave = async (updatedMatch) => {
    if (updatedMatch.sport === 'Chess') {
      await saveSportMatch(CHESS_TABLE, updatedMatch);
      await loadChess();
    } else if (updatedMatch.sport === 'Domino') {
      await saveSportMatch(DOMINO_TABLE, updatedMatch);
      await loadDomino();
    }
    setScoreModal(null);
    showToast(`${updatedMatch.sport} score saved!`);
  };

  const handleMatchClick = (match) => {
  // Only allow if user is logged in
  if (!official) {
    showToast("Please login first", "error");
    return;
  }

  // Check if user has permission for this sport
  const hasPermission = 
    official.role === "admin" ||
    (official.role === "chess_admin" && match.sport === "Chess") ||
    (official.role === "domino_admin" && match.sport === "Domino");

  if (!hasPermission) {
    showToast("You don't have permission to score this sport", "error");
    return;
  }

  if ((match.sport === "Chess" || match.sport === "Domino") && match.status !== "finished") {
    setScoreModal(match);
  }
};
  // ── style atoms ───────────────────────────────────────────────────────────
  const inp={background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:8,color:C.ink,padding:"9px 12px",fontSize:13,width:"100%",boxSizing:"border-box"};
  const ghostBtn=(active)=>({padding:"6px 13px",borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:12,border:`1.5px solid ${active?C.red:C.border}`,background:active?C.redFaint:C.white,color:active?C.red:C.body});
  const tabBtn=(active)=>({padding:"9px 16px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13,border:`1.5px solid ${active?C.red:C.border}`,background:active?C.redFaint:C.white,color:active?C.red:C.body});
  const navBtn=(active)=>({padding:"11px 16px",border:"none",cursor:"pointer",fontSize:13,fontWeight:600,borderRadius:"8px 8px 0 0",whiteSpace:"nowrap",background:active?C.white:"transparent",color:active?C.red:C.muted,borderBottom:active?`3px solid ${C.red}`:"3px solid transparent"});

  const ScheduleList = () => {
    const dates = Object.keys(grouped).sort();
    if(dates.length===0) return (
      <div style={{textAlign:"center",color:C.faint,padding:64,fontSize:14}}>
        <div style={{fontSize:40,marginBottom:12}}>📭</div>
        <div style={{fontWeight:700,color:C.muted,marginBottom:6}}>Nothing scheduled yet</div>
        <div style={{fontSize:12}}>Add matches or program events to the schedule.</div>
      </div>
    );
    return dates.map(date=>(
      <div key={date} style={{marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{fontWeight:800,fontSize:14,color:C.red}}>{fmtDate(date)}</div>
          <div style={{flex:1,height:1,background:C.border}}/>
          <div style={{fontSize:11,color:C.muted,background:C.surface,border:`1px solid ${C.border}`,borderRadius:99,padding:"2px 10px"}}>{grouped[date].length} event{grouped[date].length!==1?"s":""}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {grouped[date].map((item,idx)=>(
            <div key={idx} style={{display:"flex"}}>
              <div style={{width:40,paddingTop:16,paddingRight:6,textAlign:"right",flexShrink:0}}>
                <span style={{fontSize:12,fontWeight:700,color:C.muted}}>{item._time ? fmtTime(item._time) : "—"}</span>
              </div>
              <div style={{flex:1}}>
                {item.kind==="match"
  ? <MatchCard m={item} lookupParticipant={lookupParticipant} onClick={() => handleMatchClick(item)} official={official} view="schedule" />
  : <ProgramCard e={item}/>
}
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div style={{fontFamily:"'Inter','Helvetica Neue',sans-serif",minHeight:"100vh",background:C.bg,color:C.ink}}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}} *{box-sizing:border-box}`}</style>

      {showLogin&&<LoginModal accounts={officialAccounts} onLogin={u=>{setOfficial(u);setShowLogin(false);setView("schedule");showToast(`Welcome, ${u.role}!`);}} onCancel={()=>setShowLogin(false)}/>}

      {editProgItem&&(
        <EditModal
          item={editProgItem}
          clubs={clubs}
          players={players}
          pairs={pairs}
          onSave={handleSaveProgram}
          onClose={()=>setEditProgItem(null)}
        />
      )}

      {scoreModal&&(
        <ScoreModal
          match={scoreModal}
          onSave={handleScoreSave}
          onClose={()=>setScoreModal(null)}
        />
      )}

      {toast&&(
        <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",zIndex:999,background:toast.type==="error"?C.red:C.ink,color:C.white,padding:"12px 24px",borderRadius:10,fontSize:14,fontWeight:700,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",maxWidth:"90vw",textAlign:"center"}}>
          {toast.msg}
        </div>
      )}

      {/* ─── HEADER ──────────────────────────────────────────────────────── */}
      <header style={{background:C.white,borderBottom:`1.5px solid ${C.border}`,padding:"12px 20px",position:"sticky",top:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <img 
            src={LOGO_URL} 
            alt="BJP" 
            style={{height:40,width:"auto",display:"block",cursor:"pointer"}} 
            onClick={handleLogoClick}
            title="Triple-click to login"
          />
          <div>
            <div style={{fontWeight:900,fontSize:16,color:C.ink,lineHeight:1.2}}>
              HUT RI <span style={{color:C.red}}>BJP</span> 2026
            </div>
            <div style={{fontSize:9,color:C.muted,letterSpacing:0.8}}>INDONESIA BERDAULAT ADIL DAN MAKMUR</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          {official ? (
            <span style={{display:"inline-flex",alignItems:"center",gap:6,background:C.redFaint,border:`1px solid #FECACA`,borderRadius:99,padding:"4px 14px 4px 10px",fontSize:13,fontWeight:700,color:C.red}}>
              {official.badge} {official.label}
              <button onClick={()=>{setOfficial(null);showToast("Logged out");}} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,color:C.muted,padding:"0 2px"}}>✕</button>
            </span>
          ) : null}
        </div>
      </header>

      {/* ─── LIVE TICKER ────────────────────────────────────────────────── */}
      {liveNow.length>0&&(
        <div style={{background:C.redFaint,borderBottom:`1px solid #FECACA`,padding:"8px 16px",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:4,color:C.red,fontWeight:800,fontSize:12,textTransform:"uppercase",letterSpacing:1}}>
            <span style={{width:8,height:8,borderRadius:99,background:C.red,display:"inline-block",animation:"pulse 1s infinite"}}/> LIVE
          </span>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",fontSize:13,fontWeight:600,color:C.ink}}>
            {liveNow.map((m,i)=><span key={i}>{m.pA} vs {m.pB} <span style={{color:C.muted,fontWeight:400}}>· {m.sport}</span></span>)}
          </div>
        </div>
      )}

      {/* ─── MAIN CONTENT ────────────────────────────────────────────────── */}
      <div style={{maxWidth:960,margin:"0 auto",padding:"16px 20px 100px"}}>

        {/* ─── VIEW TABS ────────────────────────────────────────────────── */}
        <div style={{display:"flex",gap:0,borderBottom:`1.5px solid ${C.border}`,marginBottom:20,overflowX:"auto"}}>
          {["schedule","results","admin"].map(tab=>{
            // Only show admin tab if user is logged in
            if(tab==="admin" && !official) return null;
            return (
              <button key={tab} onClick={()=>{
                if(tab==="admin" && !official) {
                  setShowLogin(true);
                  return;
                }
                setView(tab);
              }} style={{
                ...navBtn(view===tab),
                padding:"12px 20px",
                fontSize:14,
                textTransform:"capitalize",
                minHeight:44,
                fontWeight:view===tab?800:600,
              }}>
                {tab==="schedule"?"📋 Jadwal":tab==="results"?"🏆 Hasil Pertandingan":"⚙️ Admin"}
              </button>
            );
          })}
        </div>

        {view==="schedule"&&(
          <>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {["All", ...SPORTS].map(s=>(
                  <button
                    key={s}
                    onClick={()=>setFilterSport(s)}
                    style={{
                      padding:"3px 8px",
                      borderRadius:99,
                      border:`1.5px solid ${filterSport===s?C.red:C.border}`,
                      background:filterSport===s?C.redFaint:C.white,
                      color:filterSport===s?C.red:C.body,
                      fontWeight:filterSport===s?700:500,
                      fontSize:10,
                      cursor:"pointer",
                      minHeight:26,
                      transition:"all 0.15s",
                      display:"inline-flex",
                      alignItems:"center",
                      gap:3
                    }}
                  >
                    {s==="All" ? "✔️" : `${SPORT_META[s]?.emoji || ''} ${SPORT_DISPLAY[s]||s}`}
                  </button>
                ))}
              </div>
              
              <div style={{display:"flex",flexWrap:"wrap",gap:4,alignItems:"center"}}>
                {["All", "match", "program"].map(k=>(
                  <button
                    key={k}
                    onClick={()=>setFilterKind(k)}
                    style={{
                      padding:"3px 8px",
                      borderRadius:99,
                      border:`1.5px solid ${filterKind===k?C.red:C.border}`,
                      background:filterKind===k?C.redFaint:C.white,
                      color:filterKind===k?C.red:C.body,
                      fontWeight:filterKind===k?700:500,
                      fontSize:10,
                      cursor:"pointer",
                      minHeight:26,
                      transition:"all 0.15s"
                    }}
                  >
                    {k==="All" ? "✔️" : k==="match" ? "🏟️ Pertandingan" : "📅 Acara"}
                  </button>
                ))}
                
                <span style={{fontSize:10,color:C.muted,marginLeft:4}}>|</span>
                
                <input
                  type="text"
                  placeholder="🔍 Cari nama..."
                  value={searchQuery}
                  onChange={e=>setSearchQuery(e.target.value)}
                  style={{
                    ...inp,
                    width:"auto",
                    minWidth:120,
                    padding:"3px 8px",
                    fontSize:10,
                    minHeight:26,
                    flex:1,
                    maxWidth:160
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={()=>setSearchQuery("")}
                    style={{
                      padding:"3px 6px",
                      borderRadius:99,
                      border:`1.5px solid ${C.border}`,
                      background:C.surface,
                      color:C.muted,
                      fontSize:10,
                      cursor:"pointer",
                      minHeight:26,
                      fontWeight:600,
                      display:"inline-flex",
                      alignItems:"center"
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            <ScheduleList/>
          </>
        )}

        {view==="results"&&(
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginBottom:16}}>
              <div>
                <h2 style={{fontSize:20,fontWeight:800,color:C.ink,margin:0}}>🏆 Hasil Pertandingan</h2>
              </div>
              <button onClick={()=>setShowAllResults(!showAllResults)} style={{...ghostBtn(showAllResults),fontSize:12,minHeight:36,padding:"6px 14px"}}>
                {showAllResults?"Tampilkan Hasil Minggu Ini":"Tampilkan Semua Tanggal"}
              </button>
            </div>

            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>
              {["All", ...SPORTS].map(s=>(
                <button
                  key={s}
                  onClick={()=>setFilterSport(s)}
                  style={{
                    padding:"3px 8px",
                    borderRadius:99,
                    border:`1.5px solid ${filterSport===s?C.red:C.border}`,
                    background:filterSport===s?C.redFaint:C.white,
                    color:filterSport===s?C.red:C.body,
                    fontWeight:filterSport===s?700:500,
                    fontSize:10,
                    cursor:"pointer",
                    minHeight:26,
                    transition:"all 0.15s",
                    display:"inline-flex",
                    alignItems:"center",
                    gap:3
                  }}
                >
                  {s==="All" ? "✔️" : `${SPORT_META[s]?.emoji || ''} ${SPORT_DISPLAY[s]||s}`}
                </button>
              ))}
            </div>

            {resultMatches
              .filter(m=>filterSport==="All"||m.sport===filterSport)
              .filter(m=>{
                if(showAllResults) return true;
                // Filter to Friday-Sunday of the current week (past or present)
                const today=new Date();
                const day=today.getDay(); // 0=Sunday, 1=Monday, ...
                
                // Find the most recent Friday (or today if it's Friday)
                let friday=new Date(today);
                if (day === 5) {
                  friday.setHours(0,0,0,0);
                } else if (day < 5) {
                  friday.setDate(today.getDate() - (day + 2));
                  friday.setHours(0,0,0,0);
                } else {
                  friday.setDate(today.getDate() - (day - 5));
                  friday.setHours(0,0,0,0);
                }
                
                const sunday=new Date(friday);
                sunday.setDate(friday.getDate()+2);
                sunday.setHours(23,59,59,999);
                const matchDate=new Date(m.date+"T00:00:00");
                return matchDate>=friday&&matchDate<=sunday;
              })
              .map((m,i)=>(
                <MatchCard key={i} m={m} lookupParticipant={lookupParticipant} official={official} view="results" />
              ))
            }
            {resultMatches.filter(m=>filterSport==="All"||m.sport===filterSport).filter(m=>{
              if(showAllResults) return true;
              const today=new Date();
              const day=today.getDay();
              
              let friday=new Date(today);
              if (day === 5) {
                friday.setHours(0,0,0,0);
              } else if (day < 5) {
                friday.setDate(today.getDate() - (day + 2));
                friday.setHours(0,0,0,0);
              } else {
                friday.setDate(today.getDate() - (day - 5));
                friday.setHours(0,0,0,0);
              }
              
              const sunday=new Date(friday);
              sunday.setDate(friday.getDate()+2);
              sunday.setHours(23,59,59,999);
              const matchDate=new Date(m.date+"T00:00:00");
              return matchDate>=friday&&matchDate<=sunday;
            }).length===0 && (
              <div style={{textAlign:"center",color:C.faint,padding:40,fontSize:14}}>
                <div style={{fontSize:32,marginBottom:10}}>📊</div>
                <div style={{fontWeight:700,color:C.muted}}>No results for this period</div>
                <div style={{fontSize:12}}>Try adjusting filters or viewing all results.</div>
              </div>
            )}
          </>
        )}

        {view==="admin"&&official&&(
          <div style={{marginTop:12}}>
            <div style={{display:"flex",gap:6,borderBottom:`1.5px solid ${C.border}`,marginBottom:16,flexWrap:"wrap"}}>
              {official.role==="admin"&&(
                <>
                  <button onClick={()=>setOfficialTab("program")} style={{...tabBtn(officialTab==="program"),minHeight:44}}>📋 Program</button>
                  <button onClick={()=>setOfficialTab("chess")} style={{...tabBtn(officialTab==="chess"),minHeight:44}}>♟️ Catur</button>
                  <button onClick={()=>setOfficialTab("domino")} style={{...tabBtn(officialTab==="domino"),minHeight:44}}>🀱 Gaple</button>
                </>
              )}
              {official.role==="event_admin"&&(
                <button onClick={()=>setOfficialTab("program")} style={{...tabBtn(officialTab==="program"),minHeight:44}}>📋 Program</button>
              )}
              {official.role==="chess_admin"&&(
                <button onClick={()=>setOfficialTab("chess")} style={{...tabBtn(officialTab==="chess"),minHeight:44}}>♟️ Catur</button>
              )}
              {official.role==="domino_admin"&&(
                <button onClick={()=>setOfficialTab("domino")} style={{...tabBtn(officialTab==="domino"),minHeight:44}}>🀱 Gaple</button>
              )}
            </div>

            {officialTab==="program"&&(
              <div>
                <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                  <div style={{fontWeight:800,fontSize:16,color:C.ink,marginBottom:12}}>📋 Program Events</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <div><input style={inp} value={npForm.title} onChange={e=>setNpForm({...npForm,title:e.target.value})} placeholder="Event title"/></div>
                    <div><input style={inp} type="date" value={npForm.date} onChange={e=>setNpForm({...npForm,date:e.target.value})}/></div>
                    <div><input style={inp} type="time" value={npForm.time} onChange={e=>setNpForm({...npForm,time:e.target.value})}/></div>
                    <div>
                      <select style={inp} value={npForm.venue} onChange={e=>setNpForm({...npForm,venue:e.target.value})}>
                        <option value="">Venue</option>
                        {PROGRAM_VENUES.map(v=><option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div style={{gridColumn:"1/-1"}}><input style={inp} value={npForm.description} onChange={e=>setNpForm({...npForm,description:e.target.value})} placeholder="Description"/></div>
                    <button onClick={handleAddProgram} style={{gridColumn:"1/-1",padding:"10px",borderRadius:9,border:"none",background:`linear-gradient(135deg,${C.redDeep},${C.red})`,color:C.white,cursor:"pointer",fontWeight:700,fontSize:14,minHeight:44}}>➕ Add Program</button>
                  </div>
                </div>

                {programEvents.length===0 ? (
                  <div style={{textAlign:"center",color:C.faint,padding:32,fontSize:14}}>No program events.</div>
                ) : (
                  <div style={{marginTop:12}}>
                    {[...programEvents].sort((a,b)=>(a.date||"").localeCompare(b.date||"")||(a.time||"").localeCompare(b.time||"")).map(e=>(
                      <div key={e.id} style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:10,padding:12,marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:120}}>
                          <span style={{fontWeight:700,fontSize:14,color:C.ink,wordBreak:"break-word"}}>{e.title}</span>
                          <span style={{fontSize:12,color:C.muted}}>{e.date?fmtDate(e.date):""}</span>
                          <span style={{fontSize:12,color:C.muted}}>{e.time?fmtTime(e.time):""}</span>
                        </div>
                        <div style={{display:"flex",gap:4}}>
                          <button onClick={()=>setEditProgItem(e)} style={{fontSize:13,padding:"4px 10px",borderRadius:6,border:`1.5px solid ${C.border}`,background:C.white,cursor:"pointer",minHeight:36}}>✏️</button>
                          <button onClick={()=>{if(window.confirm("Delete?")){setProgramEvents(p=>p.filter(x=>x.id!==e.id));showToast("Event deleted!");}}} style={{fontSize:13,padding:"4px 10px",borderRadius:6,border:"1.5px solid #FECACA",background:C.redFaint,color:C.red,cursor:"pointer",minHeight:36}}>🗑</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {(officialTab==="chess" && (official.role==="admin"||official.role==="chess_admin"))&&(
              <SportManagement
                sport="Chess"
                matches={chessMatches}
                onAdd={handleChessAdd}
                onEdit={handleChessEdit}
                onDelete={handleChessDelete}
                onRefresh={loadChess}
                showToast={showToast}
              />
            )}

            {(officialTab==="domino" && (official.role==="admin"||official.role==="domino_admin"))&&(
              <SportManagement
                sport="Domino"
                matches={dominoMatches}
                onAdd={handleDominoAdd}
                onEdit={handleDominoEdit}
                onDelete={handleDominoDelete}
                onRefresh={loadDomino}
                showToast={showToast}
              />
            )}
          </div>
        )}

        {view==="admin"&&!official&&(
          <div style={{textAlign:"center",color:C.muted,padding:64,fontSize:14}}>
            <div style={{fontSize:48,marginBottom:12}}>🔐</div>
            <div style={{fontWeight:700,fontSize:16,color:C.ink}}>Admin access restricted</div>
            <div style={{marginTop:6}}>Triple-click the logo to login.</div>
          </div>
        )}

      </div>
    </div>
  );
}
