document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 70) {
            header.classList.add('sticky-active');
        } else {
            header.classList.remove('sticky-active');
        }
    });
});

const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
    onlyCountries: ['br', 'us', 'ar', 'uy', 'py'],
  initialCountry: "br", // Define o país inicial como Brasil
  preferredCountries: [],
  separateDialCode: true, // Separa o código de discagem do número
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Para utilidades adicionais, como validação
});


document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu-ancora a');
    const sections = document.querySelectorAll('section');

    function onScroll() {
        let scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

        sections.forEach((section, index) => {
            if (scrollPos >= section.offsetTop - 300 && scrollPos < section.offsetTop + section.offsetHeight) {
                menuItems.forEach((item, i) => {
                    item.parentElement.classList.remove('active');
                    item.parentElement.classList.remove('completed');

                    if (item.getAttribute('href').substring(1) === section.id) {
                        item.parentElement.classList.add('active');
                        
                        // Adiciona a classe "completed" aos itens anteriores
                        for (let j = 0; j < i; j++) {
                            menuItems[j].parentElement.classList.add('completed');
                        }
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
    // Cria o loader dinamicamente
    const loader = document.createElement('div');
    loader.id = "loader";
    loader.innerHTML = `
    <div class="loading-icon">
            <svg
                version="1.1"
                width="100"
                height="100"
                viewBox="0 0 124.52813 171.91436"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="m 39.227676,14.832304 2.928,0.0882 0.0111,36.0278 5.1086,2.2295 c -1.0724,12.3608 -0.3085,12.0486 5.0607,22.1512 l 9.5065,17.9418 c 1.274,-0.8984 1.8731,-3.0326 2.5813,-4.42 l 6.9775,-13.4882 c 5.4676,-10.3206 6.0881,-9.3166 5.1799,-22.0559 l 4.9741,-2.358 0.0925,-35.9063 2.8179,-0.1562 L 84.574276,3.7146788e-6 39.320476,0.00600371 Z"
                    style="fill:none; stroke:#ffffff; stroke-width:2;"/>
                <path
                    d="m 58.590476,157.8528 c -4.0609,-4.0202 -31.5041,-41.1802 -33.944,-43.27 l 20.6589,50.8268 -23.6315,-9.3924 c 2.2839,2.3336 12.5376,10.149 15.5789,12.3902 5.0122,3.6937 2.5316,3.468 10.4943,3.4555 l 28.0472,0.001 c 7.7891,0.009 5.9565,0.6671 10.8766,-3.0684 l 15.136504,-11.7976 c 0.3699,-0.378 0.2901,-0.2824 0.5998,-0.6612 l -23.179604,9.276 20.5662,-50.827 c -1.5841,1.2436 -6.8049,8.3049 -8.5153,10.4789 l -22.9971,29.6966 c -0.3982,0.5113 -0.5041,0.6787 -0.9852,1.2794 -0.2943,0.3675 -0.2062,0.3039 -0.5279,0.6315 -0.831,0.8459 -0.1149,0.2604 -0.9378,0.7865 l -3.9978,-64.121496 c -0.0835,1.503 -0.1482,3.0097 -0.2195,4.5133 -0.137,2.886396 -0.2722,5.760296 -0.425,8.683796 -0.2816,5.391 -0.6206,11.1673 -0.874,16.6805 -0.5273,11.4745 -0.9333,22.9607 -1.7237,34.4381 z"
                    style="fill:none; stroke:#ffffff; stroke-width:2;"/>
                <path
                    d="m 85.584876,160.5862 c 4.9889,-1.2902 6.4583,-4.6768 10.8587,-9.6863 3.2238,-3.6698 6.215504,-7.2853 9.410904,-11.0574 6.2912,-7.4271 12.6534,-14.6086 18.6736,-22.0181 -6.1784,4.6011 -15.8014,13.3508 -22.0136,18.6671 l -10.984504,9.4965 c -0.6985,0.9606 -5.6037,13.0594 -5.9451,14.5982 z"
                    style="fill:none; stroke:#ffffff; stroke-width:2;"/>
                <path
                    d="m 67.162576,150.0057 c 1.0941,-0.8014 6.6201,-8.2307 7.905,-9.8701 1.8852,-2.4057 2.1689,-2.4273 2.8481,-6.2311 1.2845,-7.1934 6.7567,-34.478996 6.9673,-38.269896 -1.4243,2.2623 -12.3134,34.171996 -14.2819,39.670796 -1.801,5.0301 -3.8716,8.6776 -3.4385,14.7003 z"
                    style="fill:none; stroke:#ffffff; stroke-width:2;"/>
                <path
                    d="m 57.221476,150.0201 c 0.5365,-5.9201 -1.5544,-9.5515 -3.3572,-14.5122 l -9.4833,-26.8897 c -1.3332,-3.5824 -3.3012,-10.440996 -4.9014,-13.284996 0.1256,3.1003 5.7295,31.622296 6.939,38.173296 0.9872,5.3468 2.507,6.1914 6.6761,11.4872 1.3117,1.6662 2.7916,3.8298 4.1268,5.0264 z"
                    style="fill:none; stroke:#ffffff; stroke-width:2;"/>
                <path
                    d="m 38.832476,160.5497 c -0.3241,-1.4597 -5.1483,-13.4215 -5.8264,-14.4288 -0.6847,-1.017 -4.0689,-3.6814 -5.4053,-4.8179 -1.8277,-1.5544 -3.6184,-3.2349 -5.5101,-4.7304 -6.5879,-5.208 -15.9919996,-14.0958 -22.090699618063,-18.7332 L 32.658676,156.3297 c 1.9768,2.361 2.5345,3.2442 6.1738,4.22 z"
                    style="fill:none; stroke:#ffffff; stroke-width:2;"/>
            </svg>
        </div>
    `;
    
    // Adiciona o loader ao body
    document.body.appendChild(loader);

    // Desativa a rolagem enquanto o loader está visível
    document.body.style.overflow = "hidden";

    // Duração da animação em milissegundos (1.5s)
    const animationDuration = 1500;

    // Remove o loader após a animação
    setTimeout(function() {
        loader.style.transition = "opacity 0.5s ease"; // Suaviza o fade-out
        loader.style.opacity = 0; // Faz o loader desaparecer
        setTimeout(function() {
            loader.remove(); // Remove o loader do DOM
            document.body.style.overflow = "auto"; // Permite a rolagem novamente
        }, 500); // Tempo da transição de fade-out
    }, animationDuration); // Espera 1.5s antes de remover o loader
});




document.addEventListener("DOMContentLoaded", function() {
    const heroContainer = document.querySelector(".hero .container");

    if (window.innerWidth <= 768) { // Verifica se o dispositivo é mobile
        setTimeout(function() {
            heroContainer.classList.add("animate");
        }, 100); // Pequeno atraso para garantir que a animação seja visível
    }
});
