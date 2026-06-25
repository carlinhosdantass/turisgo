window.onload = function () {
    loadContent('html/components/header.html', 'header-placeholder');
    loadContent('html/components/footer.html', 'footer-placeholder');
    loadContent('html/pages/home.html', 'content', initHome);
};

function initHome() {
    fetchLocaisDestaque();
    fetchRoteirosDestaque();
}

async function fetchLocaisDestaque() {
    const locais = await getLocais();
    const container = document.getElementById('locais-container');
    if (!container) return;

    container.innerHTML = '';
    
    if (locais.length === 0) {
        container.innerHTML = '<p>Nenhum local encontrado.</p>';
        return;
    }

    const destaques = locais.slice(0, 3);

    destaques.forEach(local => {
        const card = document.createElement('div');
        card.className = 'card-featured';
        const imgUrl = `https://turisgo-backend.vercel.app${local.imagem_destaque}`;
        card.style.backgroundImage = `url('${imgUrl}')`;

        card.innerHTML = `
            <div class="card-overlay">
                <h3>${local.nome}</h3>
                <p>${local.descricao_breve}</p>
            </div>
        `;

        // CLIQUE DOS LOCAIS CORRIGIDO E ATIVADO!
        card.addEventListener('click', () => {
            localStorage.setItem('selectedLocalId', local.id);
            loadContent('html/pages/local.html', 'content', initLocal);
        });

        container.appendChild(card);
    });
}

async function fetchRoteirosDestaque() {
    const roteiros = await getRoteiros();
    const container = document.getElementById('roteiros-container');
    if (!container) return;

    container.innerHTML = '';

    if (roteiros.length === 0) {
        container.innerHTML = '<p>Nenhum roteiro encontrado.</p>';
        return;
    }

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
            alert(`Página de roteiros em breve! Você clicou em: ${roteiro.titulo}`);
        });

        container.appendChild(card);
    });
}

async function initLocal() {
    const localId = localStorage.getItem('selectedLocalId');
    
    if (!localId) {
        document.getElementById('content').innerHTML = '<p style="text-align:center; margin-top:50px;">Local não encontrado. Volte para a Home.</p>';
        return;
    }

    const locais = await getLocais(); // Busca da API
    const local = locais.find(item => item.id == localId);

    if (!local) {
        document.getElementById('local-title').innerText = "Local não encontrado";
        return;
    }

    const title = document.getElementById('local-title');
    if (title) title.innerText = local.nome;

    const descBreve = document.getElementById('local-desc-breve');
    if (descBreve) descBreve.innerText = local.descricao_breve;

    const sobre = document.getElementById('local-sobre');
    if (sobre) sobre.innerText = local.descricao_longa;
    
    const addressElement = document.getElementById('local-address');
    if (addressElement) {
        if(local.endereco) {
            addressElement.innerText = `📍 ${local.endereco}`;
            addressElement.style.display = 'block';
        } else {
            addressElement.style.display = 'none';
        }
    }

    const banner = document.getElementById('local-banner');
    if (banner) {
        const bgImage = local.imagem_destaque ? local.imagem_destaque : 'https://picsum.photos/1200/400';
        banner.style.backgroundImage = `url('${bgImage}')`;
    }
}