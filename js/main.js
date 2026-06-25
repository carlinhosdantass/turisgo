window.onload = function () {
    loadContent('html/components/header.html', 'header-placeholder');
    loadContent('html/components/footer.html', 'footer-placeholder');
    loadContent('html/pages/home.html', 'content', initHome);
};

window.scrollCarousel = function(containerId, direction) {
    const container = document.getElementById(containerId);
    if (container) {
        const scrollAmount = 320; 
        container.scrollBy({ 
            left: direction * scrollAmount, 
            behavior: 'smooth' 
        });
    }
};

window.realizarBusca = function(event) {
    if (event.key === "Enter") {
        const termoDigitado = event.target.value.trim();
        
        if (termoDigitado !== "") {
            localStorage.setItem('termoBusca', termoDigitado);
            loadContent('html/pages/busca.html', 'content', initBusca);
        }
    }
};