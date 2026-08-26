let currentQuiz=null, questions=[], index=0, score=0, mistakes=[], wrongChoices=[], lastMode=null;
const $=s=>document.querySelector(s);
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const sample=(a,n)=>shuffle(a).slice(0,n);
function show(id){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active");window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-home]").forEach(b=>b.onclick=()=>show("home"));
document.querySelectorAll(".menu-card").forEach(b=>b.onclick=()=>{let a=b.dataset.action;if(a==="reading")startReading();if(a==="conceptQuiz")startConcept();if(a==="cards")renderCards()});
function startReading(){lastMode="reading";currentQuiz="reading";questions=sample(READING_QUESTIONS,7).map(x=>({...x,options:shuffle(x.options.map((label,i)=>({label,orig:i})))}));start("VAD ÄR SOCIOLOGI? – QUIZ")}
function pickOnePerConcept(){
 const groups={}; CONCEPT_QUESTIONS.forEach(x=>(groups[x.answer]??=[]).push(x));
 let selected=Object.keys(groups).map(k=>sample(groups[k],1)[0]);
 const rest=CONCEPT_QUESTIONS.filter(x=>!selected.includes(x));
 return shuffle([...selected,...sample(rest,4)]);
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
function start(title){index=0;score=0;mistakes=[];wrongChoices=[];$("#quizTitle").textContent=title;show("quiz");renderQuestion()}
function renderQuestion(){
 const q=questions[index];$("#progress").textContent=`Fråga ${index+1} av ${questions.length}`;$("#questionText").textContent=q.q;
 $("#feedback").className="feedback hidden";$("#feedback").innerHTML="";$("#nextBtn").classList.add("hidden");
 const box=$("#answers");box.innerHTML="";
 if(currentQuiz==="reading") q.options.forEach(o=>addAnswer(o.label,o.orig===q.correct,q));
 else q.options.forEach(o=>addAnswer(o,o===q.answer,q));
}
function addAnswer(label,isCorrect,q){
 const b=document.createElement("button");b.className="answer";b.textContent=label;
 b.onclick=()=>answer(b,label,isCorrect,q);$("#answers").appendChild(b);
}
function answer(btn,label,isCorrect,q){
 document.querySelectorAll(".answer").forEach(b=>b.disabled=true);
 if(isCorrect){score++;btn.classList.add("correct");$("#feedback").classList.add("feedback-correct");$("#feedback").classList.remove("feedback-wrong");$("#feedback").innerHTML='<div class="fb-title">Rätt</div>';}
 else{
   btn.classList.add("wrong");$("#feedback").classList.add("feedback-wrong");$("#feedback").classList.remove("feedback-correct");
   let correctLabel=currentQuiz==="reading"?q.options.find(o=>o.orig===q.correct).label:q.answer;
   [...document.querySelectorAll(".answer")].find(b=>b.textContent===correctLabel)?.classList.add("correct");
   mistakes.push(correctLabel);
   if(currentQuiz==="reading"){
     $("#feedback").innerHTML=`<div class="fb-title">Fel – rätt svar är ${correctLabel}</div><div>${q.explanation}</div>`;
   }else{
     wrongChoices.push({correct:q.answer,chosen:label});
     $("#feedback").innerHTML=`<div class="concept-fb-heading">FEL</div><div class="concept-fb-explanation">${specificFeedback(q.answer,label,q.kind)}</div><div class="concept-fb-correctline">Rätt svar är <strong>${q.answer}</strong>.</div>`;
   }
 }
 $("#feedback").classList.remove("hidden");$("#nextBtn").classList.remove("hidden");
}
function specificFeedback(correct,chosen,kind){
 if(kind==="level") return levelContrast(correct,chosen);
 const key=`${correct}|${chosen}`;
 const feedback={
  "Social interaktion|Konformitet":"Här påverkar människor varandra i ett pågående samspel. Konformitet innebär mer specifikt att individen anpassar sig till gruppen för att följa gruppen eller passa in.",
  "Konformitet|Social interaktion":"Här är det individens anpassning till gruppen som är avgörande. Social interaktion är det bredare samspelet och den ömsesidiga påverkan mellan människor.",
  "Socialisation|Internalisering":"Socialisation beskriver hur individen lär sig normer, värderingar och beteenden från omgivningen. Internalisering innebär att sådant som kommer från omgivningen har blivit en del av individens eget sätt att tänka, känna eller se på sig själv.",
  "Internalisering|Socialisation":"Här har omgivningens uppfattningar eller värderingar blivit en del av individens eget sätt att tänka eller se på sig själv. Socialisation är den bredare processen där individen lär sig samhällets normer, värderingar och beteenden.",
  "Socialisation|Konformitet":"Här handlar det om att lära sig normer, värderingar eller beteenden genom uppväxt och sociala sammanhang. Konformitet är anpassning till en grupp, ofta för att passa in eller följa gruppen.",
  "Konformitet|Socialisation":"Här anpassar individen sig till gruppen. Socialisation är en bredare och ofta långvarig process där individen lär sig normer, värderingar och beteenden.",
  "Konformitet|Informell social kontroll":"Konformitet beskriver individens anpassning till gruppen. Informell social kontroll beskriver i stället hur gruppens oskrivna normer och sociala reaktioner påverkar individen.",
  "Informell social kontroll|Konformitet":"Här är det omgivningens sociala reaktioner eller oskrivna normer som fungerar som kontroll. Konformitet beskriver i stället individens anpassning till gruppen.",
  "Social kontroll|Formell social kontroll":"Social kontroll är det övergripande begreppet och omfattar både formell och informell kontroll. Formell social kontroll är den del som sker genom lagar, myndigheter och formella regler.",
  "Social kontroll|Informell social kontroll":"Social kontroll är det övergripande begreppet och omfattar både formell och informell kontroll. Informell social kontroll är den del som sker genom oskrivna normer och andra människors reaktioner.",
  "Formell social kontroll|Informell social kontroll":"Här sker kontrollen genom lagar, myndigheter eller formella regler. Informell social kontroll sker genom oskrivna normer och sociala reaktioner.",
  "Informell social kontroll|Formell social kontroll":"Här sker kontrollen genom oskrivna normer och sociala reaktioner. Formell social kontroll sker genom lagar, myndigheter eller formella regler.",
  "Socialisation|Social kontroll":"Socialisation handlar om hur individen lär sig normer, värderingar och beteenden. Social kontroll handlar om hur normer och regler upprätthålls genom reaktioner, regler och sanktioner.",
  "Social kontroll|Socialisation":"Här handlar det om hur normer och regler upprätthålls. Socialisation handlar i stället om hur individen lär sig normer, värderingar och beteenden."
 };
 if(feedback[key])return feedback[key];
 const right=CONCEPT_DEFS[correct]?.lead||"";
 const wrong=CONCEPT_DEFS[chosen]?.lead||"";
 return `${correct}: ${right} ${chosen}: ${wrong}`;
}
function levelContrast(correct,chosen){
 return `${correct} ${levelExplain(correct)} ${chosen} ${levelExplain(chosen)}`;
}
function levelExplain(x){
 return x==="Mikronivå"?"har fokus på individen och samspelet mellan enskilda människor.":
 x==="Mesonivå"?"har fokus på grupper, organisationer och gemenskaper där människor möts och påverkar varandra.":
 "har fokus på samhällets strukturer, institutioner och system.";
}
$("#nextBtn").onclick=()=>{index++;if(index<questions.length)renderQuestion();else finish()};
function confusionAdvice(){
 const pairCounts={};
 wrongChoices.forEach(({correct,chosen})=>{
   const pair=[correct,chosen].sort().join("|"); pairCounts[pair]=(pairCounts[pair]||0)+1;
 });
 const explanations={
  [ ["Socialisation","Internalisering"].sort().join("|") ]:"Läs på skillnaden mellan socialisation och internalisering: att lära sig normer och värderingar jämfört med att de blir en del av det egna sättet att tänka och se på sig själv.",
  [ ["Socialisation","Konformitet"].sort().join("|") ]:"Läs på skillnaden mellan socialisation och konformitet: långsiktig inlärning från omgivningen jämfört med anpassning till en grupp.",
  [ ["Social interaktion","Konformitet"].sort().join("|") ]:"Läs på skillnaden mellan social interaktion och konformitet: ömsesidigt samspel jämfört med anpassning till gruppen.",
  [ ["Konformitet","Informell social kontroll"].sort().join("|") ]:"Läs på skillnaden mellan konformitet och informell social kontroll: individens anpassning jämfört med gruppens oskrivna normer och sociala reaktioner.",
  [ ["Socialisation","Social kontroll"].sort().join("|") ]:"Läs på skillnaden mellan socialisation och social kontroll: hur normer lärs in jämfört med hur normer och regler upprätthålls.",
  [ ["Formell social kontroll","Informell social kontroll"].sort().join("|") ]:"Läs på skillnaden mellan formell och informell social kontroll: lagar och formella regler jämfört med oskrivna normer och sociala reaktioner.",
  [ ["Social kontroll","Formell social kontroll"].sort().join("|") ]:"Läs på skillnaden mellan social kontroll och formell social kontroll: social kontroll är det övergripande begreppet, medan formell social kontroll är kontroll genom lagar, myndigheter och formella regler.",
  [ ["Social kontroll","Informell social kontroll"].sort().join("|") ]:"Läs på skillnaden mellan social kontroll och informell social kontroll: social kontroll är det övergripande begreppet, medan informell social kontroll sker genom oskrivna normer och sociala reaktioner.",
  [ ["Mikronivå","Mesonivå"].sort().join("|") ]:"Läs på skillnaden mellan mikro- och mesonivå: individ och direkt samspel jämfört med grupper och organisationer.",
  [ ["Mesonivå","Makronivå"].sort().join("|") ]:"Läs på skillnaden mellan meso- och makronivå: grupper och organisationer jämfört med samhällsstrukturer och institutioner.",
  [ ["Mikronivå","Makronivå"].sort().join("|") ]:"Läs på skillnaden mellan mikro- och makronivå: individ och direkt samspel jämfört med samhällets övergripande strukturer."
 };
 return Object.entries(pairCounts).filter(([pair,count])=>count>=2&&explanations[pair]).map(([pair])=>explanations[pair]);
}
function finish(){
 show("result");
 const total=questions.length,pct=score/total;
 $("#score").innerHTML=`<span>${score}/${total}</span>`;
 $("#resultLead").textContent=pct>=.85?"Mycket bra resultat.":pct>=.65?"Bra grund. Några delar kan tränas mer.":"Fortsätt träna på innehållet.";
 if(currentQuiz==="concept"){
   const missed=[...new Set(mistakes)];
   const all=["Socialisation","Social interaktion","Internalisering","Konformitet","Social konstruktion","Social kontroll","Formell social kontroll","Informell social kontroll","Mikronivå","Mesonivå","Makronivå"];
   const good=all.filter(x=>!missed.includes(x)).slice(0,4);
   const goodText=good.length?good.map(x=>`<p>${x}</p>`).join(""):"<p>Fortsätt träna på begreppen.</p>";
   const trainText=missed.length?missed.map(x=>`<p>${x}</p>`).join(""):"<p>Inga särskilda begrepp behöver repeteras.</p>";
   const confusions=confusionAdvice();
   const confusionBox=confusions.length?`<div class="result-box confusion"><h3>Begrepp att skilja på</h3>${confusions.map(x=>`<p>${x}</p>`).join("")}</div>`:"";
   $("#resultText").innerHTML=`<div class="result-box good"><h3>Bra koll på</h3>${goodText}</div><div class="result-box train"><h3>Träna mer på</h3>${trainText}</div>${confusionBox}`;
 }else{
   const misses=mistakes.length;
   const goodText=score>=5?"<p>Sociologins grundläggande studieområde.</p><p>Människan som social varelse och samhällsförändringar.</p>":"<p>De delar av häftet som du svarade rätt på.</p>";
   const trainText=misses?"<p>Repetera de delar av häftet som frågorna du missade handlade om.</p>":"<p>Inga särskilda delar behöver repeteras.</p>";
   $("#resultText").innerHTML=`<div class="result-box good"><h3>Bra koll på</h3>${goodText}</div><div class="result-box train"><h3>Träna mer på</h3>${trainText}</div>`;
 }
}
$("#retryBtn").onclick=()=>lastMode==="reading"?startReading():startConcept();
function renderCards(){
 const g=$("#cardsGrid");g.innerHTML="";
 Object.entries(CONCEPT_DEFS).forEach(([term,def])=>{
   const el=document.createElement("div");el.className="flip";
   el.innerHTML=`<div class="flip-inner"><div class="face front">${term}</div><div class="face back"><div class="card-copy"><strong>${def.lead}</strong><p>${def.body}</p><p class="card-example"><span>Exempel:</span> <em>${def.example}</em></p></div></div></div>`;
   el.onclick=()=>el.classList.toggle("flipped");g.appendChild(el);
 });show("cards");
}
