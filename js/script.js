document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const headerContainer = document.querySelector(".header-container");
  const contactSection = document.getElementById("contato");

  initScrollEvents(header);
  initPhoneInputMasking();
  initSmoothScrollForMenuLinks();
  initCarousel();
  initHeroSectionAnimation();
  initParallaxEffect();
  initFormSubmissionHandling(headerContainer, contactSection);
  initImageTogglingOnMobile();
  initWhatsAppButtonVisibility();
  initHighlightAnimation();
});

function initScrollEvents(header) {
  let lastScrollTop = 0;
  const menuItems = document.querySelectorAll(".menu-ancora a");
  const sections = document.querySelectorAll("section");

  function updateMenuActiveState() {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;

    sections.forEach((section, index) => {
      if (
        scrollPos >= section.offsetTop - 300 &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        menuItems.forEach((item, i) => {
          item.parentElement.classList.remove("active", "completed");

          if (item.getAttribute("href").substring(1) === section.id) {
            item.parentElement.classList.add("active");

            for (let j = 0; j < i; j++) {
              menuItems[j].parentElement.classList.add("completed");
            }
          }
        });
      }
    });
  }

  window.addEventListener("scroll", function () {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // Comportamento do header ao rolar
    if (currentScroll > lastScrollTop) {
      header.style.transform = "translateY(0)";
    } else {
      header.style.transform = "translateY(-100%)";
    }

    // Toggle da classe sticky-active
    if (window.scrollY > 70) {
      header.classList.add("sticky-active");
    } else {
      header.classList.remove("sticky-active");
      header.style.transform = "translateY(0)";
    }

    updateMenuActiveState();
    lastScrollTop = Math.max(currentScroll, 0);
  });

  updateMenuActiveState();
}

function initPhoneInputMasking() {
  const input = document.querySelector("#phone");
  window.intlTelInput(input, {
    onlyCountries: ["br", "us", "ar", "uy", "py"],
    initialCountry: "br",
    preferredCountries: [],
    separateDialCode: true,
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });
}

function initSmoothScrollForMenuLinks() {
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
}

function initCarousel() {
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
        showSlide((currentIndex + 1) % dots.length);
      }
    }, 10000);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      userInteracted = true;
      clearInterval(autoSlideInterval);
    });
  });

  let startX = 0;

  itemsContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  itemsContainer.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
      showSlide((currentIndex + 1) % dots.length);
      userInteracted = true;
      clearInterval(autoSlideInterval);
    } else if (startX < endX - 50) {
      showSlide(currentIndex > 0 ? currentIndex - 1 : dots.length - 1);
      userInteracted = true;
      clearInterval(autoSlideInterval);
    }
  });

  if (window.innerWidth <= 768) {
    showSlide(currentIndex);
    startAutoSlide();
  }
}

function initHeroSectionAnimation() {
  const heroContainer = document.querySelector(".hero .container");

  if (window.innerWidth <= 768) {
    setTimeout(() => {
      heroContainer.classList.add("animate");
    }, 100);
  }
}

function initParallaxEffect() {
  const contentContainer = document.querySelector(
    ".persuasive-section .content"
  );

  function handleMouseMove(event) {
    if (window.innerWidth > 768) {
      const { clientX } = event;
      const containerWidth = contentContainer.offsetWidth;
      const scrollWidth = contentContainer.scrollWidth;
      const maxScroll = scrollWidth - containerWidth;

      const centerX = containerWidth / 2;
      const deltaX = clientX - centerX;
      const percentage = deltaX / centerX;

      let scrollAmount = (maxScroll / 2) * percentage + maxScroll / 2;
      scrollAmount = Math.max(0, Math.min(maxScroll, scrollAmount));

      contentContainer.style.transform = `translateX(${-scrollAmount}px)`;
    }
  }

  document
    .querySelector(".persuasive-section")
    .addEventListener("mousemove", handleMouseMove);
}

function initFormSubmissionHandling(header, contactSection) {
  let submitted = false;
  const form = document.querySelector("form");
  const formGroups = document.querySelectorAll(".form-group");
  const submitButton = document.querySelector('button[type="submit"]');
  const iframe = document.getElementById("hidden_iframe");

  form.addEventListener("submit", () => {
    submitted = true;
  });

  iframe.addEventListener("load", () => {
    if (submitted) {
      const initialFormHeight = form.offsetHeight;

      formGroups.forEach((group) => {
        group.style.display = "none";
      });
      submitButton.style.display = "none";

      const successMessage = document.createElement("h4");
      successMessage.id = "success-message";
      successMessage.textContent = "Mensagem enviada com sucesso! ✅";
      successMessage.style.display = "flex";

      form.appendChild(successMessage);

      const newFormHeight = form.scrollHeight;
      form.style.height = `${initialFormHeight}px`;

      setTimeout(() => {
        form.style.height = `${newFormHeight}px`;

        setTimeout(() => {
          form.style.height = "auto";
        }, 1000);

        const headerHeight = header.offsetHeight;
        const sectionPosition =
          contactSection.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = sectionPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 100);
    }
  });
}

function initImageTogglingOnMobile() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    const points = document.querySelectorAll(".point");

    points.forEach((point) => {
      let interval;
      const mainImg = point.querySelector(".main-img");
      const altImg = point.querySelector(".alt-img");

      function toggleImage() {
        const isMainVisible = mainImg.style.display !== "none";
        mainImg.style.display = isMainVisible ? "none" : "block";
        altImg.style.display = isMainVisible ? "block" : "none";
      }

      interval = setInterval(toggleImage, 5000);

      point.addEventListener("click", () => {
        toggleImage();
        clearInterval(interval);
        interval = setInterval(toggleImage, 5000);
      });
    });
  }
}

function initWhatsAppButtonVisibility() {
  const homeSection = document.getElementById("home");
  const whatsappButton = document.querySelector(".whatsapp-button");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        whatsappButton.classList.toggle("visible", !entry.isIntersecting);
      });
    },
    {
      threshold: 0.95,
    }
  );

  observer.observe(homeSection);
}

function initHighlightAnimation() {
  const highlights = document.querySelectorAll(".highlight, .highlight-blue");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const highlight = entry.target;
          const backgroundColor = "#ffc10780";

          highlight.style.position = "relative";

          const beforeElement = document.createElement("span");
          beforeElement.style.position = "absolute";
          beforeElement.style.top = "0";
          beforeElement.style.left = "0";
          beforeElement.style.width = "100%";
          beforeElement.style.height = "100%";
          beforeElement.style.zIndex = "-1";
          beforeElement.style.backgroundColor = backgroundColor;
          beforeElement.style.transition =
            "clip-path 1s ease-out, opacity 1s ease-out";
          beforeElement.style.clipPath = "inset(0 100% 0 0)";

          highlight.appendChild(beforeElement);

          setTimeout(() => {
            beforeElement.style.clipPath = "inset(0 0 0 0)";

            setTimeout(() => {
              beforeElement.style.opacity = "0";
            }, 500);
          }, 500);

          observer.unobserve(highlight);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  highlights.forEach((highlight) => {
    observer.observe(highlight);
  });
}
