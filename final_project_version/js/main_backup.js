var microphoneList = $('#microphoneList');
var cameraList = $('#cameraList');
var record = $('#record');
var volume = $('#volume_bar');
var commentInput = $('#commentInput');

var duration;
var currentTime;
var connect = true;
var playing;
var recording = false;
var timeStamp;
var getVolume;


/*========= Date for Comments =========*/

var date = new Date();
// console.log(date);

var month = date.getMonth() + 1;
// console.log(month);

var day = date.getDate();
// console.log(day);

var year = date.getFullYear();
// console.log(year);

var currentDate = month + "/" + day + "/" + year;
// console.log(currentDate);


/*========= Fire Base =========*/

var myDataRef = new Firebase('https://fullsail-blacktiph.firebaseio.com/');
var currentUser = {};

// console.log(currentUser);


/*========= Flash Ready =========*/

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


/*========= Flash Connected =========*/

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


/*========= Record =========*/

record.click(function(){
	if (!recording) {
		flash.startRecording('movie', 0, 0);
		recording = true;
	} else {
		flash.stopRecording();
		recording = false;
	}
});


/*========= Get Duration =========*/

var getDuration = function(length){
	duration = length;
}


/*========= Volume and Seek Bar =========*/

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


/*========= Github Login =========*/

$('#github_login').on('click', function(e){
	// console.log($(this).html());

	if($(this).html() == "Login"){
		// console.log('Login is the correct value');
		auth.login("github");
	}
	else {
		auth.logout();
    	currentUser = {};

    	//Change HTML to show "Login" instead on "Log Out"
    	$('#github_login').html("Login");

    	// console.log(user);
	}
});

var auth = new FirebaseSimpleLogin(myDataRef, function(error, user) {
	if(error) {
		// an error occurred while attempting login

    	switch(error.code) {
      		case 'INVALID_EMAIL':
      		case 'INVALID_PASSWORD':
      		default:
    	}
  	}
  	else if(user) {
    	// user authenticated with Firebase
    	// console.log('User ID: ' + user.id + ', Provider: ' + user.provider);

    	//Remove error from comment section
    	$('.commentError').css('display','none');

    	//Change HTML to show "Log Out" instead on "Login"
    	$('#github_login').html("Log Out");

    	currentUser = user;
    	user['avatar_url'] = "https://1.gravatar.com/avatar/" + user['gravatar_id'] + "?d=https%3A%2F%2Fidenticons.github.com%2F779af16a62bd01264018e68794021aa4.png&r=x";

    	console.log(user);
  	}
});


/*========= Comment System =========*/

$('#submitComment').on('click', function(e){

	var userName = currentUser['username'];
	var userComment = commentInput.val();
	var userAvatar = currentUser['avatar_url'];

	if(commentInput.val()){
		$('.commentError').css('display','none');
		myDataRef.push({name:userName, comment:userComment, avatar:userAvatar, date:currentDate});
		commentInput.val('');
	}
	else {
		if(currentUser['username']){
			// alert('You forget to enter in a comment');
			$('.commentError').css('display','block');
			$('.commentError').html("You forget to enter in a comment!");
		}
		else {
			$('.commentError').css('display','block');
			$('.commentError').html("You must be signed in to submit a comment!");
		}
	}
});

myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        showChatMessage(message.name, message.comment, message.avatar, message.date);
});

function showChatMessage(name, comment, avatar, date) {
	var commentHTML = "<div class='user_comments'><div class='commentheader'><img class='user_avatar' src='" + avatar + "' width='30' height='30' /><p class='userName'>" + name + "</p></div><p class='userComment'>" + comment + "</p><p class='commentDate'>" + date + "</p></div>";
	$("#AllComments").append(commentHTML);
};
