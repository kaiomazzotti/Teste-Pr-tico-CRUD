document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const fetchEstabelecimento = async () => {
        try {
            const response = await fetch(`/api/estabelecimentos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const estabelecimento = await response.json();                
                document.querySelector('#razaoSocial').value = estabelecimento.razaoSocial;
                document.querySelector('#nomeFantasia').value = estabelecimento.nomeFantasia;
                document.querySelector('#cnpj').value = estabelecimento.cnpj;
                document.querySelector('#email').value = estabelecimento.email;
                document.querySelector('#endereco').value = estabelecimento.endereco;
                document.querySelector('#cidade').value = estabelecimento.cidade;
                document.querySelector('#estado').value = estabelecimento.estado;
                document.querySelector('#telefone').value = estabelecimento.telefone;
                document.querySelector('#agencia').value = estabelecimento.agencia;
                document.querySelector('#conta').value = estabelecimento.conta;
                document.querySelector('#categoria').value = estabelecimento.categoria;
                document.querySelector('#status').value = estabelecimento.status;
                document.querySelector('#dataCadastro').value = new Date(estabelecimento.dataCadastro).toISOString().split('T')[0];
            
            } else {
                const errorText = await response.text();
                console.error('Erro:', errorText);
                alert('Erro ao carregar os dados do estabelecimento. Detalhes: ' + errorText);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com a API.');
        }
    };

    fetchEstabelecimento();

    const estabelecimentoForm = document.querySelector('#estabelecimentoForm');
    estabelecimentoForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const formData = new FormData(estabelecimentoForm);
        const estabelecimentoData = Object.fromEntries(formData);

        estabelecimentoData.id = parseInt(id);
        estabelecimentoData.categoria = parseInt(estabelecimentoData.categoria)
        estabelecimentoData.status = parseInt(estabelecimentoData.status)
        let hasValidationError = false;

        let agencia = document.getElementById('agencia').value
        agencia = agencia.replace(/\D/g, "");
        if (agencia && agencia.length < 4) {
            event.preventDefault();
            alert('Insira um número válido para agência');
            hasValidationError = true;
        }

        let conta = document.getElementById('conta').value
        agencia = agencia.replace(/\D/g, "");
        if (conta && conta.length < 6) {
            event.preventDefault();
            alert('Insira um número válido para conta');
            hasValidationError = true;
        }

        let cnpj = document.getElementById('cnpj').value;
        cnpj = cnpj.replace(/\D/g, "");

        if (cnpj.length !== 14) {
            event.preventDefault();
            alert('CNPJ incorreto');
            hasValidationError = true;
        }

        let razaoSocial = document.getElementById('razaoSocial').value;
        if (!razaoSocial) {
            event.preventDefault();
            alert('Razão Social é obrigatória');
        }

        let email = document.getElementById('email').value;
        if (email && !validateEmail(email)) {
            event.preventDefault();
            alert('E-mail inválido');
            hasValidationError = true;
        }

        let categoria = document.getElementById('categoria').value;
        let telefone = document.getElementById('telefone').value;
        if (categoria === '0' && !telefone) {
            event.preventDefault();
            alert('Telefone é obrigatório para Supermercados');
            hasValidationError = true;
        }

        if (!hasValidationError) {
            try {
                const response = await fetch(`/api/estabelecimentos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(estabelecimentoData)
                });
                console.log(response)
                if (response.ok) {
                    alert('Estabelecimento atualizado com sucesso!');
                    window.location.href = 'index.html';
                } else {
                    const errorText = await response.text();
                    console.error('Erro:', errorText);
                    alert('Erro ao atualizar o estabelecimento. Detalhes: ' + errorText);
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao conectar com a API.');
            }
        }
    });

});
