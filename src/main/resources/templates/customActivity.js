
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
		//get schema
		connection.trigger('requestSchema');
		connection.trigger("requestTokens");
		connection.trigger("requestEndpoints");
	}

	function initialize(data) {
		if (data) {
			payload = data;
		}
		var title;
		var body;
		var link;
		var image;
		var token;
		
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
				if (key === 'title'){
					title = val;
				} else if (key === 'body'){
					body = val;
				} else if (key === 'link'){
					link = val;
				} else if (key === 'image'){
					image = val;
				} else if (key === 'token'){
					token = val;
				}
			});
		});
		
		if (payload["arguments"]) {
			$("#title").val(title);
			$("#body").val(body);
			$("#link").val(link);
			$("#image").val(image);
			$("#t").val(token);
			$("#d").val({token});
			$(".preview-title").html(title);
			$(".preview-body").html(body);
			$("#imgurl").attr("src", image);
		}
		
		//$("#tokenData").html(message);

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
		var title = $("#title").val();
		var body = $("#body").val();
		var link = $("#link").val();
		var image = $("#image").val();

		var fields = extractFields();

		// 'payload' is initialized on 'initActivity' above.
		// Journey Builder sends an initial payload with defaults
		// set by this activity's config.json file.  Any property
		// may be overridden as desired.
		var token = '{{Event.'+eventDefinitionKey+'.token}}';
		payload["arguments"] = payload["arguments"] || {};

/*		payload["arguments"].title = title;
		payload["arguments"].body = body;
		payload["arguments"].link = link;
		payload["arguments"].image = image;*/

		payload["arguments"].execute.inArguments = [{ "token" : token, "title" : title, "body": body, "link" : link, "image": image }];

		payload["metaData"].isConfigured = true;

		connection.trigger("updateActivity", payload);
	}

});