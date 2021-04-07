drop database if exists hakimlivsdb;
create database hakimlivsdb;
use hakimlivsdb;


CREATE table if not exists Kategori (
id int not null auto_increment,
namn varchar(50) not null,
moms int not null,
primary key (id)
);

insert into Kategori (namn, moms) values 
('Skafferi', 11),
('Godis', 11),
('Hygienartiklar', 25),
('Städ', 25),
('Tidsskrifter', 6);


CREATE table if not exists Kunder (
id int not null auto_increment,
email varchar(50) not null,
förNamn varchar(50) not null,
efterNamn varchar(50) not null,
adress varchar(50) not null,
postNummer int not null,
ort varchar(30) not null,
kundPassword varchar(30),
vip boolean not null,
aktiv boolean not null,
skapad varchar(30) not null,
editerad varchar(30) not null,

primary key (id)
);

insert into Kunder (id, email, förNamn, efterNamn, adress, postNummer, ort, kundPassword, vip, aktiv, skapad, editerad) values
(1, 'eva@eva.com', 'Eva', 'Evasson', 'Gatugatan 1A', 21121, 'Malmö', '', true, true, '2019-12-12', '2019-12-12'), 
(2, 'pal@pal.com', 'Pål', 'Pålsson', 'Gatugatan 4A', 21121, 'Malmö', '', false, false, '2010-12-12', '2019-12-12'),
(3, 'steve@steve.com', 'Steve', 'Stevesson', 'Gatugatan 23A', 12143, 'Stockholm', '', true, true, '2019-12-12', '2020-12-12’'),
(4, 'sabrina@sabrina.com', 'Sabrina', 'Sabrinasson', 'Gatugatan 111A', 21101, 'Helsingborg', '', true, true, '2010-12-12', '2019-12-12');


CREATE table if not exists Produkter (
id int not null auto_increment,
kategoriId int not null,
namn varchar(50) not null,
pris double not null,
inköpsPris double not null,
beskrivning varchar(100) not null,
bild varchar(100) not null,
skapad varchar(30) not null,
editerad varchar(30) not null,
vikt double not null,

primary key (id),
foreign key (kategoriId) references Kategori.id
);

insert into Produkter (kategoriId, namn, pris, inköpsPris, beskrivning, bild, skapad, editerad, vikt) values
(5, 'Fjällräven Backpack', 109.95, 40.00,
 'Your perfect pack for everyday use and walks in the forest.
 Stash your laptop (up to 15 inches) in the padded sleeve, your everyday', 'https:\/\/picsum.photos\/500?random=1',
 '2021-03-29', '2021-03-29', 0.8),
(4, 'Mens Casual T-shirts', 22.0, '10',
'Slim-fitting style, contrast raglan long sleeve, three-button henley placket,
light weight & soft fabric for breathableand comfortable wearing.
And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans.
The Henley style round neckline includes a three-button placket.', 'https:\/\/picsum.photos\/500?random=2', '2021-03-29',
'2021-03-29', 0.135),
(4, 'Mens Cotton Jacket', 55.99, 10.00,
'great outerwear jackets for Spring\/Autumn\/Winter, suitable for many occasions,
such as working, hiking, camping, mountain\/rock climbing, cycling, traveling or other outdoors.
 Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
 'https:\/\/picsum.photos\/500?random=3', '2021-03-29', '2021-03-29', 2.5),
(4, 'Mens Casual Slim Fit', 15.99, 3.99, 'The color could be slightly different between on the screen and in practice.
  Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
  'https:\/\/picsum.photos\/500?random=4', '2021-03-29', '2021-03-29', 0.2),
(4, 'John Hardy Chain Bracelet', 695.00, 421.21,
 'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the oceans pearl.
 Wear facing inward to be bestowed with love and abundance, or outward for protection.',
 'https:\/\/picsum.photos\/500?random=5', '2021-03-29', '2021-03-29', 0.5),




