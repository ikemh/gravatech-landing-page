document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 70) {
      header.classList.add("sticky-active");
    } else {
      header.classList.remove("sticky-active");
    }
  });
});

const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
  onlyCountries: ["br", "us", "ar", "uy", "py"],
  initialCountry: "br",
  preferredCountries: [],
  separateDialCode: true,
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Para utilidades adicionais, como validação
});

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-ancora a");
  const sections = document.querySelectorAll("section");

  function onScroll() {
    let scrollPos =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    sections.forEach((section, index) => {
      if (
        scrollPos >= section.offsetTop - 300 &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        menuItems.forEach((item, i) => {
          item.parentElement.classList.remove("active");
          item.parentElement.classList.remove("completed");

          if (item.getAttribute("href").substring(1) === section.id) {
            item.parentElement.classList.add("active");

            // Adiciona a classe "completed" aos itens anteriores
            for (let j = 0; j < i; j++) {
              menuItems[j].parentElement.classList.add("completed");
            }
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll(); // Chama a função para definir a seção ativa ao carregar a página
});

document.querySelectorAll(".menu-ancora a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    const offsetPosition = targetElement.offsetTop - 140;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const itemsContainer = document.querySelector(".service-items");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let autoSlideInterval;
  let userInteracted = false;

  function showSlide(index) {
    itemsContainer.scrollTo({
      left: index * itemsContainer.offsetWidth,
      behavior: "smooth",
    });
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
    currentIndex = index;
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (!userInteracted) {
        // Verifica se o usuário não interagiu manualmente
        if (currentIndex < dots.length - 1) {
          showSlide(currentIndex + 1);
        } else {
          showSlide(0);
        }
      }
    }, 10000); // Avança a cada 10 segundos
  }

  function resetAutoSlide() {
    if (!userInteracted) {
      // Reinicia o temporizador apenas se não houve interação manual
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      userInteracted = true; // Marca que houve interação manual
      clearInterval(autoSlideInterval); // Para o auto slide
    });
  });

  // Navegação por gestos (swipe)
  let startX = 0;

  itemsContainer.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });

  itemsContainer.addEventListener("touchend", function (e) {
    let endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
      if (currentIndex < dots.length - 1) {
        showSlide(currentIndex + 1);
      } else {
        showSlide(0); // Volta ao primeiro slide após o último
      }
      userInteracted = true; // Marca que houve interação manual
      clearInterval(autoSlideInterval); // Para o auto slide
    } else if (startX < endX - 50) {
      if (currentIndex > 0) {
        showSlide(currentIndex - 1);
      }
      userInteracted = true; // Marca que houve interação manual
      clearInterval(autoSlideInterval); // Para o auto slide
    }
  });

  // Inicializa o carrossel e o temporizador se a largura da tela for de 768px ou menos (Mobile)
  if (window.innerWidth <= 768) {
    showSlide(currentIndex);
    startAutoSlide();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const heroContainer = document.querySelector(".hero .container");

  if (window.innerWidth <= 768) {
    // Verifica se o dispositivo é mobile
    setTimeout(function () {
      heroContainer.classList.add("animate");
    }, 100); // Pequeno atraso para garantir que a animação seja visível
  }
});

const contentContainer = document.querySelector(".persuasive-section .content");
function handleMouseMove(event) {
  if (window.innerWidth > 768) {
    const { clientX } = event;
    const contentContainer = document.querySelector(".content"); // Certifique-se de selecionar o container correto
    const containerWidth = contentContainer.offsetWidth;
    const scrollWidth = contentContainer.scrollWidth;
    const maxScroll = scrollWidth - containerWidth;

    // Calcula a posição do mouse em relação ao centro do container
    const centerX = containerWidth / 2;
    const deltaX = clientX - centerX;

    // Calcula a porcentagem de deslocamento (-1 a 1)
    const percentage = deltaX / centerX;

    // Calcula o scrollAmount de forma simétrica
    let scrollAmount = (maxScroll / 2) * percentage + maxScroll / 2;

    // Limita o scrollAmount entre 0 e maxScroll
    scrollAmount = Math.max(0, Math.min(maxScroll, scrollAmount));

    // Aplica a transformação para deslocar os itens suavemente
    contentContainer.style.transform = `translateX(${-scrollAmount}px)`;
  }
}

