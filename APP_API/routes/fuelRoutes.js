var express = require('express');
var router = express.Router();

var ctrlFuel = require('../controllers/fuelController');

router.get('/fuelentries', ctrlFuel.getFuelEntries);
router.post('/fuelentries', ctrlFuel.createFuelEntry);
router.get('/fuelentries/:entryid', ctrlFuel.getSingleEntry);
/*router.put('/books/:bookid', ctrlbook.updatebook);
router.delete('/books/:bookid', ctrlbook.deletebook);*/

module.exports = router;