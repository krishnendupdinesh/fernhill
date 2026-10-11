import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors()); app.use(express.json());
const products = [
 {id:'p1',name:'Monstera Deliciosa',price:38,category:'Plants',light:'bright indirect',petSafe:false,description:'A statement plant with iconic split leaves.',emoji:'🌿'},
 {id:'p2',name:'Snake Plant',price:24,category:'Plants',light:'low to bright indirect',petSafe:false,description:'A hardy, low-maintenance upright plant.',emoji:'🪴'},
 {id:'p3',name:'Parlor Palm',price:19,category:'Plants',light:'low to medium indirect',petSafe:true,description:'A compact, pet-friendlier leafy palm.',emoji:'🌴'},
 {id:'p4',name:'Spider Plant',price:16,category:'Plants',light:'bright indirect',petSafe:true,description:'An easy-care plant with arching leaves.',emoji:'🌱'},
 {id:'p5',name:'Ceramic Planter',price:18,category:'Pots',light:'',petSafe:true,description:'A neutral ceramic pot for your favourite plant.',emoji:'🏺'}
];
app.get('/api/health',(_req,res)=>res.json({ok:true}));
app.get('/api/products',(_req,res)=>res.json(products));
app.post('/api/chat',(req,res)=>{
 const message=String(req.body.message||'').toLowerCase(); let reply='I can help you choose a plant, understand its light needs, or learn about watering. Tell me about your room and routine.'; let productIds=[];
 if(/low light|dark room|little light/.test(message)){reply='For lower-light spaces, consider a Parlor Palm or Snake Plant. No plant thrives in complete darkness, so some natural or grow light is still important.';productIds=['p3','p2'];}
 else if(/pet|cat|dog|safe/.test(message)){reply='Parlor Palm and Spider Plant are commonly considered pet-friendlier choices. Avoid letting pets chew any plant, and verify the species if your pet is prone to nibbling.';productIds=['p3','p4'];}
 else if(/snake/.test(message)){reply='Snake plants prefer indirect light but tolerate lower light. Let the soil dry between waterings, and use a pot with drainage to help prevent root rot.';productIds=['p2'];}
 else if(/water|watering|care/.test(message)){reply='Check the soil before watering rather than following a fixed schedule. Water thoroughly when the plant’s needs indicate it, let excess drain, and make sure the pot has drainage holes.';}
 else if(/under|budget|price|\$|cheap/.test(message)){const limit=Number((message.match(/(?:under|below|less than)\s*\$?\s*(\d+)/)||[])[1]||30);productIds=products.filter(p=>p.category==='Plants'&&p.price<=limit).map(p=>p.id);reply=productIds.length?`Here are plant options at or under $${limit}.`:'I couldn’t find a plant within that budget in this demo catalogue.';}
 else if(/recommend|suggest|plant/.test(message)){reply='A good choice depends on your light, pets, and how often you want to water. Here are a few popular options to compare.';productIds=['p1','p2','p3'];}
 res.json({reply,productIds});
});
app.post('/api/checkout',(req,res)=>{const {items=[],customer={}}=req.body; if(!items.length)return res.status(400).json({error:'Your cart is empty.'}); const total=items.reduce((sum,i)=>{const p=products.find(p=>p.id===i.id);return sum+(p?p.price*Math.max(1,Number(i.quantity)||1):0)},0);res.json({ok:true,orderId:'FH-'+Date.now().toString().slice(-7),total,customerName:customer.name||'Plant lover',message:'Demo order placed successfully. No payment was taken.'});});
const port=process.env.PORT||4000; app.listen(port,()=>console.log(`Fernhill API running at http://localhost:${port}`));
