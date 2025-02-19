const express = require('express')
const body_parser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const cors = require('cors')
app.use(cors())
app.use(body_parser.json())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/cadastro', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Conectado ao MongoDB!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err))


const cadastro_Schema = new mongoose.Schema({
    senha:String,
    nome: String,
    sobrenome: String,
    email:String
})

const cadastro = mongoose.model('Cadastro',cadastro_Schema)

app.post('/cadastro',(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
     cadastro.findOne({
        $or: [{nome},{email}]
    })
    .then( usuario_existe=>{
        if (usuario_existe) {
            return res.status(400).json({
                success:false,
                message: 'Nome ou email já cadastrados!' 
            });
        }else{
            const novo_cadastro = new cadastro(req.body)
            novo_cadastro.save()
            .then(()=>{
            return res.status(201).json({
                success:true,
                message:'Usuario cadastrado com sucesso',
            })
        })
        .catch((err)=>{
            res.status(500).json({message:'Ocorreu um erro'+err})
        })
        } 
    })
})



app.listen(port,()=>{console.log('Rodando na porta'+port)})