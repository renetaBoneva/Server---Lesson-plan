const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(router);

mongoose.connect()
.then(() => {
    console.log('Database connected!');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}...`);
    });
})
.catch((err) => console.log(err));