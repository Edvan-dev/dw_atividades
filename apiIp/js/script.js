const searchBtn = document.getElementById('searchBtn');
const ipInput = document.getElementById('ipInput');
const ipTable = document.getElementById('ipTable');

// Buscar informações do IP
const abstractApiKey = '21e5259ab28546a9a6e4a6cda400771a'; // Substitua pela sua chave real

async function fetchIPData(ip) {
    let ipifyUrl = 'https://api.ipify.org?format=json'; // URL do ipify

    try {
        // Obter o IP usando ipify
        const ipifyResponse = await fetch(ipifyUrl);
        if (!ipifyResponse.ok) {
            throw new Error(`Erro ao obter IP do ipify: ${ipifyResponse.status}`);
        }
        const ipifyData = await ipifyResponse.json();
        const ipAddress = ip || ipifyData.ip; // Usa o IP fornecido ou o retornado pelo ipify

        // Obter geolocalização usando Abstract API
        const abstractApiUrl = `https://ipgeolocation.abstractapi.com/v1/?api_key=${abstractApiKey}&ip_address=${ipAddress}`;
        const abstractApiResponse = await fetch(abstractApiUrl);

        if (!abstractApiResponse.ok) {
            const errorText = await abstractApiResponse.text();
            throw new Error(`Erro na API do Abstract: ${abstractApiResponse.status} - ${errorText}`);
        }

        const abstractApiData = await abstractApiResponse.json();

        if (abstractApiData.error) {
            throw new Error(`Erro do Abstract API: ${abstractApiData.error.message}`);
        }

        return {
            ip: ipAddress,
            org: abstractApiData.connection.isp || 'N/A', // Obtendo a organização (ISP)
            country: abstractApiData.country.name || 'N/A',
            city: abstractApiData.city || 'N/A',
            region: abstractApiData.region || 'N/A',
            latitude: abstractApiData.latitude || 'N/A',
            longitude: abstractApiData.longitude || 'N/A',
        };
    } catch (error) {
        console.error("Erro ao buscar IP:", error);
        alert('Erro ao buscar informações do IP. Verifique o console.');
        return null;
    }
}

// Resto do seu código (addIPInfo, etc.) permanece igual (com as colunas adicionadas na tabela, como no exemplo anterior).
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
            <td>${ipData.region}</td> <--- Nova coluna para região
            <td>${ipData.latitude}</td> <--- Nova coluna para latitude
            <td>${ipData.longitude}</td> <--- Nova coluna para longitude
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
