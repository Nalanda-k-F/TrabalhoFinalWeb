create database lista_compra_1;
use lista_compra_1;
create table pessoa(
id_pes integer auto_increment primary key not null,
usuario varchar(300) not null,
email varchar(300) not null,
senha varchar(100) not null
);

select * from pessoa;