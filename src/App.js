import { useState, useRef, useEffect } from "react";

const LOGO_DATA_URI = "data:image/png;base64,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";

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

// ─── FLAG BADGE ─────────────────────────────────────────────────────────────
const FlagBadge = ({ flag, size = 18 }) => (
  <span style={{
    display:"inline-flex", alignItems:"center", justifyContent:"center",
    width: size + 8, height: size,
    background: C.redDeep, color: C.white,
    fontSize: size * 0.6, fontWeight: 900, borderRadius: 4,
    letterSpacing: "0.5px", flexShrink: 0, fontFamily: "monospace",
  }}>{flag}</span>
);

// ─── SPORT CONFIG ────────────────────────────────────────────────────────────
const SPORT_META = {
  "Badminton":            { emoji:"🏸", scoringType:"sets",    matchType:"doubles", bestOf:3,  pointsPerSet:21 },
  "Table Tennis Singles": { emoji:"🏓", scoringType:"sets",    matchType:"singles", bestOf:5,  pointsPerSet:11 },
  "Table Tennis Doubles": { emoji:"🏓", scoringType:"sets",    matchType:"doubles", bestOf:5,  pointsPerSet:11 },
  "Chess":                { emoji:"♟️", scoringType:"chess",   matchType:"singles", bestOf:1 },
  "Domino":               { emoji:"🀱", scoringType:"points",  matchType:"doubles", bestOf:1 },
};
const SPORTS = Object.keys(SPORT_META);

const PROG_CATS = [
  { key:"press",    label:"Press Conference",  emoji:"🎙️", color:"#6D28D9", bg:"#F5F3FF", border:"#DDD6FE" },
  { key:"meeting",  label:"Technical Meeting", emoji:"📋", color:"#1D4ED8", bg:"#EFF6FF", border:"#BFDBFE" },
  { key:"ceremony", label:"Ceremony",          emoji:"🏅", color:"#92400E", bg:"#FFFBEB", border:"#FDE68A" },
  { key:"training", label:"Training Session",  emoji:"💪", color:"#065F46", bg:"#F0FDF4", border:"#A7F3D0" },
  { key:"social",   label:"Social Event",      emoji:"🎉", color:"#9D174D", bg:"#FDF2F8", border:"#FBCFE8" },
  { key:"other",    label:"Other",             emoji:"📌", color:"#374151", bg:"#F9FAFB", border:"#E5E7EB" },
];

const CLUB_COLORS = ["#DC2626","#2563EB","#16A34A","#D97706","#7C3AED","#EA580C","#0891B2","#475569"];

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
const ROSTERS_INIT = {};

const rtFlag = (rtName) => {
  if(!rtName) return "09";
  const m = rtName.match(/(\d{1,2})$/);
  return m ? String(+m[1]).padStart(2,"0") : "09";
};

const ADMIN_ACCOUNT = { id:"admin", username:"admin", password:"giobjp26", role:"Admin", badge:"🛡️", isAdmin:true };

const seedMatches = () => [];
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
    return new Date(d+"T00:00:00").toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"}); 
  } catch { 
    return d; 
  } 
};

function recalcStandings(members, matches) {
  const st = members.map(p => ({...p, played:0, won:0, drawn:0, lost:0, pts:0}));
  matches.forEach(m => {
    if(m.status !== "finished" || !m.result) return;
    const iA = st.findIndex(p => p.id === m.pA?.id);
    const iB = st.findIndex(p => p.id === m.pB?.id);
    if(iA < 0 || iB < 0) return;
    st[iA].played++; st[iB].played++;
    if(m.result === "A"){ st[iA].won++; st[iA].pts += 3; st[iB].lost++; }
    else if(m.result === "B"){ st[iB].won++; st[iB].pts += 3; st[iA].lost++; }
    else{ st[iA].drawn++; st[iA].pts += 1; st[iB].drawn++; st[iB].pts += 1; }
  });
  return st.sort((a,b) => b.pts - a.pts || b.won - a.won);
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
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:700,background:bg,color,color,border:`1px solid ${color}33`}}>{meta.emoji} {sport}</span>;
};

const CatBadge = ({catKey}) => {
  const cat=PROG_CATS.find(c=>c.key===catKey)??PROG_CATS.at(-1);
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:700,background:cat.bg,color:cat.color,border:`1px solid ${cat.border}`}}>{cat.emoji} {cat.label}</span>;
};

