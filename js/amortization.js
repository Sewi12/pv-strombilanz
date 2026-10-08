window.Amortization={
 calculate(){
  const net=16988.80,o=Object.values(App.data.oemag).reduce((s,x)=>s+Number(x.credit||0),0);
  const self=Object.values(App.data.months).reduce((s,x)=>s+Number(x.self||0)*0.149,0);
  const recovered=o+self,open=Math.max(0,net-recovered),n=Object.keys(App.data.months).length;
  const annual=n?recovered/(n/12):0,left=annual?open/annual:null,pct=Math.min(100,recovered/net*100);
  return {net,recovered,open,annual,left,pct}
 },
 render(){
  const c=this.calculate(),set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
  set("dNet",App.euro(c.net));set("dRecovered",App.euro(c.recovered));set("dOpen",App.euro(c.open));
  set("aRecovered",App.euro(c.recovered));set("aOpen",App.euro(c.open));
  set("dAnnual",c.annual?App.euro(c.annual):"–");set("aAnnual",c.annual?App.euro(c.annual):"–");
  ["dBar","aBar"].forEach(id=>document.getElementById(id).style.width=c.pct+"%");
  set("dPct",App.num(c.pct,1)+" % amortisiert");set("aPct",App.num(c.pct,1)+" % amortisiert");
  let dur="Noch nicht berechenbar",date="Noch nicht berechenbar";
  if(c.left!==null){const y=Math.floor(c.left),m=Math.round((c.left-y)*12);dur=`ca. ${y} Jahre ${m} Monate`;const d=new Date();d.setMonth(d.getMonth()+Math.round(c.left*12));date=d.toLocaleDateString("de-AT",{month:"long",year:"numeric"})}
  set("dYears",dur);set("aYears",dur);set("dDate",date);set("aDate",date)
 }
};