window.App={
 data:Storage.load(),
 euro(v){return Number(v||0).toLocaleString("de-AT",{style:"currency",currency:"EUR"})},
 num(v,d=2){return Number(v||0).toLocaleString("de-AT",{minimumFractionDigits:d,maximumFractionDigits:d})},
 monthName(m){return new Date(m+"-01T12:00:00").toLocaleDateString("de-AT",{month:"long",year:"numeric"})},
 page(id){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));document.getElementById(id).classList.add("active");document.querySelectorAll("#nav button").forEach(x=>x.classList.toggle("active",x.dataset.page===id));window.scrollTo({top:0,behavior:"smooth"})},
 renderAll(){Oemag.render();Months.render();Amortization.render();this.renderReminder()},
 renderReminder(){
  const d=new Date(),day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()-1);
  const m=d.toISOString().slice(0,7),missing=!this.data.oemag[m];
  document.getElementById("reminder").innerHTML=day>=10&&missing?`<div class="alert"><b>🔔 OeMAG-Gutschrift für ${this.monthName(m)} fehlt noch.</b><br><span class="small">Bitte Marktpreis, Einspeisung und tatsächliche Gutschrift manuell eintragen.</span><div class="actions"><button class="btn green" onclick="App.page('oemag');oMonth.value='${m}'">Jetzt eintragen</button></div></div>`:""
 }
};
document.querySelectorAll("#nav button").forEach(b=>b.addEventListener("click",()=>App.page(b.dataset.page)));
document.getElementById("importFile").addEventListener("change",e=>{if(e.target.files[0])Storage.import(e.target.files[0])});
["oKwh","oPrice","oCredit"].forEach(id=>document.getElementById(id).addEventListener("input",()=>Oemag.check()));
const now=new Date();document.getElementById("mMonth").value=now.toISOString().slice(0,7);
document.getElementById("oMonth").value=new Date(now.getFullYear(),now.getMonth()-1,1).toISOString().slice(0,7);
App.renderAll();
