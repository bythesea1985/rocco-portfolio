import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js ";
import gsap from "gsap";
import { GUI } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//3D-MODELS
const galaxy = new URL("./assets/need_some_space.glb", import.meta.url);
//RENDERER & CONTAINERS
const renderer = new THREE.WebGL1Renderer();
const container = document.querySelector(".main-container");
renderer.setSize(window.innerWidth, window.innerHeight);

container.appendChild(renderer.domElement);

//scene
const scene = new THREE.Scene();

//GUI
const gui = new GUI();

//camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, -5);
camera.lookAt(0, 1.2, 0);

//models & textures
const assetLoader = new GLTFLoader();
//const textureLoader = new THREE.TextureLoader();
//const alienPlanetTexture = textureLoader.load(
//  "./Assets/Planet 1/textures/Planet_baseColor.png"
//);

//galaxy
assetLoader.load(galaxy.href, function (gtlf) {
  const model = gtlf.scene;
  model.position.y = 0.1;
  scene.add(model);
});
/*
//planets
//AlienPlanet
assetLoader.load("./Assets/Planet 1/alien_planet.glb", (gtlf) => {
  console.log("success");
  const alienPlanet = gtlf.scene;
  const meshMaterial = new THREE.MeshStandardMaterial({
    map: alienPlanetTexture,
  });
  alienPlanet.scale.set(0.3, 0.3, 0.3);
  alienPlanet.position.y = 0.3;
  scene.add(alienPlanet);
});*/

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

//Controls
const controls = new OrbitControls(camera, canvas);
