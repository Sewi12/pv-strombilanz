window.Oemag={
 save(){
  const m=document.getElementById("oMonth").value,k=+document.getElementById("oKwh").value,p=+document.getElementById("oPrice").value,c=+document.getElementById("oCredit").value;
  if(!m||!k||!p||!c){alert("Bitte Monat, Einspeisung, Marktpreis und Gutschrift eingeben.");return}
  App.data.oemag[m]={kwh:k,price:p,credit:c};Storage.save();App.renderAll();this.clear()
 },
 clear(){["oMonth","oKwh","oPrice","oCredit"].forEach(id=>document.getElementById(id).value="");document.getElementById("oCheck").textContent=""},
 edit(m){const x=App.data.oemag[m];App.page("oemag");oMonth.value=m;oKwh.value=x.kwh;oPrice.value=x.price;oCredit.value=x.credit;this.check()},
 check(){const k=+oKwh.value||0,p=+oPrice.value||0,c=+oCredit.value||0;if(k&&p)document.getElementById("oCheck").textContent=`Rechnerisch: ${App.euro(k*p/100)} · Differenz: ${App.euro(c-k*p/100)}`},
 render(){
  const rows=Object.keys(App.data.oemag).sort().reverse(), body=document.getElementById("oTable");
  let total=0;body.innerHTML=rows.map(m=>{const x=App.data.oemag[m],e=x.kwh*x.price/100,d=x.credit-e;total+=x.credit;return `<tr><td>${App.monthName(m)}</td><td>${App.num(x.kwh)} kWh</td><td>${App.num(x.price,4)} ct</td><td>${App.euro(e)}</td><td>${App.euro(x.credit)}</td><td class="${Math.abs(d)<.02?'good':'bad'}">${App.euro(d)}</td><td><button class="btn light" onclick="Oemag.edit('${m}')">Bearbeiten</button></td></tr>`}).join("")||'<tr><td colspan="7">Noch keine Gutschriften.</td></tr>';
  document.getElementById("oTotal").textContent=App.euro(total);
  document.getElementById("dOe").innerHTML=rows.map(m=>{const x=App.data.oemag[m];return `<tr><td>${App.monthName(m)}</td><td>${App.num(x.kwh)} kWh</td><td>${App.num(x.price,4)} ct</td><td>${App.euro(x.credit)}</td></tr>`}).join("")||'<tr><td colspan="4">Noch keine Gutschriften.</td></tr>'
 }
};