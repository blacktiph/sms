// ready_function();

var flashReady = function() {

	$('#playButton').click(function(){
		// console.log('play button');
		flash.connect('rtmp://localhost/SMSServer');
	});
}

var connected = function(success,error){
	// console.log('video is playing');
	flash.startPlaying('rocky.mp4');
	currentTime();
	totalTime(); 
}

var seekTime = function(time){
	// console.log('time seeking');
}

var stopPlaying = function(success,error) {
	flash.stopPlaying();
}