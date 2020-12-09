var express = require('express');
var router = express.Router();

var ctrlfuel = require('../controllers/fuelController');

router.get('/fuelentries', ctrlfuel.getfuelEntries);
/*router.post('/books', ctrlbook.createbook);
router.get('/books/:bookid', ctrlbook.getSinglebook);
router.put('/books/:bookid', ctrlbook.updatebook);
router.delete('/books/:bookid', ctrlbook.deletebook);*/

module.exports = router;