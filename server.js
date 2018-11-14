const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const aws = require('aws-sdk');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 5000;


//Zencoder
var Zencoder = require('zencoder');

var client = Zencoder();

// AWS set region São Paulo
aws.config.region = 'sa-east-1';

//body parser para arquivos json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// para upload do arquivo
app.use(cors());
app.use(fileUpload());

//pegar erro 404
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

if (process.env.NODE_ENV === 'production') {
    
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
app.engine('html', require('ejs').renderFile);


app.listen(port, ()=> {
    console.log(`Running on port ${port}`);
});
