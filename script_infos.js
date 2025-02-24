
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

    const token = localStorage.getItem('token')
if (!token) {
    console.error("Token não encontrado no localStorage!")
    mensagem.innerText = "Erro: Você precisa estar logado para alterar os dados."
    mensagem.style.color = "red"
    return
}
    const token_decodificado = JSON.parse(atob(token.split('.')[1]))
    const token_email = token_decodificado.sobrenome
    console.log(token_email)

    const dados = {
        nome:nome,
        sobrenome:sobrenome,
        email:email,
        senha:senha
    }   

    fetch('http://localhost:3000/alterar_dados',{
        method:'put',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({dados,token_email})
    })
    .then(res=>res.json())
    .then(dados=>{
        if(dados.success){
            mensagem.innerText = dados.message
            mensagem.style.color = 'green'
            form.reset()
        }else{
            mensagem.innerText = dados.message
            mensagem.style.color = 'red'
        }
    })
})