const express = require('express');
const app = express();

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