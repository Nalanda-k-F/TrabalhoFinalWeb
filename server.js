const express = require('express');
const mysql = require('mysql')
const path = require('path');
const dotenv = require('dotenv'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const session = require('express-session'); // privar

const port = 3000;

const app = express();
app.use(express.json());

// artigos estaticos
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
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
}

// Use o middleware de autenticação antes de servir os arquivos estáticos
app.use('/privado', checkAuth, express.static(path.join(__dirname, 'privado')));

// login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    // Buscar o usuário no banco de dados
    connection.query('SELECT * FROM pessoa WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error);
        }
        if (!result || !(await bcrypt.compare(senha, result[0].senha))) {
            res.status(401).json({success: false, message: 'E-mail ou senha incorretos!' });
        } else {
            req.session.user = result[0]; 
            res.json({ success: true });
        }
    });
});
//permite acessar a pagina
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});