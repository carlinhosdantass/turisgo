const BASE_URL = 'https://turisgo-backend.vercel.app/api';

async function getLocais() {
    try {
        const response = await fetch(`${BASE_URL}/locais`);
        if (!response.ok) throw new Error('Erro ao buscar locais');
        return await response.json();
    } catch (error) {
        console.error(error);
        return []; 
    }
}

async function getRoteiros() {
    try {
        const response = await fetch(`${BASE_URL}/roteiros`);
        if (!response.ok) throw new Error('Erro ao buscar roteiros');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}