// Installed all packages except bcrypt & handlebars

//const path = require('path');
const express = require('express');

const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extend: true }));

//app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});