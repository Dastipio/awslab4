var util = require("util");
var helpers = require("../helpers");
var Policy = require("../s3post").Policy;
var S3Form = require("../s3post").S3Form;
var AWS_CONFIG_FILE = "config.json";
var POLICY_FILE = "policy.json";
var INDEX_TEMPLATE = "index.ejs";


var task = function(request, callback){
	//1. load configuration
	var awsConfig = helpers.readJSONFile(AWS_CONFIG_FILE);
	var policyData = helpers.readJSONFile(POLICY_FILE);

	//2. prepare policy
	var policy = new Policy(policyData);
	
	policyData.conditions.push({"x-amz-meta-address": request.ip});
	policyData.conditions.push({"x-amz-meta-firstname":"Daniel"});
	policyData.conditions.push({"x-amz-meta-lastname": "Stanczak"});

	
	//3. generate form fields for S3 POST
	var s3Form = new S3Form(policy);
	//4. get bucket name
	var formFields=s3Form.generateS3FormFields();
	formFields = s3Form.addS3CredientalsFields(formFields,awsConfig);
	
	var bucketName = policy.getConditionValueByKey("bucket");


	callback(null, {template: INDEX_TEMPLATE, params:{fields:formFields, bucket:bucketName}});
}

exports.action = task;
