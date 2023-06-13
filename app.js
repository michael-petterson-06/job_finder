const express    = require('express');
const { engine } = require('express-handlebars');
const db         = require('./db/connection');
// const exphbs     = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path       = require('path');

const PORT = 3000;

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
  res.render('index')
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