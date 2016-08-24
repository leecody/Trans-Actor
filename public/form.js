


$(document).ready(function(){
	if($.urlParam('bleeps') != null){
		$('#manual-bleep').val( $.urlParam('bleeps') );
	}
	

	
});




$(document).on('click', '#simple-bleep', function(e){
	doBleep([3, 5], [300, 400], [2, 6]);	
});
$(document).on('click', '#complex-bleep', function(e){
	doBleep([10, 15], [300, 400], [2, 6]);	
});

$(document).on('click', '#easy-bleep', function(e){
	doBleep([4, 6], [300, 400], [1, 3]);
});
$(document).on('click', '#difficult-bleep', function(e){
	doBleep([4, 6], [300, 400], [5, 30]);	
});

$(document).on('click', '#homogeneous-bleep', function(e){
	doBleep([5, 10], [300, 350], [2, 6]);	
});
$(document).on('click', '#heterogeneous-bleep', function(e){
	doBleep([5, 10], [300, 700], [2, 6]);	
});


$(document).on('click', '#ferror-bleep', function(e){
	
	var numBleeps = randInt(5, 7);
	var bleeps = [numBleeps];
	
	for(var i = 0; i<numBleeps-1; i++){
		bleeps += ','+randInt(300, 600);
		bleeps += ','+randInt(3, 20);
	}
	bleeps += ',100,100';
	
	$('#preset-bleeps-value').val(bleeps);
	$('#presetBleeps').submit();
		
});
$(document).on('click', '#nferror-bleep', function(e){
	
	var numBleeps = randInt(7, 10);
	var bleeps = [numBleeps];
	
	
	for(var i = 0; i<numBleeps; i++){
		var pitch = randInt(100, 500);
		pitch = (pitch < 200)? 100 : pitch;
		
		bleeps += ','+pitch;
		bleeps += ','+((pitch < 200)? 20 : randInt(2, 20));
	}
	
	$('#preset-bleeps-value').val(bleeps);
	$('#presetBleeps').submit();
		
});




$(document).on('click', '#random-bleep', function(e){
	doBleep([3, 10], [100, 600], [1, 30]);
});



function doBleep(numBleeps, pitchRange, lengthRange){
	
	var numBleeps = randInt(numBleeps[0], numBleeps[1]);
	var bleeps = [numBleeps];
	
	
	for(var i = 0; i<numBleeps; i++){
		var pitch = randInt(pitchRange[0], pitchRange[1]);
		pitch = (pitch < 200)? 100 : pitch;
		
		bleeps += ','+pitch;
		bleeps += ','+((pitch < 200)? 20 : randInt(lengthRange[0], lengthRange[1]));
	}
	$('#preset-bleeps-value').val(bleeps);
	$('#presetBleeps').submit();
}




$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURIComponent(results[1]) || 0;
    }
}



function randInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}
