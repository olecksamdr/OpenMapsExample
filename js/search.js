function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

$('input.search').keyup(debounce(
		function () {
			var address = encodeURI(this.value);
			console.log(this.value);
			$.get( 'http://nominatim.openstreetmap.org/search?format=json&q='+ address, function(data){
				console.log(data[0].display_name);
			});
		},
		 150));