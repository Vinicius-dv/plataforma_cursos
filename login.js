const btn_cadastrar = document.getElementById('btn_cadastrar')
const cad = document.querySelectorAll('.cad')
window.onload = () => {
  
    const token = localStorage.getItem('token')

    if (token) {
         if (cad) cad.style.display = 'none'
        window.location.href = '/painel_login.html';
    }
}

btn_cadastrar.addEventListener('click',(e)=>{
    e.preventDefault()
    const form = document.getElementById('form')
    const nome = document.getElementById('nome').value
    const sobrenome = document.getElementById('sobrenome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const mensagem = document.getElementById('mensagem')
    if(nome ==='' ||sobrenome ===''||email ===''||senha ===''){
         mensagem.innerHTML = 'Complete o formulario'
         mensagem.style.color = 'red'
         return
    }
    const dados = {
        nome:nome,
        sobrenome:sobrenome,
        email:email,
        senha:senha
    }
    fetch('http://localhost:3000/login',{
        method:'Post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(dados)
    })
    .then(res=>res.json())
    .then((dados)=>{
        if(dados.success){
            mensagem.innerText = dados.message
            mensagem.style.color = 'green'
            localStorage.setItem('token', dados.token)
            window.location.href = 'painel_login.html'
            form.reset()
        }else{
            mensagem.innerText = dados.message
            mensagem.style.color = 'red'
        }
    })
    .catch((err)=>{
        mensagem.innerText = 'Erro ao conectar ao servidor!';
        mensagem.style.color = 'red';
        console.log('Ocorreu um erro'+err)
    })
})