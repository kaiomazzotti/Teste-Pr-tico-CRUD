document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('estabelecimentoForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        let hasValidationError = false;
        const estabelecimento = {
            razaoSocial: form.razaoSocial.value,
            nomeFantasia: form.nomeFantasia.value,
            cnpj: form.cnpj.value,
            email: form.email.value,
            endereco: form.endereco.value,
            cidade: form.cidade.value,
            estado: form.estado.value,
            telefone: form.telefone.value,
            dataCadastro: form.dataCadastro.value,
            categoria: parseInt(form.categoria.value),
            status: parseInt(form.status.value),
            agencia: form.agencia.value,
            conta: form.conta.value
        };
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
            alert('Insira um CNPJ válido');
            hasValidationError = true;
        }

        let razaoSocial = document.getElementById('razaoSocial').value;
        if (!razaoSocial) {
            event.preventDefault();
            alert('Razão Social é obrigatória');
            hasValidationError = true;
        }

        let email = document.getElementById('email').value;
        if (email && !validateEmail(email)) {
            event.preventDefault();
            alert('Insira um e-mail válido');
            hasValidationError = true;
        }

        let categoria = document.getElementById('categoria').value;
        let telefone = document.getElementById('telefone').value;
        if (categoria === '0' && !telefone) {
            event.preventDefault();
            alert('Telefone obrigatório para Supermercados');
            hasValidationError = true;
        }

        if (!hasValidationError) {
            try {
                const response = await fetch('/api/estabelecimentos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(estabelecimento)
                });

                if (response.ok) {
                    alert('Estabelecimento cadastrado com sucesso!');
                    window.location.href = 'index.html';
                } else {
                    const errorText = await response.text();
                    console.error('Erro:', errorText);
                    alert('Erro ao cadastrar estabelecimento.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao conectar com a API.');
            }
        }
    });    
});
   