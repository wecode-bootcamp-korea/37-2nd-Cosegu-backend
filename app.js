require('dotenv').config();

const express = require('express');
const cors = requrie('cors');
const app = express();
const morgan = require('morgan');
const routes = require('./api/routes');

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening to request on 127.0.0.1:${port}`)
});