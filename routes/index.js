
/*
 * GET home page.
 */

exports.index = function(db){
//  res.render('index', { title: 'Express' });
 return function(req, res) {
        var collection = db.get('contactcollection');
        collection.find({},{},function(e,docs){
	  console.log('result'+docs);
        /*    res.render('userList', {
                "userList" : docs,
		"title" : 'Node.JS and Mongo DB working'
            });*/
	  res.send(docs);
        });
    };
    
/*	 return function(req, res) {
        var user = {"firstname":"Unnati","lastname":"Khasakia","age":"26"};
	
    console.log('Adding user data: ' + JSON.stringify(user));
    db.get('usercollection', function(err, collection) {
       if(err){
	 
	 console.log('Error:'+err);
	 
       }
       else {
	      collection.insert(user, function(err, result) {
		if (err) {
		    res.send({'error':'An error has occurred'+err});
		} else {
		    console.log('Success: ' + JSON.stringify(result[0]));
		    res.send(result[0]);
		}
	     });
       }
    });
     db.close();
    };*/
};

/*
exports.index=function(req, res) {
  
  res.render('index',{"title" : "Node Title"});
  
  
  
};*/