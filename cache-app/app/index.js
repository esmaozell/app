const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient("redis://redis-service:6379");

client.on("error", function (error) {
    console.log("Redis client error: " + error);
});

app.get('/', async (req, res) => {
    const key = 'counter';
    client.incr(key, (err, counter) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error");
        }
        res.send(`Counter: ${counter}`);
    });
});

app.listen(3000, () => {
    console.log("3000 de çalıştı");
});
