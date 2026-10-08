window.Storage={
 key:"pvstrombilanz_v3",
 defaultData:{oemag:{
  "2026-06":{kwh:825.33,price:6.7720,credit:55.89},
  "2026-08":{kwh:622.12,price:8.9970,credit:55.97}
 },months:{}},
 load(){
  try{return JSON.parse(localStorage.getItem(this.key))||structuredClone(this.defaultData)}
  catch(e){return structuredClone(this.defaultData)}
 },
 save(){localStorage.setItem(this.key,JSON.stringify(App.data))},
 export(){
  const blob=new Blob([JSON.stringify(App.data,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="PV-Strombilanz-v3-Daten.json";a.click();URL.revokeObjectURL(a.href)
 },
 import(file){
  const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d.oemag||!d.months)throw 0;App.data=d;this.save();App.renderAll();alert("Daten importiert.")}catch(e){alert("Die Datei konnte nicht importiert werden.")}};r.readAsText(file)
 }
};