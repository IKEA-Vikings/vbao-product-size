require('dotenv').config();
const app = require('./app.js');
const host_productSize = process.env.HOST_PRODUCT_SIZE ? process.env.HOST_PRODUCT_SIZE : 'localhost';

app.listen(process.env.PORT, console.log(`Listening on http://${host_productSize}:${process.env.PORT}`));