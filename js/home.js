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

    const destaques = locais.slice(0, 6);

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

    const destaques = roteiros.slice(0, 6);

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
            localStorage.setItem('selectedRoteiroId', roteiro.id);
            loadContent('html/pages/roteiro.html', 'content', initRoteiro);
        });

        container.appendChild(card);
    });
}