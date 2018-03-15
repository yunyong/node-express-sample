const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.locals.pretty = true;

app.set('view engine', 'jade');
app.set('views', './templates')

app.use(express.static('static'));
app.use(bodyParser.urlencoded({
    extended : false
}));

app.listen(3000, () => {
    console.log(`Server running at http://127.0.0.1:3000/`);
});

app.get('/', (req, res) => {
    res.redirect('/topic');
});

app.get('/topic/create', (req, res) => {
    res.render('form');
});

app.get(['/topic','/topic/:name'], (req, res) => {
    const name = req.params.name;

    const callback = (list) => {
        if(!name){
            res.render('topic', {
                title : 'topic list',
                list : list,
                topic : '',
                desc : ''
            });
        };
        fs.readFile(`data/${name}.txt`, 'utf8', (err, data) => {
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            };
            res.render('topic', {
                title : name,
                list : list,
                topic : name,
                desc : data
            });
        });
    };

    fs.readdir('data', (err, files) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        };
        callback(files);
    })
});

app.post('/topic', (req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;

    fs.writeFile(`data/${title}.txt`, desc, (err) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        };
        res.redirect(`/topic/${title}`);
    });
});

