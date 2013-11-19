var microphoneList = $('#microphoneList');
var cameraList = $('#cameraList');
var record = $('#record');
var volume = $('#volume_bar');

var duration;
var currentTime;
var connect = true;
var playing;
var recording = false;
var timeStamp;
var getVolume;

var flashReady = function() {

	$('#playButton').click(function(){

		if(connect) {
			flash.connect('rtmp://localhost/SMSServer');
			connect = false;
			// $('#playPause').attr("class","fa fa-pause");
			playing = true;
		}
		else {
			flash.playPause();
			if( playing == true){
				$('#playPause').attr("class","fa fa-play");
				playing = false;
			}else {
				$('#playPause').attr("class","fa fa-pause");
				playing = true;
			}
		}
	});

	$('#stopButton').click(function(){
		flash.stopPlaying();
		connect = true;
		$('#playPause').attr("class","fa fa-play");
	});

	$('#microphone').click(function(){
		microphoneList.css('display','block');
		cameraList.css('display','none');

		microphones = flash.getMicrophones();
		// console.log(cameras);
		microphoneList.html('<li>'+microphones+'</li>');
	});

	$('#camera').click(function(){
		cameraList.css('display','block');
		microphoneList.css('display','none');

		cameras = flash.getCameras();
		// console.log(cameras);
		cameraList.html('<li>'+cameras+'</li>');
	});
}

var connected = function(success,error){
	flash.startPlaying('hobbit_vp6.flv');
	$('#playPause').attr("class","fa fa-pause");

	getVolume = flash.getVolume();
	// console.log(getVolume);

	volumeStamp = getVolume;
	positionPercentage = volumeStamp / 1;
	console.log(volumeStamp, positionPercentage, $('#volume_bar').width());
	$('#volume_slider').css('left', Math.floor(positionPercentage * $('#volume_bar').width()));

	currentTime();
	totalTime(); 
	console.log(error);
	console.log(success);
}


record.click(function(){
	if (!recording) {
		flash.startRecording('movie', 0, 0);
		recording = true;
	} else {
		flash.stopRecording();
		recording = false;
	}
});


var getDuration = function(length){
	duration = length;
}

var seekTime = function(time){
	var currentMin = Math.floor(time /  60);
	var currentSec = Math.floor(time % 60);
	timeStamp = time;
	positionPercentage = timeStamp / duration;
	$('#seek_bar_handle').css('left', Math.floor(positionPercentage * $('#seek_bar').width()));
}

$("#seek_bar").on("mousedown", function(e){	
	var left = e.pageX - $(this).offset().left;
	var newSeekTime = left / $("#seek_bar").width();
	var time = newSeekTime * duration; 
	$('#seek_bar_handle').css('left', left);
	// console.log(time);
	flash.setTime(time);
});

$('#volume_bar').on("mousedown", function(e){	
	var left = e.pageX - $(this).offset().left;
	var newVolume = left / $("#volume_bar").width();
	var volume = newVolume * getVolume; 
	console.log(volume);
	$('#volume_slider').css('left', left + 15);
	// console.log(time);
	flash.setVolume(volume);
});
