const searchBtn = document.getElementById('searchBtn');
const ipInput = document.getElementById('ipInput');
const ipTable = document.getElementById('ipTable');

// Buscar informações do IP
async function fetchIPData(ip) {
    let url = 'https://freegeoip.app/json/'; // Para obter o IP do usuário
    if (ip) {
        url = `https://freegeoip.app/json/${ip}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Tratamento de erro mais robusto
            const errorText = await response.text();
            throw new Error(`Erro na API: ${response.status} - ${errorText}`);
        }
        const data = await response.json();

        // freegeoip.app retorna um formato diferente
        return {
            ip: data.ip || ip || 'N/A', // Usamos o IP retornado ou o IP de entrada
            org: 'N/A', // freegeoip.app não fornece informações de organização
            country: data.country_code || 'N/A', // Nome do campo diferente
            city: data.city || 'N/A',
            region: data.region_name || 'N/A', // Adicionando a região, que freegeoip fornece
            latitude: data.latitude || 'N/A', // Adicionando latitude
            longitude: data.longitude || 'N/A' // Adicionando longitude
        };
    } catch (error) {
        console.error("Erro ao buscar IP:", error);
        alert('Erro ao buscar informações do IP. Verifique o console.');
        return null;
    }
}
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
