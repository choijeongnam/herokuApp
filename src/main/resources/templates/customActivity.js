
define(["postmonger"], function(Postmonger) {
	"use strict";

	var connection = new Postmonger.Session();
	var payload = {};
	var schema = {};
    var eventDefinitionKey = "";	
	$(window).ready(onRender);

	connection.on("initActivity", initialize);

	connection.on("clickedNext", onClickedNext);
	connection.on("clickedBack", onClickedBack);
	connection.on("gotoStep", onGotoStep);
	connection.on("requestedTokens", onGetTokens);
	connection.on("requestedEndpoints", onGetEndpoints);
	connection.on('requestedInteraction', requestedInteractionHandler);
	connection.on('requestedTriggerEventDefinition',requestedTriggerHandler);
	
	connection.on('requestedSchema', function(data) {
		if (data.error) {
			console.error(data.error);
		} else {
			schema = data['schema'];
		}
		console.log('*** Schema ***', JSON.stringify(schema));
	});
	
	function onRender() {
		// JB will respond the first time 'ready' is called with 'initActivity'
		connection.trigger("ready");
		connection.trigger('requestInteraction');
		connection.trigger('requestTriggerEventDefinition');
		//get schema
		connection.trigger('requestSchema');
		connection.trigger("requestTokens");
		connection.trigger("requestEndpoints");
	}

	function initialize(data) {
		if (data) {
			payload = data;
		}
		
		var contactkey = '{{Contact.Key}}';
		var sfmcid = '{{Contact.Attribute."Contact"."Contact ID"}}'; //DE ID인가..
		
		
		console.log(contactkey + ": contactkey");
		console.log(sfmcid + ": sfmcid");
		
		//var message;
		var hasInArguments = Boolean(
			payload["arguments"] &&
			payload["arguments"].execute &&
			payload["arguments"].execute.inArguments &&
			payload["arguments"].execute.inArguments.length > 0
		);

		var inArguments = hasInArguments ? payload["arguments"].execute.inArguments : {};
		
		$.each(inArguments, function(index, inArgument) {
			$.each(inArgument, function(key, val) {
				
			});
		});
		
	}
	
	function requestedTriggerHandler(settings){
    	try{
    		eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;

    	}catch(e){
    		console.error(e);
    	}
    }
	
	function requestedInteractionHandler(settings){
    	try{
    		eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
    	}catch(e){
    		console.error(e);
    	}
    	//settings_name = settings.name;
        //version = settings.version;
    }

	function onGetTokens(tokens) {
		// Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
		console.log(tokens);
	}

	function onGetEndpoints(endpoints) {
		// Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
		console.log(endpoints);
	}

	function onClickedNext() {
		save();
	}

	function onClickedBack() {
		connection.trigger("prevStep");
	}

	function onGotoStep(step) {
		//showStep(step);
		connection.trigger("ready");
	}

	function extractFields() {
		var formArg = {};
		console.log('*** Schema parsing ***', JSON.stringify(schema));
		if (schema !== 'undefined' && schema.length > 0) {
			// the array is defined and has at least one element
			for (var i in schema) {
				var field = schema[i];
				var index = field.key.lastIndexOf('.');
				var name = field.key.substring(index + 1);
				// save only event data source fields
				if (field.key.indexOf("DEAudience") !== -1)
					formArg[name] = "{{" + field.key + "}}";
			}
		}
		return formArg;
	}
	
	function save() {
		// 'payload' is initialized on 'initActivity' above.
		// Journey Builder sends an initial payload with defaults
		// set by this activity's config.json file.  Any property
		// may be overridden as desired.
		
		//var mid = '{{Event.'+eventDefinitionKey+'.mid}}';
		
		payload["arguments"] = payload["arguments"] || {};

		payload["arguments"].execute.inArguments = [{ }];

		payload["metaData"].isConfigured = true;

		connection.trigger("updateActivity", payload);
	}

});