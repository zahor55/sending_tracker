const express = require('express');
const doc_ctl = require('./controllers/doc_ctl');
const app = express();
const port = process.env.PORT || 3004;
app.set('port', port);
// app.use('/', express.static('./public')); // for API
app.use(express.urlencoded({ extended: true }));
app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin,X-Requested-With, Content-Type, Accept");
        res.set("Content-Type", "application/json");
        next();
    });

app.get('/num/:trackNumber/:mailToSend/:name*?/:id', doc_ctl.sendNum);
app.get('/noNum/:value/:mailToSend/:name*?/:id', doc_ctl.noNum);
app.listen(port, () => console.log(`listening on port ${port}`));