// Get requirements
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const path=require('path');
const favicon=require('serve-favicon');
const app=express();


let MODEL_PATH = './models/';


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

mongoose.connect('mongodb://vikram:urlpass@ds233970.mlab.com:33970/shorturl' || 'mongodb://localhost:27017/short').then(function () {


    const {Counter} = require(MODEL_PATH + 'shortUrl');
    // const {shortUrl} = require(MODEL_PATH + 'shortUrl');


        // shortUrl.remove({}, function() {
        // console.log('APP: URL collection emptied');
        // });

        Counter.remove({},function () {

            let data=new Counter({

                _id:'url_count',
                count:10000

            });

            data.save((err)=>{

                if(err) return console.error(err);
                // console.log('counter inserted');

            });

        });





}).catch((err)=>{
    console.log(err);
});

app.get('/favicon.ico', (req, res) => res.status(204));


app.use('/new',require('./routes/newUrl'));

app.use('/',require('./routes/urlForward'));



app.use('/',express.static(path.join(__dirname,'public')));


app.listen(process.env.PORT  || 4444,()=>{

    console.log("Server started at http://localhost:4444");

});