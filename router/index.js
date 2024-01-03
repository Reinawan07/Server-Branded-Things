const router = require('express').Router();

router.get('/', (req, res) => res.json({message: "Buat Server Branded Things"}));


module.exports = router;