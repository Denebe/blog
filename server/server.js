//File System
const fs = require('fs');

const express = require('express');
const app = express();
const port = process.PORT || 4000;

//express에 body-parser 일부기능이 내장되었다.
app.use(express.json());
//extended 옵션의 경우 true일 경우, 객체 형태로 전달된 데이터 내에서
//또다른 중첩된 객체를 허용하고, false인 경우 허용하지 않는다는 의미
app.use(express.urlencoded({ extended: true }));

//동기처리
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');


const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, moment().format('YYYYMMDDHH') + "_" + file.originalname);
    }
})
const upload = multer({storage: storage});

//db connect 부분 database.json의 형식을 가져온다.
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect(function (err) {
    if (err)
        console.error('mysql connection error:' + err);
    else console.log('mysql is connected successfully');
});

app.get('/api/user', (req, res) => {
    connection.query(
        'SELECT * FROM PROJECT',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})



app.post('/api/user', (req, res) => {

    const sql = 'INSERT INTO PROJECT VALUES (NULL, ?, ?, ?)';

    const id = req.body.id;

    const pw = req.body.pw;

    const name = req.body.name;

    const params = [id, pw, name];

    connection.query(sql, params,
        (err, rows, fields) => {
            console.log("mysql callback");
            res.send(rows);
        })
});


app.get('/api/data', (req, res) => {
    connection.query(
        'SELECT * FROM wow',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

app.use('/image', express.static('./upload'));

app.post('/api/data',upload.single('image'), (req, res) => {

    console.log(req.body);

    const sql = 'INSERT INTO wow VALUES (NULL, ?, ?, ?, ?, NOW())';

    const title = req.body.title;

    const writer = req.body.writer;

    const image = '/image/' + moment().format('YYYYMMDDHH') + "_" + req.file.originalname;

    const content = req.body.content;

    const params = [title, writer, image, content];

    connection.query(sql, params,
        (err, rows, fields) => {
            console.log("mysql callback");
            res.send(rows);
        })
});

app.delete('/api/data/:mo', (req,res) => {

    console.log(req.params.mo)

    const sql = 'DELETE FROM wow WHERE mo = ?'
 
    const params = [req.params.mo];

    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        })
})


app.listen(port, () => console.log(`Listening on port ${port}`));