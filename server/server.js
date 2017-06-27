const express = require('express')
const app = express()
const path = require('path')
const cors = require('express-cors');
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port',3000)

app.use(express.static(path.join(__dirname,'../public')))

app.get('/',(req,res) => {
  res.sendFile(__dirname+'../public/index.html')
})

app.get('/api/v1/categories', (request, response) => {
  database('categories').select()
    .then(categories => {
      response.status(200).json(categories);
    })
    .catch(error => {
      console.error('error: ', error)
    });
});

app.post('/api/v1/categories', (request, response) => {
  const category = request.body;
  database('categories')
  .insert(category,'name')
  .then(list => response.send(list))
  .catch(error => {console.log(error)
  });
})

app.get('/api/v1/url', (request, response) => {
  database('url').select()
    .then(url => {
      response.status(200).json(url);
    })
    .catch(error => {
      console.error('error: ', error)
  });
});

app.post('/api/v1/url', (request, response) => {
  const newUrl = request.body;
  console.log(newUrl);
  database('url')
  .insert(newUrl,'title')
  .then(newUrl => response.send(newUrl))
  .catch(error => {console.log(error)
  });
})

app.listen(app.get('port'))

console.log("fired away at port " + app.get('port'));
