import { useState, useRef, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const LOGO_URL = "/logo.png";

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

// ─── TABLE TENNIS TABLES ──────────────────────────────────────────────────
const TT_SINGLES_TABLE = "tt_singles_matches";
const TT_DOUBLES_TABLE = "tt_doubles_matches";

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
  bg:"#F8F0F0", surface:"#FDF5F5", card:"#FFFFFF", border:"#EDD5D5", borderMid:"#DDB8B8",
  red:"#DC1C1C", redLight:"#FF4444", redDeep:"#8B0000", redFaint:"#FFF0F0", redGlow:"rgba(220,28,28,0.12)",
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
const countSets = (sets, sport) => {
  if (!sets?.length) return [0,0];
  let wA=0, wB=0;
  sets.forEach(s=>{ if(s.sA>s.sB) wA++; else if(s.sB>s.sA) wB++; });
  return [wA,wB];
};

const fmtDate = d => { 
  try { 
    return new Date(d+"T00:00:00").toLocaleDateString("id-ID",{weekday:"short",day:"numeric",month:"short"}); 
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
            tournamentName = tm.tournaments.name || '';
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
async function fetchTableTennisMatches() {
  try {
    const { data: singlesData, error: singlesError } = await sportsSupabase
      .from('tt_singles_view')
      .select('*');

    if (singlesError) {
      console.error('TT Singles view error:', singlesError);
    }

    const { data: doublesData, error: doublesError } = await sportsSupabase
      .from('tt_doubles_view')
      .select('*');

    if (doublesError) {
      console.error('TT Doubles view error:', doublesError);
    }

    const singles = (singlesData || []).map(m => ({ ...m, category: 'Singles' }));
    const doubles = (doublesData || []).map(m => ({ ...m, category: 'Doubles' }));
    const allData = [...singles, ...doubles];

    if (!allData || allData.length === 0) {
      return [];
    }

    console.log('TT matches loaded:', allData.length);

    return allData.map(match => ({
      id: match.match_id,
      sport: 'Table Tennis',
      category: match.category,
      tournamentName: 'Turnamen Tenis Meja - HUT RI 2026 Bintara Jaya Permai',
      round: match.round || '',
      pA: match.player_a || 'TBD',
      pB: match.player_b || 'TBD',
      date: match.scheduled_date || '',
      time: match.scheduled_time || '',
      venue: match.venue || VENUES["Table Tennis"],
      scoreA: match.score_a || 0,
      scoreB: match.score_b || 0,
      result: match.winner ? 'A' : null,
      winnerName: match.winner || null,
      sets: match.sets || [],
      status: match.status || 'scheduled',
      kind: 'match',
      _raw: match
    }));
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

      const venue = match.venue || VENUES[sportName] || '';

      return {
        id: match.id,
        sport: sportName,
        round: match.round || '',
        pA: match.pA || 'TBD',
        rtA: match.rtA || '',
        pB: match.pB || 'TBD',
        rtB: match.rtB || '',
        date: match.date || '',
        time: match.time || '',
        venue: venue,
        scoreA: match.scoreA ?? null,
        scoreB: match.scoreB ?? null,
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
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:700,background:s.bg,color:s.text,border:`1px solid ${s.border}`}}>
    {status==="live"&&<span style={{width:6,height:6,borderRadius:99,background:C.red,display:"inline-block",animation:"pulse 1s infinite"}}/>}
    {s.label}
  </span>;
};

const SportBadge = ({sport}) => {
  const meta=SPORT_META[sport]??{emoji:"🏅"};
  const typeColors={singles:["#F5F3FF","#6D28D9"],doubles:["#FFF7ED","#C2410C"]};
  const [bg,color]=typeColors[meta.matchType]??["#F9FAFB","#374151"];
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:700,background:bg,color:color,border:`1px solid ${color}33`}}>{meta.emoji} {sport}</span>;
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
function MatchCard({ m, lookupParticipant, onClick, official }) {
  const meta = SPORT_META[m.sport] ?? { emoji: "🏅", scoringType: "points" };

  let pA, pB;
 if (m.sport === 'Badminton') {
  pA = typeof m.pA === 'object' ? m.pA : { name: m.pA || 'TBD', isTbd: true };
  pB = typeof m.pB === 'object' ? m.pB : { name: m.pB || 'TBD', isTbd: true };
} else if (m.sport === 'Table Tennis') {
  // Table Tennis: pA and pB are already strings from the view
  pA = { name: m.pA || 'TBD', isTbd: true };
  pB = { name: m.pB || 'TBD', isTbd: true };
}  
  else {
    pA = lookupParticipant(m.sport, m.pA);
    pB = lookupParticipant(m.sport, m.pB);
  }

  const res = m.result;
  const [setsA, setsB] = countSets(m.sets, m.sport);

  // Only allow clicking if user is logged in and has permission
  const canClick = official && 
    (official.role === "admin" ||
     (official.role === "chess_admin" && m.sport === "Chess") ||
     (official.role === "domino_admin" && m.sport === "Domino")) &&
    m.status !== "finished";

  const hasRT = m.rtA || m.rtB;

  const NameA = ({ p, side }) => {
    if (!p || p.isTbd) return <span style={{ color: C.faint }}>TBD</span>;
    const won = res === side;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontWeight: won ? 900 : 600,
              fontSize: 13,
              color: won ? C.ink : C.body,
              wordBreak: "break-word",
              lineHeight: 1.3,
            }}
          >
            {p.name}
          </div>
          {hasRT && m.rtA && <div style={{ fontSize: 10, color: C.muted }}>{m.rtA}</div>}
        </div>
        {won && <span style={{ fontSize: 14, flexShrink: 0 }}>🏆</span>}
      </div>
    );
  };

  const NameB = ({ p, side }) => {
    if (!p || p.isTbd) return <span style={{ color: C.faint }}>TBD</span>;
    const won = res === side;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0, justifyContent: "flex-end" }}>
        {won && <span style={{ fontSize: 14, flexShrink: 0 }}>🏆</span>}
        <div style={{ minWidth: 0, textAlign: "right", flex: 1 }}>
          <div
            style={{
              fontWeight: won ? 900 : 600,
              fontSize: 13,
              color: won ? C.ink : C.body,
              wordBreak: "break-word",
              lineHeight: 1.3,
            }}
          >
            {p.name}
          </div>
          {hasRT && m.rtB && <div style={{ fontSize: 10, color: C.muted }}>{m.rtB}</div>}
        </div>
      </div>
    );
  };

  const Score = () => {
    if (m.status === "scheduled") {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", minWidth: 44 }}>
          <span style={{ color: C.faint, fontWeight: 600, fontSize: 13 }}>{canClick ? "Tap →" : "vs"}</span>
        </div>
      );
    }

    if (m.sport === 'Badminton') {
  if (m.scoreA === null || m.scoreB === null) {
    return <div style={{ color: C.faint, fontWeight: 600, fontSize: 13, minWidth: 44, textAlign: "center" }}>vs</div>;
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, minWidth: 44, justifyContent: "center" }}>
      <span style={{ fontSize: 18, fontWeight: 900, color: m.scoreA > m.scoreB ? C.ink : C.muted }}>{m.scoreA}</span>
      <span style={{ color: C.faint, fontSize: 14 }}>–</span>
      <span style={{ fontSize: 18, fontWeight: 900, color: m.scoreB > m.scoreA ? C.ink : C.muted }}>{m.scoreB}</span>
    </div>
  );
}

