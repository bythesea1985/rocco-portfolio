import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js ";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
//3D-MODELS
//const galaxy = new URL("./assets/scene.gltf", import.meta.url);
//RENDERER & CONTAINERS
//const renderer = new THREE.WebGL1Renderer();
//const container = document.querySelector(".main-container");
//renderer.setSize(window.innerWidth, window.innerHeight);

//container.appendChild(renderer.domElement);

// Canvas
const canvas = document.querySelector("canvas");

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//Initial position
camera.position.set(5, 5, 5);
camera.rotation.set(-0.9, -0.8, -0.8);
//camera.lookAt(0, 1.2, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

//Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//models & textures loader
const assetLoader = new GLTFLoader();
//galaxy
assetLoader.load("./Assets/scene.gltf", (gltf) => {
  console.log("Our model here!", gltf);
  const model = gltf.scene;
  scene.add(model);

  window.addEventListener("mouseup"),
    function () {
      console.log(camera.position);
      console.log(camera.rotation);
    };
});
/*
//camera movementes
let position = 0;
let items = document.querySelectorAll(".page");
window.addEventListener("wheel", sceneMovement);
window.addEventListener("wheel", elemViewer);
function sceneMovement() {
  switch (position) {
    case 0:
      moveCamera(3.55, 2.3, 5);
      rotateCamera(0, 1.5, 0);
      position = 1;
      break;
    case 1:
      moveCamera(0.12, 1.5, 4.78);
      rotateCamera(0, 2, 0);
      position = 2;
      break;
    case 2:
      moveCamera(-1.6, 2, 4.3);
      rotateCamera(0, 1.7, 0);
      position = 3;
      break;
    case 3:
      moveCamera(0.55, 2.3, 3);
      rotateCamera(0, 0, 0);
      position = 4;
      break;
    case 4:
      moveCamera(0.55, 1, 3);
      rotateCamera(0, 0, 0);
      position = 5;
      break;
    case 5:
      moveCamera(-3, 2.5, 5);
      rotateCamera(-0.55, -1.5, -0.55);
      position = 0;
  }
  function moveCamera(x, y, z) {
    gsap.to(camera.position, {
      x,
      y,
      z,
      duration: 3,
    });
  }

  function rotateCamera(x, y, z) {
    gsap.to(camera.rotation, {
      x,
      y,
      z,
      duration: 3.2,
    });
  }
}
function elemViewer() {
  for (let i = 0; i <= items.length; i++) {
    if (i === position) {
      items[i].classList.add("visible");
    } else {
      items[i].classList.remove("visible");
    }
  }
}
*/
//Renderer
function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
