import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

console.log("Bootstrap carregado via Webpackkkkkk 7!");

const text = "From the code to you.";
const h1 = document.getElementById("typing");
let idx = 0;

function type() {
  if (idx <= text.length) {
    h1.textContent = text.slice(0, idx);
    idx++;
    setTimeout(type, 80);
  }
}
window.addEventListener("DOMContentLoaded", type);

function revealMainWithThreeJS() {
  const main = document.querySelector("main");
  main.style.opacity = 0;

  // Create Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 2;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(main.offsetWidth, main.offsetHeight);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  main.appendChild(renderer.domElement);

  // Simple animation: fade in main while rendering a cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x007bff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  let opacity = 0;
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);

    if (opacity < 1) {
      opacity += 0.02;
      main.style.opacity = opacity;
    } else {
      renderer.domElement.remove();
    }
  }
  animate();
}

window.addEventListener("DOMContentLoaded", revealMainWithThreeJS);
