const express= require('express');
const app = express();
const axios = require('axios');

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.post('/home',(req,res)=>{
	const c = req.body.city;
	axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=6efb43bae599c0388f1a32c86522db4e`)
	.then(res2=>{
		const desc = res2.data.weather[0].description;
		const temp= Math.floor(Number(res2.data.main.temp))-273;
		const img = res2.data.weather[0].icon;
		const imgurl= `http://openweathermap.org/img/wn/${img}@2x.png`
		res.render("home",{t: temp, c:c, i:imgurl, d:desc});
	}).catch(e=>{
		res.send("NOT FOUND!!");
	})
	
});
app.get('/',(req,res)=>{
	res.render('form');
})
app.get('/home',(req,res)=>{
		const c = "London";
		const desc = "Smoke";
		const temp= 25;
		const imgurl="https://i.pinimg.com/736x/a5/aa/d5/a5aad5bec1d924d0274953a8329239e6.jpg"
		res.render("home",{t: temp, c:c, i:imgurl, d:desc});
});
app.listen(3000,()=>{
	console.log("server up!!");
})