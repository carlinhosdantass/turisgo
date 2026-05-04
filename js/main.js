function loadContent(file, div) {
    fetch(file)
        .then(function(response) {
            return response.text();
        })
        .then(function(html) {
            document.getElementById(div).innerHTML = html;
        });
}

window.onload = function() {
    loadContent('components/header.html', 'header-placeholder');
    loadContent('components/footer.html', 'footer-placeholder');
};

document.onclick = function(evento) {
    var elemento = evento.target;

    if (elemento.tagName === 'A' && elemento.hasAttribute('data-link')) {
        evento.preventDefault();
        
        var pagina = elemento.getAttribute('href');
        loadContent(pagina, 'content');
    }
};