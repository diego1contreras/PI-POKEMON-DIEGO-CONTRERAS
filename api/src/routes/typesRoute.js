const axios = require("axios");
const express = require("express");
const { Type } = require("../db");

const router = express.Router();

//metodo get de types
router.get('/', async (req, res) => {
    try {
        let typeApi = await axios.get('https://pokeapi.co/api/v2/type');
        let typeApiInfo = typeApi.data;
        let types = typeApiInfo.results.map(e => e.name);
        types.forEach(type => {
            Type.findOrCreate({
                where: {
                    name: type,
                }
            });
        });

        const allTypes = await Type.findAll();
        return res.status(200).send(allTypes);
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;