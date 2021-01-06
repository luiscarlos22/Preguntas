require('./config/config');
const express = require('express');
const app = express();

app.use(require('./routes/router'));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: 3000');
});