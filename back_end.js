const express = require('express')
const body_parser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
app.use(cors())
app.use(body_parser.json())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/cadastro', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Conectado ao MongoDB!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err))

const cadastro_Schema = new mongoose.Schema({
    senha: String,
    nome: String,
    sobrenome: String,
    email: String,
    curso_selecionado: [String]
})

const cadastro = mongoose.model('Cadastro', cadastro_Schema)

app.post('/cadastro', (req, res) => {
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha
    const sobrenome = req.body.sobrenome

    cadastro.findOne({
        $or: [{ nome }, { email },{sobrenome}]
    })
    .then(usuario_existe => {
        if (usuario_existe) {
            return res.status(400).json({
                success: false,
                message: 'Nome ou email já cadastrados!'
            })
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.log('Erro ao gerar o salt', err)
                    return res.status(500).json('Erro interno')
                }

                bcrypt.hash(senha, salt, (err, hash) => {
                    if (err) {
                        console.log('Erro ao gerar o hash', err)
                        return res.status(500).json('Erro interno')
                    }

                    const novo_cadastro = new cadastro({
                        nome,
                        email,
                        sobrenome,
                        senha: hash
                    })

                    novo_cadastro.save()
                    .then(() => {
                        return res.status(201).json({
                            success: true,
                            message: 'Usuário cadastrado com sucesso',
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({ message: 'Ocorreu um erro: ' + err })
                    })
                })
            })
        }
    })
    .catch((err) => {
        res.status(500).json({ message: 'Erro ao verificar dados: ' + err })
    })
})


app.post('/login',(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha
    const sobrenome = req.body.sobrenome

    cadastro.findOne({email,nome,sobrenome})
    .then(usuario=>{
        if(!usuario){  
            return res.status(400).json({
            success: false,
            message: 'Usuário não encontrado!,faça seu cadastro!',
        })
    }

        bcrypt.compare(senha,usuario.senha,(err,ismatch)=>{
            if(err){
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao comparar as senhas!'
            })
            }

            if(!ismatch) {
                return res.status(400).json({
                    success: false,
                    message: 'Senha incorreta!',
            })
        }
        const token = jwt.sign(
            {sobrenome:usuario.sobrenome},
            'fala_peixe',
            {expiresIn:'1h'}
        )
        return res.status(200).json({
            success: true,
            message: 'Login bem-sucedido!',
            token,
        })
        })
    })
    .catch((err)=>{
        res.status(500).json({
            success: false,
            message: 'Erro ao fazer login: ' + err,
        })
    })
})

app.post('/inscrever',(req,res)=>{
    console.log("Token recebido:", req.body.token_email)
    const curso = req.body.curso
    const token_email = req.body.token_email
    cadastro.findOne({sobrenome:token_email})
    .then(email=>{
        if(!email){  
            return res.status(400).json({
            success: false,
            message: 'Realize o seu login!',
        })
        }else{
            console.log('Cursos salvos',email.curso_selecionado)
            if(!email.curso_selecionado.includes(curso)){
                email.curso_selecionado.push(curso)
                email.save()
                .then(()=>{
                    res.json({
                        success:true,
                        inscrito:true,
                        message: 'Curso adicionado com sucesso!',
                        curso_selecionado: email.curso_selecionado
                    })
                })
                .catch((err) => console.error("Erro ao salvar o curso:", err))
            } else {
                return res.json({ inscrito: false })
            }
        }
    })
    .catch((err) => console.error("Erro ao buscar o usuário:", err))   
})




app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})