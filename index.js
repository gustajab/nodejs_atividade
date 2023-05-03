require('dotenv').config();
const express = require("express")
const bodyParser = require("body-parser")
const moment = require('moment');

    let cursos = [
      { id: 0, nome: 'Curso de Node.js' },
      { id: 1, nome: 'Curso de Enologia' },
      { id: 2, nome: 'Curso de Agronomia' }
    ];
    let aluno = [
        { id: 0, nome: 'gustavo', curso: 0, data_nasc:'2004/08/17' },
      ];

const port = process.env.PORT
const app = express()

// rota imagem
app.use('/imagens', express.static(__dirname + '/arquivos'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static('public'))





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
  app.post('/cursos/alterar/:id', (req, res) => {
    const { nome } = req.body;
    const { id } = req.params;
    cursos = cursos.map(curso => {
      if (curso.id == id) {
        curso.nome = nome;
      }
      return curso;
    });
    const curso = cursos.find(c => c.id == id);
    res.json({nome})
    res.send(`Curso ${curso.nome} atualizado com sucesso!`);
})


  // remove um curso
  app.delete('/cursos/:id', (req,res) => {
    const {id} = req.params
    const curso = cursos.find(c => c.id == id);
    cursos = cursos.filter(c => c.id != id)
    res.send(`Curso ${curso.nome} removido com sucesso!`);
})