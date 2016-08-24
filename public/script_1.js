


$(document).ready(function(){

});


$(document).on('click', '.sListening', function(e){
	nodeRequest('LED', { mode: 'sListening', data: 'hello' });
});


/*!============================== INDIVIDUAL RESPONSES =============!*/

$(document).on('click', '#speak-1', function(e){
	
	var txt = $('#speak-1').data('msg');
	
	doBleep([10, 15], [300, 700], [2, 6]);
	nodeRequest('LED', { mode: 'eListening', data: 'yo' });
	
	setTimeout(function(){
		nodeRequest('analyze', { phrase: txt });
// 		nodeRequest('SERVO', { mode: 'startservos', data: '1000,30000' });
	}, 2000);
	
	setTimeout(function(){
		say("green");
	}, 5000);
	
});


$(document).on('click', '#speak-2', function(e){
	
	var txt = $('#speak-2').data('msg');
	
	doBleep([3, 5], [300, 400], [1, 4]);
	nodeRequest('LED', { mode: 'eListening', data: 'hi' });
	
	setTimeout(function(){
		nodeRequest('analyze', { phrase: txt });
	}, 1500);
	
	setTimeout(function(){
		//longer text gets difficult to understand with the auto-duration, just define custom [[inpt tune]] here
		say("color symbolism databases: 80% green for ominous scene. Related results: death, decay, non-human monsters." );
	}, 2000);
	
	
});



$(document).on('click', '#speak-3', function(e){
	
	var txt = $('#speak-3').data('msg');
	
	doBleep([5, 10], [300, 500], [2, 6]);
	nodeRequest('LED', { mode: 'eListening', data: 'greetings' });
	
	setTimeout(function(){
		nodeRequest('analyze', { phrase: txt });
	}, 3000);
	
	setTimeout(function(){
		say("Yellow and black patterns");
	}, 4000);
	
	
});


$(document).on('click', '#speak-4', function(e){
	
	var txt = $('#speak-4').data('msg');
	
	doBleep([5, 10], [300, 500], [2, 6]);
	nodeRequest('LED', { mode: 'eListening', data: 'sup' });
	
	setTimeout(function(){
		nodeRequest('analyze', { phrase: txt });
	}, 2000);
	
	setTimeout(function(){
		say("crime, immorality, corruption, control, harm" );
	}, 3500);
	
	
});


$(document).on('click', '#speak-5', function(e){
	
	var txt = $('#speak-5').data('msg');
	
	doBleep([12, 18], [200, 900], [2, 8]);
	nodeRequest('LED', { mode: 'eListening', data: 'yo' });
	
	setTimeout(function(){
		nodeRequest('analyze', { phrase: txt });
 		nodeRequest('SERVO', { mode: 'startservos', data: '2000,30000' });
	}, 2000);
	
	setTimeout(function(){
 		nodeRequest('FAN', { speed: '80'});
	}, 3000);
	setTimeout(function(){
 		nodeRequest('FAN', { speed: '125'});
	}, 4000);
	setTimeout(function(){
 		nodeRequest('FAN', { speed: '150'});
	}, 4500);
	setTimeout(function(){
 		nodeRequest('FAN', { speed: '200'});
	}, 5000);
	setTimeout(function(){
 		nodeRequest('FAN', { speed: '255'});
	}, 5500);
	
});

$(document).on('click', '#speak-6', function(e){
	nodeRequest('FAN', { speed: '0'});
});


$(document).on('click', '#speak-7', function(e){
	
	var txt = $('#speak-7').data('msg');
	
	doBleep([3, 4], [400, 500], [2, 3]);
	nodeRequest('LED', { mode: 'eListening', data: 'yo' });
	setTimeout(function(){
		nodeRequest('analyze', { phrase: txt });
	}, 1000);
	
	setTimeout(function(){
		say("red" );
	}, 3500);
	
});


/*!============================== HELPER FUNCTIONS =============!*/



function nodeRequest(req, dat, callback = null){
	$.ajax({			
        type: 'GET',
		dataType: 'json',
        data: dat,
        url: req,
        success: function(data){
	        if(callback != null){
		        callback(data);
	        }
        }
    });
}



function doBleep(numBleeps, pitchRange, lengthRange){
	
	var numBleeps = randInt(numBleeps[0], numBleeps[1]);
	var bl = [numBleeps];
	
	
	for(var i = 0; i<numBleeps; i++){
		var pitch = randInt(pitchRange[0], pitchRange[1]);
		pitch = (pitch < 200)? 100 : pitch;
		
		bl += ','+pitch;
		bl += ','+((pitch < 200)? 20 : randInt(lengthRange[0], lengthRange[1]));
	}
	
	nodeRequest('bleep', {bleeps: bl, showInterface: "no"});
}


function speak(txt){
	$.ajax({			
        type: 'GET',
		dataType: 'json',
        data: {phrase: txt, mode: 'tune'},
        url: 'phoneme',
        complete: function(data){
	        console.log(data.responseText);
	        say(data.responseText);
        }
    });
	
}

function say(txt){
	
	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	
	msg.voice = voices.filter(function(voice) { return voice.name == 'Susan'; })[0];
	
	msg.volume = 1; // 0 to 1
	msg.rate = 1;   // 0.1 to 10
	msg.pitch = 0.1;  //0 to 2
	
	
	msg.lang = "en";
	
    msg.text = ""+txt;
    window.speechSynthesis.speak(msg);
 }


function randInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}
