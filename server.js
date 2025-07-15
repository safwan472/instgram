const express = require("express");
const app = express();
const hbs = require("hbs");
const session=require("express-session");
const nocache = require("nocache");

app.use(express.static("public"));
app.set("view engine", "hbs");

const username="safwan";
const password="saf123";

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(session({
  secret:"keyboard cat",
  resave:false,
  saveUninitialized:true,

}));

app.use(nocache());

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});



app.get("/", (req, res) => {
  if(req.session.user){
    res.redirect("/home");
  }else{
    res.render("login",{msg:req.session.msg});
    req.session.msg=null;
  }
});

app.post("/verify",(req,res)=>{
    console.log(req.body);
if(req.body.username===username && req.body.password===password){

  req.session.user=req.body.username

res.redirect("/home")

}else{
req.session.msg="Invalid username or password";
res.redirect("/");

}

});

app.get('/home',(req,res)=>{
  if(req.session.user){
    res.render("home");
  }else{
  
  res.redirect("/");

  }

});
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});


app.listen(3003, () => console.log("https://a6d668fb6acc.ngrok-free.app/"));