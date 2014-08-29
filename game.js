var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer( {alpha: true} );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1,1,1);

var lambert = new THREE.MeshLambertMaterial( { color: 0xffffff } );
var phong = new THREE.MeshPhongMaterial( { color: 0xffffff } );

var cube = new THREE.Mesh( geometry, lambert );

var rotation = Math.random() * 2 * Math.PI;
var vertRotation = Math.random() * Math.PI;

cube.position.x = 4 * Math.cos(rotation) * Math.cos(vertRotation);
cube.position.z = 4 * Math.sin(rotation) * Math.cos(vertRotation);
cube.position.y = 4 * Math.sin(vertRotation);

scene.add(cube);

var floor = new THREE.Mesh( new THREE.BoxGeometry(100, 1, 100), lambert );
floor.position.y = -5;
scene.add(floor);

var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
directionalLight.position.set(-1, 1, 1);
scene.add(directionalLight);

var lastTick = new Date();
function render() {
	var now = new Date();
	var dt = (now - lastTick) / 1000;
	cube.rotateY(dt * Math.PI / 4);
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	lastTick = now;
	//cube.rotateY(0.01);
}

var cameraLookAt = new THREE.Vector3;

window.addEventListener('deviceorientation', function(oevent) {
	camera.rotation.x = camera.rotation.y = camera.rotation.z = 0;

	var alpha = oevent.alpha * Math.PI/180;
	var beta = oevent.beta * Math.PI/180 - Math.PI/2;
	var gamma = oevent.gamma * Math.PI/180;

	var x = -Math.sin(alpha) * Math.cos(beta);
	var z = -Math.cos(alpha) * Math.cos(beta);
	var y = Math.sin(beta);

	document.getElementById("out").innerHTML = [oevent.alpha,oevent.beta,oevent.gamma].join("<br/>")

	cameraLookAt.set(camera.position.x + x, camera.position.y + y, camera.position.z + z);
	camera.lookAt(cameraLookAt);
	camera.rotateZ(-gamma);
});

render();