// ─── LOGIN MODAL ────────────────────────────────────────────────────────────
function LoginModal({ onLogin, onCancel, accounts }) {
  const [u,setU]=useState(""), [p,setP]=useState(""), [err,setErr]=useState("");
  const attempt=()=>{ const c=accounts.find(x=>x.username===u&&x.password===p); c?onLogin(c):setErr("Invalid credentials."); };
  const inp={background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:8,color:C.ink,padding:"10px 14px",fontSize:14,width:"100%",boxSizing:"border-box",outline:"none"};
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(26,5,5,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,backdropFilter:"blur(6px)"}}>
      <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:20,padding:36,width:380,boxShadow:"0 20px 60px rgba(139,0,0,0.18)"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:60,height:60,borderRadius:16,background:`linear-gradient(135deg,${C.redDeep},${C.red})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 14px",boxShadow:`0 4px 20px ${C.redGlow}`}}>🔐</div>
          <div style={{fontWeight:900,fontSize:20,color:C.ink}}>Officials Login</div>
          <div style={{fontSize:11,color:C.muted,marginTop:4,letterSpacing:1.5,textTransform:"uppercase"}}>HUT RI BJP 2026</div>
        </div>
        <div style={{marginBottom:12}}><label style={{fontSize:11,color:C.muted,fontWeight:700,display:"block",marginBottom:5,letterSpacing:1}}>USERNAME</label><input style={inp} value={u} onChange={e=>{setU(e.target.value);setErr("");}} placeholder="username"/></div>
        <div style={{marginBottom:18}}><label style={{fontSize:11,color:C.muted,fontWeight:700,display:"block",marginBottom:5,letterSpacing:1}}>PASSWORD</label><input style={inp} type="password" value={p} onChange={e=>{setP(e.target.value);setErr("");}} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&attempt()}/></div>
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

// ─── MATCH DETAIL MODAL ─────────────────────────────────────────────────────
function MatchDetailModal({ match, sport, onSave, onClose }) {
  const meta = SPORT_META[sport] ?? {};
  const isChess  = meta.scoringType === "chess";
  const isPoints = meta.scoringType === "points";

  const [form, setForm] = useState({
    date:    match.date    ?? "",
    time:    match.time    ?? "",
    venue:   match.venue   ?? "",
    result:  match.result  ?? null,
    sets:    match.sets?.length ? match.sets.map(s=>({sA:String(s.sA),sB:String(s.sB)})) : [{sA:"",sB:""}],
    manualResult: match.result ?? "A",
    status:  match.status  ?? "scheduled",
  });
  const f = (k,v) => setForm(p=>({...p,[k]:v}));

  const pA = match.pA; const pB = match.pB;
  const setLabel = meta.scoringType==="points"?"Score":"Set";

  const computedResult = () => {
    if(isChess) return form.manualResult;
    if(isPoints) return form.manualResult;
    const cleanSets = form.sets.filter(s=>s.sA!==""&&s.sB!=="");
    if(!cleanSets.length) return null;
    let wA=0,wB=0;
    cleanSets.forEach(s=>{if(+s.sA>+s.sB)wA++;else if(+s.sB>+s.sA)wB++;});
    return wA>wB?"A":wB>wA?"B":"draw";
  };

  const handleSave = (markFinished) => {
    const cleanSets = form.sets.filter(s=>s.sA!==""&&s.sB!=="").map(s=>({sA:+s.sA,sB:+s.sB}));
    const result = markFinished ? computedResult() : match.result;
    onSave({
      ...match,
      date:   form.date,
      time:   form.time,
      venue:  form.venue,
      status: markFinished ? "finished" : form.status,
      sets:   cleanSets,
      result: result,
    });
    onClose();
  };

  const inp={background:"#F8F0F0",border:`1.5px solid ${C.border}`,borderRadius:8,color:C.ink,padding:"9px 12px",fontSize:13,width:"100%",boxSizing:"border-box"};
  const lbl={fontSize:10,color:C.muted,fontWeight:700,display:"block",marginBottom:4,letterSpacing:1};

  const hasResult = match.result !== null && match.result !== undefined;
  const statusColor = {scheduled:C.bluText,live:C.red,finished:C.greenText}[form.status]??C.muted;

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(26,5,5,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:600,backdropFilter:"blur(4px)"}}>
      <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:16,padding:28,width:500,maxWidth:"95vw",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.18)"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:18}}>
          <div>
            <div style={{fontWeight:800,fontSize:15,color:C.ink}}>{SPORT_META[sport]?.emoji} {sport}</div>
            {match.round&&<div style={{fontSize:12,color:C.muted,marginTop:2}}>{match.round}</div>}
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:C.muted,lineHeight:1,padding:4}}>✕</button>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:8,background:C.surface,borderRadius:10,padding:"12px 16px",marginBottom:18}}>
          <FlagBadge flag={pA?.flag??"09"} size={16}/>
          <span style={{flex:1,fontWeight:700,fontSize:14,color:C.ink}}>{pA?.name??"TBD"}</span>
          {hasResult
            ? <span style={{fontSize:16,fontWeight:900,color:C.red,padding:"0 10px"}}>
                {match.result==="draw"?"½–½":match.result==="A"?"1–0":"0–1"}
              </span>
            : <span style={{fontSize:13,color:C.faint,padding:"0 10px"}}>vs</span>
          }
          <span style={{flex:1,fontWeight:700,fontSize:14,color:C.ink,textAlign:"right"}}>{pB?.name??"TBD"}</span>
          <FlagBadge flag={pB?.flag??"09"} size={16}/>
        </div>

        <div style={{display:"flex",gap:8,marginBottom:16,alignItems:"center"}}>
          {["scheduled","live","finished"].map(s=>(
            <button key={s} onClick={()=>f("status",s)}
              style={{padding:"4px 12px",borderRadius:99,cursor:"pointer",fontWeight:700,fontSize:11,border:`1.5px solid ${form.status===s?statusColor:C.border}`,background:form.status===s?`${statusColor}18`:C.white,color:form.status===s?statusColor:C.muted}}>
              {s==="live"&&<span style={{marginRight:4,display:"inline-block",width:6,height:6,borderRadius:99,background:C.red,verticalAlign:"middle"}}/>}
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </button>
          ))}
        </div>

        <div style={{fontWeight:700,color:C.muted,fontSize:11,letterSpacing:1,marginBottom:8}}>SCHEDULE</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:18}}>
          <div><label style={lbl}>DATE</label><input style={inp} type="date" value={form.date} onChange={e=>f("date",e.target.value)}/></div>
          <div><label style={lbl}>TIME</label><input style={inp} type="time" value={form.time} onChange={e=>f("time",e.target.value)}/></div>
          <div><label style={lbl}>VENUE</label><input style={inp} value={form.venue} onChange={e=>f("venue",e.target.value)} placeholder="Court 1…"/></div>
        </div>

        {form.status!=="scheduled"&&<>
          <div style={{fontWeight:700,color:C.muted,fontSize:11,letterSpacing:1,marginBottom:8}}>RESULT</div>

          {isChess
            ? <div style={{display:"flex",gap:8,marginBottom:16}}>
                {[["A",pA?.name+" wins"],["draw","Draw (½–½)"],["B",pB?.name+" wins"]].map(([v,l])=>(
                  <button key={v} onClick={()=>f("manualResult",v)}
                    style={{flex:1,padding:"10px 6px",borderRadius:8,border:`1.5px solid ${form.manualResult===v?C.red:C.border}`,background:form.manualResult===v?C.redFaint:C.white,color:form.manualResult===v?C.red:C.body,cursor:"pointer",fontWeight:700,fontSize:12,textAlign:"center"}}>
                    {l}
                  </button>
                ))}
              </div>
            : <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:6,fontSize:11,color:C.muted,fontWeight:700,flex:1,marginRight:8}}>
                    <span>{pA?.name}</span><span/><span style={{textAlign:"right"}}>{pB?.name}</span>
                  </div>
                  <button onClick={()=>f("sets",[...form.sets,{sA:"",sB:""}])}
                    style={{fontSize:12,color:C.red,background:C.redFaint,border:"1px solid #FECACA",borderRadius:6,padding:"3px 10px",cursor:"pointer",fontWeight:700,whiteSpace:"nowrap"}}>
                    + {setLabel}
                  </button>
                </div>
                {form.sets.map((s,i)=>(
                  <div key={i} style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}>
                    <div style={{fontSize:11,color:C.muted,width:20,textAlign:"center",flexShrink:0}}>{i+1}</div>
                    <input style={{...inp,textAlign:"center"}} type="number" min="0" placeholder="0" value={s.sA} onChange={e=>f("sets",form.sets.map((x,j)=>j===i?{...x,sA:e.target.value}:x))}/>
                    <span style={{color:C.faint,fontSize:16,fontWeight:700,flexShrink:0}}>–</span>
                    <input style={{...inp,textAlign:"center"}} type="number" min="0" placeholder="0" value={s.sB} onChange={e=>f("sets",form.sets.map((x,j)=>j===i?{...x,sB:e.target.value}:x))}/>
                    {form.sets.length>1&&<button onClick={()=>f("sets",form.sets.filter((_,j)=>j!==i))} style={{width:22,height:22,borderRadius:5,border:`1px solid ${C.border}`,background:C.surface,color:C.muted,cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button>}
                  </div>
                ))}
                {isPoints&&(
                  <div style={{marginTop:10}}>
                    <label style={lbl}>WINNER</label>
                    <div style={{display:"flex",gap:8}}>
                      {[["A",pA?.name??"A"],["B",pB?.name??"B"]].map(([v,l])=>(
                        <button key={v} onClick={()=>f("manualResult",v)}
                          style={{flex:1,padding:"9px",borderRadius:8,border:`1.5px solid ${form.manualResult===v?C.red:C.border}`,background:form.manualResult===v?C.redFaint:C.white,color:form.manualResult===v?C.red:C.body,cursor:"pointer",fontWeight:700,fontSize:13}}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
          }
        </>}

        <div style={{display:"flex",gap:10,marginTop:20,paddingTop:16,borderTop:`1px solid ${C.border}`}}>
          <button onClick={()=>handleSave(false)}
            style={{flex:1,padding:"10px",borderRadius:9,border:`1.5px solid ${C.border}`,background:C.white,color:C.body,cursor:"pointer",fontWeight:700,fontSize:13}}>
            💾 Save Schedule
          </button>
          {form.status!=="scheduled"&&(
            <button onClick={()=>handleSave(true)}
              style={{flex:2,padding:"10px",borderRadius:9,border:"none",background:`linear-gradient(135deg,${C.redDeep},${C.red})`,color:C.white,cursor:"pointer",fontWeight:800,fontSize:14,boxShadow:`0 4px 16px ${C.redGlow}`}}>
              ✅ Save & Mark Finished
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SHARED MATCH CARD ──────────────────────────────────────────────────────
function TourneyMatchCard({ match, isOfficial, onClick }) {
  const pA = match.pA; const pB = match.pB;
  if(!pA||pA.isTbd) return (
    <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"8px 12px",marginBottom:6,display:"flex",alignItems:"center",gap:8}}>
      <span style={{color:C.faint,fontSize:12,fontStyle:"italic",flex:1}}>TBD vs TBD</span>
    </div>
  );
  const finished = match.status==="finished";
  const live     = match.status==="live";
  const res      = match.result;
  const isChess  = !match.sets?.length && (res==="draw"||res==="A"||res==="B");

  const scoreDisplay = () => {
    if(!finished&&!live) return <span style={{fontSize:12,color:C.faint}}>vs</span>;
    if(res==="draw") return <span style={{fontSize:13,fontWeight:800,color:C.muted}}>½–½</span>;
    if(res&&match.sets?.length===0&&!isChess) return <span style={{fontSize:13,color:C.muted}}>{res==="A"?"1–0":"0–1"}</span>;
    if(match.sets?.length) {
      let wA=0,wB=0; match.sets.forEach(s=>{if(s.sA>s.sB)wA++;else if(s.sB>s.sA)wB++;});
      return <><span style={{fontSize:16,fontWeight:900,color:res==="A"?C.ink:C.muted}}>{wA}</span>
               <span style={{color:C.faint,margin:"0 3px"}}>–</span>
               <span style={{fontSize:16,fontWeight:900,color:res==="B"?C.ink:C.muted}}>{wB}</span></>;
    }
    return <span style={{fontSize:12,color:C.muted}}>{res==="A"?"1–0":"0–1"}</span>;
  };

  const statusDot = live ? <span style={{width:6,height:6,borderRadius:99,background:C.red,display:"inline-block",animation:"pulse 1s infinite",marginRight:4}}/> : null;

  return (
    <div onClick={isOfficial?onClick:undefined}
      style={{background:C.white,border:`1.5px solid ${live?"#FECACA":finished?C.greenBorder:C.border}`,borderRadius:10,padding:"8px 12px",marginBottom:6,
        cursor:isOfficial?"pointer":"default",
        boxShadow:live?`0 0 0 2px ${C.redFaint}`:finished?"0 1px 4px rgba(22,101,52,0.08)":"0 1px 3px rgba(0,0,0,0.04)",
        transition:"box-shadow .15s, border-color .15s",
        position:"relative"}}>
      {isOfficial&&!finished&&(
        <span style={{position:"absolute",top:5,right:7,fontSize:9,color:C.faint,fontWeight:600,letterSpacing:0.5}}>tap to edit</span>
      )}
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        {statusDot}
        {pA.playerA
          ? <><FlagBadge flag={rtFlag(pA.playerA.club)} size={11}/>{pA.playerB&&pA.playerA.club!==pA.playerB.club&&<FlagBadge flag={rtFlag(pA.playerB.club)} size={11}/>}</>
          : pA.flag&&<FlagBadge flag={pA.flag} size={12}/>}
        <span style={{flex:1,fontSize:12,fontWeight:res==="A"?800:600,color:res==="A"?C.ink:C.body,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{pA.name}</span>
        <div style={{display:"flex",alignItems:"center",gap:2,minWidth:48,justifyContent:"center"}}>{scoreDisplay()}</div>
        <span style={{flex:1,fontSize:12,fontWeight:res==="B"?800:600,color:res==="B"?C.ink:C.body,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{pB?.name??"BYE"}</span>
        {pB?.playerA
          ? <><FlagBadge flag={rtFlag(pB.playerA.club)} size={11}/>{pB.playerB&&pB.playerA.club!==pB.playerB.club&&<FlagBadge flag={rtFlag(pB.playerB.club)} size={11}/>}</>
          : pB?.flag&&<FlagBadge flag={pB.flag} size={12}/>}
      </div>
      {(match.date||match.venue)&&(
        <div style={{fontSize:10,color:C.muted,marginTop:4,display:"flex",gap:8}}>
          {match.date&&<span>📅 {match.date}{match.time?" "+match.time:""}</span>}
          {match.venue&&<span>📍 {match.venue}</span>}
        </div>
      )}
      {finished&&match.sets?.length>0&&(
        <div style={{display:"flex",gap:3,marginTop:4,flexWrap:"wrap"}}>
          {match.sets.map((s,i)=><span key={i} style={{fontSize:9,color:C.muted,background:C.surface,borderRadius:3,padding:"1px 5px",border:`1px solid ${C.border}`}}>{s.sA}–{s.sB}</span>)}
        </div>
      )}
    </div>
  );
}

// ─── KNOCKOUT VIEW ──────────────────────────────────────────────────────────
function KnockoutView({ rounds, sport, isOfficial, onMatchUpdate }) {
  if (!rounds||rounds.length===0)
    return <div style={{textAlign:"center",color:C.muted,padding:40,fontSize:14}}>No bracket yet.</div>;
  const [modal, setModal] = useState(null);
  const label=(i,t)=>i===t-1?"Final":i===t-2?"Semi-final":i===t-3?"Quarter-final":`Round ${i+1}`;

  const updateMatch = (ri,pi,updated) => {
    const winner = updated.result==="A"?"A":updated.result==="B"?"B":null;
    const winnerObj = winner==="A"?updated.pA:winner==="B"?updated.pB:null;
    let newRounds = rounds.map((round,r)=>
      r!==ri ? round : round.map((pair,p)=>p!==pi ? pair : {...updated, winner})
    );
    if(winnerObj && ri+1 < newRounds.length) {
      const nextSlot = Math.floor(pi/2);
      const isA = pi%2===0;
      newRounds = newRounds.map((round,r)=> {
        if(r!==ri+1) return round;
        return round.map((pair,p)=> {
          if(p!==nextSlot) return pair;
          return isA ? {...pair, pA:winnerObj} : {...pair, pB:winnerObj};
        });
      });
    }
    onMatchUpdate?.(newRounds);
  };

  return (
    <>
      {modal&&<MatchDetailModal match={modal.match} sport={sport} onClose={()=>setModal(null)} onSave={updated=>{updateMatch(modal.ri,modal.pi,updated);setModal(null);}}/>}
      <div style={{overflowX:"auto",paddingBottom:8}}>
        <div style={{display:"flex",gap:16,minWidth:rounds.length*200}}>
          {rounds.map((round,ri)=>(
            <div key={ri} style={{flex:1,minWidth:185,display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
              <div style={{fontSize:10,color:C.red,fontWeight:800,letterSpacing:2,textTransform:"uppercase",marginBottom:10,borderLeft:`3px solid ${C.red}`,paddingLeft:8}}>{label(ri,rounds.length)}</div>
              {round.map((pair,pi)=>{
                const pA=pair.pA&&!pair.pA?.isTbd?pair.pA:null;
                const pB=pair.pB&&!pair.pB?.isTbd?pair.pB:null;
                if(!pA) return (
                  <div key={pi} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"8px 12px",marginBottom:12,fontSize:12,color:C.faint,fontStyle:"italic"}}>TBD</div>
                );
                const matchObj={...pair,pA,pB};
                return (
                  <TourneyMatchCard key={pi} match={matchObj} isOfficial={isOfficial&&!!pA&&!!pB&&!pA.isTbd&&!pB?.isTbd} onClick={()=>setModal({match:matchObj,ri,pi})}/>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── ROUND ROBIN VIEW ──────────────────────────────────────────────────────
function RoundRobinView({ data, sport, isOfficial, onDataUpdate }) {
  const [openRound, setOpenRound] = useState(0);
  const [modal, setModal] = useState(null);
  if (!data?.rounds?.length) return <div style={{textAlign:"center",color:C.muted,padding:40}}>No schedule yet.</div>;

  const allMatches = data.rounds.flatMap(r=>r.matches);
  const standings = recalcStandings(data.standings, allMatches);
  const rankColor = i => [C.gold,C.silver,C.bronze][i]??C.faint;

  const updateMatch = (ri,mi,updated) => {
    const newRounds = data.rounds.map((r,r2)=>r2!==ri?r:{...r,matches:r.matches.map((m,m2)=>m2!==mi?m:updated)});
    onDataUpdate?.({...data, rounds:newRounds, standings: recalcStandings(data.standings, newRounds.flatMap(r=>r.matches))});
  };

  return (
    <>
      {modal&&<MatchDetailModal match={modal.match} sport={sport} onClose={()=>setModal(null)} onSave={updated=>{updateMatch(modal.ri,modal.mi,updated);setModal(null);}}/>}
      <div>
        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:16}}>
          <div style={{padding:"10px 14px",borderBottom:`1.5px solid ${C.border}`,fontWeight:800,fontSize:12,color:C.ink,display:"flex",gap:8}}>
            <span style={{flex:1}}>STANDINGS</span>
            <span style={{width:28,textAlign:"center",fontSize:10,color:C.muted}}>P</span>
            <span style={{width:28,textAlign:"center",fontSize:10,color:C.muted}}>W</span>
            <span style={{width:28,textAlign:"center",fontSize:10,color:C.muted}}>D</span>
            <span style={{width:28,textAlign:"center",fontSize:10,color:C.muted}}>L</span>
            <span style={{width:34,textAlign:"center",fontSize:10,color:C.red,fontWeight:800}}>PTS</span>
          </div>
          {standings.map((p,i)=>(
            <div key={p.id} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",borderBottom:`1px solid ${C.border}`,background:i%2===0?C.white:C.surface}}>
              <span style={{width:18,fontWeight:900,color:rankColor(i),fontSize:14}}>{i+1}</span>
              <FlagBadge flag={p.flag} size={13}/>
              <span style={{flex:1,fontWeight:700,fontSize:13,color:C.ink,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</span>
              <span style={{width:28,textAlign:"center",fontSize:12,color:C.muted}}>{p.played}</span>
              <span style={{width:28,textAlign:"center",fontSize:12,color:C.greenText,fontWeight:700}}>{p.won}</span>
              <span style={{width:28,textAlign:"center",fontSize:12,color:C.muted}}>{p.drawn}</span>
              <span style={{width:28,textAlign:"center",fontSize:12,color:C.red}}>{p.lost}</span>
              <span style={{width:34,textAlign:"center",fontSize:14,fontWeight:900,color:C.red}}>{p.pts}</span>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:8}}>MATCH SCHEDULE {isOfficial&&<span style={{color:C.red,fontWeight:700}}> — tap a match to edit</span>}</div>
        {data.rounds.map((r,ri)=>(
          <div key={ri} style={{marginBottom:8}}>
            <button onClick={()=>setOpenRound(openRound===ri?-1:ri)}
              style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 14px",borderRadius:8,border:`1.5px solid ${C.border}`,background:openRound===ri?C.redFaint:C.white,color:openRound===ri?C.red:C.ink,cursor:"pointer",fontWeight:700,fontSize:13}}>
              <span>Round {r.round}</span>
              <span style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:11,color:C.muted,fontWeight:400}}>{r.matches.filter(m=>m.status==="finished").length}/{r.matches.length} done</span>
                <span>{openRound===ri?"▲":"▼"}</span>
              </span>
            </button>
            {openRound===ri&&(
              <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderTop:"none",borderRadius:"0 0 8px 8px",padding:"8px 10px"}}>
                {r.matches.map((m,mi)=>(
                  <TourneyMatchCard key={mi} match={m} isOfficial={isOfficial} onClick={()=>setModal({match:m,ri,mi})}/>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// ─── GROUP + KNOCKOUT VIEW ────────────────────────────────────────────────
function GroupKnockoutView({ data, sport, isOfficial, onDataUpdate }) {
  const [activeGroup, setActiveGroup] = useState(0);
  const [openRound, setOpenRound]     = useState(0);
  const [modal, setModal]             = useState(null);
  if (!data?.groups?.length) return <div style={{textAlign:"center",color:C.muted,padding:40}}>No tournament yet.</div>;
  const { groups, knockout, advancePerGroup } = data;
  const rankColor = i => [C.gold,C.silver,C.bronze][i]??C.faint;

  const updateGroupMatch = (gi,ri,mi,updated) => {
    const newGroups = groups.map((g,g2)=>{
      if(g2!==gi) return g;
      const newRounds = g.rounds.map((r,r2)=>r2!==ri?r:{...r,matches:r.matches.map((m,m2)=>m2!==mi?m:updated)});
      const allM = newRounds.flatMap(r=>r.matches);
      return {...g, rounds:newRounds, standings:recalcStandings(g.members,allM)};
    });
    onDataUpdate?.({...data, groups:newGroups});
  };

  const updateKoMatch = (ri,pi,updated) => {
    const newKo = {...knockout, rounds: knockout.rounds.map((round,r)=>r!==ri?round:round.map((pair,p)=>p!==pi?pair:{...updated,winner:updated.result==="A"?"A":updated.result==="B"?"B":null}))};
    onDataUpdate?.({...data, knockout:newKo});
  };

  const g = activeGroup>=0 ? groups[activeGroup] : null;

  return (
    <>
      {modal&&<MatchDetailModal match={modal.match} sport={sport} onClose={()=>setModal(null)}
        onSave={updated=>{
          if(modal.type==="group") updateGroupMatch(modal.gi,modal.ri,modal.mi,updated);
          else updateKoMatch(modal.ri,modal.pi,updated);
          setModal(null);
        }}/>}
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        {groups.map((grp,gi)=>(
          <button key={gi} onClick={()=>{setActiveGroup(gi);setOpenRound(0);}}
            style={{padding:"6px 14px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:12,border:`1.5px solid ${activeGroup===gi?C.red:C.border}`,background:activeGroup===gi?C.redFaint:C.white,color:activeGroup===gi?C.red:C.body}}>
            {grp.name} <span style={{fontSize:10,color:C.muted,fontWeight:400}}>({grp.members.length})</span>
          </button>
        ))}
        <button onClick={()=>setActiveGroup(-1)}
          style={{padding:"6px 14px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:12,border:`1.5px solid ${activeGroup===-1?C.red:C.border}`,background:activeGroup===-1?C.redFaint:C.white,color:activeGroup===-1?C.red:C.body}}>
          Knockout
        </button>
      </div>

      {activeGroup>=0&&g&&(
        <div>
          <div style={{fontSize:11,color:C.muted,marginBottom:10}}>Top {advancePerGroup} advance to knockout. {isOfficial&&<span style={{color:C.red}}>Tap a match to edit.</span>}</div>
          <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden",marginBottom:12}}>
            <div style={{padding:"8px 14px",borderBottom:`1.5px solid ${C.border}`,fontWeight:800,fontSize:11,color:C.ink,display:"flex",gap:8}}>
              <span style={{flex:1}}>TEAM</span>
              <span style={{width:26,textAlign:"center",fontSize:10,color:C.muted}}>P</span>
              <span style={{width:26,textAlign:"center",fontSize:10,color:C.muted}}>W</span>
              <span style={{width:26,textAlign:"center",fontSize:10,color:C.muted}}>D</span>
              <span style={{width:26,textAlign:"center",fontSize:10,color:C.muted}}>L</span>
              <span style={{width:30,textAlign:"center",fontSize:10,color:C.red,fontWeight:800}}>PTS</span>
            </div>
            {g.standings.map((p,i)=>(
              <div key={p.id} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 14px",borderBottom:`1px solid ${C.border}`,background:i<advancePerGroup?"rgba(220,28,28,0.025)":C.white}}>
                <span style={{width:16,fontWeight:900,color:rankColor(i),fontSize:13}}>{i+1}</span>
                {i<advancePerGroup&&<span style={{fontSize:9,color:C.red,fontWeight:700,background:C.redFaint,border:"1px solid #FECACA",borderRadius:99,padding:"0 5px",whiteSpace:"nowrap"}}>ADV</span>}
                <FlagBadge flag={p.flag} size={12}/>
                <span style={{flex:1,fontWeight:700,fontSize:12,color:C.ink,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</span>
                <span style={{width:26,textAlign:"center",fontSize:12,color:C.muted}}>{p.played}</span>
                <span style={{width:26,textAlign:"center",fontSize:12,color:C.greenText,fontWeight:700}}>{p.won}</span>
                <span style={{width:26,textAlign:"center",fontSize:12,color:C.muted}}>{p.drawn}</span>
                <span style={{width:26,textAlign:"center",fontSize:12,color:C.red}}>{p.lost}</span>
                <span style={{width:30,textAlign:"center",fontSize:13,fontWeight:900,color:C.red}}>{p.pts}</span>
              </div>
            ))}
          </div>
          {g.rounds.map((r,ri)=>(
            <div key={ri} style={{marginBottom:6}}>
              <button onClick={()=>setOpenRound(openRound===ri?-1:ri)}
                style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${C.border}`,background:openRound===ri?C.redFaint:C.white,color:openRound===ri?C.red:C.ink,cursor:"pointer",fontWeight:700,fontSize:12}}>
                <span>Round {r.round}</span>
                <span style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:11,color:C.muted,fontWeight:400}}>{r.matches.filter(m=>m.status==="finished").length}/{r.matches.length} done</span>
                  <span>{openRound===ri?"▲":"▼"}</span>
                </span>
              </button>
              {openRound===ri&&(
                <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderTop:"none",borderRadius:"0 0 8px 8px",padding:"6px 8px"}}>
                  {r.matches.map((m,mi)=>(
                    <TourneyMatchCard key={mi} match={m} isOfficial={isOfficial} onClick={()=>setModal({type:"group",match:m,gi:activeGroup,ri,mi})}/>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeGroup===-1&&(
        <div>
          <div style={{fontSize:11,color:C.muted,marginBottom:12}}>Knockout phase. {isOfficial&&<span style={{color:C.red}}>Tap a match to edit.</span>}</div>
          {modal&&modal.type==="ko"&&<MatchDetailModal match={modal.match} sport={sport} onClose={()=>setModal(null)} onSave={updated=>{updateKoMatch(modal.ri,modal.pi,updated);setModal(null);}}/>}
          <div style={{overflowX:"auto",paddingBottom:8}}>
            {(()=>{
              const koRounds=knockout?.rounds??[];
              if(!koRounds.length) return <div style={{color:C.muted,textAlign:"center",padding:32}}>No knockout bracket yet.</div>;
              const label=(i,t)=>i===t-1?"Final":i===t-2?"Semi-final":i===t-3?"Quarter-final":`Round ${i+1}`;
              return <div style={{display:"flex",gap:16,minWidth:koRounds.length*200}}>
                {koRounds.map((round,ri)=>(
                  <div key={ri} style={{flex:1,minWidth:185}}>
                    <div style={{fontSize:10,color:C.red,fontWeight:800,letterSpacing:2,textTransform:"uppercase",marginBottom:10,borderLeft:`3px solid ${C.red}`,paddingLeft:8}}>{label(ri,koRounds.length)}</div>
                    {round.map((pair,pi)=>{
                      const pA=pair.pA&&!pair.pA?.isTbd?pair.pA:null;
                      const pB=pair.pB&&!pair.pB?.isTbd?pair.pB:null;
                      if(!pA) return <div key={pi} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"8px 12px",marginBottom:12,fontSize:12,color:C.faint,fontStyle:"italic"}}>TBD</div>;
                      const matchObj={...pair,pA,pB};
                      return <TourneyMatchCard key={pi} match={matchObj} isOfficial={isOfficial&&!!pA&&!!pB} onClick={()=>setModal({type:"ko",match:matchObj,ri,pi})}/>;
                    })}
                  </div>
                ))}
              </div>;
            })()}
          </div>
        </div>
      )}
    </>
  );
}

