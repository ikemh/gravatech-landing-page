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
    const items = document.querySelectorAll(".service-item");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    function showSlide(index) {
        // Verifica se o índice está dentro do intervalo
        if (index >= 0 && index < items.length) {
            // Define o deslocamento para mostrar o slide
            const offset = -index * 100;
            items.forEach(item => item.style.transform = `translateX(${offset}%)`);

            // Atualiza o estado das bolinhas
            dots.forEach(dot => dot.classList.remove("active"));
            dots[index].classList.add("active");

            currentIndex = index;
        }
    }

    // Configura os eventos de clique nas bolinhas
    dots.forEach(dot => {
        dot.addEventListener("click", function() {
            const index = parseInt(dot.getAttribute("data-index"));
            showSlide(index);
        });
    });

    // Inicializa o carrossel mostrando o primeiro slide
    showSlide(currentIndex);
});
