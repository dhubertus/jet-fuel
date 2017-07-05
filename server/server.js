const express = require('express')
const app = express()
const path = require('path')
const cors = require('express-cors');
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development';
const configuration = require(__dirname + '/knexfile.js')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000)

app.use(express.static(path.join(__dirname,'../public')))

//NOTE:grabs home page sends html
app.get('/',(req,res) => {
  res.sendFile(__dirname+'../public/index.html')
})

//NOTE:receives all categories that exist in db -- for drop down menu
app.get('/api/v1/categories', (request, response) => {
  database('categories').select()
    .then(categories => {
      response.status(200).json(categories);
    })
    .catch(error => {
      response.status(500).json({error})
    });
});

//for selecting and displaying a specific folder
app.get('/api/v1/single-folder', (request, response) => {
  database('categories').where({
    folder: request.query.folder
  })
    .then(specificFolder => {
      if(!specificFolder.length) {
        return response.sendStatus(404)
      }

      response.status(200).json(specificFolder);
    })
    .catch(error => {
      response.status(500).json({error})
    });
});

//NOTE:addes a flder to the categories section of db
app.post('/api/v1/categories', (request, response) => {
  const category = request.body;
  database('categories')
  .insert(category,'folder')
  .then(list => response.send(list))
  .catch(error => {
    response.send(error)
  });
})

//NOTE:returns all the urls for a specific folder
app.get('/api/v1/folder-urls', (request, response) => {
  database('url').where({
    categories_id: request.query.id
  })
    .then(specificFolder => {
      response.status(200).json(specificFolder);
    })
    .catch(error => {
      response.status(500).json({error})
    });
});

//NOTE:redirects to actual website
app.get('/www.jetfuel/:shortUrl.com', (request, response) => {
  database('url').where({
    url_shortened: `www.jetfuel/${request.params.shortUrl}.com`
  })
  .then(url => {
    response.redirect(301, url[0].url)
  })
})

//NOTE:posts a new url NEED to add it to folder
app.post('/api/v1/url', (request, response) => {
  const newUrl = request.body;
  database('url')
  .insert(newUrl,'categories_id')
  .then(parentId => response.send(parentId))
  .catch(error => {
    response.status(500).json({error})
  });
})

//NOTE:updates visits count
app.put('/api/v1/url/visit', (request, res) => {

  const {shortenedUrl} = request.body
  database('url').where({
    'url_shortened': shortenedUrl
  }).select()
  .update({
  'visits': database.raw(`visits + 1`)
  })
  .then(updatedUrl => {
     res.status(200).json(updatedUrl)
  })
  .catch(error=> {
    res.status(500).json({error})
  })
})

app.listen(app.get('port'))

console.log('fired away at port ' + app.get('port'));

module.exports = app
