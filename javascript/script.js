'use strict';
const root = document.getElementById('root');

let cards = `
<div class="d-flex flex-wrap">
`;

fetch('file.json')
  .then((res) => res.json())
  .then((info) => {
    for (let i = 0; i < info.length; i++) {
      let proyectosHTML = '';

      for (let j = 0; j < info[i].projects.length; j++) {
        const project = info[i].projects[j];
        let finalScore;

        if (project.name === "bit-1" && Array.isArray(project.score)) {
          const total = project.score.reduce((acc, val) => acc + val, 0);
          finalScore = (total / 2).toFixed(2);
        } else {
          finalScore = project.score;
        }

        proyectosHTML += `
          <div class="text-center border proyectos">
            <strong> PROYECTO: </strong> <br> 
            <strong>${project.name}</strong><br>
            Nota: ${finalScore}
          </div>
        `;
      }

      const username = info[i].usernameGithub && info[i].usernameGithub.trim() !== '' ? info[i].usernameGithub : null;

      const githubImage = username
        ? `https://github.com/${username}.png`
        : 'placeholder.jpg'; 

      const githubLink = username
        ? `<a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer" class="card-link github">GitHub</a>`
        : `<span class="text-muted">Sin GitHub</span>`;

      cards += `
<div class="card tamañoDiv text-center">
  <img class="card-img-top imagenesAmigos img-fluid" src="${githubImage}" alt="Imagen de perfil de ${info[i].student}">
  <div class="card-body">
    <h5 class="card-title text-center nombre-estudiantes"><strong>${info[i].student}</strong></h5>
  </div>
  <p class="text-center intensity"> 
    <strong>INTENSIDAD</strong><br>
    ${info[i].intensity}
  </p>
  ${proyectosHTML}
  <div class="card-body">
    ${githubLink}
  </div>
</div>
      `;
    }

    cards += '</div>';
    root.innerHTML = cards;
  })
  .catch((err) => {
    console.log('error:', err);
  });
