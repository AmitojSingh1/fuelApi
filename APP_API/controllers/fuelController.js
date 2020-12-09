const AWS= require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
});

var docClient= new AWS.DynamoDB.DocumentClient();
var table = "FHServiceFuelEntries";
var params = {
  TableName: table
};
const getfuelEntries=function(req,res){
    
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

/*const getbooks =function (req,res) {


    book.find().exec(function (err,bookdata) {
        if(err){
            res
                .status(404)
                .json(err);
            return;
        }
        res
            .status(200)
            .json(bookdata)

    });

};

const createbook =function (req,res) {
    book.create({
        name: req.body.name,
        type: req.body.type,
        image:req.body.image,
        summary:req.body.summary,
        price:req.body.price

    }, (err,bookdata) => {
        if(err){
            res
                .status(400)
                .json(err);
        }
        else{
            res
                .status(201)
                .json(bookdata);
        }
    });


};

const getSinglebook =function (req,res) {
    book
        .findById(req.params.bookid)
        .exec((err, book) => {
            if (!book) {
                return res
                    .status(404)
                    .json({
                        "message": "book not found"
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(book);
        });

};

const updatebook =function (req,res) {
    if(!req.params.bookid){
        res
            .status(404)
            .json({
                "message": "Not Found, bookid is required"
            });
        return;
    }

    book.findById(req.params.bookid)
        .exec((err, bookdata) => {
            if(!bookdata){
                res
                    .json(404)
                    .status({
                        "message": "bookid not found"
                    });
                return;
            }
            else if(err){
                res
                    .status(404)
                    .json(err);
                return;
            }
            bookdata.name = req.body.name;
            bookdata.type = req.body.type;
            bookdata.image=req.body.image;
            bookdata.summary=req.body.summary;
            bookdata.price=req.body.price;
            bookdata.save((err, bookdata) => {

                if(err){
                    res
                        .status(404)
                        .json(err);
                }
                else{
                    res
                        .status(200)
                        .json(bookdata);
                }
            });

        });

};


const deletebook = function (req,res) {
    const bookid = req.params.bookid;

    if(bookid){
        book
            .findByIdAndRemove(bookid)
            .exec((err,bookdata) => {
                if(err){
                    res
                        .status(404)
                        .json(err);
                }

                res
                    .status(204)
                    .json(null);
            });
    }

    else
    {
        res
            .status(404)
            .json({"message" : "No bookid"});
    }

};
*/


module.exports={getfuelEntries};