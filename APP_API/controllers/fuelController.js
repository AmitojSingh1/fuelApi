const AWS= require("aws-sdk");
const { request } = require("express");
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

function validateInput(entryObject){
    var validate={
        success:true,
        message:"Success"
    }
    var array=['cardNumber',
    'career',
    'costPerMile',
    'fuelAmount',
    'fuelCost',
    'fuelType',
    'fuelUnits',
    'invoiceTotal',
    'location',
    'odometer',
    'retailTotal',
    'transDate',
    'tripDriver',
    'tripId',
    'typeOfVehicle',
    'unitNumber',
    'entryID',
    'unitOfMeasure',
    'vendor']
    entryObject.forEach(hashElement=>{
        array.forEach(element=>{
            if(!hashElement.hasOwnProperty(element)){
                validate={
                    success:false,
                    message:"Property is missing"
                            }
                            
                }

        })

    })
    if(validate.success==true){
        entryObject.forEach(hashElement=>{
            if(!((typeof hashElement["cardNumber"]=="number")
            &&(typeof hashElement["entryID"]=="string")
            &&(typeof hashElement["transDate"]=="number")
            &&(typeof hashElement["unitNumber"]=="number")
            &&(typeof hashElement["tripId"]=="string")
            &&(typeof hashElement["odometer"]=="number")
            &&(typeof hashElement["fuelAmount"]=="number")
            &&(typeof hashElement["fuelUnits"]=="number")
            &&(typeof hashElement["fuelType"]=="number")
            &&(typeof hashElement["fuelCost"]=="number")
            &&(typeof hashElement["invoiceTotal"]=="number")
            &&(typeof hashElement["retailTotal"]=="number")
            &&(typeof hashElement["costPerMile"]=="number")
            &&(typeof hashElement["typeOfVehicle"]=="string")
            &&(typeof hashElement["tripDriver"]=="string")
            &&(typeof hashElement["vendor"]=="string")
            &&(typeof hashElement["career"]=="string")
            &&(typeof hashElement["location"]=="string"))){
                validate={
                    success:false,
                    message:"Invalid property"
                            }

            }
        })
    }


    return validate;
    
}
function batchEntryWrite(req,res){
outElements=[];
 req.forEach(element => {
    outElements.push({PutRequest:{Item:element}})
 });

    var params={
        TableName:table,
        RequestItems:{
        "FHServiceFuelUpdated":
        outElements
}
}
    docClient.batchWrite(params, function(err, data) {
        console.log("acha chalta hun Duaon m yaad rekhna");
        if (err) {
            res.status(404)
            .json(err)
            return;
        } else {
            res.status(200)
            .json(data);
        }
    });

            }
const createFuelEntry =function (req,res) {
    var isValidate=validateInput(req.body);
    if(isValidate.success){
        console.log("m yahan hun");

      while(req.body.length){    
       batchEntryWrite(req.body.splice(0,25),res);
      }
    }
    else{
        console.log(isValidate.message)
    }
};

const getFuelEntry =function (req,res) {
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

const deleteFuelEntry=function(req,res){
    var params={
        TableName:table,
        Key:{
            "entryID": req.params.entryid
        }
    }
    docClient.delete(params, function(err, data) {
        if (err) {
            res.status(404)
            .json(err)
        } else {
            res.status(200)
            .json(data)
        }
    });
    
}

const updateFuelEntry=function(req,res){
    var params={
        TableName:table,
        Key:{
            "entryID": req.params.entryid
        },    
        UpdateExpression: "set cardNumber= :cardNumber,career=:career,costPerMile=:costPerMile,fuelAmount=:fuelAmount,fuelCost=:fuelCost,fuelType=:fuelType,fuelUnits=:fuelUnits,invoiceTotal=:invoiceTotal,#loc=:location,odometer=:odometer,retailTotal=:retailTotal,transDate=:transDate,tripDriver=:tripDriver,tripId=:tripId,typeOfVehicle=:typeOfVehicle,unitNumber=:unitNumber,unitOfMeasure=:unitOfMeasure,vendor=:vendor",
        ExpressionAttributeValues:{
        ":cardNumber":req.body.cardNumber,
        ":career":req.body.career,
        ":costPerMile":req.body.costPerMile,
        ":fuelAmount":req.body.fuelAmount,
        ":fuelCost":req.body.fuelCost,
        ":fuelType":req.body.fuelType,
        ":fuelUnits":req.body.fuelUnits,
        ":invoiceTotal":req.body.invoiceTotal,
        ":location":req.body.location,
        ":odometer":req.body.odometer,
        ":retailTotal":req.body.retailTotal,
        ":transDate":req.body.transDate,
        ":tripDriver":req.body.tripDriver,
        ":tripId":req.body.tripId,
        ":typeOfVehicle":req.body.typeOfVehicle,
        ":unitNumber":req.body.unitNumber,
        ":unitOfMeasure":req.body.unitOfMeasure,
        ":vendor":req.body.vendor
        },
        ExpressionAttributeNames:{
            "#loc": "location"
          },
        
        ReturnValues:"UPDATED_NEW"
    };
    docClient.update(params, function(err, data) {
        if (err) {
           res.status(404)
           .json(err)

        } else {
            res.status(200)
            .json(data)
        }
    });
    
}

module.exports={
    getFuelEntries,
    createFuelEntry,
    getFuelEntry,
    deleteFuelEntry,
    updateFuelEntry
};

