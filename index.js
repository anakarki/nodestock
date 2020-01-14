//Stock Market App by Ana Karki//

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT =  process.env.PORT || 5000;


//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));



//API KEY pk_af21bc94030c45d6997a4e30038a1ca6
//create call_api function
function call_api(finishedAPI, ticker) {
request('https://cloud.iexapis.com//stable/stock/' + ticker + '/quote?token=pk_af21bc94030c45d6997a4e30038a1ca6', {json:true },(err,res, body)=>{
if(err){return console.log(err);}
if (res.statusCode ===200){
	//console.log(body);
	finishedAPI(body)
};
});
							};


// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set handlebars index GET routes
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
		    res.render('home', {
    	stock: doneAPI
});
	});
 });
//call_api(function, req.body.stock_ticker)
// Set handlebars index POST routes
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
		//posted_stuff = req.body.stock_ticker;
		    res.render('home', {
    	stock: doneAPI,
    	//posted_stuff : posted_stuff
});
	}, req.body.stock_ticker);
 }); 

//create about page route
app.get('/About.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port '+ PORT));
