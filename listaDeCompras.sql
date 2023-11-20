create database lista_compra_1;
use lista_compra_1;
create table pessoa(
id_pes integer auto_increment primary key not null,
usuario varchar(300) not null,
email varchar(300) not null,
senha varchar(100) not null
);

CREATE TABLE Alimentos (
   id integer auto_increment primary key,
    Nome VARCHAR(200) NOT NULL,
    Categoria VARCHAR(200) NOT NULL,
    Peso DECIMAL(10,2),
    Unidade VARCHAR(5)
);

select * from pessoa;