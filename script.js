const defaultData={
 settings:{name:"NUR Umrah & Hajj Travel",phone:"+880 1XXX-XXXXXX",whatsapp:"+880 1XXX-XXXXXX",email:"info@nurtravel.com",address:"Your office address, Dhaka, Bangladesh",about:"NUR Umrah & Hajj Travel is dedicated to helping pilgrims plan their sacred journey with confidence. We focus on clear package information, practical travel coordination and responsive assistance.",accent:"#d9b25f"},
 packages:[
  {name:"Economy Umrah",type:"Umrah",days:"10 Days",price:"৳ 95,000",tag:"BEST VALUE",hotel:"3★ Hotel",desc:"A practical package for budget-conscious pilgrims."},
  {name:"Standard Umrah",type:"Umrah",days:"14 Days",price:"৳ 125,000",tag:"POPULAR",hotel:"4★ Hotel",desc:"Comfortable accommodation with balanced services."},
  {name:"Premium Umrah",type:"Umrah",days:"21 Days",price:"৳ 185,000",tag:"PREMIUM",hotel:"5★ Hotel",desc:"Enhanced comfort and dedicated support."},
  {name:"Economy Hajj",type:"Hajj",days:"30–45 Days",price:"৳ 5,50,000",tag:"ECONOMY",hotel:"AC Hotel",desc:"Value-focused Hajj package with essential services."},
  {name:"Standard Hajj",type:"Hajj",days:"30–35 Days",price:"৳ 6,70,000",tag:"POPULAR",hotel:"3★ Hotel",desc:"Balanced Hajj package for comfortable group travel."},
  {name:"Premium Hajj",type:"Hajj",days:"30–35 Days",price:"৳ 7,90,000",tag:"PREMIUM",hotel:"3★ Hotel",desc:"Premium arrangements and enhanced travel support."}
 ],
 gallery:[
  {title:"Masjid al-Haram",url:"https://images.unsplash.com/photo-1564769625392-651b89c31e2a?auto=format&fit=crop&w=1200&q=85"},
  {title:"Masjid an-Nabawi",url:"https://images.unsplash.com/photo-1542816417-09836776b8d8?auto=format&fit=crop&w=900&q=85"},
  {title:"Sacred Journey",url:"https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=85"},
  {title:"Peace & Prayer",url:"https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=900&q=85"}
 ],
 reviews:[
  {name:"Pilgrim Review",text:"Alhamdulillah, the journey was smooth and the support was very helpful."},
  {name:"Family Pilgrim",text:"Clear communication and caring service from booking to return."},
  {name:"Umrah Pilgrim",text:"A professional experience with helpful travel guidance."}
 ]};
function getData(){try{const d=JSON.parse(localStorage.getItem("nurTravelData"));return d?d:defaultData}catch(e){return defaultData}}
function saveData(d){localStorage.setItem("nurTravelData",JSON.stringify(d))}
let data=getData(); saveData(data);
document.documentElement.style.setProperty("--accent",data.settings.accent);
const q=s=>document.querySelector(s);
q("#year").textContent=new Date().getFullYear();
function render(){
 data=getData();
 document.title=data.settings.name;
 q(".brand span").innerHTML=`NUR <b>Umrah & Hajj Travel</b>`;
 q("#aboutText").textContent=data.settings.about;
 q("#phoneText").textContent=data.settings.phone;q("#phoneText2").textContent=data.settings.phone;
 q("#emailText").textContent=data.settings.email;q("#emailText2").textContent=data.settings.email;
 q("#addressText").textContent=data.settings.address;q("#waText").textContent=data.settings.whatsapp;
 let wa=data.settings.whatsapp.replace(/\D/g,""); q("#waLink").href=`https://wa.me/${wa}`;
 const query=(q("#search").value||"").toLowerCase(); const type=q("#type").value;
 const list=data.packages.filter(p=>(!query||JSON.stringify(p).toLowerCase().includes(query))&&(!type||p.type===type));
 q("#packagesGrid").innerHTML=list.map((p,i)=>`<article class="package"><div class="package-top"><span class="tag">${p.tag}</span><h3>${p.name}</h3></div><div class="package-body"><p>${p.desc}</p><div class="meta"><span>⏱ ${p.days}</span><span>🏨 ${p.hotel}</span></div><div class="price">${p.price} <small>/ person*</small></div><a class="btn gold" href="#booking" data-p="${i}">Enquire Now →</a></div></article>`).join("");
 q("#bookingPackage").innerHTML=data.packages.map(p=>`<option>${p.name}</option>`).join("");
 q("#galleryGrid").innerHTML=data.gallery.map((g,i)=>`<div class="gallery-item" style="background-image:url('${g.url}')"><span>${g.title}</span></div>`).join("");
 q("#reviewsGrid").innerHTML=data.reviews.map(r=>`<article class="review"><div class="stars">★★★★★</div><p>“${r.text}”</p><b>— ${r.name}</b></article>`).join("");
 document.querySelectorAll("[data-p]").forEach(a=>a.addEventListener("click",()=>q("#bookingPackage").value=list[+a.dataset.p].name));
}
q("#search").addEventListener("input",render);q("#type").addEventListener("change",render);
q(".menu").addEventListener("click",()=>q(".nav nav").classList.toggle("open"));
document.querySelectorAll(".nav nav a").forEach(a=>a.addEventListener("click",()=>q(".nav nav").classList.remove("open")));
q("#bookingForm").addEventListener("submit",e=>{
 e.preventDefault(); const f=new FormData(e.target); const bookings=JSON.parse(localStorage.getItem("nurBookings")||"[]");
 bookings.unshift({id:Date.now(),name:f.get("name"),phone:f.get("phone"),package:f.get("package"),date:f.get("date"),message:f.get("message"),created:new Date().toLocaleString()});
 localStorage.setItem("nurBookings",JSON.stringify(bookings)); q("#formMsg").textContent="Enquiry saved successfully. The admin can view it in the Admin Panel.";q("#formMsg").style.color="#1d714e";e.target.reset();
});
render();
