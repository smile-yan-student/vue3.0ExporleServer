const express = require("express");
const app = express();
const mysql = require("mysql2");
const formidable = require("formidable");
app.use(express.urlencoded());
app.use(express.json());
const fs = require("fs");

app.listen(3000, function (err) {
    if (!err) console.log("------服务启动成功------");
    else {
        console.log("------启动失败------");
    }
});

app.get("/application/title", (req, res) => {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345678",
        database: "Passenger",
    });

    connection.query(
        "SELECT * from sentence",
        function (error, results, fields) {
            if (error) throw error;
            let msg = results[results.length - 1];
            res.send({
                code: 200,
                data: msg,
            });
        }
    );
});

app.get("/application/updatetitle", (req, res) => {
    console.log(req.query, "------------");
    let msg;
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345678",
        database: "Passenger",
    });

    connection.query(
        `insert into sentence (title) values ('${req.query.title}')`,
        function (error, results, fields) {
            if (error) {
                res.status = 400;
                res.send({
                    code: 500,
                });
                throw error;
            }
            res.send({
                code: 200,
                data: msg,
            });
        }
    );
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
// let a = "";
// "fontconfig, frei0r, gmp, bdw-gc, libffi, m4, libtool, pkg-config, readline, guile, libtasn1, nettle, p11-kit, c-ares, jemalloc, libev, nghttp2, unbound, gnutls, lame, fribidi, gdbm, mpdecimal, sqlite, xz, python@3.9, glib, libpthread-stubs, xorgproto, libxau, libxdmcp, libxcb, libx11, libxext, libxrender, lzo, pixman, cairo, gobject-introspection, graphite2, harfbuzz, libass, libbluray, libsoxr, libvidstab, libogg, libvorbis, libvpx, opencore-amr, jpeg, libtiff, little-cms2, openjpeg, opus, rav1e, flac, libsndfile, libsamplerate, rubberband, sdl2, snappy, speex, srt, giflib, webp, leptonica, tesseract, theora, x264, x265, xvid, libsodium, zeromq"
//     .split(",")
//     .forEach((item) => {
//         a += item;
//     });
// console.log(a, "------------");
