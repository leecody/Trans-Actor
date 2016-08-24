


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
		speak("green");
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
		say("[[inpt TUNE]] _ k {D 125; P 110:0 } 1UX {D 85; P 110:0 } l {D 55; P 110:0 } AX {D 65; P 110:0 } r {D 40; P 110:0 } _ s {D 110; P 110:0 } 1IH {D 60; P 110:0 } m {D 85; P 110:0 } b {D 65; P 110:0 } l {D 50; P 110:0 } IH {D 70; P 110:0 } z {D 70; P 110:0 } AX {D 65; P 110:0 } m {D 80; P 110:0 } _ d {D 55; P 110:0 } 1EY {D 140; P 110:0 } t {D 35; P 110:0 } AX {D 70; P 110:0 } b {D 50; P 110:0 } EY {D 140; P 110:0 } s {D 100; P 110:0 } =IX {D 110; P 110:0 } z {D 150; P 110:0 } : {D 375} _ 1EY {D 135; P 110:0 } t {D 40; P 110:0 } IY {D 85; P 110:0 } _ p {D 80; P 110:0 } AX {D 65; P 110:0 } r {D 40; P 110:0 } s {D 110; P 110:0 } 1EH {D 110; P 110:0 } n {D 55; P 110:0 } t {D 45; P 110:0 } _ g {D 75; P 110:0 } r {D 65; P 110:0 } 1IY {D 140; P 110:0 } n {D 75; P 110:0 } ~ f {D 95; P 110:0 } AO {D 75; P 110:0 } r {D 45; P 110:0 } _ 1AA {D 125; P 110:0 } m {D 70; P 110:0 } IX {D 50; P 110:0 } n {D 55; P 110:0 } IX {D 65; P 110:0 } s {D 70; P 110:0 } _ s {D 95; P 110:0 } 1IY {D 165; P 110:0 } n {D 150; P 110:0 } . {D 500} _ r {D 85; P 110:0 } IX {D 60; P 110:0 } l {D 80; P 110:0 } 1EY {D 145; P 110:0 } t {D 35; P 110:0 } IX {D 70; P 110:0 } d {D 35; P 110:0 } _ r {D 65; P 110:0 } IX {D 65; P 110:0 } z {D 90; P 110:0 } 1UX {D 115; P 110:0 } l {D 85; P 110:0 } t {D 70; P 110:0 } s {D 160; P 110:0 } : {D 185} _ d {D 95; P 110:0 } 1EH {D 205; P 110:0 } T {D 180; P 110:0 } , {D 120} _ d {D 75; P 110:0 } IH {D 95; P 110:0 } k {D 150; P 110:0 } 1EY {D 290; P 110:0 } , {D 245} _ n {D 100; P 110:0 } 1AA {D 125; P 110:0 } n {D 80; P 110:0 } =h {D 75; P 110:0 } y {D 70; P 110:0 } 1UW {D 100; P 110:0 } m {D 75; P 110:0 } AX {D 60; P 110:0 } n {D 60; P 110:0 } _ m {D 75; P 110:0 } 1AA {D 135; P 110:0 } n {D 65; P 110:0 } s {D 80; P 110:0 } t {D 50; P 110:0 } AX {D 95; P 110:0 } r {D 65; P 110:0 } z {D 140; P 110:0 } . {D 10} [[inpt TEXT]] ");
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
		say("[[inpt TUNE]] _ y {D 120;  P 110:0 } 1EH {D 125;  P 110:0 } l {D 75;  P 110:0 } OW {D 180;  P 110:0 } ~ AX {D 70;  P 110:0 } n {D 65;  P 110:0 } d {D 25;  P 110:0 } _ b {D 90;  P 110:0 } l {D 70;  P 110:0 } 1AE {D 145;  P 110:0 } k {D 65;  P 110:0 } _ p {D 95;  P 110:0 } 1AE {D 155;  P 110:0 } t {D 35;  P 110:0 } AX {D 70;  P 110:0 } r {D 45;  P 110:0 } n {D 95;  P 110:0 } z {D 130;  P 110:0 } . {D 10} [[inpt TEXT]] ");
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
		say("[[inpt TUNE]] _ k {D 135;  P 110:0 } r {D 85;  P 110:0 } 1AY {D 245;  P 110:0 } m {D 175;  P 110:0 } , {D 120} _ k {D 105;  P 110:0 } AX {D 40;  P 110:0 } r {D 25;  P 110:0 } r {D 85;  P 110:0 } 1UX {D 115;  P 110:0 } p {D 60;  P 110:0 } S {D 110;  P 110:0 } IX {D 95;  P 110:0 } n {D 150;  P 110:0 } , {D 120} _ k {D 105;  P 110:0 } AX {D 70;  P 110:0 } n {D 65;  P 110:0 } t {D 100;  P 110:0 } r {D 70;  P 110:0 } 1OW {D 205;  P 110:0 } l {D 185;  P 110:0 } , {D 120} _ IH {D 85;  P 110:0 } m {D 95;  P 110:0 } 1AO {D 115;  P 110:0 } r {D 75;  P 110:0 } 1AE {D 135;  P 110:0 } l {D 65;  P 110:0 } IX {D 70;  P 110:0 } t {D 70;  P 110:0 } IY {D 215;  P 110:0 } , {D 120} _ h {D 145;  P 110:0 } 1UX {D 255;  P 110:0 } . {D 10} [[inpt TEXT]]");
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
	
	msg.voice = voices.filter(function(voice) { return voice.name == 'Alex'; })[0];
	
	msg.volume = 1; // 0 to 1
	msg.rate = 1;   // 0.1 to 10
	msg.pitch = 1;  //0 to 2
	
	
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
