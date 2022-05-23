

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./controllers');

app.use(express.json());
app.use(express.urlencoded({ extend: true }));

app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});