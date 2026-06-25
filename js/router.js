function loadContent(file, div, callback) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar: " + file);
            return response.text();
        })
        .then(html => {
            document.getElementById(div).innerHTML = html;
            if (callback) callback();
        })
        .catch(error => console.error(error));
}

document.addEventListener("click", function (evento) {
    let elemento = evento.target;

    while (elemento && elemento.tagName !== 'A') {
        elemento = elemento.parentElement;
    }

    if (elemento && elemento.tagName === 'A' && elemento.hasAttribute('data-link')) {
        evento.preventDefault();
        const pagina = elemento.getAttribute('href');

        if (pagina === "home.html" || pagina === "index.html") {
            loadContent('html/pages/home.html', 'content', initHome);
        } else if (pagina === "local.html") {
            loadContent('html/pages/local.html', 'content', initLocal);
        } else if (pagina === "locais.html") { // <--- ADICIONE ESTA LINHA
            loadContent('html/pages/locais.html', 'content', initLocais);
        } else if (pagina === "roteiros.html") {
            loadContent('html/pages/roteiros.html', 'content', initRoteiros);
        } else if (pagina === "roteiro.html") {
            loadContent('html/pages/roteiro.html', 'content', initRoteiro);
        } else {
            loadContent('html/pages/' + pagina, 'content');
        }
    }
});