document.addEventListener('DOMContentLoaded', async () => {
    const fetchEstabelecimentos = async () => {
        try {
            const response = await fetch('/api/estabelecimentos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const estabelecimentos = await response.json();
                const tableBody = document.querySelector('#estabelecimentosTable tbody');
                tableBody.innerHTML = '';

                estabelecimentos.forEach(estabelecimento => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${estabelecimento.razaoSocial}</td>
                        <td>${estabelecimento.nomeFantasia}</td>
                        <td>${estabelecimento.cnpj}</td>
                        <td>${estabelecimento.email}</td>
                        <td>${estabelecimento.endereco}</td>
                        <td>${estabelecimento.cidade}</td>
                        <td>${estabelecimento.estado}</td>
                        <td>${estabelecimento.telefone}</td>
                        <td>${new Date(estabelecimento.dataCadastro).toLocaleDateString()}</td>
                        <td>${getCategoriaText(estabelecimento.categoria)}</td>
                        <td>${getStatusText(estabelecimento.status)}</td>
                        <td>${estabelecimento.agencia}</td>
                        <td>${estabelecimento.conta}</td>
                        <td>
                        <div class="btn-acoes">
                            <button class="btn-update" data-id="${estabelecimento.id}">Atualizar</button>
                            <button class="btn-delete" data-id="${estabelecimento.id}">Deletar</button>
                        </div>
                        </td>
                    `;

                    tableBody.appendChild(row);
                });

                // Adicionar event listeners para os botões
                document.querySelectorAll('.btn-update').forEach(button => {
                    button.addEventListener('click', atualizar);
                });

                document.querySelectorAll('.btn-delete').forEach(button => {
                    button.addEventListener('click', deletar);
                });
            } else {
                const errorText = await response.text();
                console.error('Erro:', errorText);
                alert('Erro ao carregar a lista de estabelecimentos. Detalhes: ' + errorText);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com a API.');
        }
    };

    const atualizar = (event) => {
        const id = event.target.dataset.id;
        window.location.href = `atualizar.html?id=${id}`;
    };

    const deletar = async (event) => {
        const id = event.target.dataset.id;

        if (confirm('Tem certeza que deseja deletar este estabelecimento?')) {
            try {
                const response = await fetch(`/api/estabelecimentos/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Estabelecimento deletado com sucesso!');
                    fetchEstabelecimentos(); 
                } else {
                    const errorText = await response.text();
                    console.error('Erro:', errorText);
                    alert('Erro ao deletar estabelecimento. Detalhes: ' + errorText);
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao conectar com a API.');
            }
        }
    };

    const categorias = {
        0: 'Supermercado',
        1: 'Restaurante',
        2: 'Borracharia',
        3: 'Posto',
        4: 'Oficina',
    };

    const status = {
        0: 'Ativo',
        1: 'Inativo',        
    };

    const getCategoriaText = (value) => {
        return categorias[value];
    };

    const getStatusText = (value) => {
        return status[value];
    };

    fetchEstabelecimentos();
});
