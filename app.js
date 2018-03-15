const express = require('express');
const app = express();
const fs = require('fs');

app.locals.pretty = true;

app.set('view engine', 'jade');
app.set('views', './templates')

app.use(express.static('static'));

app.listen(3000, () => {
    console.log(`Server running at http://127.0.0.1:3000/`);
});

app.get('/', (req, res) => {
    res.render('index', {
        title : 'welcome'
    });
});

app.get('/topic/:name', (req, res) => {
    const name = req.params.name;

    const callback = (list) => {
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
