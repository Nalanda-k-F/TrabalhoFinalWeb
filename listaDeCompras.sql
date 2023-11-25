create database lista_compras_1;
use lista_compras_1;
create table pessoa(
id_pes integer auto_increment primary key not null,
usuario varchar(300) not null,
email varchar(300) not null,
senha varchar(100) not null
);

CREATE TABLE alimentos (
id integer auto_increment primary key not null,
nome VARCHAR(100) not null,
categoria VARCHAR(100) not null,
quantidade DECIMAL(10,2),
peso VARCHAR(5)
);
select * from pessoa;
select * from alimentos;