const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '../public');

const app = express();
app.use(express.static(publicPath));

app.listen(3000, () => console.log(`node-chat app listening on port ${port}!. `));