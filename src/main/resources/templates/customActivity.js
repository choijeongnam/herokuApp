
define(["postmonger"], function(Postmonger) {
	"use strict";

	var connection = new Postmonger.Session();
	var payload = {};
	var schema = {};
	var eventDefinitionKey = "";
	var fuelapiRestHost;
	var fuel2token;
	var activityKey;
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
		
		var reqArr = ["campaign_code", "mkt_id"];
		
		for(var i in schema) {
			var idx = reqArr.indexOf(schema[i].name);
			if(idx > -1){
				reqArr.splice(idx, 1);
			}
		}
		
		if(reqArr.length != 0){
			eventDE(Y);
		} else {
			eventDE(N);
		}

//		console.log('*** Schema ***', JSON.stringify(schema));
	});

	function onRender() {
		// JB will respond the first time 'ready' is called with 'initActivity'
		connection.trigger("ready");
		connection.trigger('requestInteraction');
		//connection.trigger('requestTriggerEventDefinition');
		//get schema
		connection.trigger('requestSchema');
		connection.trigger("requestTokens");
		connection.trigger("requestEndpoints");
	}

	function initialize(data) {
		if (data) {
			payload = data;
			activityKey = data.key;
		}
		
		//var mid;		
		var channel;
		var campaign;
		var mktid;		
		
		var hasInArguments = Boolean(
			payload["arguments"] &&
			payload["arguments"].execute &&
			payload["arguments"].execute.inArguments &&
			payload["arguments"].execute.inArguments.length > 0
		);

		var inArguments = hasInArguments ? payload["arguments"].execute.inArguments : {};

		$.each(inArguments, function(index, inArgument) {
			$.each(inArgument, function(key, val) {
				if (key === 'chnl_cd'){
					channel = val;
				}  else if (key === 'campaign_code'){
					campaign = val;
				}  else if (key === 'mkt_id'){
					mktid = val;
				} 
			});
		});
		if (payload["arguments"]) {
			//$("#mid").val(mid);
			$("#channel").val(channel).prop("selected", true);
			$("#campaign").val(campaign);
			$("#mktid").val(mktid);
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
		settings_versionid = settings.definitionId; //journey version ID
		
		for(var i = 0; i < settings.activities.length ; i++){
			if(settings.activities[i].key == activityKey){
				if(i > 0){
					if(settings.activities[i-1].key != ""){
						previousActivityKey = settings.activities[i-1].key;
						previousActivityType = settings.activities[i-1].type;
					break;
					}
				}
			}
		}
	}

	function onGetTokens(tokens) {

		fuel2token = tokens.fuel2token;
/*		console.log(fuel2token);
		var mid = $("#mid").val();
		var param = {
				"fuel2token" : fuel2token
			}
		if(mid == ""){
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "/getMid", //https://mc5g0q6ffd8sglpqt05jl03zy-h4.rest.marketingcloudapis.com/platform/v1/tokenContext
			data: JSON.stringify(param),
			success: function(data) {
				bu_id = data.organization.id;
				console.log("mid : " + data.organization.id);
				$("#mid").val(bu_id);
			}
		})
		}*/

	}

	function onGetEndpoints(endpoints) {
		fuelapiRestHost = endpoints.fuelapiRestHost;
//		console.log("endpoints : " + fuelapiRestHost);
	}

	function onClickedNext() {
		//var mid = $('#mid').val();
		var channel = $('#channel').val();
		var campaign = $('#campaign').val();
		var mktid = $('#mktid').val();
		
		var reqArr = ["unif_id", "campaign_code", "mkt_id"];
		
		for(var i in schema) {
			var idx = reqArr.indexOf(schema[i].name);
			if(idx > -1){
				reqArr.splice(idx, 1);
			}
		}
		/*
		else if(mid == "") {
				alert('유효한 MID 값을 가져 오는데 실패 하였습니다.\n 액티비티 화면을 닫고 다시 열어주세요.');
				connection.trigger('ready');
			}
		
		*/
		if(reqArr.length == 0){
			if(channel == "") {
				alert('채널을 선택해주시기 바랍니다.');
				connection.trigger('ready');
			}  else {
				$("#campaign").attr("value", "");
				$("#mktid").attr("value", "");
				activity_save();
			}
		} else {
			if(campaign == "") {
				alert('캠페인코드를 입력해주시기 바랍니다.');
				connection.trigger('ready');
			} else if(mktid == "") {
				alert('마케터ID를 입력해주시기 바랍니다.');
				connection.trigger('ready');
			} else if(channel == "") {
				alert('채널을 선택해주시기 바랍니다.');
				connection.trigger('ready');
			}  else {
				if(reqArr.indexOf('unif_id') > -1){
					alert('Data Extension에 필수컬럼인 unif_id가 없습니다.');
					connection.trigger('ready');
				} else {
					activity_save();
				}
			}
		}
	} 

	function onClickedBack() {
		connection.trigger("prevStep");
	}

	function onGotoStep(step) {
		//showStep(step);
		connection.trigger("ready");
	}

	//전체 컬럼 받아올때 써야지..
	function extractFields() {
		var formArg = {};
		
//		console.log('*** Schema parsing ***', JSON.stringify(schema));
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
		
		var fields = extractFields();
		//var id = bu_id;
		var chnl_cd = $('#channel option:selected').val();
		var campaign_code = $('#campaign').val();
		var mkt_id = $('#mktid').val();
		
		var contactkey = '{{Contact.Key}}';
		var sfmc_id = '{{Contact.ID}}'; //sfmc id임 {{Contact.Attribute."Contact"."Contact ID"}} {{Contact.Attribute."Contact"."Business Unit ID"}} 이거와 동일
		
		var journey_id = settings_id; //저니ID
		var version_id = settings_versionid;
		var pre_activityKey = previousActivityKey;
		var pre_activityType = previousActivityType;
		
		//위에 필드 빼고 추가할지 고민..
/*		var unif_id = '{{Event.'+eventDefinitionKey+'.unif_id}}'; 
        var mkt_id = '{{Event.'+eventDefinitionKey+'.mkt_id}}';
        var mkt_dept_cd = '{{Event.'+eventDefinitionKey+'.mkt_dept_cd}}';
        var campaign_code = '{{Event.'+eventDefinitionKey+'.campaign_code}}';*/
        
		//var journey_name = settings_name; //저니네임
		
		//var mkt_id = 'sookyeong'; //마케터 id 나중에 삭제함
		//var mkt_dept_cd = 'dk'; //마케터 조직코드 나중에 삭제함
		
		//액티비티 명을 저장하거나 채널코드로 사용하려면 payload['name'] 받아오든지..

		payload["arguments"] = payload["arguments"] || {};

		payload["arguments"].execute.inArguments = [{
			"contactkey": contactkey
			, "journey_id": journey_id
			, "version_id" : version_id
			, "sfmc_id": sfmc_id
			, "chnl_cd": chnl_cd
			, "campaign_code" : campaign_code
			, "mkt_id" : mkt_id
			, "activity_key" : pre_activityKey
			, "activity_type" : pre_activityType
			, "fields": fields
		}];

		payload["metaData"].isConfigured = true;

		connection.trigger("updateActivity", payload);
	}

});