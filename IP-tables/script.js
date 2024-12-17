// Selecionar os elementos
const ipInput = document.getElementById('ipInput');
const maskInput = document.getElementById('maskInput');
const versionInput = document.getElementById('versionInput');
const addButton = document.getElementById('addButton');
const ipTableBody = document.getElementById('ipTableBody');

// Adicionar evento ao botão
addButton.addEventListener('click', () => {
  const ip = ipInput.value.trim();
  const mask = maskInput.value.trim();
  const version = versionInput.value.trim();

  // Verificar se todos os campos estão preenchidos
  if (ip && mask && version) {
    // Criar uma nova linha na tabela
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${ip}</td>
      <td>${mask}</td>
      <td>${version}</td>
    `;

    // Adicionar a linha ao corpo da tabela
    ipTableBody.appendChild(row);

    // Limpar os campos de entrada
    ipInput.value = '';
    maskInput.value = '';
    versionInput.value = '';
  } else {
    alert('Preencha todos os campos!');
  }
});
