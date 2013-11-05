(function(){

	var autoCompleteForm = document.querySelector('#myForm');

	var searchInput = document.querySelector('#search_auto');
	searchInput.autocomplete = 'off';

	var inputValue = "";

	var contentPanel = document.querySelector('.results');
	contentPanel.style.display = 'none';

	var searchResults = document.querySelector('#input_result');

	var currentItem = 0;

	//Needed to be searchResults because innerHTML is called through searchResults
	var SelectedHTML = searchResults;

	searchInput.onkeyup = function(e) {


		console.log(SelectedHTML);

		//If the searchInput is empty or if the ESC key is pressed:
		if(e.keyCode == 27 || searchInput.value.length == 0) {
			contentPanel.style.display = 'none';
			searchResults.style.display = 'none';
			searchInput.value.text = "";
		}

		//Up Key
		else if(e.keyCode == 38) {
			// console.log('up');
			if(currentItem >= 0) {
				currentItem -= 1;
				for(var i=0, max=searchResults.childNodes.length; i<max; i++) {
					// var item = i;
					searchResults.childNodes[i].setAttribute('class', 'notActive');
				}
				searchResults.childNodes[currentItem].setAttribute('class', 'activeState');
				SelectedHTML = searchResults.childNodes[currentItem];
			}
		}

		//Down Key
		else if(e.keyCode == 40) {
			// console.log('down');
			if(currentItem < searchResults.childNodes.length -1) {
				currentItem += 1;
				for (var i=0, max=searchResults.childNodes.length; i<max; i++) {
					// var item = i;
					searchResults.childNodes[i].setAttribute('class', 'notActive');
				}
				searchResults.childNodes[currentItem].setAttribute('class', 'activeState');
				SelectedHTML = searchResults.childNodes[currentItem];
				// console.log(SelectedHTML);
			}
		}
			
		//Enter Key
		else if(e.keyCode == 13) {
			// console.log('enter');
			// console.log(SelectedHTML.innerHTML.indexOf(1));

			var startIndex = SelectedHTML.innerHTML.indexOf('<a>');
			var endIndex = SelectedHTML.innerHTML.indexOf('</a>');
			var emailString = SelectedHTML.innerHTML.substring(startIndex + 3, endIndex);
			// console.log(emailString);
			searchInput.value = emailString;
			// searchInput.value = currentItem.getAttribute('href');
			// var indexStart = searchResults.innerHTML.indexOf(2);
			// console.log(startIndex);
		}

		else {
			inputValue = searchInput.value;
			contentPanel.style.display = 'block';
			searchResults.style.display = 'block';
			currentItem = 0;
			getContent();
		}
	}

	var getContent = function() {
		ryu.ajax({
			url: 'xhr/getpeople.php',
			type: 'get',
			data: {
				search: inputValue
			},
			success: function(results) {
				if(results.data.length == 0) {
					searchResults.style.display = 'none';
					console.log('no results');
				} else {

					// JSON.parse();

					var html = '';

					for(var i=0, max=results.data.length; i<max; i++) {
						html += '<li><p>' + results.data[i].name + '</p>'
						+ '<a>' + results.data[i].email + '</a>'
						+ '<p>' + results.data[i].friends + '</p>';
					}

					searchResults.innerHTML = html;
					searchResults.childNodes[0].setAttribute('class', 'activeState');
				}
			},
			error: function(results) {
				console.log('There was an error!');
			}
		})
	}

	autoCompleteForm.onsubmit = function(e) {
		e.preventDefault();
		return false;
	}

})();