// ─── SWISS VIEW ─────────────────────────────────────────────────────────────
function SwissView({ data, sport, isOfficial, onDataUpdate }) {
  const [openRound, setOpenRound] = useState(0);
  const [modal, setModal] = useState(null);
  if (!data?.rounds?.length) return <div style={{textAlign:"center",color:C.muted,padding:40}}>No Swiss rounds yet.</div>;

  const allMatches = data.rounds.flatMap(r=>r.matches);
  const standings  = recalcStandings(data.standings, allMatches);
  const rankColor  = i => [C.gold,C.silver,C.bronze][i]??C.faint;

  const updateMatch = (ri,mi,updated) => {
    const newRounds = data.rounds.map((r,r2)=>r2!==ri?r:{...r,matches:r.matches.map((m,m2)=>m2!==mi?m:updated)});
    onDataUpdate?.({...data, rounds:newRounds, standings:recalcStandings(data.standings,newRounds.flatMap(r=>r.matches))});
  };

  return (
    <>
      {modal&&<MatchDetailModal match={modal.match} sport={sport} onClose={()=>setModal(null)} onSave={updated=>{updateMatch(modal.ri,modal.mi,updated);setModal(null);}}/>}
      <div>
        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:16}}>
          <div style={{padding:"10px 14px",borderBottom:`1.5px solid ${C.border}`,fontWeight:800,fontSize:12,color:C.ink,display:"flex",gap:8}}>
            <span style={{flex:1}}>SWISS STANDINGS</span>
            <span style={{width:36,textAlign:"center",fontSize:10,color:C.muted}}>PLAYED</span>
            <span style={{width:36,textAlign:"center",fontSize:10,color:C.red,fontWeight:800}}>PTS</span>
          </div>
          {standings.map((p,i)=>(
            <div key={p.id} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",borderBottom:`1px solid ${C.border}`,background:i%2===0?C.white:C.surface}}>
              <span style={{width:20,fontWeight:900,color:rankColor(i),fontSize:14}}>{i+1}</span>
              <FlagBadge flag={p.flag} size={13}/>
              <span style={{flex:1,fontWeight:700,fontSize:13,color:C.ink}}>{p.name}</span>
              <span style={{width:36,textAlign:"center",color:C.muted,fontSize:13}}>{p.played}</span>
              <span style={{width:36,textAlign:"center",fontWeight:900,color:C.red,fontSize:14}}>{p.pts}</span>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:8}}>ROUNDS {isOfficial&&<span style={{color:C.red}}>— tap a match to edit</span>}</div>
        {data.rounds.map((r,ri)=>(
          <div key={ri} style={{marginBottom:6}}>
            <button onClick={()=>setOpenRound(openRound===ri?-1:ri)}
              style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 14px",borderRadius:8,border:`1.5px solid ${C.border}`,background:openRound===ri?C.redFaint:C.white,color:openRound===ri?C.red:C.ink,cursor:"pointer",fontWeight:700,fontSize:13}}>
              <span>Round {r.round}</span>
              <span style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:11,color:C.muted,fontWeight:400}}>{r.matches.filter(m=>m.status==="finished").length}/{r.matches.length} done</span>
                <span>{openRound===ri?"▲":"▼"}</span>
              </span>
            </button>
            {openRound===ri&&(
              <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderTop:"none",borderRadius:"0 0 8px 8px",padding:"8px 10px"}}>
                {r.matches.map((m,mi)=>(
                  <TourneyMatchCard key={mi} match={m} isOfficial={isOfficial} onClick={()=>setModal({match:m,ri,mi})}/>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// ─── PROGRAM CARD ───────────────────────────────────────────────────────────
function ProgramCard({ e }) {
  return (
    <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6,flexWrap:"wrap"}}>
        <span style={{fontSize:11,fontWeight:700,color:C.red,textTransform:"uppercase",letterSpacing:1}}>📋 Program</span>
        {e.audience&&e.audience!=="All"&&<span style={{fontSize:11,color:C.muted,background:C.surface,border:`1px solid ${C.border}`,borderRadius:99,padding:"2px 8px"}}>👤 {e.audience}</span>}
      </div>
      <div style={{fontWeight:800,fontSize:15,color:C.ink,marginBottom:4}}>{e.title||<span style={{color:C.faint,fontStyle:"italic"}}>Event title</span>}</div>
      {e.description&&<div style={{fontSize:12,color:C.body,lineHeight:1.5,marginBottom:6}}>{e.description}</div>}
      <div style={{fontSize:12,color:C.muted}}>📍 {e.venue||"TBA"}</div>
    </div>
  );
}

// ─── MATCH CARD ─────────────────────────────────────────────────────────────
function MatchCard({ m, lookupParticipant }) {
  const meta=SPORT_META[m.sport]??{emoji:"🏅",scoringType:"points"};
  const pA=lookupParticipant(m.sport,m.pA);
  const pB=lookupParticipant(m.sport,m.pB);
  const res=m.result;
  const [setsA,setsB]=countSets(m.sets,m.sport);

  const Name=({p,side})=>{
    if(!p) return <span style={{color:C.faint}}>TBD</span>;
    const won=res===side;
    return <div style={{display:"flex",alignItems:"center",gap:7,flex:1,minWidth:0}}>
      <FlagBadge flag={p.flag} size={16}/>
      <div style={{minWidth:0}}>
        <div style={{fontWeight:won?900:700,fontSize:14,color:won?C.ink:C.body,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
        <div style={{fontSize:10,color:C.muted}}>{p.club}</div>
      </div>
      {won&&<span style={{fontSize:14,flexShrink:0}}>🏆</span>}
    </div>;
  };

  const Score=()=>{
    if(m.status==="scheduled") return <div style={{color:C.faint,fontWeight:700,fontSize:18,textAlign:"center",padding:"0 12px"}}>vs</div>;
    if(meta.scoringType==="chess"){
      const label=res==="A"?"1 – 0":res==="B"?"0 – 1":"½ – ½";
      return <div style={{textAlign:"center",padding:"0 12px"}}><div style={{fontSize:20,fontWeight:900,color:C.ink}}>{label}</div></div>;
    }
    if(meta.scoringType==="points"){
      const sA=meta.scoringType==="points"&&m.sets?.length?m.sets[0].sA:setsA;
      const sB=meta.scoringType==="points"&&m.sets?.length?m.sets[0].sB:setsB;
      return <div style={{display:"flex",alignItems:"center",gap:6,padding:"0 8px"}}>
        <span style={{fontSize:26,fontWeight:900,color:res==="A"?C.ink:C.muted}}>{sA}</span>
        <span style={{color:C.faint,fontSize:16}}>–</span>
        <span style={{fontSize:26,fontWeight:900,color:res==="B"?C.ink:C.muted}}>{sB}</span>
      </div>;
    }
    return <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"0 8px"}}>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:24,fontWeight:900,color:res==="A"?C.ink:C.muted}}>{setsA}</span>
        <span style={{color:C.faint,fontSize:14}}>–</span>
        <span style={{fontSize:24,fontWeight:900,color:res==="B"?C.ink:C.muted}}>{setsB}</span>
      </div>
      {m.sets?.length>0&&<div style={{display:"flex",gap:4}}>
        {m.sets.map((s,i)=><span key={i} style={{fontSize:10,color:C.muted,background:C.surface,borderRadius:4,padding:"1px 5px",border:`1px solid ${C.border}`}}>{s.sA}-{s.sB}</span>)}
      </div>}
    </div>;
  };

  return (
    <div style={{background:C.white,border:`1.5px solid ${m.status==="live"?"#FECACA":C.border}`,borderRadius:12,padding:16,boxShadow:m.status==="live"?`0 0 0 3px ${C.redFaint},0 2px 8px rgba(139,0,0,0.08)`:"0 1px 3px rgba(0,0,0,0.04)"}}>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
        <Pill status={m.status}/>
        <SportBadge sport={m.sport}/>
        {m.round&&<span style={{fontSize:11,color:C.muted,background:C.surface,border:`1px solid ${C.border}`,borderRadius:99,padding:"2px 8px"}}>{m.round}</span>}
        <span style={{fontSize:11,color:C.muted,marginLeft:"auto"}}>📍 {m.venue}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <Name p={pA} side="A"/>
        <Score/>
        <div style={{display:"flex",alignItems:"center",gap:7,flex:1,minWidth:0,justifyContent:"flex-end"}}>
          {res==="B"&&<span style={{fontSize:14,flexShrink:0}}>🏆</span>}
          {pB&&<>
            <div style={{minWidth:0,textAlign:"right"}}>
              <div style={{fontWeight:res==="B"?900:700,fontSize:14,color:res==="B"?C.ink:C.body,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{pB.name}</div>
              <div style={{fontSize:10,color:C.muted}}>{pB.club}</div>
            </div>
            <FlagBadge flag={pB.flag} size={16}/>
          </>}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [officialAccounts] = useState([ADMIN_ACCOUNT]);
  const [clubs] = useState(CLUBS_INIT);
  const [players] = useState(PLAYERS_INIT);
  const [pairs] = useState(PAIRS_INIT);
  const [programEvents, setProgramEvents] = useState(() => seedProgram());
  const [rosters] = useState(ROSTERS_INIT);
  const [brackets, setBrackets] = useState({});

  const [view, setView] = useState("schedule");
  const [officialTab, setOfficialTab] = useState("program");
  const [bracketSport, setBracketSport] = useState(SPORTS[0]);
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

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const lookupParticipant = (sport, idOrObj) => {
    if(idOrObj && typeof idOrObj === "object" && !idOrObj.isTbd) return idOrObj;
    const id = typeof idOrObj === "object" ? idOrObj?.id : idOrObj;
    const meta = SPORT_META[sport];
    if(meta?.matchType==="doubles") return pairs.find(p=>p.id===id);
    return players.find(p=>p.id===id);
  };

  // ── Derive all matches from brackets ──────────────────────────────────────
  const allBracketMatches = () => {
    const out = [];
    Object.entries(brackets).forEach(([sport, t]) => {
      if(!t) return;
      const collect = (match) => {
        if(!match.pA||match.pA.isTbd) return;
        out.push({ ...match, sport, kind:"match" });
      };
      if(t.format==="knockout")       t.rounds?.forEach(r=>r.forEach(collect));
      if(t.format==="roundrobin")     t.rounds?.forEach(r=>r.matches?.forEach(collect));
      if(t.format==="swiss")          t.rounds?.forEach(r=>r.matches?.forEach(collect));
      if(t.format==="group_knockout") {
        t.groups?.forEach(g=>g.rounds?.forEach(r=>r.matches?.forEach(collect)));
        t.knockout?.rounds?.forEach(r=>r.forEach(collect));
      }
    });
    return out;
  };

  // ── Live ticker ────────────────────────────────────────────────────────────
  const liveNow = allBracketMatches().filter(m=>m.status==="live");

  // ── Schedule matches ──────────────────────────────────────────────────────
  const scheduleMatches = allBracketMatches().filter(m=>m.date&&m.status!=="finished");

  // ── Results ──────────────────────────────────────────────────────────────
  const resultMatches = allBracketMatches().filter(m=>m.status==="finished");

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
      <div key={date} style={{marginBottom:28}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{fontWeight:800,fontSize:13,color:C.red}}>{fmtDate(date)}</div>
          <div style={{flex:1,height:1,background:C.border}}/>
          <div style={{fontSize:11,color:C.muted,background:C.surface,border:`1px solid ${C.border}`,borderRadius:99,padding:"2px 8px"}}>{grouped[date].length} event{grouped[date].length!==1?"s":""}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {grouped[date].map((item,idx)=>(
            <div key={idx} style={{display:"flex"}}>
              <div style={{width:52,paddingTop:16,paddingRight:12,textAlign:"right",flexShrink:0}}>
                <span style={{fontSize:12,fontWeight:700,color:C.muted}}>{item._time||"—"}</span>
              </div>
              <div style={{flex:1}}>
                {item.kind==="match"
                  ? <MatchCard m={item} lookupParticipant={lookupParticipant}/>
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
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 0 14px",flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <img src={LOGO_DATA_URI} alt="Logo"
                onClick={()=>{
                  logoClickCount.current+=1;
                  if(logoClickTimer.current) clearTimeout(logoClickTimer.current);
                  logoClickTimer.current=setTimeout(()=>{logoClickCount.current=0;},600);
                  if(logoClickCount.current>=3){logoClickCount.current=0;if(!official)setShowLogin(true);}
                }}
                style={{width:48,height:48,borderRadius:12,boxShadow:`0 4px 16px ${C.redGlow}`,objectFit:"cover",cursor:"default",userSelect:"none"}}/>
              <div>
                <div style={{fontSize:20,fontWeight:900,color:C.ink,letterSpacing:"-0.5px",lineHeight:1}}>HUT RI <span style={{color:C.red}}>BJP</span> <span style={{fontSize:16,fontWeight:700,color:C.muted}}>2026</span></div>
                <div style={{fontSize:10,color:C.muted,letterSpacing:2,textTransform:"uppercase",marginTop:3}}>Indonesia Berdaulat Adil dan Makmur</div>
              </div>
            </div>
            {official&&(
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{textAlign:"right"}}><div style={{fontSize:12,fontWeight:700,color:C.ink}}>{official.badge} {official.role}</div><div style={{fontSize:11,color:C.muted}}>{official.username}</div></div>
                <button onClick={()=>{setOfficial(null);setView("schedule");showToast("Logged out");}} style={{...ghostBtn(false),padding:"7px 14px"}}>Sign out</button>
              </div>
            )}
          </div>
          <nav style={{display:"flex",gap:2,overflowX:"auto",marginBottom:"-1.5px"}}>
            {[["schedule","📅 Schedule"],["results","✅ Results"],["bracket","🔢 Brackets"],
              ...(official?[["official","⚙️ Officials"]]:[])
            ].map(([v,l])=><button key={v} style={navBtn(view===v)} onClick={()=>setView(v)}>{l}</button>)}
          </nav>
        </div>
      </div>

      <div style={{maxWidth:1040,margin:"0 auto",padding:"28px 16px"}}>

        {/* ── SCHEDULE ── */}
        {view==="schedule"&&<>
          <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:8}}>
            <h1 style={{fontSize:22,fontWeight:900,color:C.ink,margin:0}}>Schedule</h1>
            <span style={{fontSize:12,color:C.muted}}>{allScheduleItems.length} events</span>
          </div>
          <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"12px 16px",marginBottom:24}}>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1}}>VIEW</span>
              {[["All","All"],["match","Matches"],["program","Program"]].map(([v,l])=>(
                <button key={v} style={ghostBtn(filterKind===v)} onClick={()=>setFilterKind(v)}>{l}</button>
              ))}
              {filterKind!=="program"&&<>
                <div style={{width:1,height:20,background:C.border}}/>
                <span style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1}}>SPORT</span>
                {SPORTS.map(s=><button key={s} style={ghostBtn(filterSport===s)} onClick={()=>setFilterSport(s)}>{SPORT_META[s].emoji} {s}</button>)}
                <button style={ghostBtn(filterSport==="All")} onClick={()=>setFilterSport("All")}>All</button>
                <div style={{width:1,height:20,background:C.border}}/>
                <select style={{...inp,width:"auto",padding:"5px 10px",fontSize:12}} value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
                  {["All","scheduled","live","finished"].map(v=><option key={v} value={v}>{v.charAt(0).toUpperCase()+v.slice(1)}</option>)}
                </select>
              </>}
            </div>
          </div>
          <ScheduleList/>
        </>}

        {/* ── RESULTS ── */}
        {view==="results"&&<>
          <h1 style={{fontSize:22,fontWeight:900,color:C.ink,marginBottom:20}}>Results</h1>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
            {["All",...SPORTS].map(s=>(
              <button key={s} style={ghostBtn(filterSport===s)} onClick={()=>setFilterSport(s)}>
                {s!=="All"&&(SPORT_META[s]?.emoji+" ")}{s}
              </button>
            ))}
          </div>
          {resultMatches.filter(m=>filterSport==="All"||m.sport===filterSport)
            .sort((a,b)=>b.date?.localeCompare(a.date??"")||b.time?.localeCompare(a.time??""))
            .map((m,i)=>(
              <div key={i} style={{display:"flex",marginBottom:10}}>
                <div style={{width:52,paddingTop:16,paddingRight:12,textAlign:"right",flexShrink:0}}>
                  <span style={{fontSize:12,fontWeight:700,color:C.muted}}>{m.time||"—"}</span>
                </div>
                <div style={{flex:1}}><MatchCard m={m} lookupParticipant={lookupParticipant}/></div>
              </div>
            ))
          }
          {resultMatches.length===0&&(
            <div style={{textAlign:"center",color:C.faint,padding:64,fontSize:14}}>
              <div style={{fontSize:40,marginBottom:12}}>🏆</div>
              <div style={{fontWeight:700,color:C.muted,marginBottom:6}}>No results yet</div>
              <div style={{fontSize:12}}>Results appear here once you mark a match as finished.</div>
            </div>
          )}
        </>}

        {/* ── BRACKETS ── */}
        {view==="bracket"&&<>
          <h1 style={{fontSize:22,fontWeight:900,color:C.ink,marginBottom:18}}>Brackets</h1>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
            {SPORTS.map(s=><button key={s} onClick={()=>setBracketSport(s)} style={ghostBtn(bracketSport===s)}>{SPORT_META[s].emoji} {s}</button>)}
          </div>
          {!official&&(
            <div style={{background:C.redFaint,border:"1.5px solid #FECACA",borderRadius:10,padding:"10px 16px",marginBottom:16,fontSize:12,color:C.body,display:"flex",alignItems:"center",gap:8}}>
              🔒 Tournament draws are managed by officials.
              <button onClick={()=>setShowLogin(true)} style={{color:C.red,background:"none",border:"none",cursor:"pointer",fontWeight:700,fontSize:12,textDecoration:"underline"}}>Sign in →</button>
            </div>
          )}
          <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
            {(()=>{
              const t=brackets[bracketSport];
              const FL={knockout:"Knockout",roundrobin:"Round Robin",group_knockout:"Group + Knockout",swiss:"Swiss System"};
              if(!t) return <div style={{textAlign:"center",color:C.muted,padding:48,fontSize:14}}>No tournament drawn yet for {bracketSport}.</div>;
              return <>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                  <span style={{fontWeight:800,fontSize:14,color:C.ink}}>{bracketSport}</span>
                  <span style={{fontSize:11,fontWeight:700,color:C.red,background:C.redFaint,border:"1px solid #FECACA",borderRadius:99,padding:"2px 9px"}}>{FL[t.format]??t.format}</span>
                </div>
                {t.format==="knockout"       &&<KnockoutView rounds={t.rounds} sport={bracketSport} isOfficial={false}/>}
                {t.format==="roundrobin"     &&<RoundRobinView data={t} sport={bracketSport} isOfficial={false}/>}
                {t.format==="group_knockout" &&<GroupKnockoutView data={t} sport={bracketSport} isOfficial={false}/>}
                {t.format==="swiss"          &&<SwissView data={t} sport={bracketSport} isOfficial={false}/>}
              </>;
            })()}
          </div>
        </>}

        {/* ── OFFICIALS ── */}
        {view==="official"&&official&&<>
          <div style={{marginBottom:20}}>
            <h1 style={{fontSize:22,fontWeight:900,color:C.ink,margin:0}}>Officials Panel</h1>
            <div style={{fontSize:12,color:C.muted,marginTop:4}}>{official.badge} {official.role} · {official.username}</div>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
            {[["program","📌 Program"]].map(([v,l])=>(
              <button key={v} onClick={()=>setOfficialTab(v)} style={tabBtn(officialTab===v)}>{l}</button>
            ))}
          </div>

          {/* Program events */}
          {officialTab==="program"&&(
            <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,padding:22,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
              <div style={{fontWeight:800,color:C.ink,marginBottom:10,fontSize:15}}>Program Events</div>
              <div style={{fontSize:12,color:C.muted,marginBottom:18}}>Non-match events (ceremonies, meetings, press conferences, etc.) that appear in the public schedule.</div>

              {programEvents.sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time)).map(e=>(
                <div key={e.id} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:200}}>
                    <div style={{fontSize:11,color:C.muted,marginBottom:2}}>{fmtDate(e.date)} {e.time} · {e.venue||"TBA"}</div>
                    <div style={{fontWeight:700,fontSize:13,color:C.ink}}>{e.title}</div>
                    {e.description&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>{e.description}</div>}
                  </div>
                  <button onClick={()=>setEditProgItem(e)} style={{padding:"5px 12px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:700,border:`1.5px solid ${C.border}`,background:C.white,color:C.body}}>✏️ Edit</button>
                  <button onClick={()=>setProgramEvents(p=>p.filter(x=>x.id!==e.id))} style={{padding:"5px 10px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:700,border:"1.5px solid #FECACA",background:C.redFaint,color:C.red}}>🗑</button>
                </div>
              ))}

              {divider("ADD NEW EVENT")}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                <div style={{gridColumn:"1/-1"}}><label style={lbl}>TITLE</label><input style={inp} value={npForm.title} onChange={e=>setNpForm(f=>({...f,title:e.target.value}))} placeholder="Opening Ceremony, Technical Meeting…"/></div>
                <div><label style={lbl}>AUDIENCE</label><input style={inp} value={npForm.audience} onChange={e=>setNpForm(f=>({...f,audience:e.target.value}))} placeholder="All / Media / Athletes…"/></div>
                <div><label style={lbl}>DATE</label><input style={inp} type="date" value={npForm.date} onChange={e=>setNpForm(f=>({...f,date:e.target.value}))}/></div>
                <div><label style={lbl}>TIME</label><input style={inp} type="time" value={npForm.time} onChange={e=>setNpForm(f=>({...f,time:e.target.value}))}/></div>
                <div style={{gridColumn:"1/-1"}}><label style={lbl}>VENUE</label><input style={inp} value={npForm.venue} onChange={e=>setNpForm(f=>({...f,venue:e.target.value}))} placeholder="Main Hall…"/></div>
                <div style={{gridColumn:"1/-1"}}><label style={lbl}>DESCRIPTION (optional)</label><input style={inp} value={npForm.description} onChange={e=>setNpForm(f=>({...f,description:e.target.value}))} placeholder="Brief description…"/></div>
              </div>
              {npForm.title&&npForm.date&&<div style={{marginBottom:14}}><div style={{fontSize:10,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:8}}>PREVIEW</div><ProgramCard e={npForm}/></div>}
              <button style={primaryBtn} onClick={handleAddProgram}>📌 Add to Schedule</button>
            </div>
          )}
        </>}

        {view==="official"&&!official&&(
          <div style={{textAlign:"center",padding:80}}>
            <div style={{width:80,height:80,borderRadius:99,background:C.redFaint,border:"1.5px solid #FECACA",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 20px"}}>🔒</div>
            <div style={{fontSize:20,fontWeight:800,color:C.ink,marginBottom:8}}>Officials Only</div>
            <div style={{fontSize:14,color:C.muted,marginBottom:28}}>Sign in to access the Officials Panel.</div>
            <button style={primaryBtn} onClick={()=>setShowLogin(true)}>Sign In</button>
          </div>
        )}
      </div>

      {toast&&(
        <div style={{position:"fixed",bottom:24,right:24,zIndex:999,padding:"13px 22px",borderRadius:10,fontWeight:700,fontSize:14,color:C.white,background:toast.type==="error"?C.redDeep:"#166534",border:`1px solid ${toast.type==="error"?C.red:C.greenBorder}`,boxShadow:"0 6px 30px rgba(0,0,0,0.15)"}}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}