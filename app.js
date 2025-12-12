import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// digitação da frase "From the code to you."
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

// Animação com Three.js para revelar os blogs na página principal
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

// Fetch dados do Prismic e popular os cards
async function fetchPrismicData() {
  try {
    const response = await fetch("/api/prismic");
    const data = await response.json();
    let contador = 0;

    const container = document.getElementById("cards-container");

    data.forEach((item) => {
      if (contador <= 5) {
        // Substitua os campos abaixo pelos nomes reais do seu JSON
        const title = item.data.title[0].text || "Título padrão";
        const description = item.data.description[0].text || "Sem descrição";
        const imageUrl =
          item.data.image_title[0].text || "https://via.placeholder.com/286x180";
        const uid = item.uid; // Add this line to get the uid
        const link = `details.html?id=${uid}`; // Create the link with uid

        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "30%";

        card.innerHTML = `
                    <a href="${link}" class="card-link">
                      <div class="card-img-wrapper">
                        
                        <img src="${imageUrl}" class="card-img-top" alt="...">
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <hr>
                        <p class="card-text">${description}</p>
                        <a href="${link}" class="btn btn-primary">Read More</a>
                       
                      </div>
                    </a>
                    `;

        container.appendChild(card);
    }
    contador+=1;
    });
  } catch (err) {
    console.error("Erro ao carregar dados do Prismic:", err);
  }
}

fetchPrismicData();

// carregar detalhes do post na página details.html
const params = new URLSearchParams(window.location.search);
const uid = params.get("id");

if (!uid) {
  document.getElementById("post-detail").innerHTML =
    "<p class='text-warning'>Nenhum post encontrado.</p>";
} else {
  fetch(`/api/prismic?uid=${uid}`)
    .then((res) => res.json())
    .then((data) => renderPostDetail(data))
    .catch((err) => {
      console.error("Erro ao carregar detalhe:", err);
      document.getElementById("post-detail").innerHTML =
        "<p class='text-danger'>Erro ao carregar post.</p>";
    });
}

function renderPostDetail(post) {
  const section_div = document.getElementById("section");
  const title = post.data.title_details?.[0]?.text || "Sem título";
  const description =
    post.data.title_details_text?.[0]?.text || "Sem descrição";
  const title_resumo = post.data.title_resumo?.[0]?.text || "Sem resumo";
  const text_resumo =
    post.data.text_resumo?.[0]?.text || "Sem detalhes do resumo";
  const sections = post.data.section || [];

  document.getElementsByClassName("title-detail")[0].textContent = title;
  document.getElementsByClassName("p-details")[0].textContent = description;

  let sectionsHTML = "";
  sections.forEach((section) => {
    if (section.status_section) {
      console.log(section);
      sectionsHTML += `
        <h4 class="subtitle-details">${
          section.title_section?.[0]?.text || ""
        }</h4>
        <p class="p-details">${section.details_section?.[0]?.text || ""}</p>
        <div class="div-img-details">
          <img src="${section.img_section?.[0]?.text || ""}" alt="">
        </div>
      `;
    }
  });

  section_div.innerHTML += sectionsHTML;

  document.getElementsByClassName("resumo-title")[0].textContent = title_resumo;
  document.getElementsByClassName("resumo-details")[0].textContent = text_resumo;
}
