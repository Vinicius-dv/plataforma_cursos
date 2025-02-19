const btn_cadastrar = document.getElementById('btn_cadastrar')

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
    fetch('http://localhost:3000/cadastro',{
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