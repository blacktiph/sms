(function(){

	//Puts all the anchors with the class "toggle" into an array
	var links = document.querySelectorAll('.toggle');

	//Call the ryu function from ryu.js
	ryu(links).each(function() {

		//When clicked
		this.onclick = function(e) {

				//Stop browser default for mouse click
				e.preventDefault();

				//Create a variable to access the div that holds the content. The anchor tag is "this" and after the line break, the div is the nextSibling 
				var box = this.nextSibling.nextSibling;
				
				//If the the ID of the box is active. The ID "active" is set in the done: function() of the 'else statement' below
				if (box.getAttribute('id') == 'active')
				{
					console.log('active');

					//Changes the direction of the arrow to DOWN (4 nextSibling, 1 childNode)
					this.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[0].setAttribute('src', 'http://localhost:8888/lab8/images/arrow_down.png');

					ryu(box).animate({
					duration:1200,
					easing: 'easeOutQuart',
					css: {
						height: 0,
						paddingTop: 0,
						paddingBottom: 0
						// overflow: 'hidden'
						},

						// Set the attribute ID of the variable 'box' to an empty string ''. This will make the if statement false and run the 'else' statement.
						done: function() {
							box.setAttribute('id', "");
						}
					})
				} else {

					console.log('not active');

					//Changes the direction of the arrow to UP (4 nextSibling, 1 childNode)
					this.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[0].setAttribute('src', 'http://localhost:8888/lab8/images/arrow_up.png');


					ryu(box).animate({
					duration:500,
					easing: 'easeInQuart',
					css: {
						height: 100,
						paddingTop: 10,
						paddingBottom: 10,
						marginBottom: 0
						},

						//Set the attribute ID of the variable 'box' to "active". This will make the if statement true.
						done: function() {
							box.setAttribute('id', 'active');
						}
					})
				}
			}
			return false;
	});

})();