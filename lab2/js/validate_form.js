(function(){ 

	var regform = document.querySelector('#registrationForm');

	var input_phone = document.querySelector('#phone');
	var input_email = document.querySelector('#email');
	var input_username = document.querySelector('#username');
	var input_password = document.querySelector('#password');
	var input_confirm = document.querySelector('#confirm');
	var input_firstname = document.querySelector('#firstname');
	var input_lastname = document.querySelector('#lastname');

	// var passed = false;
	var phonePassed = false;
	var emailPassed = false;
	var firstNamePassed = false;
	var lastNamePassed = false;
	var UsernamePassed = false;
	var passwordPassed = false;
	var confirmPasswordPassed = false;

// Phone
	input_phone.onkeyup = function(e) {
		var phonePattern = /^(\([2-9]|[2-9])(\d{2}|\d{2}\))(-|.|\s)?\d{3}(-|.|\s)?\d{4}$/;

		var pass = phonePattern.test(input_phone.value);

		var errorMsg = input_phone.nextSibling.nextSibling;

		if(!pass) {
			errorMsg.style.display = 'block';
			input_phone.style.backgroundColor = '#AA0923';
			input_phone.style.color = '#F7F8F8';
			phonePassed = false;
		}else {
			errorMsg.style.display = 'none';
			input_phone.style.backgroundColor = '#A6C2C5';
			input_phone.style.color = '#2A2D2F';
			phonePassed = true;
// 
		}
	}

// Email
	input_email.onkeyup = function(e) {
		var emailPattern = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

		var pass = emailPattern.test(input_email.value);

		var errorMsg = input_email.nextSibling.nextSibling;

		if(!pass) {
			errorMsg.style.display = 'block';
			input_email.style.backgroundColor = '#AA0923';
			input_email.style.color = '#F7F8F8';
			emailPassed = false;
		}else {
			errorMsg.style.display = 'none';
			input_email.style.backgroundColor = '#A6C2C5';
			input_email.style.color = '#2A2D2F';
			emailPassed = true;
		}
	}

// First Name
	input_firstname.onkeyup = function(e) {

		var errorMsg = input_firstname.nextSibling.nextSibling;

		if(input_firstname.value.length < 2) {
			errorMsg.style.display = 'block';
			input_firstname.style.backgroundColor = '#AA0923';
			input_firstname.style.color = '#F7F8F8';
			firstNamePassed = false;
		}else {
			errorMsg.style.display = 'none';
			input_firstname.style.backgroundColor = '#A6C2C5';
			input_firstname.style.color = '#2A2D2F';
			firstNamePassed = true;
		}
	}

// Last Name
	input_lastname.onkeyup = function(e) {

		var errorMsg = input_lastname.nextSibling.nextSibling;

		if(input_lastname.value.length < 2) {
			errorMsg.style.display = 'block';
			input_lastname.style.backgroundColor = '#AA0923';
			input_lastname.style.color = '#F7F8F8';
			lastNamePassed = false;
		}else {
			errorMsg.style.display = 'none';
			input_lastname.style.backgroundColor = '#A6C2C5';
			input_lastname.style.color = '#2A2D2F';
			lastNamePassed = true;
		}
	}

// Username
	input_username.onkeyup = function(e) {

		var errorMsg = input_username.nextSibling.nextSibling;

		if(input_username.value.length < 5) {
			errorMsg.style.display = 'block';
			input_username.style.backgroundColor = '#AA0923';
			input_username.style.color = '#F7F8F8';
			UsernamePassed = false;
		}else {
			errorMsg.style.display = 'none';
			input_username.style.backgroundColor = '#A6C2C5';
			input_username.style.color = '#2A2D2F';
			UsernamePassed = true;
		}
	}

// Password
	input_password.onkeyup = function(e) {

		var errorMsg = input_password.nextSibling.nextSibling;

		if(input_password.value.length < 8) {
			errorMsg.style.display = 'block';
			input_password.style.backgroundColor = '#AA0923';
			input_password.style.color = '#F7F8F8';
			passwordPassed = false;
		}else {
			errorMsg.style.display = 'none';
			input_password.style.backgroundColor = '#A6C2C5';
			input_password.style.color = '#2A2D2F';
			passwordPassed = true;
		}
	}

// Confirm Password
	input_confirm.onkeyup = function(e) {

		var errorMsg = input_confirm.nextSibling.nextSibling;

		if(input_confirm.value != input_password.value) {
			errorMsg.style.display = 'block';
			input_confirm.style.backgroundColor = '#AA0923';
			input_confirm.style.color = '#F7F8F8';
			confirmPasswordPassed = false;
		}else {
			errorMsg.style.display = 'none';
			input_confirm.style.backgroundColor = '#A6C2C5';
			input_confirm.style.color = '#2A2D2F';
			confirmPasswordPassed = true;
		}
	}

// Validate all fields
	regform.onsubmit = function(e) {
		if(
			phonePassed == true &&
			emailPassed == true &&
			firstNamePassed == true &&
			lastNamePassed == true &&
			UsernamePassed == true &&
			passwordPassed == true &&
			confirmPasswordPassed == true
		) {
			console.log('Success!');
		} else {
			console.log('Failed!');
		}
		e.preventDefault();
		return false;
	};

})();