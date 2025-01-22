document.getElementById('searchBtn').addEventListener('click', () => {
    const ipInput = document.getElementById('ipInput').value.trim();

    if (!ipInput) {
        alert('Por favor, insira um endereço IP válido.');
        return;
    }

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `http://ip-api.com/json/${ipInput}`;

    fetch(proxyUrl + apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição.');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === "fail") {
                alert('Endereço IP inválido ou não encontrado.');
                return;
            }

            const tableBody = document.getElementById('ipTable');
            const row = `<tr>
                <td>${data.query}</td>
                <td>${data.org || 'N/A'}</td>
                <td>${data.country || 'N/A'}</td>
                <td>${data.city || 'N/A'}</td>
                <td><button class="clear-btn">X</button></td>
            </tr>`;
            tableBody.innerHTML += row;

            document.querySelectorAll('.clear-btn').forEach(button => {
                button.addEventListener('click', function () {
                    this.closest('tr').remove();
                });
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Não foi possível completar a requisição.');
        });
});
