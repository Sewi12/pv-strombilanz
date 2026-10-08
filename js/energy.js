window.Months={
 save(){
  const m=mMonth.value;if(!m){alert("Bitte einen Monat auswählen.");return}
  App.data.months[m]={pv:+mPv.value||0,self:+mSelf.value||0,grid:+mGrid.value||0,feed:+mFeed.value||0,cost:+mCost.value||0};Storage.save();App.renderAll();this.clear()
 },
 clear(){["mMonth","mPv","mSelf","mGrid","mFeed","mCost"].forEach(id=>document.getElementById(id).value="")},
 edit(m){const x=App.data.months[m];App.page("months");mMonth.value=m;mPv.value=x.pv;mSelf.value=x.self;mGrid.value=x.grid;mFeed.value=x.feed;mCost.value=x.cost},
 remove(m){if(confirm("Monatsdaten löschen?")){delete App.data.months[m];Storage.save();App.renderAll()}},
 render(){
  const rows=Object.keys(App.data.months).sort().reverse();
  document.getElementById("mTable").innerHTML=rows.map(m=>{const x=App.data.months[m];return `<tr><td>${App.monthName(m)}</td><td>${App.num(x.pv)} kWh</td><td>${App.num(x.self)} kWh</td><td>${App.num(x.grid)} kWh</td><td>${App.num(x.feed)} kWh</td><td>${App.euro(x.cost)}</td><td><button class="btn light" onclick="Months.edit('${m}')">Bearbeiten</button> <button class="btn red" onclick="Months.remove('${m}')">×</button></td></tr>`}).join("")||'<tr><td colspan="7">Noch keine Monatsdaten.</td></tr>'
 }
};