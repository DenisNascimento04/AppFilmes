const express = require('express');
var cors = require('cors');
const server = express();

server.use(cors());

server.get("https://pokeapi.co/api/v2/pokemon/ditto", cors(), (req, res) => {
    return res.json("Oi")
});

server.listen(4000, () => {
    console.log("Servidor em funcionamento...");
});