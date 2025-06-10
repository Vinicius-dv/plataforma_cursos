const menuHamburguer = document.getElementById("menu_hamburguer")
const mainMobile = document.getElementById("main_mobile")
const menuItens = document.querySelector(".menu_itens")

menuHamburguer.addEventListener("click", () => {
    mainMobile.classList.toggle("show")
    menuItens.classList.toggle("open")
})

mainMobile.addEventListener('click',(e)=>{
    if(e.target ===mainMobile){
        mainMobile.classList.remove('show')
        menuItens.classList.remove("open")
    }
})


document.addEventListener("DOMContentLoaded", function () {
    // Pegando os botões de Login e Cadastro
    const login_btn = document.querySelector(".login")
    const cad_btn = document.querySelector(".cad")
    const nav_itens = document.querySelector(".ul_itens")

    const login_btn_mobile = document.querySelector(".ul_mobile .login")
    const cad_btn_mobile = document.querySelector(".ul_mobile .cad")
    const ul_mobile = document.querySelector(".ul_mobile")

    const li_painel = document.createElement('li')
    const a_painel = document.createElement('a')

    const li_painel_mobile = document.createElement('li')
    const a_painel_mobile = document.createElement('a')

    const li_logout = document.createElement('li')
    const btn_logout = document.createElement('button')
    
    const li_logout_mobile = document.createElement('li')
    const btn_logout_mobile = document.createElement('button')

    const token = localStorage.getItem("token")

    if (token) {
     
        if (login_btn){
            login_btn.parentElement.remove()
        }
        if (cad_btn){
            cad_btn.parentElement.remove()
        } 


     
       if (login_btn_mobile){
            login_btn_mobile.parentElement.remove()
       }
        if (cad_btn_mobile){
            cad_btn_mobile.parentElement.remove()
        }

        
        a_painel.href = 'painel_login.html'
        a_painel.textContent = 'Painel'
        a_painel.classList.add('painel')
        li_painel.appendChild(a_painel)
        nav_itens.appendChild(li_painel)

   
        a_painel_mobile.href = 'painel_login.html'
        a_painel_mobile.textContent = 'Painel'
        a_painel_mobile.classList.add('painel')
        li_painel_mobile.appendChild(a_painel_mobile)
        ul_mobile.appendChild(li_painel_mobile)

 
        btn_logout.textContent = 'Sair'
        btn_logout.classList.add('logout_btn')
        btn_logout.addEventListener("click", function () {
            localStorage.removeItem("token")
            window.location.reload()
        });
        li_logout.appendChild(btn_logout)
        nav_itens.appendChild(li_logout)

 
        btn_logout_mobile.textContent = 'Sair'
        btn_logout_mobile.classList.add('logout_btn')
        btn_logout_mobile.addEventListener("click", function () {
            localStorage.removeItem("token")
            window.location.reload()
        })
        li_logout_mobile.appendChild(btn_logout_mobile)
        ul_mobile.appendChild(li_logout_mobile)
    }
})

