// ============================================================
// Portfólio — Alison Sanches
// JavaScript puro, sem frameworks (requisito da disciplina)
// ============================================================

// ---------- tema claro/escuro ----------
function initTema() {
  var botao = document.getElementById("btn-tema");
  if (!botao) return;

  botao.addEventListener("click", function () {
    var html = document.documentElement;
    var proximo = html.getAttribute("data-theme") === "light" ? "dark" : "light";

    html.setAttribute("data-theme", proximo);
    localStorage.setItem("tema", proximo); // lembra a escolha pro próximo acesso
  });
}

// ---------- menu mobile (hamburger) ----------
function initMenuMobile() {
  var botao = document.getElementById("btn-menu");
  var menu = document.getElementById("menu");
  if (!botao || !menu) return;

  botao.addEventListener("click", function () {
    var aberto = menu.classList.toggle("aberto");
    botao.classList.toggle("aberto", aberto);
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
  });

  // fecha o menu ao clicar em qualquer link dele
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("aberto");
      botao.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
    });
  });

  // e também com a tecla Esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      menu.classList.remove("aberto");
      botao.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
    }
  });
}

// ---------- formulário de contato (só existe nesta página) ----------
function initFormulario() {
  var form = document.getElementById("form-contato");
  if (!form) return; // guard: nas outras páginas não tem formulário

  var sucesso = document.getElementById("sucesso");

  function marcarCampo(campo, valido) {
    campo.classList.toggle("erro", !valido);
    return valido;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // envio simulado: não existe backend

    var nome = document.getElementById("nome");
    var email = document.getElementById("email");
    var mensagem = document.getElementById("mensagem");

    // nome precisa ter pelo menos 2 caracteres
    var nomeOk = marcarCampo(nome.closest(".campo"), nome.value.trim().length >= 2);

    // e-mail precisa ter o formato básico usuario@dominio.com
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var emailOk = marcarCampo(email.closest(".campo"), regexEmail.test(email.value.trim()));

    // mensagem com pelo menos 10 caracteres
    var mensagemOk = marcarCampo(mensagem.closest(".campo"), mensagem.value.trim().length >= 10);

    if (!nomeOk || !emailOk || !mensagemOk) return;

    // tudo certo: limpa os campos e mostra a confirmação
    form.reset();
    sucesso.classList.add("visivel");
    setTimeout(function () {
      sucesso.classList.remove("visivel");
    }, 5000);
  });

  // tira o erro enquanto a pessoa corrige o campo
  form.querySelectorAll("input, textarea").forEach(function (campo) {
    campo.addEventListener("input", function () {
      campo.closest(".campo").classList.remove("erro");
    });
  });
}

// ---------- animação sutil de entrada dos cards ----------
function initReveal() {
  var elementos = document.querySelectorAll(".reveal");
  if (!elementos.length) return;

  // navegador antigo sem IntersectionObserver: mostra tudo direto
  if (!("IntersectionObserver" in window)) {
    elementos.forEach(function (el) {
      el.classList.add("visivel");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observer.unobserve(entrada.target); // anima uma vez só
        }
      });
    },
    { threshold: 0.15 }
  );

  elementos.forEach(function (el) {
    observer.observe(el);
  });
}

initTema();
initMenuMobile();
initFormulario();
initReveal();
