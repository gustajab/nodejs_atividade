require('dotenv').config();
const express = require("express")
const bodyParser = require("body-parser")
const moment = require('moment');

let ID = 1;
    let cursos = [
      { id: 0, nome: 'Curso de Node.js' },
    ];
const port = process.env.PORT
const app = express()


app.use('/imagens', express.static(__dirname + '/arquivos'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static('public'))

app.get('/sobre', (_,res) => {
    res.json({nome: "Gustavo"})
})

app.post('/cursos/alterar/:id', (req, res) => {
    const {nome} = req.body
    const {id} = req.params
    res.json({nome})
})




app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
})




// lista todos os cursos
app.get('/cursos', (req,res) => {
    res.json(cursos)
})
  


  // adiciona um curso
app.post('/cursos', (req,res) => {
    const {nome} = req.body
    cursos.push({id: ID++, nome})
    res.json({message: 'OK'})
})
  
  // altera um curso
  app.put('/cursos/:id', (req, res) => {
    const id = req.params.id;
    const cursoAtualizado = req.body;
    // lógica para atualizar o curso com o id especificado
    res.send(`Curso com id ${id} atualizado com sucesso!`);
  });
  
  // remove um curso
  app.delete('/cursos/:id', (req,res) => {
    const {id} = req.params
    cursos = cursos.filter(c => c.id != id)
    res.send(`Curso com id ${id} removido com sucesso!`);
})

