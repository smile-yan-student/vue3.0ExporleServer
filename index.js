const express = require("express");
const app = express();
const mysql = require("mysql2");
const formidable = require("formidable");
app.use(express.urlencoded());
app.use(express.json());
const fs = require("fs");
const { query } = require("./sql.js");
app.listen(3000, function (err) {
    if (!err) console.log("------服务启动成功------");
    else {
        console.log("------启动失败------");
    }
});

app.get("/application/title", (req, res) => {
    query("SELECT * from sentence")
        .then((results) => {
            let msg = results[results.length - 1];
            res.send({
                code: 200,
                data: msg,
            });
        })
        .catch(() => {
            res.send({
                code: 500,
            });
        });
});

app.get("/application/updatetitle", (req, res) => {
    query(`insert into sentence (title) values ('${req.query.title}')`)
        .then((results) => {
            res.send({
                code: 200,
                data: "ok",
            });
        })
        .catch(() => {
            res.status = 400;
            res.send({
                code: 500,
            });
        });
});
app.post("/application/login", (req, res) => {
    let {
        info: { name, password: pw },
    } = req.body;
    query(`SELECT name,password from user where name = "${name}"`)
        .then((results) => {
            if (!results.length) {
                res.status(401);
                res.send("err");
                return;
            }
            let { password } = results[0];
            if (pw == password) {
                res.send({ msg: "ok" });
                return;
            } else {
                res.status(401);
                res.send("password error");
                return;
            }
        })
        .catch(() => {
            res.status(500);
            res.send("err");
        });
});

app.post("/application/uploadScan", (req, res) => {
    let form = formidable({ multiples: true });
    form.parse(req, (err, fields, file) => {
        var data = fs.readFileSync(file.file.filepath);
        fs.writeFileSync(`/Users/passenger/Desktop/video/tt1.mp4`, data, {
            flag: "a",
        });
        res.send("ok");
    });
});
app.post("/application/registry", (req, res) => {
    let {
        info: { name, password, timestamp },
    } = req.body;
    query(`SELECT name from user where name = "${name}"`)
        .then((results) => {
            if (results.length) {
                res.status(401);
                res.send("erruser exit");
                return;
            } else {
                query(
                    `insert into user (name,password)values("${name}","${password}") `
                )
                    .then(() => {
                        res.status(200);
                        res.send({});
                    })
                    .catch(() => {
                        res.status(500);
                        res.send({});
                    });
            }
        })
        .catch(() => {
            res.status(500);
            res.send("err");
        });
});