// Table Tennis - show match score (e.g., 2-1)
if (m.sport === 'Table Tennis') {
  if (m.status === 'scheduled' || m.status === 'pending') {
    return <div style={{ color: C.faint, fontWeight: 600, fontSize: 13, minWidth: 44, textAlign: "center" }}>vs</div>;
  }
  
  if (m.scoreA === 0 && m.scoreB === 0) {
    return <div style={{ color: C.faint, fontWeight: 600, fontSize: 13, minWidth: 44, textAlign: "center" }}>vs</div>;
  }
  
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 44 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 18, fontWeight: 900, color: m.scoreA > m.scoreB ? C.ink : C.muted }}>
          {m.scoreA}
        </span>
        <span style={{ color: C.faint, fontSize: 16 }}>–</span>
        <span style={{ fontSize: 18, fontWeight: 900, color: m.scoreB > m.scoreA ? C.ink : C.muted }}>
          {m.scoreB}
        </span>
      </div>
      {m.winnerName && (
        <div style={{ fontSize: 9, color: C.greenText, fontWeight: 600, marginTop: 2 }}>
          🏆 {m.winnerName}
        </div>
      )}
    </div>
  );
}

    if (meta.scoringType === "chess") {
      const label = res === "A" ? "1–0" : res === "B" ? "0–1" : "½–½";
      return <div style={{ fontSize: 18, fontWeight: 800, color: C.ink, minWidth: 44, textAlign: "center" }}>{label}</div>;
    }

    if (meta.scoringType === "points") {
      const sA = meta.scoringType === "points" && m.sets?.length ? m.sets[0].sA : setsA;
      const sB = meta.scoringType === "points" && m.sets?.length ? m.sets[0].sB : setsB;
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 3, minWidth: 44, justifyContent: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: res === "A" ? C.ink : C.muted }}>{sA}</span>
          <span style={{ color: C.faint, fontSize: 14 }}>–</span>
          <span style={{ fontSize: 18, fontWeight: 900, color: res === "B" ? C.ink : C.muted }}>{sB}</span>
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 44 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: res === "A" ? C.ink : C.muted }}>{setsA}</span>
          <span style={{ color: C.faint, fontSize: 14 }}>–</span>
          <span style={{ fontSize: 18, fontWeight: 900, color: res === "B" ? C.ink : C.muted }}>{setsB}</span>
        </div>
        {m.sets?.length > 0 && (
          <div style={{ display: "flex", gap: 2 }}>
            {m.sets.map((s, i) => (
              <span key={i} style={{ fontSize: 9, color: C.muted }}>
                {s.sA}-{s.sB}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      onClick={canClick ? onClick : undefined}
      style={{
        background: C.white,
        border: `1.5px solid ${m.status === "live" ? "#FECACA" : m.status === "finished" ? C.greenBorder : C.border}`,
        borderRadius: 10,
        padding: "12px 14px",
        marginBottom: 8,
        boxShadow:
          m.status === "live" ? `0 0 0 3px ${C.redFaint},0 2px 8px rgba(139,0,0,0.08)` : "0 1px 3px rgba(0,0,0,0.06)",
        cursor: canClick ? "pointer" : "default",
        position: "relative",
      }}
    >
      {canClick && (
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 10,
            fontSize: 9,
            color: C.faint,
            fontWeight: 600,
            letterSpacing: 0.5,
            background: C.surface,
            padding: "1px 8px",
            borderRadius: 99,
          }}
        >
          tap to score
        </span>
      )}

      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
  <Pill status={m.status} />
  <SportBadge sport={m.sport} />
  {m.category && (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: C.bluText,
        background: C.bluBg,
        border: `1px solid ${C.bluBorder}`,
        borderRadius: 99,
        padding: "1px 10px",
      }}
    >
      {m.category}
    </span>
  )}
  {m.tournamentName && m.sport === 'Badminton' && (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: C.red,
        background: C.redFaint,
        border: `1px solid #FECACA`,
        borderRadius: 99,
        padding: "1px 10px",
      }}
    >
      {m.tournamentName}
    </span>
  )}
  {m.round && (
    <span
      style={{
        fontSize: 11,
        color: C.muted,
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 99,
        padding: "1px 8px",
      }}
    >
      {m.round}
    </span>
  )}
