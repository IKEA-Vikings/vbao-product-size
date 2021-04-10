require('dotenv').config();
const app = require('./app.js');

app.listen(process.env.PORT, console.log(`Listening on http://${process.env.HOST_PRODUCT_SIZE}:${process.env.PORT}`));