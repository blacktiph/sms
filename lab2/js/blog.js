(function(){

	//Find the object with id #posts
	var posts = document.querySelector('#posts');

	//Find the object with the id #selectPosts
	var selectVar = document.querySelector('#selectPosts');
	
	//Define a variable for the number of posts shown
	var postPerPage;

	//Create a function that updates the number of posts shown
	selectVar.onchange = function(){

		//Update the number of posts shown by using the index of the option values
		postPerPage = selectVar.options[selectVar.selectedIndex].value;

		//Call the function that generates the content
		getContent();
	};

	//Create a variable for current link category. Set the value to an empty string
	var currentCategory = "";

	//Create a variable to place the links into an array (from the "category" class)
	var links = document.querySelectorAll(".category ul li");

	//Function that generates the content
	var getContent = function() {

		//Call the Ajax function in the ryu script
		ryu.ajax({

			//From the options of the ajax function, set the url
			url: 'xhr/getposts.php',

			//From the options of the ajax function, set the type
			type: 'get',

			//From the options of the ajax function, set the data
			data: {

				//create a limit option for the parent option "data". Set the limit to the variable "postPerPage"
				limit: postPerPage,

				//create a category option for the parent option "data". Set the category to the variable "currentCategory"
				category: currentCategory
			},

			//From the options of the ajax function, set the success function with a parameter result (result is the total number of posts being shown on the page. The select options affect this number). This value is found by using console.log(result.data.length);
			success: function(result) {

				//Create a variable that will be used to generate html. Set the variable to an empty string (any text will show up in the markup)
				var html = '';

				//Create a loop that will create the html content for each post displayed. Use the result parameter to detemine the number of posts displayed.
				for(var i=0, max=result.data.length; i<max; i++) {
					html += '<h3>' + result.data[i].title + '</h3>' + '<div>' + result.data[i].content + '</div>';
				}

				//Call the variable "posts" and generate the html code created from the loop above. Place this code into the empty "html" variable
 				posts.innerHTML = html;
			},

			//From the options of the ajax function, set the error function with the same parameter as the success function (result)
			error: function(result) {
				console.log('There was an error');
			}
		})
	}

	//Create a loop to cycle through the array created by the variable "links"
	for(var i=0, max=links.length; i<max; i++) {

		//Create a function that will call any link in the array (by using [i]). Give the function an event parameter for "Mouse Click".
		links[i].onclick = function(e) {

			//Create a variable to get the name of the link that was clicked. Use childNodes to select the anchor tag. Use get attribute to abstract the name of the "id".
			var getCategory = this.childNodes[0].getAttribute('id');

			//Set the currentCategory = to the link that was clicked (getCategory)
			currentCategory = getCategory;

			//Update the number of posts shown by using the index of the option values. This needs to be re-checked (the user might have changed the option value)
			postPerPage = selectVar.options[selectVar.selectedIndex].value;

			//Call the function that generates the content
			getContent();

			//Prevent defaults from occurring
			e.preventDefault();
			
			//Needed for Internet Explorer
			return false;
		}
	}

})();