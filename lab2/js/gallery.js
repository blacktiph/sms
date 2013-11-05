(function(){

	var activeThumb = 0;

	var imageArray = document.querySelectorAll('#images li a');

	var largeImg = document.querySelector('#main_image img');
	// console.log(largeImg);

	var next = document.querySelector('#next');

	var back = document.querySelector('#back');

	for(i=0, max=imageArray.length; i<max; i++) {

		imageArray[i].setAttribute('data-index', i);

		imageArray[i].onclick = function(e) {

			e.preventDefault();
			// console.log(e.currentTarget.href);
			// console.log(window);

			var href = e.currentTarget.getAttribute('href');
			console.log(href);

			largeImg.setAttribute('src', href);

			return false;
		}

		next.onclick = function() {
			if(activeThumb < imageArray.length -1) {
				activeThumb++;
				var nextImg = imageArray[activeThumb].getAttribute('href');
				// console.log(nextImg);
				largeImg.setAttribute('src', nextImg);
			}
		}

		back.onclick = function() {
			if(activeThumb < imageArray.length +1) {
				activeThumb--;
				var prevImg = imageArray[activeThumb].getAttribute('href');
				// console.log(prevImg);
				largeImg.setAttribute('src', prevImg);
			}
		}
	}
})();