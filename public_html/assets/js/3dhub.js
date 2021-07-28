

/* global THREE */

var meshes = [];
var mixers = [];
var loader = new THREE.JDLoader();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 5, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//adjust window size without distortion
window.addEventListener('resize', function ()
{
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}
);
//controls
controls = new THREE.OrbitControls(camera, renderer.domElement);
//Load Models
var loader1 = new THREE.JDLoader();
loader.load(
        'asl ily.JD',
        function (data)
        {
            for (var i = 0; i < data.objects.length; ++i)
            {
                var obj = data.createObject(i);
                scene.add(obj);
                obj.position.x = 60;
                obj.position.y = 30;
                obj.position.z = -50;
                
                 obj.rotation.y = 0;
                obj.rotation.z = 0;
                obj.rotation.x = 90;
                
                if (obj.geometry.animations)
                {
                    var mixer = new THREE.AnimationMixer(obj);
                    mixers.push(mixer);
                    var action = mixer.clipAction(obj.geometry.animations[0]);
                    action.play();
                }
            }
        }
);

var ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.0);
scene.add(ambientLight);
//add a shape
var geometry = new THREE.BoxGeometry(300, 300, 300);
var cubeMaterial = [
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('assets/img/front.jpg'), side: THREE.DoubleSide}), //Right
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('assets/img/back.jpg'), side: THREE.DoubleSide}), //Left
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('assets/img/up.jpg'), side: THREE.DoubleSide}), //Top
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('assets/img/down.jpg'), side: THREE.DoubleSide}), //Bottom
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('assets/img/right.jpg'), side: THREE.DoubleSide}), //Front
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('assets/img/left.jpg'), side: THREE.DoubleSide}), //Back
];
var material = new THREE.MeshFaceMaterial(cubeMaterial);
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 20;
camera.position.y = 20;
camera.rotation.y = 80;
//game logic
var update = function () {};
//draw scene
var render = function () {
    renderer.render(scene, camera)
};
//run game loop (update, render, repeat)		
var GameLoop = function () {
    requestAnimationFrame(GameLoop);
    update();
    render();
}
GameLoop();
