window.addEventListener('load', function() {
	return;
	var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia).bind(navigator);

	getUserMedia({video: true, audio: false}, function(stream) {
		var video = document.querySelector("video");
		video.src = window.URL.createObjectURL(stream);
		video.play();
	}, function(err) {
		alert(err);
	});
});
