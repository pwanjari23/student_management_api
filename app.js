const express = require('express');
const bodyParser = require('body-parser');

const studentRoutes = require('./routes/studentRoute');

const app = express();
app.use(bodyParser.json());

app.use('/students', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
