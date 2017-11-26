const express = require('express');
const hbs= require('hbs');
const fs=require('fs');
var app = express();

const port = process.env.PORT || 3000;
console.log(port);
//console.log(__dirname);
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

app.set('view engine','hbs');
//Creating a middleware
app.use((req,res,next)=>{
    var currentDate= new Date().toString();
    var log=`${currentDate} ${req.method} ${req.url}`;
    fs.appendFile('log.txt',log+'\n',(err)=>{
            if(err){
                console.log('Unable to log');
            }
    });

next();
});
/*app.use((req,res,next)=>{
    res.render('maintenence.hbs');
})*/
app.use(express.static(__dirname+'/public'));
//Using get to call the index page
app.get('/',(request,response)=>{
    //Use Render to call an hbs view
    response.render('index.hbs',{
        currentPage:'Home',
        welcomeMessage:'Welcome to my site!'
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        currentPage:'About'
    });
});
app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        currentPage:"Portfolio"
    });
})
app.get('/bad',(req,res)=>{
    res.send([{
        errormsg:'Unable to load servers'
    }]);
});
app.listen(port);