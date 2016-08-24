



/*!=========================== includes ======*/

var express = require('express'),
	http = require('http'),
	path = require('path'),
	url = require('url'),
	CMUDict = require('cmudict').CMUDict,
	PythonShell = require('python-shell'),
	osc = require("osc"),
	os = require("os"),
	spark = require("spark"),
    _ = require("underscore"),
    SSE = require('express-sse'),
    Pandorabot = require('pb-node'),
    request = require("request");




	


/*!========================== server ====*/


var app = express();
var router = express.Router();
app.set('port', process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, 'public')));

// start the server
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Server started at port: ' + port);
});

var sse = new SSE(["starting SSE"]);


app.get('/', function (req, res) {

  	res.sendFile(path.join(__dirname + '/public/conversation.html') );

});

app.get('/stream', sse.init);


app.get('/say', function(req, res, next) {
	var msg = req.query.txt;
	
	sayToCUI(msg, function(response){
		
		var ret = {};
	
		ret['cuiText'] 	= response;
		ret['speak']	= "yes";
		
		ret['uptime'] 	= os.uptime();	 // been awake for x amt of time
		ret['loadavg'] 	= os.loadavg();	 // how many tasks comp is performing
		ret['totalmem'] = os.totalmem(); // how complicated those tasks can be
		ret['freemem'] 	= os.freemem();	 // can do x amount more complicated stuff
	  	
	  	
		if(msg.indexOf("can you") > -1 || msg.indexOf("will you") > -1 ){
			ret['speak'] = "no";
		
			var cpu 	= randInt(50, 255),
				prog	= randInt(20000, 60000),
				speed	= randInt(500, 2000);
		  	
		  	
		  	console.log("cpu: "+cpu+" - prog: "+prog+" - speed: "+speed);
		  	
			SERVO.callFunction("startservos", speed+","+prog, function(result) {
				console.log(result);
			});
			
			setTimeout(function(){

				FAN.callFunction("setfan", ""+cpu, function(result) {
					console.log("FAN: "+cpu);
				});

			}, randInt(500, 1000));
			
			
			setTimeout(function(){

				FAN.callFunction("setfan", "0", function(result) {
					console.log("FAN: 0");
				});

			}, prog+1000)
		  		
		  	
		}
		
	  	console.log(ret);
	  	
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify(ret));
	});
	
});




  
app.get('/bleep', function(req, res, next) {
	var bleep = req.query.bleeps;
	
	if(bleep == 'random'){
		randomBleep();
	}else{
	  	bleeps = bleep.split(',');
	  	for(var i=0; i<bleeps.length; i++) { bleeps[i] = +bleeps[i]; }
	  	doBleep(bleeps);
	}
	
	bleepsString = bleeps.join(',');
	
	req.query.bleeps = bleepsString;
	
	
	if(req.query.showInterface == 'no'){
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(bleepsString);
	}else{
  		res.sendFile(path.join(__dirname + '/public/bleeps.html') );
	}

});

app.get('/script', function(req, res, next) {
	
	if(req.query.showInterface == 'no'){
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(bleepsString);
	}else{
  		res.sendFile(path.join(__dirname + '/public/script_1.html') );
	}

});

app.get('/timer', function(req, res, next) {
	
	if(req.query.showInterface == 'no'){
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(bleepsString);
	}else{
  		res.sendFile(path.join(__dirname + '/public/timer.html') );
	}

});



app.get('/phoneme', function(req, res, next) {
	var phrase = req.query.phrase;
	var mode   = req.query.mode;
	
	if(mode == "tune"){
		getPhonemes(req.query.phrase, function(ret) {
			res.writeHead(200, {"Content-Type": "application/json"});
			res.end(ret);
		});
	}else if(mode == "phoneme"){
		phrase = phrase.split(' ');
	
		var fullPhoneme = '';
		for(var i=0; i < phrase.length; i++){
			
			fullPhoneme += cmudict.get(phrase[i])+' ';
		}
		res.end(fullPhoneme);
	}else{
		res.end("define a mode, dumbass. available modes: tune, phoneme");
	}
	
  	
});

app.get('/analyze', function(req, res, next) {
	var phrase = req.query.phrase;
	
	analyze(phrase, "user");
	
  	res.end("ヽ(>∀<☆)ノ");
});


app.get('/status', function(req, res, next) {
	
	var ret = {};
	
	
	ret['uptime'] = os.uptime();	 // been awake for x amt of time
	ret['loadavg'] = os.loadavg();	 // how many tasks comp is performing
	ret['totalmem'] = os.totalmem(); // how complicated those tasks can be
	ret['freemem'] = os.freemem();	 // can do x amount more complicated stuff
  	
	console.log(ret);
	
	res.writeHead(200, {"Content-Type": "application/json"});
  	res.end(JSON.stringify(ret));
});




app.get('/FAN', function(req, res, next) {
	var speed = req.query.speed;
	

	FAN.callFunction("setfan", speed, function(result) {
		console.log("FAN: "+speed);
	});

	
	res.send('⌒(°▽°)ノ');
  	
});

app.get('/LED', function(req, res, next) {
	var mode = req.query.mode;
	var data = req.query.data;
	
	LED.callFunction(""+mode, data, function(result) {
		console.log("LED: "+mode);
	});
	
	res.send('⊂((・▽・))⊃');
  	
});

