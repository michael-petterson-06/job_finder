const express    = require('express');
const { engine } = require('express-handlebars');
// const exphbs     = require('express-handlebars');
const app = express();

const PORT = 3000;

app.listen(PORT, function() {
  console.log(`O Express está rodando na porta ${PORT}`);
});


// app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.get('/', (req, res) => {
  res.send('Esta funcionando Mike firmaza total')
})