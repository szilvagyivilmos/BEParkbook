var bodyParser = require('body-parser')
var express = require('express')
var app=express()
var port = process.env.PORT || 3000 ;


app.use(bodyParser.json())

var parkRouter = express.Router()
app.use('/api',parkRouter)
 


module.exports=app

const pg = require('pg');
const connectionString = 'postgres://postgres:asdasd@localhost:5432/postgres';
const client = new pg.Client(connectionString);
client.connect();


parkRouter.route('/park').get(function(req,res){
     console.log("asd")
 
     const query= client.query("select id as key, st_x(ST_Transform(loc,4326)) as latitude,st_y(ST_Transform(loc,4326)) as longitude from spot limit 5;").then(function(result,err){

        if(err) console.log(err)
        res.send(result['rows'])
     }).catch((error) => {
        console.log(error,'Promise error');
    }) 
 })

 parkRouter.route('/addpark').post(function(req,res){
    if(req.body){
        client.query('insert into spot(freed,loc,uploaded_by) values(now(),st_setsrid(st_makepoint($1,$2),4326),$3);',
        [req.body.lon,req.body.lat,req.body.uploaded_by]) 
        .then(function() {
            res.status(200).json({
                    status: 'success',
                    message: 'Updated parks'
            });
            
        }).catch((error) => {
            console.log(error,'Promise error');
        })  
    }else{
        console.log("body doesnt exists")
    }
 })

parkRouter.route('/parks').get(function(req,res){
    console.log("asds")

    const query= client.query("select * from spot;").then(function(result,err){
          res.send(result['rows'])
    })
})

app.route('/park').get(function(req,res){
   res.sendfile('index.html')
})

app.route('/newpark').get(function(req,res){
    res.sendfile('upload.html')
})

app.get('/asd',function(req,res,next){
    res.send("asd")
    next()
},function(req,res,next){res.end("qwe")})



app.get('/',function(req,res){
      
})


app.listen(port,function(){

    console.log('Runing'+port)

})
