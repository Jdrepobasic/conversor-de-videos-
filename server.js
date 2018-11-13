const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
    ` ${req.body.post}`,
    );
});

if (process.env.NODE_ENV === 'production') {
    
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


app.listen(port, ()=> {
    console.log(`Running on port ${port}`);
});
