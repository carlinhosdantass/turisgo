function loadContent(file, div) {
    fetch(file)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Erro ao carregar: " + file);
            }
            return response.text();
        })
        .then(function(html) {
            document.getElementById(div).innerHTML = html;
        })
        .catch(function(error) {
            console.error(error);
        });
}

window.onload = function() {
    loadContent('html/components/header.html', 'header-placeholder');
    loadContent('html/components/footer.html', 'footer-placeholder');
};

document.onclick = function(evento) {
    var elemento = evento.target;

    if (elemento.tagName === 'A' && elemento.hasAttribute('data-link')) {
        evento.preventDefault();

        var pagina = elemento.getAttribute('href');

        loadContent('html/pages/' + pagina, 'content');
    }
};