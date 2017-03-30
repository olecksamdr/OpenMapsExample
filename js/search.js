'use strict';

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
}


function printResult(dataArray, distElem) {
	distElem = $(distElem);
	distElem.empty();

	if (dataArray) {
		dataArray.forEach(
				function (item) {
					// console.log(item);

					var div = document.createElement('div');
					div.classList.add('item');
					div.dataset.value = item.display_name;
					div.dataset.lon = item.lon;
					div.dataset.lat = item.lat;
					div.dataset.boundingbox = JSON.stringify(item.boundingbox);
					// console.log(JSON.parse(JSON.stringify(item.boundingbox)));
					// console.log(JSON.stringify(item.boundingbox));
					div.innerHTML = item.display_name;

					distElem.append(div);
				}
			);
	}
}

$('input.search').keyup(debounce(
		function () {
			var
				address = encodeURI(this.value);
			// console.log(address);
			$.get( 'http://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=3&q='+ address, function(data){
				printResult(data, '#search-result');
				console.log(data);
			});
		},
		 150));
