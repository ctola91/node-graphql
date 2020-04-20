const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://root:Password1!@localhost:27017/graphql_db', { useNewUrlParser: true });

const app = express();

app.listen(8000, () => {
    console.log('Server started on 8000');
});