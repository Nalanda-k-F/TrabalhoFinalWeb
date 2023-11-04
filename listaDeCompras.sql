create database lista_compra;
use lista_compra;

create table pessoa(
id_pes integer auto_increment primary key not null,
usuario varchar(300) not null,
email varchar(300) not null,
senha varchar(8) not null
);

select * from pessoa;
