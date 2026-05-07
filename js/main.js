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

// Carrega header e footer
window.onload = function() {
    loadContent('html/components/header.html', 'header-placeholder');
    loadContent('html/components/footer.html', 'footer-placeholder');
};

// Navegação SPA
document.addEventListener("click", function(evento) {
    var elemento = evento.target;

    if (elemento.tagName === 'A' && elemento.hasAttribute('data-link')) {
        evento.preventDefault();

        var pagina = elemento.getAttribute('href');

        if (pagina === "index.html") {
            location.reload();
            return;
        }

        loadContent('html/pages/' + pagina, 'content');
    }
});