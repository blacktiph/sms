(function(){

	var content = document.querySelectorAll('.content');
	var toggler = document.querySelectorAll('.toggle');
	// var arrow = document.querySelectorAll('.arrow');
	var time = 1000;

	// console.log(arrow);

	ryu(toggler).each(function(){
		this.onclick = function(e) {

			// ryu(arrow).each(function(){
				// this.setAttribute('src', 'http://localhost:8888/lab8/images/arrow_up.png');
			// });

			var arrowDirection = document.querySelector('.arrow img').setAttribute('src', 'http://localhost:8888/lab8/images/arrow_up.png');

			// for(var i=0, max=content.length; i<max; i++) {
				// arrow[i].setAttribute('src', 'http://localhost:8888/lab8/images/arrow_up.png');
			// }

			ryu(content).each(function() {
				this.style.display = 'none';
			});

			//Target the specific accordion option
			var href = this.getAttribute('href');
			var target = document.querySelector(href);

			target.style.display = 'block';

			ryu(content).animate({
				duration: time,
				easing: 'easeOutQuart',
				css:{
					paddingTop: 10,
					paddingBottom: 10,
					height: 100
					
				},
				done: function() {
					console.log('Content Opened')
				}
			});
		}
	});

	ryu(content).each(function(){
		this.onclick = function() {

			// for(var i=0, max=content.length; i<max; i++) {
			// 	arrow[i].setAttribute('src', 'http://localhost:8888/lab8/images/arrow_down.png');
			// }

			// ryu(arrow).each(function(){
				// this.setAttribute('src', 'http://localhost:8888/lab8/images/arrow_down.png');
			// });

			var arrowDirection = document.querySelector('.arrow img').setAttribute('src', 'http://localhost:8888/lab8/images/arrow_down.png');

			ryu(content).animate({
				duration: time,
				easing: 'easeInQuart',
				css:{
					paddingTop: 0,
					paddingBottom: 0,
					height: 0
					
				},
				done: function() {
					console.log('Content Closed');
				}
			});
		}
	});

})();