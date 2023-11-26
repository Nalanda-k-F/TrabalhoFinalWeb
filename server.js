const express = require('express');
const mysql = require('mysql')
const path = require('path'); // Ele pode ser usado para transformar, resolver ou normalizar caminhos de arquivo.
const dotenv = require('dotenv'); //É um módulo que carrega variáveis de ambiente de um arquivo .env
const jwt = require('jsonwebtoken');/*É uma biblioteca que implementa tokens JSON Web (JWT). 
JWTs são úteis para autenticação e troca segura de informações entre partes.*/
const bcrypt = require('bcryptjs');//É uma biblioteca para hash e verificação de senhas.
const session = require('express-session'); // É um middleware para o Express que gerencia sessões. 
const { error } = require('console');

const port = 3000;

const app = express();
app.use(express.json());

// arquivos estaticos
const public = path.join(__dirname,'/public');
app.use(express.static(public));


// Analisar corpos codificados em URL (comforme a sentença dos formulários html)
app.use(express.urlencoded({extended:false}));
// Para analisar o que for enviado pelo cliente
app.use(express.json());

//primeira pagina
app.get('/',(req, res) =>{
    res.render('index.html');
});
//quem somos
app.get('/sobre',(req, res) =>{
    res.render('sobre.html');
});

// COLOCAR AS INFORMAÇÕRS DO BANCO DE DADOS PROTEGIDAS 
dotenv.config({path: path.join(__dirname, '.env')});

// para entrar no banco de dados 
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
    
});
//conecxão do Banco de dados
connection.connect((error) => {
    if(error){
        console.log(error)
    }else{
        console.log("Mysql Connected...")
    }
});

//cadastrar o usuário
app.post('/inserir', (req, res) => {
    const { nome, email, senha, confirmarsenha } = req.body;
 //verificar se já tem um email criado e se as senha são iguais
 connection.query('SELECT email FROM pessoa WHERE email = ?', [email], async (error, result) => {
    if(error){
        console.log(error);
    }
    if(result.length > 0 ){
        return res.status(400).json({success: false, message: 'E-mail já está em uso!' });    
    }else if(senha !== confirmarsenha ){
        return res.status(400).json({success: false, message: 'As senhas não são iguais!' });
    }
    let senhaCriptografada = await bcrypt.hash(senha,8);
    
    connection.query('INSERT INTO pessoa (usuario, email, senha) VALUES (?, ?, ?)', [nome, email, senhaCriptografada], (error,result) =>{
        if (error) {
            return res.status(500).json({success: false, message: 'Erro ao inserir!' });
        } else{
            return res.json({success: true, message: 'Inserido com sucesso!', insertId: result.insertId });
        }
    });
});// connetion 1
});

app.use(session({
    secret: 'seu segredo aqui',
    resave: false,
    saveUninitialized: true
}));
// Middleware para verificar se o usuário está autenticado
function checkAuth(req, res, next) {
    if (req.session.usuario_id) {
        next();
    } else {
        res.redirect('/');
    }
}
// Use o middleware de autenticação antes de servir os arquivos estáticos
app.use('/privado', checkAuth, express.static(path.join(__dirname, 'privado')));
app.get('/privado/adicionar_item',(req, res) =>{
    res.render('pageInicial.html');
});

// login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    connection.query('SELECT * FROM pessoa WHERE email = ?', [email], async (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length === 0) {
        res.status(401).json({success: false, message: 'Nenhum usuário encontrado com este e-mail!' });
      } else if (!(await bcrypt.compare(senha, result[0].senha))) {
        res.status(401).json({success: false, message: 'Senha incorreta!' });
      } else {
        req.session.usuario_id = result[0].id; // Armazene o ID do usuário na sessão
        res.json({ success: true });
      }
    });
  });

// cadastro  e CRUD da pagina de lista 
app.post('/privado/adicionar_item', (req, res) => {
    const { nome, categoria, quantidade, peso } = req.body;
    const usuario_id = req.session.usuario_id;
    connection.query('INSERT INTO alimentos (nome, categoria, quantidade, peso, usuario_id) VALUES (?, ?, ?, ?, ?)',
      [nome, categoria, quantidade, peso, usuario_id],
      (err, result) => {
        if (err) {
          res.status(500).json({ message: 'Erro ao inserir' });
        } else {
          res.json({ message: 'Inserido com sucesso', insertId: result.insertId });
        }
      }
    );
  }); 
//Buscar
app.get('/privado/mostrar_itens', (req, res) => {
    const usuario_id = req.session.usuario_id;
    connection.query('SELECT * FROM alimentos WHERE usuario_id = ?',[usuario_id],(err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao buscar dados' });
        }
        res.json(results);
      }
    );
});

//deletar
app.delete('/privado/deletar_item', (req, res) => {
    const { id } = req.body;
    connection.query('DELETE FROM alimentos WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao deletar' });
        } else {
            res.json({ message: 'Deletado com sucesso' });
        }
    });
});

//botão sair
app.post('/logout', function(req, res){
    req.session.destroy(function(err) {
       if(err) {
          console.log(err);
       } else {
          res.redirect('/index.html');
       }
    });
 }); 

//permite acessar a pagina
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});