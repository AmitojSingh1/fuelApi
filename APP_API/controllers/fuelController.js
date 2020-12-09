const AWS= require("aws-sdk");
const config= require("../../config")
AWS.config.update({
  region:config.REGION,
  endpoint: config.ENDPOINT,
  credentials: new AWS.Credentials(
    config.ACCESS_KEY,
    config.SECRET
)
});

var docClient= new AWS.DynamoDB.DocumentClient();
var table = "FHServiceFuelUpdated";

const getFuelEntries=function(req,res){
    var params = {
        TableName: table
      };
    
    docClient.scan(params, function(err, data) {
    if (err) {
        res
        .status(404)
        .json(err);
        return;
        console.log(err);
    } else {
        res.status(200)
        .json(data);
    }
});
}


const createFuelEntry =function (req,res) {
    var params={
        TableName:table,
        Item:{
            cardNumber:req.body.cardNumber,
            career:req.body.career,
            costPerMile:req.body.costPerMile,
            entryID:req.body.entryID,
            fuelAmount:req.body.fuelAmount,
            fuelCost:req.body.fuelCost,
            fuelType:req.body.fuelType,
            fuelUnits:req.body.fuelUnits,
            invoiceTotal:req.body.invoiceTotal,
            location:req.body.location,
            odometer:req.body.odometer,
            retailTotal:req.body.retailTotal,
            transDate:req.body.transDate,
            tripDriver:req.body.tripDriver,
            tripId:req.body.tripId,
            typeOfVehicle:req.body.typeOfVehicle,
            unitNumber:req.body.unitNumber,
            unitOfMeasure:req.body.unitOfMeasure,
            vendor:req.body.vendor
        }
    }
    docClient.put(params, function(err, data) {
        if (err) {
            res.status(404)
            .json(err)
            return;
        } else {
            res.status(200)
            .json(data)
        }
    });
};

const getSingleEntry =function (req,res) {
    var params = {
        TableName: table,
        Key:{
            "entryID": req.params.entryid
        }
    };
    
    docClient.get(params, function(err, data) {
        if (err) {
            res.status(404)
            .json(err)
            return;
        } else {
            res.status(200)
            .json(data)
        }
    });
    
};

module.exports={
    getFuelEntries,
    createFuelEntry,
    getSingleEntry
};