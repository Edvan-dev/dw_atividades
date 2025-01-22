const searchBtn = document.getElementById('searchBtn');
const ipInput = document.getElementById('ipInput');
const ipTable = document.getElementById('ipTable');

// Buscar informações do IP
const searchBtn = document.getElementById('searchBtn');
const ipInput = document.getElementById('ipInput');
const ipTable = document.getElementById('ipTable');
const token = '58a3937219ee1c'; // Substitua pelo seu token real

async function fetchIPData(ip) {
    let url = `https://ipinfo.io/json?token=${token}`;
    if (ip) {
        url = `https://ipinfo.io/${ip}/json?token=${token}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text(); // Tenta obter o texto do erro do servidor
            throw new Error(`Erro na API: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        return {
            ip: data.ip || ip || 'N/A', // Usa o IP fornecido ou o retornado pela API
            org: data.org || 'N/A',
            country: data.country || 'N/A',
            city: data.city || 'N/A'
        };
    } catch (error) {
        console.error('Erro na consulta:', error); // Imprime o erro no console para debug
        alert('IP inválido ou erro na consulta. Verifique o console para mais detalhes.');
        return null;
    }
}

// ... (resto do código igual)

// Adicionar os dados na tabela
async function addIPInfo() {
    const ip = ipInput.value.trim();
    if (!ip) return alert('Digite um endereço IP válido.');

    const ipData = await fetchIPData(ip);
    if (ipData) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${ipData.ip}</td>
            <td>${ipData.org}</td>
            <td>${ipData.country}</td>
            <td>${ipData.city}</td>
            <td class="clear-btn">X</td>
        `;
        ipTable.appendChild(newRow);
        ipInput.value = '';

        // Adicionar funcionalidade de remoção
        newRow.querySelector('.clear-btn').addEventListener('click', () => {
            newRow.remove();
        });
    }
}

// Acionar ação no botão de pesquisa
searchBtn.addEventListener('click', addIPInfo);

// Permitir Enter para buscar IP
ipInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addIPInfo();
});
