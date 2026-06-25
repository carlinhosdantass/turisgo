function checkAuth() {
    const userNome = localStorage.getItem('usuarioLogado');
    const authArea = document.getElementById('auth-area');
    const navMenu = document.getElementById('menu-nav');

    if (userNome && authArea) {
        authArea.innerHTML = `
            <span style="color: white; margin-right: 15px; font-weight: bold;">Olá, ${userNome}</span>
            <button class="btn-login" onclick="logout()" style="background: transparent; border: 1px solid white;">Sair</button>
        `;
        
        if (navMenu && !document.getElementById('link-novo-local')) {
            navMenu.innerHTML += `<a href="#" id="link-novo-local" style="color: var(--orange); font-weight: bold;" onclick="event.preventDefault(); loadContent('html/pages/novo-local.html', 'content')">+ Novo Local</a>`;
        }
    } else if (authArea) {
        authArea.innerHTML = `<button class="btn-login" onclick="loadContent('html/pages/login.html', 'content')">Login</button>`;
        const linkLocal = document.getElementById('link-novo-local');
        if (linkLocal) linkLocal.remove();
    }
}

function fazerCadastro(event) {
    event.preventDefault();
    
    const nome = document.getElementById('cad-nome').value;
    const email = document.getElementById('cad-email').value;
    const senha = document.getElementById('cad-senha').value;

    const usuario = { nome, email, senha };
    localStorage.setItem('cadastroGoTurismos', JSON.stringify(usuario));

    alert("Cadastro realizado com sucesso! Faça seu login.");
    loadContent('html/pages/login.html', 'content');
}

function fazerLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    const cadastroDB = JSON.parse(localStorage.getItem('cadastroGoTurismos'));

    if (cadastroDB && cadastroDB.email === email && cadastroDB.senha === senha) {
        localStorage.setItem('usuarioLogado', cadastroDB.nome);
        checkAuth();
        loadContent('html/pages/home.html', 'content', initHome); // Manda pra home
    } else {
        alert("E-mail ou senha incorretos!");
    }
}

function logout() {
    localStorage.removeItem('usuarioLogado');
    checkAuth();
    loadContent('html/pages/home.html', 'content', initHome);
}

async function enviarNovoLocal(event) {
    event.preventDefault();

    const novoLocal = {
        nome: document.getElementById('add-nome').value,
        descricao_breve: document.getElementById('add-breve').value,
        descricao_longa: document.getElementById('add-longa').value,
        endereco: document.getElementById('add-endereco').value,
        imagem_destaque: document.getElementById('add-img').value || '/imagens/arena.jpg' // imagem padrao se deixar em branco
    };

    try {
        const resposta = await fetch('https://turisgo-backend.vercel.app/api/locais', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoLocal)
        });

        if (resposta.ok) {
            alert("Local cadastrado com sucesso! Ele já vai aparecer na lista.");
            loadContent('html/pages/locais.html', 'content', initLocais); 
        } else {
            alert("Erro ao cadastrar local. Verifique o servidor.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Falha na conexão com a API.");
    }
}