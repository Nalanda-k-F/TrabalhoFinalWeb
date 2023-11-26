create database lista_compra1;
use lista_compra1;
create table pessoa(
id integer auto_increment primary key not null,
usuario varchar(300) not null,
email varchar(300) not null,
senha varchar(100) not null
);
CREATE TABLE alimentos (
id integer auto_increment primary key not null,
nome VARCHAR(100) not null,
categoria VARCHAR(100) not null,
quantidade DECIMAL(10,2),
peso VARCHAR(5),
usuario_id integer,
FOREIGN KEY (usuario_id) REFERENCES pessoa(id)
);
select * from pessoa;
select * from alimentos;