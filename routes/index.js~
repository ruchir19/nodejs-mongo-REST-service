
/*
 * GET home page.
 */

exports.userList = function(db){
//  res.render('index', { title: 'Express' });
 return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
	  console.log(docs);
            res.render('userList', {
                "userList" : docs,
		"title" : 'Node.JS and Mongo DB working'
            });
        });
    };
};

/*
exports.index=function(req, res) {
  
  res.render('index',{"title" : "Node Title"});
  
  
  
};*/