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
