document.getElementById('agencia').addEventListener('input', function (e) {
    var value = e.target.value.replace(/[^\d]/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    e.target.value = value.replace(/(\d{3})(\d)/, '$1-$2');
});

document.getElementById('conta').addEventListener('input', function (e) {
    var value = e.target.value.replace(/[^\d]/g, '');
    if (value.length > 6) value = value.slice(0, 6);
    e.target.value = value.replace(/(\d{2})(\d{3})(\d)/, '$1.$2-$3');
});

document.getElementById('cnpj').addEventListener('input', (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 14) value = value.slice(0, 14);
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
    e.target.value = value;
});

document.getElementById('telefone').addEventListener('input', function (e) {
    var value = e.target.value.replace(/[^\d]/g, '');
    e.target.value = value;
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return re.test(String(email).toLowerCase());
}
