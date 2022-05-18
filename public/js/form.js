const loader = document.querySelector('.loader');

//selecionar inputs
const submitBtn = document.querySelector('.submit-btn');
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const numero = document.querySelector('#numero');
const tac = document.querySelector('#terms-and-cond');
const notification = document.querySelector('#notification');

submitBtn.addEventListener('click', ()=>{
    if(nome.value.length < 3){
        showAlert('Nome precisa ter ao menos 3 letras');
    }else if(!email.value.length){
        showAlert('Por favor, coloque o seu email');
    }else if(password.value.length < 8){
        showAlert('A senha precisa de ao menos 8 caracteres');
    }else if(!numero.value.length){
        showAlert('Por favor, coloque o seu celular');
    }else if(!Number(numero.value) || numero.value.length < 9){
        showAlert('Número inválido, por favor, adicione um número de celular válido!');
    }else if(!tac.checked){
        showAlert('Você precisa aceitar os nossos termos e condições para continuar');
    }else{
        //submit form
        loader.style.display = 'block';
        sendData('/signup', {
            nome: nome.value,
            email: email.value,
            password: password.value,
            numero: numero.value,
            tac: tac.checked,
            notification: notification.checked,
            seller: false
        })
    }
})

//function de enviar dados
const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    }).then((res) => res.json())
    .then(response => {
        processData(response);
    })
}

const processData = (data)=>{
    loader.style.display = null;
    if(data.alert){
        showAlert(data.alert);
    }
}

//alert function
const showAlert = (msg) =>{
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(()=>{
        alertBox.classList.remove('show');
    }, 3000);
}