async function initBusca() {
    const termo = localStorage.getItem('termoBusca');
    const container = document.getElementById('lista-busca-locais');
    
    const titulo = document.getElementById('busca-titulo');
    if (titulo) titulo.innerText = `Resultados para "${termo}"`;
    
    const subtitulo = document.getElementById('busca-subtitulo');
    if (subtitulo) subtitulo.innerText = "Confira os locais incríveis que encontramos para você.";

    if (!container || !termo) return;

    container.innerHTML = '<p style="text-align:center; width: 100%;">Carregando...</p>';

    const locais = await getLocais(); 
    const termoMinusc = termo.toLowerCase();
    
    const locaisFiltrados = locais.filter(local => 
        local.nome.toLowerCase().includes(termoMinusc) || 
        local.descricao_breve.toLowerCase().includes(termoMinusc)
    );

    container.innerHTML = '';

    if (locaisFiltrados.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; width: 100%; padding: 40px 0;">
                <h3 style="color: #666;">Poxa, não encontramos nada com "${termo}".</h3>
                <p>Tente buscar por outras palavras como "Praia", "Parque", "Museu" ou "Dunas".</p>
            </div>
        `;
        return;
    }

    locaisFiltrados.forEach(local => {
        const card = document.createElement('div');
        card.className = 'card-featured';
        
        const imgUrl = local.imagem_destaque 
            ? `https://turisgo-backend.vercel.app${local.imagem_destaque.startsWith('/') ? local.imagem_destaque : '/' + local.imagem_destaque}` 
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