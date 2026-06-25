async function initLocais() {
    const locais = await getLocais();
    const container = document.getElementById('lista-todos-locais');
    if (!container) return;

    container.innerHTML = '';

    if (locais.length === 0) {
        container.innerHTML = '<p style="text-align:center; width: 100%;">Nenhum local encontrado.</p>';
        return;
    }

    locais.forEach(local => {
        const card = document.createElement('div');
        card.className = 'card-featured';
        
        const imgUrl = local.imagem_destaque 
            ? `https://turisgo-backend.vercel.app${local.imagem_destaque}` 
            : `https://picsum.photos/400/600?random=${local.id}`;
            
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

async function initLocal() {
    const localId = localStorage.getItem('selectedLocalId');
    
    if (!localId) {
        document.getElementById('content').innerHTML = '<p style="text-align:center; margin-top:50px;">Local não encontrado. Volte para a Home.</p>';
        return;
    }

    const locais = await getLocais();
    const local = locais.find(item => item.id == localId);

    if (!local) {
        document.getElementById('local-title').innerText = "Local não encontrado";
        return;
    }

    const title = document.getElementById('local-title');
    if (title) title.innerText = local.nome;

    const breadcrumbName = document.getElementById('breadcrumb-local-name');
    if (breadcrumbName) breadcrumbName.innerText = local.nome;

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
        let bgImage = `https://picsum.photos/1200/400?random=${local.id}`;

        if (local.imagem_destaque) {
            const caminhoFoto = local.imagem_destaque.startsWith('/') 
                ? local.imagem_destaque 
                : '/' + local.imagem_destaque;
                
            bgImage = `https://turisgo-backend.vercel.app${caminhoFoto}`;
        }

        banner.style.backgroundImage = `url('${bgImage}')`;
    }
}