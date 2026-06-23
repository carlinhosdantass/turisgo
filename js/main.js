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

window.onload = function () {
    loadContent('html/components/header.html', 'header-placeholder');
    loadContent('html/components/footer.html', 'footer-placeholder');
    loadContent('html/pages/home.html', 'content', initHome);
};

function initHome() {
    fetchLocaisDestaque();
    fetchRoteirosDestaque();
}

function fetchRoteirosDestaque() {
    const urlAPI = 'https://turisgo-backend.vercel.app/api/roteiros';

    fetch(urlAPI)
        .then(response => response.json())
        .then(roteiros => {
            const container = document.getElementById('roteiros-container');
            if (!container) return;

            container.innerHTML = '';

            const destaques = roteiros.slice(0, 3);

            destaques.forEach(roteiro => {
                const card = document.createElement('div');
                card.className = 'card-roteiro';

                card.innerHTML = `
                    <div class="roteiro-header">
                        <span class="tag-duracao">⏱ ${roteiro.duracao_estimada}</span>
                    </div>
                    <h3>${roteiro.titulo}</h3>
                    <p>${roteiro.descricao}</p>
                    <button class="btn-roteiro">Ver roteiro</button>
                `;

                card.addEventListener('click', () => {
                    // Aqui eh pra implementar quando o card for clicado
                });

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error(error);
            const container = document.getElementById('roteiros-container');
            if (container) container.innerHTML = '<p>Erro ao carregar roteiros.</p>';
        });
}

document.addEventListener("click", function (evento) {
    var elemento = evento.target;

    if (elemento.tagName === 'A' && elemento.hasAttribute('data-link')) {
        evento.preventDefault();
        var pagina = elemento.getAttribute('href');

        if (pagina === "home.html" || pagina === "index.html") {
            loadContent('html/pages/home.html', 'content', initHome);
        } else if (pagina === "local.html") {
            loadContent('html/pages/local.html', 'content', initLocal);
        } else {
            loadContent('html/pages/' + pagina, 'content');
        }
    }
});

function fetchLocaisDestaque() {
    const urlAPI = 'https://turisgo-backend.vercel.app/api/locais';

    fetch(urlAPI)
        .then(response => response.json())
        .then(locais => {
            const container = document.getElementById('locais-container');
            if (!container) return;

            container.innerHTML = '';
            const destaques = locais.slice(0, 3);

            destaques.forEach(local => {
                const card = document.createElement('div');
                card.className = 'card-featured';
                card.style.backgroundImage = `url('https://picsum.photos/200/300')`;

                card.innerHTML = `
                    <div class="card-overlay">
                        <h3>${local.nome}</h3>
                        <p>${local.descricao_breve}</p>
                    </div>
                `;

                card.addEventListener('click', () => {
                    // Aqui eh pra implementar quando o card for clicado
                });

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error(error);
            const container = document.getElementById('locais-container');
            if (container) {
                container.innerHTML = '<p>Erro ao carregar locais.</p>';
            }
        });
}