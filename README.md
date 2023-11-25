# TrabalhoFinalWeb


####### AVISO ####### 
Para fazer tais comandos deve estar na pasta raiz, no caso deste arquivo o comando é cd TrabalhoFinalWeb deve ser feito no terminal.

################ BAIXAR no terminal ################# 
1º npm init -y;

2º npm install -g nodemon 

3º npm install express;

4º npm instalar mysql;

5º cnpm install path ; // Ele pode ser usado para transformar, resolver ou normalizar caminhos de arquivo.

6º npm install dotenv; //É um módulo que carrega variáveis de ambiente de um arquivo .env

7º npm install jsonwebtoken;/*É uma biblioteca que implementa tokens JSON Web (JWT). 
JWTs são úteis para autenticação e troca segura de informações entre partes.*/
 
8º npm install bcryptjs;//É uma biblioteca para hash e verificação de senhas.

9º npm install express-session; // É um middleware para o Express que gerencia sessões. 

####### ABRIR O SITE ####### 
nodemon server.js OU node server.js

####### Atualizar o Repositório Local ####### 
Para baixar as atualizações mais recentes de um repositório remoto no Git, você pode usar o comando `git pull`. Este comando busca as alterações do repositório remoto e, em seguida, tenta mesclar essas alterações na sua branch atual.Aqui está um exemplo de como você pode usar este comando:
``` terminal bash
git pull origin main
```
Neste exemplo, `origin` é o nome do repositório remoto e `main` é a branch que você deseja atualizar.


####### Adicionar atualizações em seu repositório Git ####### 

1. **Adicione as alterações ao Staging Area**: Você pode adicionar todos os arquivos modificados usando `git add .`, ou você pode adicionar arquivos específicos usando `git add nome-do-arquivo`.
 
3. **Incorpore as mudanças do seu projeto remoto com seu projeto local:** O comando **'git pull origin main'** busca todas as atualizações da branch main do repositório remoto origin que ainda não existem no seu repositório local e tenta mesclá-las na sua branch atual.
   
3. **Faça um commit das suas alterações**: Depois de adicionar as alterações ao Staging Area, você pode fazer um commit dessas alterações usando o comando `git commit`. Você deve incluir uma mensagem de commit que descreva as alterações que você fez. Por exemplo, você pode usar `git commit -m "Sua mensagem de commit"`.

4. **Envie as alterações para o repositório remoto**: Finalmente, você pode enviar as alterações que você cometeu para o repositório remoto usando o comando `git push`. Se você estiver enviando para o repositório remoto pela primeira vez, você pode precisar definir o repositório remoto usando `git push -u origin main`.

Por favor, note que você precisa substituir `nome-do-arquivo` e `Sua mensagem de commit` com o nome do arquivo que você modificou e a sua mensagem de commit, respectivamente. Além disso, substitua `nome-da-branch` pelo nome da branch para a qual você deseja enviar as alterações.
