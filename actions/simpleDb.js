var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');

var simpledb = new AWS.SimpleDB();
var domainName = 'stanczak.daniel';

var createDomain = function(callback){
var params = {
  DomainName: domainName /* required */
};
simpledb.createDomain(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else  
	{ 
	console.log('Utworzono SimpleDB Domain');           // successful response
    callback();
   }
});
}

var getFromDb = function(itemName){
var params = {
  DomainName: domainName, /* required */
  ItemName: itemName, /* required */
};
simpledb.getAttributes(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log('Wiadomosc z getAttributes ' + JSON.stringify(data));     // successful response
});
}

var selectFromDb = function(callback){
console.log("jestem");
var params = {
  SelectExpression: "select * from MHufnagielDomain"
};
simpledb.select(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else{
	  callback(data);
     // successful response
		}
});
}

var putAttributes = function(itemName, attributes, callback)
{
	var params = {
	  Attributes: attributes,
	  DomainName: domainName, /* required */
	  ItemName: itemName, /* required */
	};
	simpledb.putAttributes(params, function(err, data) {
		  if (err) console.log(err, err.stack); // an error occurred
		  else     
		  {
			console.log('Zapisano do SimpleDB');           // successful response
			callback();
		  }
	});
}


var task = function(request, callback){
	selectFromDb(function(data){
	callback(null,data);
	});
};



exports.action = task;
exports.getFromDb = getFromDb;
exports.createDomain = createDomain;
exports.putAttributes = putAttributes;
exports.selectFromDb =selectFromDb;

