var express =require('express')
var app =express()
var bodyParser =require('body-parser')
app.listen(3000,function(){
    console.log("start port 3000");
});
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) //인코딩된 데이터 주고받기 가능
app.set('view engine','ejs')
app.get('/',function(req,res){
    res.sendfile(__dirname+'/public/main.html')
});
app.get('/main',function(req,res){
    res.sendfile(__dirname+'/public/main.html')
});


app.post('/email_post',function(req,res){
    //get: req.param('email')
    console.log(req.body.email)
   // form.html 사용
    // res.send("<h1>post response"+req.body.email+"fff")
    res.render('email.ejs',{'email':req.body.email})
});