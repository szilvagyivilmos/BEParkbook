var express = require('express')
var app=express()
var port = process.env.PORT || 3000

var bodyParser = require('body-parser');


// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//
// var promise = require('bluebird');
//
// var options = {
//     // Initialization Options
//     promiseLib: promise
// };
//
// var pgp = require('pg-promise')(options);
// var connectionString = 'postgres://postgres:asdasd@localhost:5432/postgres';
// var client = pgp(connectionString);

module.exports=app

const pg = require('pg');
const connectionString = 'postgres://postgres:asdasd@localhost:5432/postgres';
const client = new pg.Client(connectionString);
client.connect();

//var db = mongoose.connect('mongodb://localhost/parkAPI')
//var park=require('./models/parkModel')


var parkRouter = express.Router()
app.use('/api',parkRouter)


parkRouter.route('/park').get(function(req,res){
    // console.log(req.query['asd'])
 
     const query= client.query("select st_x(ST_Transform(loc,4326)),st_y(ST_Transform(loc,4326)) from spot;").then(function(result,err){

        if(err) console.log(err)
        res.send(result['rows'])
     })
 })

 parkRouter.route('/addpark').post(function(req,res){
   
    x=Number( req.body.st_x)
    y=parseFloat(req.body.st_y)
    console.log( x,y)
    console.log(typeof(x),typeof(y))
    
    
    client.query('insert into spot(freed,loc,uploaded_by) values(now(),st_setsrid(st_makepoint($1,$2),4326),$3);',[req.body.st_x,req.body.st_y,req.body.uploaded_by]
   ) 
    .then(function () {
       
            console.log("asd")
        res.status(200)
            .json({
                status: 'success',
                message: 'Updated parks'
            });
        
    }).catch((error) => {
        console.log(error,'Promise error');
      })
 })

parkRouter.route('/parks').get(function(req,res){
   // console.log(req.query['asd'])

    const query= client.query("select * from spot;").then(function(result,err){
          res.send(result['rows'])
    })
})

parkRouter.route('/addparks').post(function(req,res){

  //  console.log(req.body)



    client.query('insert into hotels(name,star,comm) values($1,$2,$3)',
        [req.body.name, parseInt(req.body.star),req.body.comm])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated parks'
                });
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

        // db.any('select * from parks')
        //     .then(function (data) {
        //         res.status(200)
        //             .json({
        //                 status: 'success',
        //                 data: data,
        //                 message: 'Retrieved ALL puppies'
        //             });
        //     })
        //     .catch(function (err) {
        //         return next(err);
        //     });


})


app.listen(port,function(){

    console.log('Runing'+port)

})