</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <NameA p={pA} side="A" />
        <Score />
        <NameB p={pB} side="B" />
      </div>

      <div style={{ fontSize: 11, color: C.muted, marginTop: 4, display: "flex", gap: 8 }}>
        <span>📅 {m.date ? fmtDate(m.date) : "—"}</span>
        <span>🕐 {m.time ? fmtTime(m.time) : "—"}</span>
        <span>📍 {m.venue || "—"}</span>
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
  const [officialTab, setOfficialTab] = useState("program");
  const [filterSport, setFilterSport] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterKind, setFilterKind] = useState("All");
  const [editProgItem, setEditProgItem] = useState(null);

  const [npForm, setNpForm] = useState({title:"",date:"",time:"09:00",venue:"",description:"",audience:"All"});
  const [toast, setToast] = useState(null);
  const [official, setOfficial] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const progIdRef = useRef(10);
  const logoClickCount = useRef(0);
  const logoClickTimer = useRef(null);

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
    if(item.kind==="match"){
      if(filterSport!=="All"&&item.sport!==filterSport) return false;
      if(filterStatus!=="All"&&item.status!==filterStatus) return false;
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
  const lbl={fontSize:10,color:C.muted,fontWeight:700,display:"block",marginBottom:4,letterSpacing:1};
  const primaryBtn={padding:"10px 20px",borderRadius:9,border:"none",background:`linear-gradient(135deg,${C.redDeep},${C.red})`,color:C.white,cursor:"pointer",fontWeight:800,fontSize:13,boxShadow:`0 4px 16px ${C.redGlow}`};
  const ghostBtn=(active)=>({padding:"6px 13px",borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:12,border:`1.5px solid ${active?C.red:C.border}`,background:active?C.redFaint:C.white,color:active?C.red:C.body});
  const tabBtn=(active)=>({padding:"9px 16px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13,border:`1.5px solid ${active?C.red:C.border}`,background:active?C.redFaint:C.white,color:active?C.red:C.body});
  const navBtn=(active)=>({padding:"11px 16px",border:"none",cursor:"pointer",fontSize:13,fontWeight:600,borderRadius:"8px 8px 0 0",whiteSpace:"nowrap",background:active?C.white:"transparent",color:active?C.red:C.muted,borderBottom:active?`3px solid ${C.red}`:"3px solid transparent"});
  const divider=(label)=><div style={{fontSize:10,fontWeight:800,color:C.red,letterSpacing:2,margin:"20px 0 10px",display:"flex",alignItems:"center",gap:8}}><span>{label}</span><span style={{flex:1,height:1,background:C.border}}/></div>;

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
              <div style={{width:48,paddingTop:16,paddingRight:10,textAlign:"right",flexShrink:0}}>
                <span style={{fontSize:12,fontWeight:700,color:C.muted}}>{item._time ? fmtTime(item._time) : "—"}</span>
              </div>
              <div style={{flex:1}}>
                {item.kind==="match"
  ? <MatchCard m={item} lookupParticipant={lookupParticipant} onClick={() => handleMatchClick(item)} official={official}/>
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
        <EditModal item={editProgItem} clubs={clubs} players={players} pairs={pairs}
          onSave={handleSaveProgram} onClose={()=>setEditProgItem(null)}/>
      )}

      {liveNow.length>0&&(
        <div style={{background:`linear-gradient(90deg,${C.redDeep},${C.red})`,color:C.white,fontSize:11,fontWeight:700,padding:"6px 16px",display:"flex",gap:24,overflowX:"auto",whiteSpace:"nowrap"}}>
          <span style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:6,height:6,borderRadius:99,background:C.white,display:"inline-block",animation:"pulse 1s infinite"}}/>LIVE NOW</span>
          {liveNow.map((m,i)=>{const pA=lookupParticipant(m.sport,m.pA),pB=lookupParticipant(m.sport,m.pB);return <span key={i}>{pA?.name??"?"} vs {pB?.name??"?"} · {m.sport}</span>;})}
        </div>
      )}

      <div style={{background:C.white,borderBottom:`1.5px solid ${C.border}`,boxShadow:"0 1px 8px rgba(139,0,0,0.06)"}}>
        <div style={{maxWidth:1040,margin:"0 auto",padding:"0 16px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 0 12px",flexWrap:"wrap",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <img src={LOGO_URL} alt="Logo"
                onClick={()=>{
                  logoClickCount.current+=1;
                  if(logoClickTimer.current) clearTimeout(logoClickTimer.current);
                  logoClickTimer.current=setTimeout(()=>{logoClickCount.current=0;},600);
                  if(logoClickCount.current>=3){logoClickCount.current=0;if(!official)setShowLogin(true);}
                }}
                style={{width:44,height:44,borderRadius:12,boxShadow:`0 4px 16px ${C.redGlow}`,objectFit:"cover",cursor:"default",userSelect:"none"}}/>
              <div>
                <div style={{fontSize:18,fontWeight:900,color:C.ink,letterSpacing:"-0.5px",lineHeight:1}}>HUT RI <span style={{color:C.red}}>BJP</span> <span style={{fontSize:14,fontWeight:700,color:C.muted}}>2026</span></div>
                <div style={{fontSize:9,color:C.muted,letterSpacing:2,textTransform:"uppercase",marginTop:2}}>Indonesia Berdaulat Adil dan Makmur</div>
              </div>
            </div>
            {official&&(
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{textAlign:"right"}}><div style={{fontSize:12,fontWeight:700,color:C.ink}}>{official.badge} {official.role}</div><div style={{fontSize:11,color:C.muted}}>{official.username}</div></div>
                <button onClick={()=>{setOfficial(null);setView("schedule");showToast("Logged out");}} style={{...ghostBtn(false),padding:"6px 14px",fontSize:12}}>Logout</button>
              </div>
            )}
          </div>
          <nav style={{display:"flex",gap:2,overflowX:"auto",marginBottom:"-1.5px"}}>
            {[
              ["schedule","📅 Jadwal"],
              ["results","✅ Hasil Pertandingan"],
              ...(official?[["official","⚙️ Officials"]]:[])
            ].map(([v,l])=><button key={v} style={navBtn(view===v)} onClick={()=>setView(v)}>{l}</button>)}
          </nav>
        </div>
      </div>

      <div style={{maxWidth:1040,margin:"0 auto",padding:"16px 16px 40px"}}>

        {/* ── SCHEDULE ── */}
        {view==="schedule"&&<>
          <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:8}}>
            <h1 style={{fontSize:20,fontWeight:900,color:C.ink,margin:0}}>Jadwal</h1>
            <span style={{fontSize:12,color:C.muted}}>{allScheduleItems.length} events</span>
          </div>
          <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 14px",marginBottom:20}}>
            <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontSize:10,color:C.muted,fontWeight:700,letterSpacing:1}}>VIEW</span>
              {[
                ["All","Semua"],
                ["match","Matches"],
                ["program","Program"]
              ].map(([v,l])=>(
                <button key={v} style={ghostBtn(filterKind===v)} onClick={()=>setFilterKind(v)}>{l}</button>
              ))}
              {filterKind!=="program"&&<>
                <div style={{width:1,height:18,background:C.border}}/>
                <span style={{fontSize:10,color:C.muted,fontWeight:700,letterSpacing:1}}>SPORT</span>
                {SPORTS.map(s=><button key={s} style={ghostBtn(filterSport===s)} onClick={()=>setFilterSport(s)}>{SPORT_META[s].emoji} {SPORT_DISPLAY[s]}</button>)}
                <button style={ghostBtn(filterSport==="All")} onClick={()=>setFilterSport("All")}>Semua</button>
                <div style={{width:1,height:18,background:C.border}}/>
                <select style={{...inp,width:"auto",padding:"4px 10px",fontSize:12}} value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
                  {["All","scheduled","live","finished"].map(v=><option key={v} value={v}>{v==="All"?"All":v.charAt(0).toUpperCase()+v.slice(1)}</option>)}
                </select>
              </>}
            </div>
          </div>
          <ScheduleList/>
        </>}

        {/* ── RESULTS ── */}
        {view==="results"&&<>
          <h1 style={{fontSize:20,fontWeight:900,color:C.ink,marginBottom:16}}>Hasil Pertandingan</h1>
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:16}}>
            {["All",...SPORTS].map(s=>(
              <button key={s} style={ghostBtn(filterSport===s)} onClick={()=>setFilterSport(s)}>
                {s!=="All" ? SPORT_META[s]?.emoji+" " : ""}{s==="All" ? "Semua" : SPORT_DISPLAY[s] || s}
              </button>
            ))}
          </div>
          {resultMatches.filter(m=>filterSport==="All"||m.sport===filterSport)
            .sort((a,b)=>b.date?.localeCompare(a.date??"")||b.time?.localeCompare(a.time??""))
            .map((m,i)=>(
              <div key={i} style={{display:"flex",marginBottom:8}}>
                <div style={{width:48,paddingTop:16,paddingRight:10,textAlign:"right",flexShrink:0}}>
                  <span style={{fontSize:12,fontWeight:700,color:C.muted}}>{m.time ? fmtTime(m.time) : "—"}</span>
                </div>
                <div style={{flex:1}}><MatchCard m={m} lookupParticipant={lookupParticipant}/></div>
              </div>
            ))
          }
          {resultMatches.length===0&&(
            <div style={{textAlign:"center",color:C.faint,padding:48,fontSize:14}}>
              <div style={{fontSize:36,marginBottom:12}}>🏆</div>
              <div style={{fontWeight:700,color:C.muted,marginBottom:6}}>No results yet</div>
              <div style={{fontSize:12}}>Results appear here once you mark a match as finished.</div>
            </div>
          )}
        </>}

        {/* ── OFFICIALS ── */}
        {view==="official"&&official&&<>
          <div style={{marginBottom:16}}>
            <h1 style={{fontSize:20,fontWeight:900,color:C.ink,margin:0}}>Officials Panel</h1>
            <div style={{fontSize:12,color:C.muted,marginTop:2}}>{official.badge} {official.role} · {official.username}</div>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
            {official?.role === "admin" && (
              <>
                <button onClick={()=>setOfficialTab("program")} style={tabBtn(officialTab==="program")}>📌 Program</button>
                <button onClick={()=>setOfficialTab("chess")} style={tabBtn(officialTab==="chess")}>♟️ Chess</button>
                <button onClick={()=>setOfficialTab("domino")} style={tabBtn(officialTab==="domino")}>🀱 Domino</button>
              </>
            )}
            {official?.role === "chess_admin" && (
              <button onClick={()=>setOfficialTab("chess")} style={tabBtn(officialTab==="chess")}>♟️ Chess</button>
            )}
            {official?.role === "domino_admin" && (
              <button onClick={()=>setOfficialTab("domino")} style={tabBtn(officialTab==="domino")}>🀱 Domino</button>
            )}
            {official?.role === "event_admin" && (
              <button onClick={()=>setOfficialTab("program")} style={tabBtn(officialTab==="program")}>📌 Program</button>
            )}
          </div>

          {officialTab==="program"&&(
            <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
              <div style={{fontWeight:800,color:C.ink,marginBottom:8,fontSize:15}}>Program Events</div>
              <div style={{fontSize:12,color:C.muted,marginBottom:16}}>Non-match events (ceremonies, meetings, press conferences, etc.) that appear in the public schedule.</div>

              {programEvents.sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time)).map(e=>(
                <div key={e.id} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:160}}>
                    <div style={{fontSize:11,color:C.muted,marginBottom:2}}>{fmtDate(e.date)} {e.time ? fmtTime(e.time) : ''} · {e.venue||"TBA"}</div>
                    <div style={{fontWeight:700,fontSize:14,color:C.ink,wordBreak:"break-word"}}>{e.title}</div>
                    {e.description&&<div style={{fontSize:12,color:C.muted,marginTop:2,wordBreak:"break-word"}}>{e.description}</div>}
                  </div>
                  <button onClick={()=>setEditProgItem(e)} style={{padding:"4px 10px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:600,border:`1.5px solid ${C.border}`,background:C.white,color:C.body,minHeight:36}}>✏️</button>
                  <button onClick={()=>setProgramEvents(p=>p.filter(x=>x.id!==e.id))} style={{padding:"4px 10px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:600,border:"1.5px solid #FECACA",background:C.redFaint,color:C.red,minHeight:36}}>🗑</button>
                </div>
              ))}

              {divider("ADD NEW EVENT")}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                <div style={{gridColumn:"1/-1"}}><label style={lbl}>TITLE</label><input style={inp} value={npForm.title} onChange={e=>setNpForm(f=>({...f,title:e.target.value}))} placeholder="Opening Ceremony, Technical Meeting…"/></div>
                <div><label style={lbl}>AUDIENCE</label><input style={inp} value={npForm.audience} onChange={e=>setNpForm(f=>({...f,audience:e.target.value}))} placeholder="All / Media / Athletes…"/></div>
                <div><label style={lbl}>DATE</label><input style={inp} type="date" value={npForm.date} onChange={e=>setNpForm(f=>({...f,date:e.target.value}))}/></div>
                <div><label style={lbl}>TIME</label><input style={inp} type="time" value={npForm.time} onChange={e=>setNpForm(f=>({...f,time:e.target.value}))}/></div>
                <div style={{gridColumn:"1/-1"}}><label style={lbl}>VENUE</label>
                  <select style={inp} value={npForm.venue} onChange={e=>setNpForm(f=>({...f,venue:e.target.value}))}>
                    <option value="">Select Venue</option>
                    {PROGRAM_VENUES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div style={{gridColumn:"1/-1"}}><label style={lbl}>DESCRIPTION (optional)</label><input style={inp} value={npForm.description} onChange={e=>setNpForm(f=>({...f,description:e.target.value}))} placeholder="Brief description…"/></div>
              </div>
              {npForm.title&&npForm.date&&<div style={{marginBottom:12}}><div style={{fontSize:10,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:6}}>PREVIEW</div><ProgramCard e={npForm}/></div>}
              <button style={primaryBtn} onClick={handleAddProgram}>📌 Add to Schedule</button>
            </div>
          )}

          {officialTab==="chess"&&(
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

          {officialTab==="domino"&&(
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
        </>}

        {view==="official"&&!official&&(
          <div style={{textAlign:"center",padding:60}}>
            <div style={{width:72,height:72,borderRadius:99,background:C.redFaint,border:"1.5px solid #FECACA",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 16px"}}>🔒</div>
            <div style={{fontSize:18,fontWeight:800,color:C.ink,marginBottom:6}}>Officials Only</div>
            <div style={{fontSize:13,color:C.muted,marginBottom:24}}>Sign in to access the Officials Panel.</div>
            <button style={primaryBtn} onClick={()=>setShowLogin(true)}>Sign In</button>
          </div>
        )}
      </div>

      {scoreModal && (
        <ScoreModal
          match={scoreModal}
          onSave={handleScoreSave}
          onClose={() => setScoreModal(null)}
        />
      )}

      {toast&&(
        <div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",zIndex:999,padding:"12px 20px",borderRadius:10,fontWeight:700,fontSize:14,color:C.white,background:toast.type==="error"?C.redDeep:"#166534",border:`1px solid ${toast.type==="error"?C.red:C.greenBorder}`,boxShadow:"0 6px 30px rgba(0,0,0,0.15)",maxWidth:"90%",textAlign:"center"}}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
