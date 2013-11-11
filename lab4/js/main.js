(function($){

	// var win = $(window);
	// win = 'hello russ';
	// console.log(win);

	ready_function();

	var flashReady = function() {

		$('#playButton').click(function(){
			console.log('play button');
			flash.connect('rtmp://localhost/SMSServer');
		});
	}

	var startPlaying = function(success,error){
		flash.startPlaying('rocky.mp4');
		currentTime();
		totalTime();
	}

	var stopPlaying = function(success,error) {
		flash.stopPlaying();
	}

	
	
})(jQuery); // end private scope