document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            header.classList.add('sticky-active');
        } else {
            header.classList.remove('sticky-active');
        }
    });
});

const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
  initialCountry: "br", // Define o país inicial como Brasil
  separateDialCode: true, // Separa o código de discagem do número
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Para utilidades adicionais, como validação
});


document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu-ancora li a');
    const sections = document.querySelectorAll('section');

    function onScroll() {
        let scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop - 300 && scrollPos < section.offsetTop + section.offsetHeight) {
                menuItems.forEach(item => {
                    item.parentElement.classList.remove('active');
                    if (item.getAttribute('href').substring(1) === section.id) {
                        item.parentElement.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Chama a função para definir a seção ativa ao carregar a página
});

document.querySelectorAll('.menu-ancora a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const offsetPosition = targetElement.offsetTop - 140;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const itemsContainer = document.querySelector(".service-items");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
    let autoSlideInterval;
    let userInteracted = false;

    function showSlide(index) {
        itemsContainer.scrollTo({
            left: index * itemsContainer.offsetWidth,
            behavior: "smooth"
        });
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
        currentIndex = index;
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!userInteracted) {  // Verifica se o usuário não interagiu manualmente
                if (currentIndex < dots.length - 1) {
                    showSlide(currentIndex + 1);
                } else {
                    showSlide(0);
                }
            }
        }, 10000); // Avança a cada 10 segundos
    }

    function resetAutoSlide() {
        if (!userInteracted) {  // Reinicia o temporizador apenas se não houve interação manual
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

    itemsContainer.addEventListener("touchstart", function(e) {
        startX = e.touches[0].clientX;
    });

    itemsContainer.addEventListener("touchend", function(e) {
        let endX = e.changedTouches[0].clientX;
        if (startX > endX + 50) {
            if (currentIndex < dots.length - 1) {
                showSlide(currentIndex + 1);
            } else {
                showSlide(0);  // Volta ao primeiro slide após o último
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

window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    
    // Duração da animação em milissegundos (2s = 2000ms)
    const animationDuration = 1500;

    // Garantir que a animação tenha tempo para completar pelo menos um ciclo
    setTimeout(function() {
        loader.style.opacity = 0;
        setTimeout(function() {
            loader.style.display = "none";
            document.body.style.overflow = "auto"; // Permite a rolagem novamente após o carregamento
        }, 500); // 500ms para suavizar a transição
    }, animationDuration); // Espera o tempo da animação antes de remover o loader
});
