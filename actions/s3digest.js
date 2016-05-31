var AWS = require("awssdk");
var helpers = require("../helpers");
var simpleDb = require("./simpleDb");
AWS.config.loadFromPath('./config.json');

var task = function(request, callback){
	var params = {
  Bucket: request.query.bucket,
  Key: request.query.key
};
			

AWS.config.loadFromPath('./config.json');

var s3 = new AWS.S3(); 

s3.getObject(params, function(err, data) {
	var algorithms = ['md5','sha1','sha256', 'sha512'];
	var loopCount = 1;
	var doc = data.Body;
	
	
	helpers.calculateMultiDigest(doc, 
		algorithms, 
		function(err, digests) {
			callback(null, digests.join("<br>"));				
		  var AttributesPut = [ ];
					for(var i; i < algorithms.length; i){
						AttributesPut.push({Name:algorithms[i], Value:digest[i]});
					}
					simpleDb.putAttributes('Pliki', AttributesPut, function(){
					simpleDb.getFromDb('Pliki');				   	 
			   });
		}, 
		loopCount);   // successful response
});
}

exports.action = task