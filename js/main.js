const toggleClass = (elements, className) =>
  elements.forEach((element) => element.classList.toggle(className));

function menu_ativo() {
  const header = document.getElementById("header");
  const btnMenu = document.getElementById("btn-menu");
  const sections = document.querySelectorAll("section");

  toggleClass([header, btnMenu], "ativo");
  sections.forEach(
    (section) =>
      (section.style.opacity = section.style.opacity === "0" ? "1" : "0")
  );
}
const toggleMenu = () =>
  document.getElementById("modelos-menu").classList.toggle("ativo");

let imgAtiva = 0;
const imgSlider = document.querySelectorAll(".slider-container .slider-box");
const btnNav = document.querySelectorAll(".btn-nav-box .btn-nav");

function mostrarSlider() {
  imgSlider.forEach((img, i) => img.classList.toggle("ativo", i === imgAtiva));
  btnNav.forEach((btn, i) => btn.classList.toggle("ativo", i === imgAtiva));
}

function resetarAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(() => {
    imgAtiva = (imgAtiva + 1) % imgSlider.length;
    mostrarSlider();
  }, 3000);
}

document.querySelector("#proximo").addEventListener("click", () => {
  imgAtiva = (imgAtiva + 1) % imgSlider.length;
  mostrarSlider();
  resetarAutoplay();
});

document.querySelector("#anterior").addEventListener("click", () => {
  imgAtiva = (imgAtiva - 1 + imgSlider.length) % imgSlider.length;
  mostrarSlider();
  resetarAutoplay();
});

btnNav.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    imgAtiva = index;
    mostrarSlider();
    resetarAutoplay();
  });
});

let autoplayInterval = setInterval(() => {
  imgAtiva = (imgAtiva + 1) % imgSlider.length;
  mostrarSlider();
}, 3000);

let lastScrollTop = 0;

function rolarNavBar() {
  const header = document.querySelector("header");
  const scrollTop = window.scrollY;

  header.classList.toggle("rolar", scrollTop > lastScrollTop);
  if (scrollTop === 0) header.classList.remove("rolar");

  lastScrollTop = scrollTop;
}

function verificarVisibilidade() {
  const categorias = [
    ...document.querySelectorAll(".historia-categoria"),
    ...document.querySelectorAll(".modelo-categoria"),
    ...document.querySelectorAll(".tecnologia"),
  ];

  categorias.forEach((categoria) => {
    const rect = categoria.getBoundingClientRect();
    categoria.classList.toggle(
      "visivel",
      rect.top <= window.innerHeight - 50 && rect.bottom >= 0
    );
  });
}

window.addEventListener("scroll", () => {
  rolarNavBar();
  verificarVisibilidade();
});
