const express = require('express');
const mysql = require('mysql')
const path = require('path'); 
const port = 3000;


const app = express();
app.use(express.json());

// artigos estaticos
app.use(express.static(path.join(__dirname, 'public')))

//primeira pagina
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// para entrar no banco de dados 
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'nalanda#10',
    database: 'lista_compra_web'
    
});

//cadastrar o usuário
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



app.get('/privado/paginaInicial.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/privado/paginaInicial.html'));
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});

// login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT email, senha FROM pessoa WHERE email = ? AND senha = ?';

    connection.query(query, [email, senha], (error, results) => {
        if (error) {
            console.error('Erro:', error);
            res.status(500).json({ success: false, message: 'Erro no servidor' });
        } else if (results.length > 0) {
            res.json({ success: true, message: 'Login bem-sucedido' });
        } else {
            res.json({ success: false, message: 'E-mail ou senha inválidos' });
        }
    });
});

//permite acessar a pagina
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});