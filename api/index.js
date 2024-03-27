const { connection } = require('./database/connection');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');

// DB Connection
connection();

// Express server creation
const app = express();

app.use(cors());
app.use(express.json()); // Parse all the objects cames from the requests to a JSON if content-type: application/json
app.use(express.urlencoded({extended: true})); // For requests that have content-type: form-urlencoded

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(3001, () => { 
    console.log('Server running at port 3001!');
});