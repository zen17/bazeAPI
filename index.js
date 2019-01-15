const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')

const Uuid = require('cassandra-driver').types.Uuid;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = 3001;
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['127.0.0.1:9042'], keyspace: 'baza'});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'baza'));
const session = driver.session();


//-------------------------------------------SELECT--------------------------------------------------------------



app.post('/user', (req, res) => {
    let email = req.body.email;
    const query = "SELECT * FROM user WHERE email='"+email+"';"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.get('/datumSve', (req, res) => {
    const query = "SELECT * FROM oglasi_po_datumu;"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.get('/datumMod', (req, res) => {
    let datum = req.body.datum;
    let oglas_id = req.body.oglas_id;
    const query = "SELECT * FROM oglasi_po_datumu WHERE datum='" + datum + "' and oglas_id=" + oglas_id + ";"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.get('/datum', (req, res) => {
    let datum = req.body.datum;
    const query = "SELECT * FROM oglasi_po_datumu WHERE datum='" + datum + "';"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.get('/kategorijaSve', (req, res) => {
    const query = "SELECT * FROM oglasi_po_kategoriji;"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.get('/kategorijaMod', (req, res) => {
    let kategorija = req.body.kategorija;
    let oglas_id = req.body.oglas_id;
    const query = "SELECT * FROM oglasi_po_kategoriji WHERE kategorija='" + kategorija + "' and oglas_id=" + oglas_id + ";"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.post('/kategorija', (req, res) => {
    let kategorija = req.body.kategorija;
    let oglas_id = req.body.oglas_id;
    const query = "SELECT * FROM oglasi_po_kategoriji WHERE kategorija='" + kategorija + "';"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.get('/modelSve', (req, res) => {
    const query = "SELECT * FROM oglasi_po_modelu;"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.get('/modelMod', (req, res) => {
    let model = req.body.datum;
    let oglas_id = req.body.oglas_id;
    const query = "SELECT * FROM oglasi_po_modelu WHERE model='" + model + "' and oglas_id=" + oglas_id + ";"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.get('/model', (req, res) => {
    let model = req.body.datum;
    const query = "SELECT * FROM oglasi_po_modelu WHERE model='" + model + "';"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.get('/mojiSve', (req, res) => {
    const query = "SELECT * FROM oglasi_korisnika;"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.get('/mojiMod', (req, res) => {
    let user_email = req.body.user_email;
    let oglas_id = req.body.oglas_id;
    const query = "SELECT * FROM oglasi_korisnika WHERE user_email='" + user_email + "' and oglas_id=" + oglas_id + ";"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.post('/moji', (req, res) => {
    let user_email = req.body.user_email;
    const query = "SELECT * FROM oglasi_korisnika WHERE user_email='" + user_email + "';"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.get('/lajkovaniSve', (req, res) => {
    const query = "SELECT * FROM oglasi_lajkovani;"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.get('/lajkovaniMod', (req, res) => {
    let user_email = req.body.user_email;
    let oglas_id = req.body.oglas_id;
    const query = "SELECT * FROM oglasi_lajkovani WHERE user_email=" + user_email + " and oglas_id=" + oglas_id + ";"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

app.post('/lajkovani', (req, res) => {
    let user_email = req.body.user_email;
    const query = "SELECT * FROM oglasi_lajkovani WHERE user_email='" + user_email + "';"
    client.execute(query, [])
        .then(result => res.json(result.rows));
});

//---------------------------------------DELETE---------------------------------------------

app.post('/delete', function (req, res) {
    let oglas_id = req.body.oglas_id;
    let kategorija = req.body.kategorija;
    let model = req.body.model;
    let datum = req.body.datum;
    let user_email = req.body.user_email;

    const query = "DELETE FROM oglasi_po_datumu WHERE datum='" + datum + "' and oglas_id=" + oglas_id + ";"
    const query1 = "DELETE FROM oglasi_po_kategoriji WHERE kategorija='" + kategorija + "' and oglas_id=" + oglas_id + ";"
    const query2 = "DELETE FROM oglasi_po_modelu WHERE model='" + model + "' and oglas_id=" + oglas_id + ";"
    const query3 = "DELETE FROM oglasi_korisnika WHERE user_email='" + user_email + "' and oglas_id=" + oglas_id + ";"
    const query4 = "DELETE FROM oglasi_lajkovani WHERE user_email='" + user_email + "' and oglas_id=" + oglas_id + ";"

    client.execute(query, [])
        .then(result => res.json(result.rows));
    client.execute(query1, [])
        .then(result => res.json(result.rows));
    client.execute(query2, [])
        .then(result => res.json(result.rows));
    client.execute(query3, [])
        .then(result => res.json(result.rows));
    client.execute(query4, [])
        .then(result => res.json(result.rows));
});

//-----------------------------------------------INSERT------------------------------------------------

app.post('/insert', function (req, res) {
    let kategorija = req.body.kategorija;
    let grupa = req.body.grupa;
    let model = req.body.model;
    let naslov = req.body.naslov;
    let stanje = req.body.stanje;
    let slike = req.body.slike;
    let opis = req.body.opis;
    let cena = req.body.cena;
    let datum = req.body.datum;
    let lajkovi = req.body.like;
    let user_email = req.body.user_email;
    const id = Uuid.random();

    const query = "INSERT INTO oglasi_po_datumu(kategorija,grupa,model,naslov,stanje,slike,opis,cena,datum,lajkovi,oglas_id,user_email)" +
        " VALUES('" + kategorija + "','" + grupa + "','" + model + "','" + naslov + "','" + stanje + "',['" + slike + "'],'" + opis + "'," + cena + ",'" + datum + "'," + lajkovi + ","+id+",'" + user_email + "');"
    const query1 = "INSERT INTO oglasi_po_kategoriji(kategorija,grupa,model,naslov,stanje,slike,opis,cena,datum,lajkovi,oglas_id,user_email)" +
        " VALUES('" + kategorija + "','" + grupa + "','" + model + "','" + naslov + "','" + stanje + "',['" + slike + "'],'" + opis + "'," + cena + ",'" + datum + "'," + lajkovi + ","+id+",'" + user_email + "');"
    const query2 = "INSERT INTO oglasi_po_modelu(kategorija,grupa,model,naslov,stanje,slike,opis,cena,datum,lajkovi,oglas_id,user_email)" +
        " VALUES('" + kategorija + "','" + grupa + "','" + model + "','" + naslov + "','" + stanje + "',['" + slike + "'],'" + opis + "'," + cena + ",'" + datum + "'," + lajkovi + ","+id+",'" + user_email + "');"
    const query3 = "INSERT INTO oglasi_korisnika(kategorija,grupa,model,naslov,stanje,slike,opis,cena,datum,lajkovi,oglas_id,user_email)" +
        " VALUES('" + kategorija + "','" + grupa + "','" + model + "','" + naslov + "','" + stanje + "',['" + slike + "'],'" + opis + "'," + cena + ",'" + datum + "'," + lajkovi + ","+id+",'" + user_email + "');"

    client.execute(query, [])
        .then(result => res.json(result.rows));
    client.execute(query1, [])
        .then(result => res.json(result.rows));
    client.execute(query2, [])
        .then(result => res.json(result.rows));
    client.execute(query3, [])
        .then(result => res.json(result.rows));

    session
        .run("CREATE (ad:Ad{oglas_id:'"+id+"',kategorija:'"+kategorija+"'}) RETURN ad")
        .then(data => {
            res.send(data);
            session.close();
            driver.close();
        });
});

app.post('/insert_user', function (req, res) {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let password = req.body.password;
    let slika = req.body.slika;
    let email = req.body.email;

    const query = "INSERT INTO user(firstname,lastname,username,password,slika,email)" +
        " VALUES('"+firstname+"','"+lastname+"','"+username+"','"+password+"','" + slika + "','"+email+"');"

    client.execute(query, [])
        .then(result => res.json(result.rows));

         session
        .run("CREATE (user:User{email:'"+email+"'}) RETURN user")
        .then(data => {
            res.send(data);
            session.close();
            driver.close();
        });
});

//------------------------------------------------------UPDATE--------------------------------------------------

app.post('/update', function (req, res) {
    let kategorija = req.body.kategorija;
    let grupa = req.body.grupa;
    let model = req.body.model;
    let naslov = req.body.naslov;
    let stanje = req.body.stanje;
    let slike = req.body.slike;
    let opis = req.body.opis;
    let cena = req.body.cena;
    let datum = req.body.datum;
    let oglas_id = req.body.oglas_id;
    let user_email = req.body.user_email;

    const query = "DELETE FROM oglasi_po_datumu WHERE datum='" + datum + "' and oglas_id=" + oglas_id + ";"
    const query1 = "INSERT INTO oglasi_po_datumu(kategorija,grupa,model,naslov,stanje,slike,opis,cena,datum,oglas_id user_email)" +
        " VALUES('" + kategorija + "','" + grupa + "','" + model + "','" + naslov + "','" + stanje + "',['" + slike + "'],'" + opis + "'," + cena + ",'" + datum + "'," + oglas_id + ",'" + user_email + "');"
    client.execute(query, [])
        .then(result => res.json(result.rows));
    client.execute(query1, [])
        .then(result => res.json(result.rows));

    const query2 = "DELETE FROM oglasi_po_kategoriji WHERE kategorija='" + kategorija + "' and oglas_id=" + oglas_id + ";"
    const query3 = "INSERT INTO oglasi_po_kategoriji(kategorija,grupa,model,naslov,stanje,slike,opis,cena,datum,oglas_id user_email)" +
        " VALUES('" + kategorija + "','" + grupa + "','" + model + "','" + naslov + "','" + stanje + "',['" + slike + "'],'" + opis + "'," + cena + ",'" + datum + "'," + oglas_id + ",'" + user_email + "');"
    client.execute(query2, [])
        .then(result => res.json(result.rows));
    client.execute(query3, [])
        .then(result => res.json(result.rows));

    const query4 = "DELETE FROM oglasi_po_modelu WHERE model='" + model + "' and oglas_id=" + oglas_id + ";"
    const query5 = "INSERT INTO oglasi_po_modelu(kategorija,grupa,model,naslov,stanje,slike,opis,cena,datum,oglas_id user_email)" +
        " VALUES('" + kategorija + "','" + grupa + "','" + model + "','" + naslov + "','" + stanje + "',['" + slike + "'],'" + opis + "'," + cena + ",'" + datum + "'," + oglas_id + ",'" + user_email + "');"
    client.execute(query4, [])
        .then(result => res.json(result.rows));
    client.execute(query5, [])
        .then(result => res.json(result.rows));

    const query6 = "DELETE FROM oglasi_korisnika WHERE user_email=" + user_email + " and oglas_id=" + oglas_id + ";"
    const query7 = "INSERT INTO oglasi_korisnika(kategorija,grupa,model,naslov,stanje,slike,opis,cena,datum,oglas_id user_email)" +
        " VALUES('" + kategorija + "','" + grupa + "','" + model + "','" + naslov + "','" + stanje + "',['" + slike + "'],'" + opis + "'," + cena + ",'" + datum + "'," + oglas_id + ",'" + user_email + "');"
    client.execute(query6, [])
        .then(result => res.json(result.rows));
    client.execute(query7, [])
        .then(result => res.json(result.rows));

    /* const query8 = "DELETE FROM oglasi_lajkovani WHERE user_email=" + user_email + " and oglas_id=" + oglas_id + ";"
     const query9 = "INSERT INTO oglasi_lajkovani(kategorija,grupa,model,naslov,stanje,slike,opis,cena,datum,oglas_id user_email)" +
         " VALUES('" + kategorija + "','" + grupa + "','" + model + "','" + naslov + "','" + stanje + "',['" + slike + "'],'" + opis + "'," + cena + ",'" + datum + "'," + oglas_id + ",'" + user_email + "');"
     client.execute(query8, [])
         .then(result => res.json(result.rows));
     client.execute(query9, [])
         .then(result => res.json(result.rows));*/
});

app.post('/lajkuj-oglas', (req, res) => {
    let lajk = req.body.lajk;
    let kategorija = req.body.kategorija;
    let grupa = req.body.grupa;
    let model = req.body.model;
    let naslov = req.body.naslov;
    let stanje = req.body.stanje;
    let slike = req.body.slike;
    let opis = req.body.opis;
    let cena = req.body.cena;
    let datum = req.body.datum;
    let oglas_id = req.body.oglas_id;
    let user_email = req.body.user_email;
    const id = Uuid.random();


    const query = "UPDATE oglasi_lajkovani SET kategorija='" + kategorija + "',grupa='" + grupa + "',model='" + model + "',naslov='" + naslov + "',stanje='" + stanje + "',slike=['" + slike + "'],opis='" + opis + "',cena=" + cena + ",datum='" + datum + "',lajkovi=" + lajk + " WHERE user_email='" + user_email + "' and oglas_id=" + oglas_id + ";"
    const query1 = "UPDATE oglasi_korisnika SET kategorija='" + kategorija + "',grupa='" + grupa + "',model='" + model + "',naslov='" + naslov + "',stanje='" + stanje + "',slike=['" + slike + "'],opis='" + opis + "',cena=" + cena + ",datum='" + datum + "',lajkovi=" + lajk + " WHERE user_email='" + user_email + "' and oglas_id=" + oglas_id + ";"
    const query2 = "UPDATE oglasi_po_datumu SET kategorija='" + kategorija + "',grupa='" + grupa + "',model='" + model + "',naslov='" + naslov + "',stanje='" + stanje + "',slike=['" + slike + "'],opis='" + opis + "',cena=" + cena + ",lajkovi=" + lajk + ",user_email='" + user_email + "' WHERE datum='" + datum + "' and oglas_id=" + oglas_id + ";"
    const query3 = "UPDATE oglasi_po_kategoriji SET grupa='" + grupa + "',model='" + model + "',naslov='" + naslov + "',stanje='" + stanje + "',slike=['" + slike + "'],opis='" + opis + "',cena=" + cena + ",datum='" + datum + "',lajkovi=" + lajk + ",user_email='" + user_email + "' WHERE kategorija='" + kategorija + "' and oglas_id=" + oglas_id + ";"
    const query4 = "UPDATE oglasi_po_modelu SET kategorija='" + kategorija + "',grupa='" + grupa + "',naslov='" + naslov + "',stanje='" + stanje + "',slike=['" + slike + "'],opis='" + opis + "',cena=" + cena + ",datum='" + datum + "',lajkovi=" + lajk + ",user_email='" + user_email + "' WHERE model='" + model + "' and oglas_id=" + oglas_id + ";"

    client.execute(query, [])
        .then(result => res.json(result.rows));
    client.execute(query1, [])
        .then(result => res.json(result.rows));
    client.execute(query2, [])
        .then(result => res.json(result.rows));
    client.execute(query3, [])
        .then(result => res.json(result.rows));
    client.execute(query4, [])
        .then(result => res.json(result.rows));


    session
        .run("MATCH (user:User{email:'"+user_email+"'}),(ad:Ad{oglas_id:'"+oglas_id+"'}) " +
            "MERGE (user)-[r:LIKED]->(ad) RETURN r")
        .then(data => {
            res.send(data);
            session.close();
            driver.close();
        });
});

app.post('/povezani', (req, res) => {
    let oglas_id = req.body.oglas_id;
    session
        .run("MATCH (:Ad{oglas_id:'"+oglas_id+"'})--(u:User) RETURN u")
        .then(data => {
            res.send(data);
            session.close();
            driver.close();
        });
});

app.post('/povezani-oglasi', (req, res) => {
    let email = req.body.email;
    session
        .run("MATCH (:User{email:'"+email+"'})--(a:Ad) RETURN a")
        .then(data => {
            res.send(data);
            session.close();
            driver.close();
        });
});
