require('dotenv').config();


const express    = require('express');
const { engine } = require('express-handlebars');
const db         = require('./db/connection');
// const exphbs     = require('express-handlebars');
const bodyParser = require('body-parser');
const Job        = require('./models/Job');
const app = express();
const path       = require('path');
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;

const PORT = process.env.PORT;;

app.listen(PORT, function() {
  console.log(`O Express está rodando na porta ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.get('/', (req, res) => {
  let search = req.query.job;
  let query  = '%'+search+'%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress

  if(!search) {
    Job.findAll({order: [
      ['createdAt', 'DESC']
    ]})
    .then(jobs => {
  
      res.render('index', {
        jobs
      });
  
    })
    .catch(err => console.log(err));
  } else {
    Job.findAll({
      where: {title: {[Op.like]: query}},
      order: [
        ['createdAt', 'DESC']
    ]})
    .then(jobs => {
      console.log(search);
      console.log(search);
  
      res.render('index', {
        jobs, search
      });
  
    })
    .catch(err => console.log(err));
  }

})

// db connection
db
  .authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso");
  })
  .catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));