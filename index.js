import contents from "./projects.js";

const container = document.getElementById("container");
const cardTemplate = (content) => (
  `
  <div class="card m-2 shadow">
    <img class="card-img" src="${content.thumbnail}"></img>
    <div class="card-body text-center">
      <h5 class="card-title">${content.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${content.language.join(" | ")}</h6>
      <p class="card-text"></p>
      <div class="btn-group d-flex justify-content-center">
        <a href="${content.source || './'}" role="button" class="btn btn-secondary">Source</a>
        <a href="${content.demo || './'}" role="button" class="btn btn-secondary">Demo</a>
      </div>
    </div>
  </div>
  `
);

contents.forEach(content => {
  const card = document.createElement("div");
  card.classList.add("col-12");
  card.classList.add("col-md-6");
  card.classList.add("col-lg-4");
  card.innerHTML = cardTemplate(content);
  container.appendChild(card);
});
