const express = require('express');
const router = express.Router();
const db = require('../db');


router.get("/", async (req, res, next) => {
    try{
        const results = await db.query("SELECT * FROM fishes");
        return res.json(results.rows)
    }
    catch(err){
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try{
        const results = await db.query("INSERT INTO fishes (name, type) VALUES ($1, $2) returning *", 
            [req.body.name, req.body.type]
        );
        return res.json(results.rows[0])
    }
    catch(err){
        next(err)
    }
})


router.patch("/:id", async (req, res, next) => {
    try{
        const results = await db.query("UPDATE fishes SET name=$1, type=$2 WHERE id=$3 RETURNING *", 
            [req.body.name, req.body.type, req.params.id]
        );
        return res.json(results.rows[0])
    }
    catch(err){
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try{
        const results = await db.query("DELETE FROM fishes WHERE id=$1",  
            [req.params.id]
        );
        return res.json(results.rows[0])
    }
    catch(err){
        next(err)
    }
})


module.exports = router;