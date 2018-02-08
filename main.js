// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c');

// create a rectangle object
var rect = new fabric.Rect({
  left: 50,
  top: 50,
  fill: 'red',
  width: 20,
  height: 20
});

// add rectangle onto canvas
canvas.add(rect);

var container = document.querySelector('#threejs-view');
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
var scene = new THREE.Scene();

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, -300);

scene.add(camera);
renderer.setSize(200, 200);
container.appendChild(renderer.domElement);

var pointLight = new THREE.PointLight(0xFFFFFF);
camera.add(pointLight);

var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
var cube = new THREE.Mesh(new THREE.CubeGeometry(20, 20, 20), cubeMaterial);
cube.position.z = -300;
scene.add(cube);

function update () {
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

// watches input tag for changes to the value and adjusts rectangle height
$('#rec-height').each(function() {
  var input = $(this)
  input.data('oldValue', input.val());
  input.bind("propertychange change click keyup input paste", function(event) {
    if (input.data('oldVal') != input.val()) {
      input.data('oldVal', input.val());
      // set new height for fabricjs
      rect.setHeight(parseInt(input.val()));
      canvas.renderAll();
      // set new height for threejs
      scene.remove(cube);
      cube = new THREE.Mesh(
          new THREE.CubeGeometry(parseInt($('#rec-width').val()),
                                 parseInt(input.val()), 20),
                                 cubeMaterial);
      cube.position.z = -300;
      scene.add(cube);
    }
  });
});

// watches input tag for changes to the value and adjusts rectangle width
// there's a lot of repeated code from the rectangle height adjustments that
// I duplicated in the interest of time on an actual project and not a code
// challenge I would DRY up some of this code
$('#rec-width').each(function() {
  var input = $(this)
  input.data('oldValue', input.val());
  input.bind("propertychange change click keyup input paste", function(event) {
    if (input.data('oldVal') != input.val()) {
      input.data('oldVal', input.val());
      // set new height for fabricjs
      rect.setWidth(parseInt(input.val()));
      canvas.renderAll();
      // set new height for threejs
      scene.remove(cube);
      cube = new THREE.Mesh(
          new THREE.CubeGeometry(parseInt(input.val()),
                                 parseInt($('#rec-height').val()), 20),
                                 cubeMaterial);
      cube.position.z = -300;
      scene.add(cube);
    }
  });
});