// Adiciona o evento de movimento do mouse sobre a seção, mas só para desktop
document
  .querySelector(".persuasive-section")
  .addEventListener("mousemove", handleMouseMove);

// Variável para detectar quando o formulário foi submetido
let submitted = false;

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const formGroups = document.querySelectorAll(".form-group");
  const submitButton = document.querySelector('button[type="submit"]');
  const iframe = document.getElementById("hidden_iframe");
  const header = document.querySelector(".header-container");
  const contactSection = document.getElementById("contato"); // Referência para a seção de contato

  // Detecta o envio do formulário
  form.addEventListener("submit", function () {
    submitted = true; // Marca o formulário como enviado
  });

  // Verifica quando o iframe termina de carregar (após o envio do formulário)
  iframe.addEventListener("load", function () {
    if (submitted) {
      // Captura a altura atual do formulário
      const initialFormHeight = form.offsetHeight;

      // Esconde todos os grupos de formulário e o botão de envio
      formGroups.forEach(function (group) {
        group.style.display = "none";
      });
      submitButton.style.display = "none";

      // Cria a mensagem de sucesso dinamicamente
      const successMessage = document.createElement("h4");
      successMessage.id = "success-message";
      successMessage.textContent = "Mensagem enviada com sucesso! \u2705";
      successMessage.style.display = "flex";

      // Insere a mensagem antes do fechamento da tag </form>
      form.appendChild(successMessage);

      // Força o recálculo do layout para capturar a nova altura com o conteúdo da mensagem
      const newFormHeight = form.scrollHeight;

      // Define a altura inicial antes de iniciar a transição
      form.style.height = `${initialFormHeight}px`;

      // Permite um pequeno intervalo para garantir a transição de altura suave
      setTimeout(() => {
        // Atualiza a altura do formulário para a nova altura, desencadeando a transição
        form.style.height = `${newFormHeight}px`;

        // Após a transição, opcionalmente definir a altura como auto para futuros ajustes
        setTimeout(() => {
          form.style.height = "auto";
        }, 1000); // O mesmo tempo da transição de altura definida no CSS (1s)

        // Rola a tela suavemente para o topo da seção #contato, considerando a altura do header
        const headerHeight = header.offsetHeight;
        const sectionPosition =
          contactSection.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = sectionPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 100); // Intervalo para garantir que a nova altura seja aplicada
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Verifica se a tela é menor que 768px (mobile)
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    // Seletor de todos os pontos do produto
    const points = document.querySelectorAll(".point");

    points.forEach((point) => {
      let interval;
      const mainImg = point.querySelector(".main-img");
      const altImg = point.querySelector(".alt-img");

      // Função para alternar as imagens
      function toggleImage() {
        if (mainImg.style.display === "none") {
          mainImg.style.display = "block";
          altImg.style.display = "none";
        } else {
          mainImg.style.display = "none";
          altImg.style.display = "block";
        }
      }

      // Configura a troca automática de imagens a cada 5 segundos
      interval = setInterval(toggleImage, 5000);

      // Troca de imagem manual ao clicar no card da imagem
      point.addEventListener("click", function () {
        toggleImage();
        // Reseta o intervalo para garantir que ele continua trocando depois da interação manual
        clearInterval(interval);
        interval = setInterval(toggleImage, 5000);
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const homeSection = document.getElementById("home");
  const whatsappButton = document.querySelector(".whatsapp-button");

  // Função que será chamada quando o elemento for intersectado
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Se a seção #home estiver visível, escondemos o botão
          whatsappButton.classList.remove("visible");
        } else {
          // Se a seção #home estiver fora da tela, mostramos o botão
          whatsappButton.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.95, // 10% da seção #home visível ainda conta como "visível"
    }
  );

  // Observa a seção #home
  observer.observe(homeSection);
});

document.addEventListener("DOMContentLoaded", function () {
  const highlights = document.querySelectorAll(".highlight, .highlight-blue");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Executa o efeito apenas quando o highlight entra na tela
          const highlight = entry.target;

          // Define a cor do destaque com base na classe
          let backgroundColor = "#ffc10780"; // Cor padrão para 'highlight'
          if (highlight.classList.contains("highlight-blue")) {
            backgroundColor = "#2962ff80"; // Cor para 'highlight-blue'
          }

          // Define a posição do highlight
          highlight.style.position = "relative";

          // Cria um pseudo-elemento ::before via JavaScript
          const beforeElement = document.createElement("span");

          beforeElement.style.position = "absolute";
          beforeElement.style.top = "0";
          beforeElement.style.left = "0";
          beforeElement.style.width = "100%"; // O fundo cobrirá todo o conteúdo do highlight
          beforeElement.style.height = "100%";
          beforeElement.style.zIndex = "-1"; // Fica atrás do texto
          beforeElement.style.backgroundColor = backgroundColor;
          beforeElement.style.transition =
            "clip-path 1s ease-out, opacity 1s ease-out"; // Suavidade da transição

          // Inicialmente, o fundo será cortado à esquerda
          beforeElement.style.clipPath = "inset(0 100% 0 0)";

          // Insere o pseudo-elemento antes do conteúdo do highlight
          highlight.appendChild(beforeElement);

          // Inicia o efeito de "marcatexto" após um pequeno atraso
          setTimeout(() => {
            beforeElement.style.clipPath = "inset(0 0 0 0)"; // O fundo aparece da esquerda para a direita

            // Após a transição, suaviza a remoção do fundo
            setTimeout(() => {
              beforeElement.style.opacity = "0"; // Suaviza o desaparecimento do fundo
            }, 500); // Tempo para o fundo desaparecer
          }, 500); // 500ms de atraso para iniciar o efeito quando o elemento entra na tela

          // Desativa o observador para que o efeito só aconteça uma vez
          observer.unobserve(highlight);
        }
      });
    },
    {
      threshold: 0.5, // 50% do elemento precisa estar visível para acionar o efeito
    }
  );

  // Observa cada highlight e highlight-blue
  highlights.forEach((highlight) => {
    observer.observe(highlight);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const h2Elements = document.querySelectorAll(".typewriter");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const h2 = entry.target;
          const fullText = h2.getAttribute("data-full-text") || h2.textContent; // Salva o texto original, caso já tenha sido alterado.
          let index = 0;

          // Calcula a altura antes de limpar o texto
          const originalHeight = h2.offsetHeight;
          h2.style.height = `${originalHeight}px`; // Define a altura inicial
          h2.style.overflow = "hidden"; // Evita que o conteúdo se expanda fora do container
          h2.textContent = ""; // Limpa o texto para o efeito de digitação
          h2.style.visibility = "visible"; // Faz o texto ser visível apenas no início da digitação

          // Função de digitação
          function typeWriter() {
            if (index < fullText.length) {
              h2.textContent += fullText.charAt(index);
              index++;
              setTimeout(typeWriter, 100); // Controla a velocidade da digitação (100ms)
            } else {
              // Após completar o efeito, removemos a altura fixa
              h2.style.height = "auto";
              h2.style.overflow = "visible";
            }
          }

          setTimeout(typeWriter, 100); // Pequeno delay antes de iniciar a "digitação"

          // Desativa o observador após o primeiro disparo
          observer.unobserve(h2);
        }
      });
    },
    {
      threshold: 1,
    }
  );

  // Observa cada h2 com a classe 'typewriter'
  h2Elements.forEach((h2) => {
    // Salva o texto original em um atributo data-full-text para garantir que o texto não seja perdido
    h2.setAttribute("data-full-text", h2.textContent);
    h2.style.visibility = "hidden"; // Inicialmente invisível até que o efeito de digitação comece
    observer.observe(h2);
  });
});
