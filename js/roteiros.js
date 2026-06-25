async function initRoteiros() {
    const roteiros = await getRoteiros();
    const container = document.getElementById('lista-todos-roteiros');
    if (!container) return;

    container.innerHTML = '';

    if (roteiros.length === 0) {
        container.innerHTML = '<p style="text-align:center; width: 100%;">Nenhum roteiro encontrado.</p>';
        return;
    }

    roteiros.forEach(roteiro => {
        const card = document.createElement('div');
        card.className = 'card-roteiro';
        card.style.flex = 'none'; 
        card.style.maxWidth = '100%';

        card.innerHTML = `
            <div class="roteiro-header">
                <span class="tag-duracao">⏱ ${roteiro.duracao_estimada}</span>
            </div>
            <h3>${roteiro.titulo}</h3>
            <p>${roteiro.descricao}</p>
            <button class="btn-roteiro">Ver detalhes da rota</button>
        `;

        card.addEventListener('click', () => {
            localStorage.setItem('selectedRoteiroId', roteiro.id);
            loadContent('html/pages/roteiro.html', 'content', initRoteiro);
        });

        container.appendChild(card);
    });
}

async function initRoteiro() {
    const roteiroId = localStorage.getItem('selectedRoteiroId');
    if (!roteiroId) return;

    const roteiros = await getRoteiros();
    const locais = await getLocais();
    
    const roteiro = roteiros.find(r => r.id == roteiroId);
    if (!roteiro) return;

    document.getElementById('roteiro-title').innerText = roteiro.titulo;
    document.getElementById('breadcrumb-roteiro-name').innerText = roteiro.titulo;
    document.getElementById('roteiro-desc').innerText = roteiro.descricao;
    document.getElementById('roteiro-duracao').innerText = `⏱ ${roteiro.duracao_estimada}`;

    const itinerarioContainer = document.getElementById('roteiro-itinerario');
    itinerarioContainer.innerHTML = '';

    const locaisDoRoteiro = roteiro.locais_ids.map(id => locais.find(l => l.id === id)).filter(l => l);

    locaisDoRoteiro.forEach((local, index) => {
        const item = document.createElement('div');
        item.className = 'itinerario-item';
        
        const imgUrl = local.imagem_destaque 
            ? `https://turisgo-backend.vercel.app${local.imagem_destaque.startsWith('/') ? local.imagem_destaque : '/' + local.imagem_destaque}` 
            : `https://picsum.photos/100/100?random=${local.id}`;

        item.innerHTML = `
            <div style="font-weight: bold; font-size: 1.2rem; color: #ccc; margin-right: 5px;">${index + 1}º</div>
            <img src="${imgUrl}" class="itinerario-item-img" alt="${local.nome}">
            <div class="itinerario-item-info">
                <h4>${local.nome}</h4>
                <p>${local.descricao_breve.substring(0, 80)}...</p>
            </div>
        `;

        item.addEventListener('click', () => {
            localStorage.setItem('selectedLocalId', local.id);
            loadContent('html/pages/local.html', 'content', initLocal);
        });

        itinerarioContainer.appendChild(item);
    });

    const banner = document.getElementById('roteiro-banner');
    if (banner && locaisDoRoteiro.length > 0) {
        const primeiroLocal = locaisDoRoteiro[0];
        const capaUrl = primeiroLocal.imagem_destaque 
            ? `https://turisgo-backend.vercel.app${primeiroLocal.imagem_destaque.startsWith('/') ? primeiroLocal.imagem_destaque : '/' + primeiroLocal.imagem_destaque}` 
            : `https://picsum.photos/1200/400?random=${primeiroLocal.id}`;
        banner.style.backgroundImage = `url('${capaUrl}')`;
    }
}