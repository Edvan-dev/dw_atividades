const searchBtn = document.getElementById('searchBtn');
const ipInput = document.getElementById('ipInput');
const ipTable = document.getElementById('ipTable');

// Buscar informações do IP
async function fetchIPData(ip) {
    let url = 'http://ip-api.com/json'; // Sem necessidade de token para consultas básicas
    if (ip) {
        url = `http://ip-api.com/json/${ip}`;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro na API');
        const data = await response.json();

        if (data.status === 'fail') { // ip-api retorna "fail" em caso de erro
            throw new Error(data.message || 'IP inválido'); // Mensagem de erro mais informativa
        }
        return {
            ip: data.query || ip || 'N/A',
            org: data.org || 'N/A', // Nem todos os provedores retornam organização
            country: data.country || 'N/A',
            city: data.city || 'N/A'
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
