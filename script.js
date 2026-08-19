let currentQuiz=null, questions=[], index=0, score=0, mistakes=[], lastMode=null;
const $=s=>document.querySelector(s);
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const sample=(a,n)=>shuffle(a).slice(0,n);
function show(id){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active");window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-home]").forEach(b=>b.onclick=()=>show("home"));
document.querySelectorAll(".menu-card").forEach(b=>b.onclick=()=>{let a=b.dataset.action;if(a==="reading")startReading();if(a==="conceptQuiz")startConcept();if(a==="cards")renderCards()});
function startReading(){lastMode="reading";currentQuiz="reading";questions=sample(READING_QUESTIONS,7).map(x=>({...x,options:shuffle(x.options.map((label,i)=>({label,orig:i})))}));start("VAD ÄR SOCIOLOGI? – QUIZ")}
function pickOnePerConcept(){
 const groups={}; CONCEPT_QUESTIONS.forEach(x=>(groups[x.answer]??=[]).push(x));
 let selected=Object.keys(groups).map(k=>sample(groups[k],1)[0]); // 8 guaranteed
 const rest=CONCEPT_QUESTIONS.filter(x=>!selected.includes(x));
 return shuffle([...selected,...sample(rest,4)]); // 12 total
}
function startConcept(){
 lastMode="concept";currentQuiz="concept";
 let normal=pickOnePerConcept().map(x=>{
   let wrong=sample(NON_LEVEL_CONCEPTS.filter(c=>c!==x.answer),3);
   return {q:x.q,answer:x.answer,options:shuffle([x.answer,...wrong]),kind:"concept"};
 });
 let levels=["Mikronivå","Mesonivå","Makronivå"].map(level=>sample(LEVEL_QUESTIONS.filter(x=>x.answer===level),1)[0])
   .map(x=>({q:x.q,answer:x.answer,options:LEVEL_OPTIONS,kind:"level"}));
 questions=[...normal,...levels]; start("BEGREPPSQUIZ");
}
function start(title){index=0;score=0;mistakes=[];$("#quizTitle").textContent=title;show("quiz");renderQuestion()}
function renderQuestion(){
 const q=questions[index];$("#progress").textContent=`Fråga ${index+1} av ${questions.length}`;$("#questionText").textContent=q.q;
 $("#feedback").className="feedback hidden";$("#feedback").innerHTML="";$("#nextBtn").classList.add("hidden");
 const box=$("#answers");box.innerHTML="";
 if(currentQuiz==="reading"){
   q.options.forEach(o=>addAnswer(o.label, o.orig===q.correct, q));
 }else q.options.forEach(o=>addAnswer(o,o===q.answer,q));
}
function addAnswer(label,isCorrect,q){
 const b=document.createElement("button");b.className="answer";b.textContent=label;
 b.onclick=()=>answer(b,label,isCorrect,q);$("#answers").appendChild(b);
}
function answer(btn,label,isCorrect,q){
 document.querySelectorAll(".answer").forEach(b=>{b.disabled=true});
 if(isCorrect){score++;btn.classList.add("correct");$("#feedback").classList.add("feedback-correct");$("#feedback").classList.remove("feedback-wrong");$("#feedback").innerHTML='<div class="fb-title">Rätt</div>';}
 else{
   btn.classList.add("wrong");$("#feedback").classList.add("feedback-wrong");$("#feedback").classList.remove("feedback-correct");
   let correctLabel=currentQuiz==="reading" ? q.options.find(o=>o.orig===q.correct).label : q.answer;
   [...document.querySelectorAll(".answer")].find(b=>b.textContent===correctLabel)?.classList.add("correct");
   mistakes.push(currentQuiz==="reading" ? correctLabel : q.answer);
   if(currentQuiz==="reading"){
     $("#feedback").innerHTML=`<div class="fb-title">Fel – rätt svar är ${correctLabel}</div><div>${q.explanation}</div>`;
   }else{
     let wrongExplain = q.kind==="level" ? levelExplain(label) : (CONCEPT_DEFS[label]||"");
     let rightExplain = q.kind==="level" ? levelExplain(q.answer) : CONCEPT_DEFS[q.answer];
     $("#feedback").innerHTML=`<div class="fb-title">Fel – rätt svar är ${q.answer}</div><div>${label} ${sentenceTail(wrongExplain)}</div><br><div>${q.answer} däremot ${sentenceTail(rightExplain)}</div>`;
   }
 }
 $("#feedback").classList.remove("hidden");$("#nextBtn").classList.remove("hidden");
}
function sentenceTail(s){if(!s)return "";let t=s.charAt(0).toLowerCase()+s.slice(1);return t}
function levelExplain(x){
 return x==="Mikronivå"?"har fokus på individen och samspelet mellan enskilda människor.":
 x==="Mesonivå"?"har fokus på grupper, organisationer och gemenskaper där människor möts och påverkar varandra.":
 "har fokus på samhällets strukturer, institutioner och system.";
}
$("#nextBtn").onclick=()=>{index++;if(index<questions.length)renderQuestion();else finish()};
function finish(){
 show("result");
 const total=questions.length;
 const pct=score/total;
 $("#score").innerHTML=`<span>${score}/${total}</span>`;
 let lead=pct>=.85?"Mycket bra resultat.":pct>=.65?"Bra grund. Några delar kan tränas mer.":"Fortsätt träna på innehållet.";
 $("#resultLead").textContent=lead;

 if(currentQuiz==="concept"){
   const missed=[...new Set(mistakes)];
   const all=["Socialisation","Social interaktion","Internalisering","Konformitet","Social konstruktion","Social kontroll","Formell social kontroll","Informell social kontroll","Mikronivå","Mesonivå","Makronivå"];
   const good=all.filter(x=>!missed.includes(x)).slice(0,4);
   const goodText=good.length?good.map(x=>`<p>${x}</p>`).join(""):"<p>Fortsätt träna på begreppen.</p>";
   const trainText=missed.length?missed.map(x=>`<p>${x}</p>`).join(""):"<p>Inga särskilda begrepp behöver repeteras.</p>";
   $("#resultText").innerHTML=`<div class="result-box good"><h3>Bra koll på</h3>${goodText}</div><div class="result-box train"><h3>Träna mer på</h3>${trainText}</div>`;
 }else{
   const misses=mistakes.length;
   const goodText=score>=5
     ?"<p>Sociologins grundläggande studieområde.</p><p>Människan som social varelse och samhällsförändringar.</p>"
     :"<p>De delar av häftet som du svarade rätt på.</p>";
   const trainText=misses
     ?"<p>Repetera de delar av häftet som frågorna du missade handlade om.</p>"
     :"<p>Inga särskilda delar behöver repeteras.</p>";
   $("#resultText").innerHTML=`<div class="result-box good"><h3>Bra koll på</h3>${goodText}</div><div class="result-box train"><h3>Träna mer på</h3>${trainText}</div>`;
 }
} 
$("#retryBtn").onclick=()=>lastMode==="reading"?startReading():startConcept();
function renderCards(){
 const g=$("#cardsGrid");g.innerHTML="";
 Object.entries(CONCEPT_DEFS).forEach(([term,def])=>{
   const el=document.createElement("div");el.className="flip";
   el.innerHTML=`<div class="flip-inner"><div class="face front">${term}</div><div class="face back">${def}</div></div>`;
   el.onclick=()=>el.classList.toggle("flipped");g.appendChild(el);
 });show("cards");
}