const searchBtn = document.getElementById('searchBtn');
const ipInput = document.getElementById('ipInput');
const ipTable = document.getElementById('ipTable');

// Buscar informações do IP através de proxy público
async function fetchIPData(ip) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://ipinfo.io/${ip}/json`;
    const url = `${proxyUrl}${apiUrl}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer YOUR_API_TOKEN`, // Remova se não precisar de token
            },
        });
        if (!response.ok) throw new Error('Erro na API');
        const data = await response.json();
        return {
            ip: data.ip || ip,
            org: data.org || 'N/A',
            country: data.country || 'N/A',
            city: data.city || 'N/A'
        };
    } catch (error) {
        alert('IP inválido ou erro na consulta.');
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
