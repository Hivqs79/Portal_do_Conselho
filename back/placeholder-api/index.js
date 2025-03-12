const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;
const feedback = require('./responses/feedbacks.json');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/feedback', (req, res) => {
    res.send(feedback);    
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
