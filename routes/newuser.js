
/*
 * Add New User
 */
var ObjectId=require('mongodb').ObjectID;
exports.user = function(db){
  return function(req, res) {
        var user = req.body;
	
    console.log('Adding user data: ' + JSON.stringify(user));
    collection=db.get('contactcollection');
        collection.insert(user, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'+err});
            } else {
                console.log('Success');
                res.send(result[0]);
            }
        });
    
    
  };
};

exports.findById = function(db){

return function(req, res) {
    var id = req.params.id;
   // var user = req.body;
    console.log(id);
    console.log('Retrieving User: ' + id);
    collection=db.get('contactcollection');
        collection.findOne({'_id':new ObjectId(id)}, function(err, item) {
            res.send(item);
        });
  };

};


exports.update = function(db){
  return function(req, res) {
   // var id = req.params.id;   
    var user = req.body;
	
    console.log('Updating user data: ' + JSON.stringify(user));
    collection=db.get('contactcollection');
        collection.update({'_id':new ObjectId(user.id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating use: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
	           	res.writeHead('200');
                res.send(result);
            }
        });
    
    
  };
  
};

exports.deleteId = function(db){

return function(req, res) {
    var id = req.body;
    var arrayLength = id.id.length;
   console.log(arrayLength);
    var objid=[];
    for (var i=0;i<arrayLength;i++) {

     //  console.log(id.id[i]);
     objid.push(new ObjectId(id.id[i]));

    }
    console.log('Deleting User: ' + objid);
    collection=db.get('contactcollection');
    collection.remove({'_id':{'$in':objid}} , {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
               // res.writeHead('200');
                res.send({msg:result});
            }
        });
  };

};