app.get('/SERVO', function(req, res, next) {
	var mode = req.query.mode;
	var data = req.query.data;
	
	SERVO.callFunction(""+mode, data, function(result) {
		console.log("SERVO: "+mode);
	});
	
	res.send('⌒(o＾▽＾o)ノ');
  	
});

/*!=========================== osc ======*/


var udpPort = new osc.UDPPort({
    // This is the port we're listening on.
    localAddress: "127.0.0.1",
    localPort: 57121,

    // This is where sclang is listening for OSC messages.
    remoteAddress: "127.0.0.1",
    remotePort: 57120
});

// Open the socket.
udpPort.open();






/*!========================== bleeps ====*/



var bleeps;


function doBleep(bleeps){
	console.log(bleeps);
	var msg = {
        address: "/playtone",
        args: bleeps
    };
	udpPort.send(msg);
}
function randomBleep(){
	var numBleeps = randInt(3, 10);
	bleeps = [numBleeps];
	
	for(var i = 0; i<numBleeps; i++){
		bleeps.push(randInt(100, 600));
		bleeps.push(randInt(1, 30));
	}

    doBleep(bleeps);
}

function bleepRandomly(){
	setInterval(function() {
		randomBleep();
	}, 3000);
}

function randInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}







/*!========================== phonemes ====*/

var cmudict = new CMUDict();
var phnm = cmudict.get('Loading');

var duration = 80;
var pitch = '110:0';
var wordbreakPause = 500;


function getPhonemes(phrase, callback){

	phrase = phrase.replace(/[.,\/#!$%\?\^&\*;:{}=\-_`~()]/g,"").split(' ');
	
	var fullPhoneme = '';
	for(var i=0; i < phrase.length; i++){
		fullPhoneme += cmudict.get(phrase[i])+' ';
	}
	
	convertPhonemes(fullPhoneme, function(ret){
		callback(ret);
	});
	
}

function convertPhonemes(cmu, callback){
	var options = {
	  mode: 'text', 
	  args: ['--phones2phones', 'cmu', 'mac', cmu]
	};
	
	var macPhonemes = '';
	console.log('cmu: '+cmu);
	
	PythonShell.run('lexconvert.py', options, function (err, results) {
		if (err) throw err;
		
		macPhonemes += results;
		console.log('osx: '+macPhonemes);
		  
		var output = '[[inpt TUNE]]'+"\n";
		
		var phnmArr = macPhonemes.split(' ');
		for(var j=0; j < phnmArr.length; j++){
			if(phnmArr[j] != ''){
				phnmArr[j] += ' {D '+duration+'; P '+pitch+'}'+"\n";
			}
		}
		macPhonemes = phnmArr.join('');
		
		output += macPhonemes+', {D '+wordbreakPause+'}'+"\n"+'~'+"\n";
		
		output += '[[inpt TEXT]]';
		
		callback(output);
	});


}






/*!======================= CHATBOT ====*/
var pbOptions = {
  url: 'https://aiaas.pandorabots.com',
  app_id: "1409612789783",
  user_key: "5fd27b9bbcbd29a0797a00e5a846ce27",
  botname: "tab0"
};

var bot = new Pandorabot(pbOptions);



function sayToCUI(msg, callback){
	
	var talkParams = {
	  client_name: "user",
	  sessionid: "0",
	  input: msg,
	  extra: false,
	  trace: true,
	  recent: false
	}
	
	
	//get chatbot output
	bot.talk(talkParams, function (err, res) {
		if(!err){			
			analyze(msg, "user");
			callback(res.responses[0]);
		}
	});

}










/*!=============== Text Analysis ====*/

function analyze(msg, src){
	var options = { method: 'POST',
	  url: 'http://api.meaningcloud.com/sentiment-2.1',
	  headers: { 'content-type': 'application/x-www-form-urlencoded' },
	  form: {
		  key: '18492684188b1082156801544ce75f85',
		  lang: 'en',
		  verbose: 'y',
		  egp: 'y',
		  uw: 'y',
	      model: 'general',
		  txt: msg
	   }
	};
	
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		
		body = JSON.parse(body);
		
		
		if(src == 'user'){
			console.log("Setting LED to analysis: "+body.irony+","+body.subjectivity+","+body.score_tag+","+body.confidence+"" );
			LED.callFunction("analysis", body.irony+","+body.subjectivity+","+body.score_tag+","+body.confidence, function(result) {
				console.log("LED successfully set to analysis");
			});
		}
	  
	  
	});

}

/*!========================== PHOTONS ====*/

var  LED;

initParticle();

function initParticle() {
	spark.on("login", function(err, body) {
		console.log("Particle Core login successful: ");
		var deviceList = spark.listDevices();
		
		deviceList.then(function(devices) {
			
			
			LED = _.find(devices, function(device) {
				return device.name == "trans-actor_led";
			});
			FAN = _.find(devices, function(device) {
				return device.name == "trans-actor_fan";
			});
			SERVO = _.find(devices, function(device) {
				return device.name == "trans-actor_servo";
			});
			
			
			LED.callFunction("idle", "yes please", function(result) {
				console.log("LED: idle");
			});
			FAN.callFunction("setfan", "0", function(result) {
				console.log("FAN: 0");
			});
			
			
			LED.onEvent("msg", function(res) {
// 				sse.send("mic on");
				console.log(res.data);
			});
			
			
		  
	});
  });

	spark.login({ accessToken: "10c4a67dc0a430e7a9e9c868192c17ecc75be479" },
		function(err, body) {
			if (!err) console.log("API login complete!");
		}
	);
}
