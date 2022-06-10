
define(["postmonger"], function(Postmonger) {
	"use strict";

	var connection = new Postmonger.Session();
	var payload = {};
	var schema = {};
	var eventDefinitionKey = "";
	var lastChecked = false;
	var fuelapiRestHost;
	var fuel2token;
	$(window).ready(onRender);

	connection.on("initActivity", initialize);

	connection.on("clickedNext", onClickedNext);
	connection.on("clickedBack", onClickedBack);
	connection.on("gotoStep", onGotoStep);
	connection.on("requestedTokens", onGetTokens);
	connection.on("requestedEndpoints", onGetEndpoints);
	connection.on('requestedInteraction', requestedInteractionHandler);
	connection.on('requestedTriggerEventDefinition', requestedTriggerHandler);

	connection.on('requestedSchema', function(data) {// Data Extension 필드 확인가능

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

		var payload_id = payload['id'];

		console.log(payload_id); // 액티비티 아이디인가?

		/*        if ( payload_id === null)
				{
					alert('Journey를 Save해주시기 바랍니다.');
					connection.trigger('destroy');
				}*/

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

	function requestedTriggerHandler(settings) {
		try {
			eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
		} catch (e) {
			console.error(e);
		}
	}

	function requestedInteractionHandler(settings) {
		try {
			//settings.id
			eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
		} catch (e) {
			console.error(e);
		}
		settings_id = settings.id; //journey id
		settings_name = settings.name; //journey name
		//version = settings.version;
	}

	function onGetTokens(tokens) {
		/*expires: 1654221356204
		fuel2token: "2ESnPdBd9kRKJriB77eyXgt8"
		stackKey: "S12"
		token: "0ZWWqq4Pi4JN5M6qBhwSAMLAkpvHwCrBB2SfO3K6Ep9W69aS4SPlWYh5PBIw3lEDFliZU6duRptOqCx6EbuFPrtZ2OEsL8BAkzni3syL48a4oeOsL06MGSSOYa8ZApDly4BXGpGNRi7CVuJCWSDwFF8GrFaFVgjeq9EgCM6F1eBmj9EmaAA8ihDtbsdDIRtl-hzOrvhtg9RV6Xo5n3WbaxBCc8INqDrEHe4aO5R9X1-88l7x4Gj3wHM51uPKBR0Mcrl4a8oZSXLKcnZhSYJWEtg"*/
		console.log(tokens);
		fuel2token = tokens.fuel2token;
		console.log(fuel2token);
		var param = {
				"fuel2token" : fuel2token
			}
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "/getMid", //https://mc5g0q6ffd8sglpqt05jl03zy-h4.rest.marketingcloudapis.com/platform/v1/tokenContext
			data: JSON.stringify(param),
			success: function(data) {
				bu_id = data.organization.id;
				console.log("bu_id : " + data.organization.id);
				$("#mid").val(bu_id);
			}
		})

	}

	function onGetEndpoints(endpoints) {
		/*fuelapiRestHost: "https://www-mc-s12.marketingcloudapis.com/"
		restHost: "rest.s12.exacttarget.com"
		ssoUrl: "https://mc.s12.exacttarget.com/cloud/tools/SSO.aspx?env=default&legacy=1&sk=S12"
		stackHost: "mc.s12.exacttarget.com"
		stackKey: "S12"*/

		console.log(endpoints);
		fuelapiRestHost = endpoints.fuelapiRestHost;
		console.log(fuelapiRestHost);
	}

	function onClickedNext() {
		var isFalse = true;
		var channel = $('#channel').val();
		
		if (channel == "") {
			alert('채널을 선택해주시기 바랍니다.'); //이건 나중에 바뀔 수도 있음.. 채널로 한다던지......
			isFalse = false;
		}

		if (isFalse) {
			activity_save();
		} else {
			connection.trigger('ready');
		}
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

	function activity_save() {
		// 'payload' is initialized on 'initActivity' above.
		// Journey Builder sends an initial payload with defaults
		// set by this activity's config.json file.  Any property
		// may be overridden as desired.
		
		lastChecked = true;
		
		var id = bu_id;
		var chnl_cd = $('#channel option:selected').val();
		
		var contactkey = '{{Contact.Key}}';
		var sfmc_id = '{{Contact.ID}}'; //sfmc id임 {{Contact.Attribute."Contact"."Contact ID"}} 이거와 동일
		
		var journey_id = settings_id; //저니ID
		//var journey_name = settings_name; //저니네임
		
		//var mkt_id = 'sookyeong'; //마케터 id 나중에 삭제함
		//var mkt_dept_cd = 'dk'; //마케터 조직코드 나중에 삭제함
		
		//액티비티 명을 저장하거나 채널코드로 사용하려면 payload['name'] 받아오든지..

		var fields = extractFields();

		payload["arguments"] = payload["arguments"] || {};

		payload["arguments"].execute.inArguments = [{
			"contactkey": contactkey
			, "bu_id" : id
			, "journey_id": journey_id
			, "sfmc_id": sfmc_id
			, "chnl_cd": chnl_cd
			, "fields": fields //unif_id 받아와야함
		}];

		payload["metaData"].isConfigured = true;

		connection.trigger("updateActivity", payload);
	}

});