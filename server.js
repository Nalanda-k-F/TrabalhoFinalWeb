const express = require('express');
const mysql = require('mysql')
const path = require('path'); 


const app = express();
app.use(express.json());


app.use(express.static('public')) // ativar o css 


//primeira pagina
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// para entrar no banco de dados 
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'sua Senha',
    database: 'lista_compra'
    
});
app.post('/inserir', (req, res) => {
    const { nome, email, senha } = req.body;

    connection.query('INSERT INTO pessoa (usuario, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao inserir' });
        } else{
        res.json({ message: 'Inserido com sucesso', insertId: result.insertId });
        }
    });
});

// para o login 
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    connection.query('SELECT * FROM pessoa WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
        if (err) {
            res.json({ success: false, message: 'Erro no servidor.' });
        } else if (results.length > 0) {
            res.json({ success: true, message: 'Login bem-sucedido.' });
        } else {
            res.json({ success: false, message: 'Credenciais inválidas.' });
        }
    });
});


      


//permite acessar a pagina
app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});

