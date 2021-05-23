'use strict';

// Import packages
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
const pg = require('pg');
const methodOverride = require('method-override');
require('dotenv').config();

// Configure packages
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
const client = new pg.Client(process.env.DATABASE_URL);
// const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

// Routes
app.get('/', homepage);
app.get('/search', searchform);
app.post('/result', result);
app.post('/mylist', mylist);
app.get('/mylist', renderAll);
app.get('/details/:id', details);
app.delete('/delete/:id', deleteData);
app.put('/update/:id', update);
// Functions
function homepage(req, res) {
  let url = `https://jobs.github.com/positions.json?location=usa`;

  superagent.get(url).then(data => {
    let reqData = data.body.map(job => {
      return new Usa(job);
    });
    res.render('index', { usaData: reqData });
  });
}

function searchform(req, res) {
  res.render('pages/search');
}

function result(req, res) {
  let { description } = req.body;
  let url = `https://jobs.github.com/positions.json?description=${description}&location=usa`;
  superagent.get(url).then(data => {
    let reqData = data.body.map(job => {
      return new Usa(job);
    });
    res.render('pages/result', { result: reqData });
  });
}

function mylist(req, res) {
  let { title, company, location, url } = req.body;
  let sql = `INSERT INTO job2 ( title, company, location, url )VALUES ($1,$2,$3,$4); `;
  let savaValues = [title, company, location, url];
  client
    .query(sql, savaValues)
    .then(() => {
      res.redirect('/mylist');
    })
    .catch(error => {
      console.log('ERROR', error);
    });
}

function renderAll(req, res) {
  let sql = `SELECT * FROM job2;`;
  client
    .query(sql)
    .then(data => {
      res.render('pages/mylist', { dataBase: data.rows });
    })
    .catch(error => {
      console.log('error', error);
    });
}

function details(req, res) {
  let sql = `SELECT * FROM job2 WHERE id=$1;`;

  let saveValue = [req.params.id];
  client
    .query(sql, saveValue)
    .then(data => {
      res.render('pages/details', { detail: data.rows[0] });
    })
    .catch(error => {
      console.log('error', error);
    });
}
function deleteData(req, res) {
  let saveValue = [req.params.id];
  let sql = `DELETE FROM job2 WHERE id=$1;`;
  client
    .query(sql, saveValue)
    .then(() => {
      res.redirect('/mylist');
    })
    .catch(error => {
      console.log('error', error);
    });
}

function update(req, res) {
  let id = req.params.id;
  let { title, company, location, url } = req.body;
  let safeValues = [title, company, location, url, id];
  let sql = `UPDATE job2 SET title=$1 ,company=$2, location=$3, url=$4  WHERE id=$5; `;
  client
    .query(sql, safeValues)
    .then(() => {
      res.redirect(`/details/${id}`);
    })
    .catch(error => {
      console.log('error', error);
    });
}
//Constructors;
function Usa(data) {
  this.title = data.title;
  this.company = data.company;
  this.location = data.location;
  this.url = data.url;
  // this.description = data.description;
}
// Server listening

client
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log('THE SERVER IS LISTENING TO PORT ', PORT);
    });
  })
  .catch(error => {
    console.log('ERROR WHILE CONNECTING TO DATABASE', error);
  });
