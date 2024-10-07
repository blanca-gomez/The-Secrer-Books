CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    ISBN VARCHAR(20) UNIQUE NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Author VARCHAR (255) NOT NULL,
    link VARCHAR(255)
);

INSERT INTO books (ISBN, Name, Author, link) 
    VALUES 
    ('9788408297314', 'Alas De Ónix', 'Rebecca Yarros','https://www.elcorteingles.es/libros/A53181520-alas-de-onix-empireo-3-edicion-limitada-con-cantos-tintados-tapa-dura/?parentCategoryId=999.54302013&color=default'),
    ('9788408291268', 'El Clan', 'Carmen Mola', 'https://www.elcorteingles.es/libros/A52077421-el-clan-inspectora-elena-blanco-5-tapa-blanda-con-solapas/?parentCategoryId=999.54302013&color=default');

SELECT * FROM books;