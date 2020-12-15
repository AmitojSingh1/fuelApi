var express = require('express');
var router = express.Router();

var ctrlFuel = require('../controllers/fuelController');

router.get('/fuelentries', ctrlFuel.getFuelEntries);
router.post('/fuelentries', ctrlFuel.createFuelEntry);
router.get('/fuelentries/:entryid', ctrlFuel.getFuelEntry);
router.put('/fuelentries/:entryid', ctrlFuel.updateFuelEntry);
router.delete('/fuelentries/:entryid', ctrlFuel.deleteFuelEntry);

module.exports = router;