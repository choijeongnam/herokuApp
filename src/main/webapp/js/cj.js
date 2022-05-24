define([
    'postmonger'
], function(
    Postmonger
) {
    'use strict';

//운영변경시 체크 application.properties , config.json , customActivity.js 수정
//application.properties 는 아래의 8가지 수정
//customActivity.js 는 payload_name ="CJ CommOne"; => payload_name ="CJ CommOne DEV"; 수정
//config.json 는 "name": "CJ CommOne", => "name": "CJ CommOne DEV", 수정 및 https://lotmc. => https://dev-lotmc. 로 수정

    var connection = new Postmonger.Session();
    var payload = {};
    var lastStepEnabled = false;
    var steps = [ // initialize to the same value as what's set in config.json for consistency
        { "label": "Step 1", "key": "step1" },
        { "label": "Step 2", "key": "step2", "active": false }
    ];
    var currentStep = steps[0].key;
    var eventDefinitionKey ="";
    var senderNo;
    var msgType;



    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);
    connection.on('requestedInteraction',requestedInteractionHandler);

    //start : ---------------------- CJO용 가이드 코딩-----------------------------//
    connection.on('requestedSchema', onGetSchema);
    //start : ---------------------- CJO용 가이드 코딩-----------------------------//
    //connection.on('updateStep', onClickedNext);



    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestInteraction');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

        //start : ---------------------- CJO용 가이드 코딩-----------------------------//
        connection.trigger('requestSchema');
        //END : ---------------------- CJO용 가이드 코딩-----------------------------//

        connection.trigger('updateButton', { button: 'next', enabled: true });


    }

    //start : ---------------------- CJO용 가이드 코딩-----------------------------//
    function onGetSchema(data) { // Data Extension 필드 확인가능
        console.log("onGetSchema : " + JSON.stringify(data));

		//개인화필드 출력 제외 필드
		var exceptionField = ["통합고객번호","고객휴대폰","고객이메일","사번","세그먼트사용일련번호","MobilePhone"];

		personalFieldArr = new Array();

        dataExtensionObj += "{";
        $.each(data.schema, function(index, deData){//DE 필드확인 및 구분
           var key = deData.key;
           var fieldName = key.substring(key.lastIndexOf(".")+1, key.length);

     	   if(key.split(".")[0] == "Event"){
	           dataExtensionObj += '"'+ fieldName +'":"{{'+ key + '}}"'; // 저장형태 : { "필드명1" : "{{Event.eventDefinitionKey.필드명1}}" , "필드명2" : "{{Event.eventDefinitionKey.필드명2}}" }   => json 형태로 저장
	           if(data.schema.length != index+1) dataExtensionObj += ",";

			   //화면 출력용 개인화 필드 데이터 세팅 전체 필드중 제외 필드 설정
			   if(exceptionField.indexOf(fieldName) < 0 ){
	              personalFieldArr.push(fieldName);
	           }
	        }
        });
        dataExtensionObj += "}";
      }
      //END : ---------------------- CJO용 가이드 코딩-----------------------------//

    function initialize (data) {
    	console.log("initialize start ");


        if (data) {
            payload = data;
        }

        var payload_name = payload['name'];
        var payload_id = payload['id'];

        console.log(payload_name);
        console.log(payload_id);

        if ( payload_id === null)
    	{
        	alert('Journey를 Save해주시기 바랍니다.');
        	connection.trigger('destroy');
    	}

        var msgtype;
        var filepath1;
        var filepath2;
        var filepath3;
        var filetype1;
        var filetype2;
        var filetype3;
        var filecnt;
        var profilekeyval;
        var failmsgtype;
        var failmsgyn;
        var failfilepath;
        var wideyn;
        var subject;
        var msg;
        var templatecode;
        var failsubject;
        var failmsg;
        var img_url;
        var buttonTypeTmp;
        var buttonNameTmp;
        var buttonMobileTmp;
        var buttonPCTmp;
        var buttonIOSTmp;
        var buttonAndroidTmp;
        var campaign_code;
        var sendTime;
        var personalFieldarr;

        var message;
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        $.each(inArguments, function(index, inArgument) {
            $.each(inArgument, function(key, val) {
            	 if (key === 'msgtype') {
            		 msgtype = msgType = val;
                 } else if (key === 'filepath1') {
                	 filepath1 = val;
                 } else if (key === 'filepath2') {
                	 filepath2 = val;
                 } else if (key === 'filepath3') {
                	 filepath3 = val;
                 } else if (key === 'filetype1') {
                	 filetype1 = val;
                 } else if (key === 'filetype2') {
                	 filetype2 = val;
                 } else if (key === 'filetype3') {
                	 filetype3 = val;
                 } else if (key === 'filecnt') {
                	 filecnt = val;
                 } else if (key == 'profilekeyval'){
                	 profilekeyval = val;
                 } else if (key == 'failmsgtype'){
                	 failmsgtype = val;
                 } else if (key == 'failmsgyn'){
                	 failmsgyn = val;
                 } else if (key == 'failfilepath'){
                	 failfilepath = val;
                 } else if (key == 'wideyn'){
                	 wideyn = val;
                 } else if (key == 'subject'){
                	 subject = val;
                 } else if (key == 'msg'){
                	 msg = val;
                 } else if (key == 'templatecode'){
                	 templatecode = val;
                 } else if (key == 'failsubject'){
                	 failsubject = val;
                 } else if (key == 'failmsg'){
                	 failmsg = val;
                 } else if (key == 'img_url'){
                	 img_url = val;
                 } else if (key == 'buttonTypeTmp'){
                	 buttonTypeTmp = val;
                 } else if (key == 'buttonNameTmp'){
                	 buttonNameTmp = val;
                 } else if (key == 'buttonMobileTmp'){
                	 buttonMobileTmp = val;
                 } else if (key == 'buttonPCTmp'){
                	 buttonPCTmp = val;
                 } else if (key == 'buttonIOSTmp'){
                	 buttonIOSTmp = val;
                 } else if (key == 'buttonAndroidTmp'){
                	 buttonAndroidTmp = val;
                 } else if (key == 'campaign_code'){
                	 campaign_code = val;
                 } else if (key == 'sender'){
                	 senderNo = val;
                 } else if (key == 'sendTime'){
                	 sendTime = val;
                 } else if(key=='personalFieldArr'){
                 	personalFieldarr=val;
                 }
            });
        });

        if(msgtype) {
        	if(msgtype === 'KKO') {
        		loadKkoForm();
        	} else if(msgtype === 'KKF') {
        		loadKkfForm();
        	} else {
        		loadMsgForm();
        	}

        	$('#msgtype').val(msgtype);
        	console.log("initialize msgtype   " + msgtype);


        	if(filepath1) {
                $('#filepath1').val(filepath1);
                var filepath = "/fileupload/loadImg?filepath=" + filepath1;
                var arrayFile = filepath1.split("/");
                filepath1 = arrayFile[arrayFile.length-1];
                if(msgtype === 'KKF') {
				    previewImgThumb("#kkoThumbImg", filepath, filepath1);
				    $("#topImage>img").show();
					$("#topImage>img").attr("src", filepath);
                }else{
                	previewImgThumb("#msgThumbImg1", filepath, filepath1);
                }

            }
        	if(filepath2) {
                $('#filepath2').val(filepath2);
                var filepath = "/fileupload/loadImg?filepath=" + filepath2;
                var arrayFile = filepath2.split("/");
                filepath2 = arrayFile[arrayFile.length-1];
				previewImgThumb("#msgThumbImg2", filepath, filepath2);
            }
        	if(filepath3) {
        		$('#filepath3').val(filepath3);
        		var filepath = "/fileupload/loadImg?filepath=" + filepath3;
                var arrayFile = filepath3.split("/");
                filepath3 = arrayFile[arrayFile.length-1];
				previewImgThumb("#msgThumbImg3", filepath, filepath3);
            }
        	if(filetype1) {
                $('#filetype1').val(filetype1);
            }
        	if(filetype2) {
                $('#filetype2').val(filetype2);
            }
        	if(filetype3) {
                $('#filetype3').val(filetype3);
            }
        	if(filecnt) {
                $('#filecnt').val(filecnt);
            }
        	if(profilekeyval) {
                $('#profilekeyval').val(profilekeyval);
                $("#profileKey").val(profilekeyval).prop("selected", true);

            }

        	if(msgtype === 'KKF' || msgtype === 'KKO' )
        	{


	        	if(failmsgyn) {
	                $('#failmsgyn').val(failmsgyn);
	                if (failmsgyn == "Y")
	                {
	                	$("#mmsYnY").attr("checked", true);
	                }
					else {
						$("#mmsYnN").attr("checked", true);
						mmsChange(failmsgyn);
					}
	            }
	        	if(failfilepath) {
	                $('#failfilepath').val(failfilepath);
	                var filepath = "/fileupload/loadImg?filepath=" + failfilepath;
	                var arrayFile = failfilepath.split("/");
	                failfilepath = arrayFile[arrayFile.length-1];
					previewImgThumb("#msgThumbImg1", filepath, failfilepath);
	            }
	        	if(wideyn) {
	                $('#wideyn').val(wideyn);

					if (wideyn == "Y") $("#wideynY").attr("checked", true);
					else $("#wideynN").attr("checked", true);
	            }

	        	if(templatecode) {
	                $('#templatecode').val(templatecode);
	            }
	        	if(failsubject) {
	                $('#failsubject').val(failsubject);
	            }

	        	if(failmsg) {
	                $('#failmsg').val(failmsg);
	            }
	        	if(buttonTypeTmp) {
	                $('#buttonTypeTmp').val(buttonTypeTmp);
	            }
	        	if(buttonNameTmp) {
	                $('#buttonNameTmp').val(buttonNameTmp);
	            }
	        	if(buttonMobileTmp) {
	                $('#buttonMobileTmp').val(buttonMobileTmp);
	            }
	        	if(buttonPCTmp) {
	                $('#buttonPCTmp').val(buttonPCTmp);
	            }
	        	if(buttonIOSTmp) {
	                $('#buttonIOSTmp').val(buttonIOSTmp);
	            }
	        	if(buttonAndroidTmp) {
	                $('#buttonAndroidTmp').val(buttonAndroidTmp);
	            }
	        	if(failmsgtype) {
	        		console.log("initialize failmsgtype   " + failmsgtype);
	                $('#failmsgtype').val(failmsgtype);
	                fnChangeMsg(failmsgtype);
	            }
        	}
        	if(subject) {
                $('#subject').val(subject);
            }
        	if(msg) {
                $('#msg').val(msg);

            }

        	if(img_url) {
                $('#img_url').val(img_url);
            }

        	console.log("sendTime :" + sendTime);
        	if(sendTime) {
        	    if(sendTime.length > 0){
                 	 var arrayDateTime = sendTime.split(" ");
	                 $("#senddate").val(arrayDateTime[0]);
	                 $("#sendtime").val(arrayDateTime[1]);
	                 $('#sendtypeR').prop('checked',true);
	                 sendtypeChange('Y');
                 }
                 else
                 {
                 	 $('#sendtypeI').prop('checked',true);
                 	 sendtypeChange('N');
                 }
            }
            else
            {
                 $('#sendtypeI').prop('checked',true);
                 sendtypeChange('N');
            }

        	if(campaign_code) {
                $('#campaign_code').val(campaign_code);
            }


        	if(msgtype === 'KKO') {
        		initaddButton();

        	} else if(msgtype === 'KKF') {
        		initaddButton();

        	}

        	if(personalFieldarr){
        		$.each(personalFieldarr, function(index, oneField){//개인화 필드 화면에 설정
					$("#msg_cus_list").append("<li><a href=\"javascript:txtInsert('#{" + oneField + "}');\" class=\"excel-info\"><span>#{" + oneField + "}</span></a></li>");
					if(msgType === 'KKF' || msgType === 'KKO' )
        			{
						$("#failmsg_cus_list").append("<li><a href=\"javascript:mmstxtInsert('#{" + oneField + "}');\" class=\"excel-info\"><span>#{" + oneField + "}</span></a></li>");
					}
				});

        	}

        }


        // If there is no message selected, disable the next button
        if (!message) {
            showStep(null, 1);
            connection.trigger('updateButton', { button: 'next', enabled: false });
            // If there is a message, skip to the summary step
        } else {
            //$('#select1').find('option[value='+ message +']').attr('selected', 'selected');
            //$('#message').html(message);
        	connection.trigger('updateButton', { button: 'next', enabled: true });
            showStep(null, 3);
        }
        connection.trigger('updateButton', { button: 'next', enabled: true });
        //showStep(null, 3);
       console.log("initialize end");
    }

    function onGetTokens (tokens) {
        // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
         console.log(tokens);
         var ObjTokens = tokens;
         CJfuel2token = ObjTokens.fuel2token;
         console.log(CJfuel2token);

         var jsondata = {
        		 fuelapihost : ""+CJfuelapiRestHost+"",
        		 fueltokenkey : ""+CJfuel2token+"" };


         var jsonString = JSON.stringify(jsondata);
         $.ajax({
 			url: "/getMid",
 			type: "post",
 			dataType: "json",
 			data: jsonString,
 			contentType:"application/json; charset=UTF-8",
 			success: function(data) {
     			console.log(data);
     			CJorganization=data;

     			if(msgType){
	     			setPhoneNo('1');
	    			setPhoneNo('2');

	                if(msgType === 'KKF' || msgType === 'KKO' )
        			{
		                if($('#failmsg').val().indexOf("(광고)") >= 0)
		                {
		                	var area = $("#failmsg");
							var val = area.val();
							var selectEnd = val.indexOf("무료수신거부");
							console.log("수신거부번호 :"+ val.substring(selectEnd+7, val.length));
							$('#rejectnum').val(val.substring(selectEnd+7, val.length)).prop("selected",true);

		                	$('#adYn').prop('checked',true);

							var ckb = document.getElementById("adYn");
							adtextInsert(ckb);
		                }
		                else
		                {
		                	$('#adYn').prop('checked',false);
		                }
	        		}
	        		else
	        		{
	        			if($('#msg').val().indexOf("(광고)") >= 0)
		                {
		                	var area = $("#msg");
							var val = area.val();
							var selectEnd = val.indexOf("무료수신거부");
							console.log("수신거부번호 :"+ val.substring(selectEnd+7, val.length));
							$('#rejectnum').val(val.substring(selectEnd+7, val.length)).prop("selected",true);

		                	$('#adYn').prop('checked',true);

							var ckb = document.getElementById("adYn");
							adtextInsert(ckb);
		                }
		                else
		                {
		                	$('#adYn').prop('checked',false);
		                }
	        		}

        			console.log("initialize sender   " + senderNo);
	                if(senderNo.length < 20){
	        			$('#sender').val(senderNo).prop("selected",true);
	        		}

	        		if(senderNo.indexOf("STOREPHONE") >= 0)
					{
			        	$('#sender').val("STOREPHONE").prop("selected",true);
					}


	                chkLen();
                }



     		},
     		error : function(result, errStr) {
    			alert("유효한 MID 값을 가져 오는데 실패 하였습니다.\n재로그인 이후 이용부탁드립니다.")
    		}
     	 });

     	 $.ajax({
 			url: "/getParentMid",
 			type: "post",
 			dataType: "json",
 			data: jsonString,
 			contentType:"application/json; charset=UTF-8",
 			success: function(data) {
     			console.log(data);
     			CJenterprise=data;
     		},
     		error : function(result, errStr) {
    			//alert("유효한 enterprise MID 값을 가져 오는데 실패 하였습니다.\n재로그인 이후 이용부탁드립니다.")
    		}
     	 });


    }

    function onGetEndpoints (endpoints) {
        // Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
         console.log(endpoints);
         var ObjEndpoints = endpoints;
         CJfuelapiRestHost = endpoints.fuelapiRestHost;
         console.log(CJfuelapiRestHost);
    }

    function onClickedNext () {
    	console.log("onClickedNext");
//   	save();
//      connection.trigger('nextStep');

       var isFalse = true;
       var alertmsg = "";

        var msg = $('#msg').val();
        var msgtype = $('#msgtype').val();
        var failmsgtype = $('#failmsgtype').val();
        var failmsgyn = $('#failmsgyn').val();
        var subject = $('#subject').val();
        var failsubject = $('#failsubject').val();
        var failmsg = $('#failmsg').val();
        var wideyn = $('#wideyn').val();
		var filepath1 = $('#filepath1').val();



      if(msg == "") {
			alertmsg = "메시지내용을 입력해주세요.";
			isFalse = false;
		}
		if(msgtype == "LMS" || msgtype == "MMS") {
			if(subject == "") {
				alertmsg = "제목을 입력해주세요.";
				isFalse = false;
			}
		}
		if(failmsgyn == "Y") {
			if(failmsgtype == "LMS" || failmsgtype == "MMS") {
				if(failsubject == "") {
					alertmsg = "문자발송 제목을 입력해주세요.";
					isFalse = false;
				}
				if(failmsg == "") {
					alertmsg = "문자발송 내용을 입력해주세요.";
					isFalse = false;
				}
			}
		}

    	console.log(filepath1);
       	console.log(wideyn);
      if(msgtype === 'KKF')
      {
	      if(filepath1 != ''){
	      		var str = $("#msg").val();
				var _byte = 0;
				var strlength = 0;
				var charStr = '';
				var maxlength = 400;
				var cutstr = '';

				if(wideyn =='Y')
					 maxlength = 76;

				for(var i = 0; i < str.length; i++){
					charStr=str.charAt(i);
					if(escape(charStr).length > 4){
						_byte += 2;
					} else {
						_byte++;
					}
					if(_byte <= maxlength){
						strlength = i+1;
					}
				}

				if(_byte > maxlength){
					alertmsg = "이미지 등록시 메세지는 최대 " + maxlength + " 자를 초과할 수 없습니다.";
					isFalse = false;
				}

	      }

	      if(filepath1 == '' && wideyn == 'Y'){

			alertmsg = "친구톡 와이드를 선택하였으나 이미지를 등록하지 않았습니다.<br/> 이미지 첨부나 이미지 등록없시 진행시 친구톡을 선택해 주세요.";
			isFalse = false;
      	  }

      	  if(wideyn == 'Y' && btnCnt >=2 ){

			alertmsg = "친구톡 와이드를 선택시 버튼은 하나만 선택 가능합니다.";
			isFalse = false;
      	  }

      }

      if($('#sendtypeR').is(":checked") == true)
      {
        	var tempdate = $("#senddate").val().split('-');
			var temptime = $("#sendtime").val().split(':');

			var insertTime = new Date( Number(tempdate[0]), Number(tempdate[1])-1,Number(tempdate[2]),Number(temptime[0]),Number(temptime[1]),0);

            var now = new Date();

           if(insertTime.getTime() < now.getTime()){
				alertmsg = "예약시간이 현재시간보다 작습니다. 예약시간을 다시 확인하여 주세요.";
				isFalse = false;
         	}
      }

      if($('#sender').val() == ''){
   		 alertmsg = "발신번호가 셋팅되지 않았습니다.";
		 isFalse = false;
      }

       if(isFalse){
          save();
          connection.trigger("nextStep");
       }else{
          showAlertLayer(alertmsg);
          connection.trigger('ready');
       }
    }

    function onClickedBack () {
        connection.trigger('prevStep');
    }

    function onGotoStep (step) {
        showStep(step);
        connection.trigger('ready');
    }
    function requestedInteractionHandler(settings){
    	try{
    		eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
    	}catch(e){
    		console.error(e);
    	}
    	settings_name = settings.name;
        version = settings.version;
    }

    function showStep(step, stepIndex) {

        if (stepIndex && !step) {
            step = steps[stepIndex-1];
        }

        currentStep = step;
        //console.log("showStep" + currentStep.key);
        $('.step').hide();

        switch(currentStep.key) {
            case 'step1':
                $('#step1').show();
                connection.trigger('updateButton', {
                    button: 'next',
                    enabled: Boolean(getMessage())
                });
                connection.trigger('updateButton', {
                    button: 'back',
                    visible: false
                });
                break;
            case 'step2':
                $('#step2').show();
                connection.trigger('updateButton', {
                    button: 'back',
                    visible: true
                });
                connection.trigger('updateButton', {
                    button: 'next',
                    text: 'next',
                    visible: true
                });
                break;

        }
    }

    function save() {
    	console.log("save 실행");
    	var msgtype = $('#msgtype').val();
        var filepath1 = $('#filepath1').val();
        var filepath2 = $('#filepath2').val();
        var filepath3 = $('#filepath3').val();
        var filetype1 = $('#filetype1').val();
        var filetype2 = $('#filetype2').val();
        var filetype3 = $('#filetype3').val();
        var filecnt = $('#filecnt').val();
        var profilekeyval = $('#profilekeyval').val();
        var failmsgtype = $('#failmsgtype').val();
        var failmsgyn = $('#failmsgyn').val();
        var failfilepath = $('#failfilepath').val();
        var wideyn = $('#wideyn').val();
        var subject = $('#subject').val();
        var msg = $('#msg').val();
        var templatecode = $('#templatecode').val();
        var failsubject = $('#failsubject').val();
        var failmsg = $('#failmsg').val();
        var img_url = $('#img_url').val();
        var buttonTypeTmp = $('#buttonTypeTmp').val();
        var buttonNameTmp = $('#buttonNameTmp').val();
        var buttonMobileTmp = $('#buttonMobileTmp').val();
        var buttonPCTmp = $('#buttonPCTmp').val();
        var buttonIOSTmp = $('#buttonIOSTmp').val();
        var buttonAndroidTmp = $('#buttonAndroidTmp').val();
        var campaign_code = $('#campaign_code').val();

        var name = '{{Event.'+eventDefinitionKey+'.고객명}}';
        var mobile = '{{Event.'+eventDefinitionKey+'.고객휴대폰}}';
        var store = '{{Event.'+eventDefinitionKey+'.store}}';
        var store_tel = '{{Event.'+eventDefinitionKey+'.store_tel}}';
        var m_mileage = '{{Event.'+eventDefinitionKey+'.m_mileage}}';
        var m_grade = '{{Event.'+eventDefinitionKey+'.m_grade}}';
        //var sender = '{{Event.'+eventDefinitionKey+'.sender}}';
        var sender = $('#sender').val();
        var rejectnum = '{{Event.'+eventDefinitionKey+'.rejectnum}}';
        var url1 = '{{Event.'+eventDefinitionKey+'.url1}}';
        var url2 = '{{Event.'+eventDefinitionKey+'.url2}}';
        var url3 = '{{Event.'+eventDefinitionKey+'.url3}}';
        var url4 = '{{Event.'+eventDefinitionKey+'.url4}}';
        var url5 = '{{Event.'+eventDefinitionKey+'.url5}}';
        var option1 = '{{Event.'+eventDefinitionKey+'.option1}}';
        var option2 = '{{Event.'+eventDefinitionKey+'.option2}}';
        var option3 = '{{Event.'+eventDefinitionKey+'.option3}}';
        var option4 = '{{Event.'+eventDefinitionKey+'.option4}}';
        var option5 = '{{Event.'+eventDefinitionKey+'.option5}}';
        var option6 = '{{Event.'+eventDefinitionKey+'.option6}}';
        var option7 = '{{Event.'+eventDefinitionKey+'.option7}}';
        var option8 = '{{Event.'+eventDefinitionKey+'.option8}}';
        var option9 = '{{Event.'+eventDefinitionKey+'.option9}}';
        var option10 = '{{Event.'+eventDefinitionKey+'.option10}}';
        var cid = '{{Event.'+eventDefinitionKey+'.id}}';
        //var mid = '{{Event.'+eventDefinitionKey+'.mid}}';

        var mid = CJorganization;
        var emid = CJenterprise;

       // var sfmcid = '{{Event.'+eventDefinitionKey+'.sfmcid}}';
        var sfmcid = '{{Contact.Attribute."Contact"."Contact ID"}}';

        //광고여부 체크
        var adYN = 'N';
        if($('#adYn').is(":checked") == true)
        {
        	adYN = 'Y';
        }

        //바코드 사용유무 체크
        var barcodeYN = 'N';
        if($('#barcode').is(":checked") == true)
        {
        	barcodeYN = 'Y';
        }


        //즉시발송 여부 체크
        var sendTime = '';
        if($('#sendtypeR').is(":checked") == true)
        {
        	sendTime =  $("#senddate").val() +' ' + $("#sendtime").val() ;
        }

        var payload_name = payload['name'];
        var payload_id = payload['id'];

        console.log(payload_name);
        console.log(payload_id);

        if ( payload_name === "" )
        {
        	payload_name ="CJ CommOne";
        }


        console.log(payload_name);
        console.log(payload_id);


        var groupId = settings_name + '&' + version + '&' + payload_name + '&{{Activity.Id}}';
        var messageId = groupId + '&' + '{{Contact.Key}}';


        console.log("groupId:"+groupId);
        console.log("messageId:"+messageId);
        //payload.name = name;
/*        payload['arguments'].execute.inArguments = [{
         "msgtype": msgtype ,"filepath1": filepath1, "filepath2": filepath2, "filepath3": filepath3,"filetype1": filetype1, "filetype2": filetype2, "filetype3": filetype3, "filecnt": filecnt, "profilekeyval": profilekeyval,
        	"failmsgtype": failmsgtype, "failmsgyn": failmsgyn, "failfilepath": failfilepath, "wideyn": wideyn, "subject": subject, "msg": msg, "templatecode": templatecode, "failsubject": failsubject,
        	"failmsg": failmsg,"img_url":img_url, "buttonTypeTmp": buttonTypeTmp, "buttonNameTmp": buttonNameTmp, "buttonMobileTmp": buttonMobileTmp, "buttonPCTmp": buttonPCTmp, "buttonIOSTmp": buttonIOSTmp, "buttonAndroidTmp": buttonAndroidTmp,
        	"name": name, "mobile": mobile, "store": store, "store_tel" : store_tel, "m_mileage" : m_mileage, "m_grade" : m_grade, "sender" : sender, "rejectnum" : rejectnum, "url1" : url1,
        	"url2" : url2,"url3" : url3, "url4" : url4, "url5" : url5, "option1" : option1, "option2" : option2, "option3" : option3, "option4" : option4, "option5" : option5, "option6" : option6, "option7" : option7,
        	"option8" : option8,"option9" : option9,"option10" : option10,"cid" : cid,"campaign_code" : campaign_code,"mid" : mid,"sfmcid" : sfmcid, "groupId" : groupId,"messageId" : messageId,"adYN" : adYN,"sendTime": sendTime,"emid": emid}];
*/


		//start : ---------------------- CJO용 가이드 코딩-----------------------------//

		//셀렉트박스 에서 선택된값이 (STOREPHONE)와 같으면 sender에 {{value}} 형태의 dataExtension 필드값 세팅
		var deObj = JSON.parse(dataExtensionObj);
		if(sender == "STOREPHONE") {
          sender = deObj.STOREPHONE;
        }


		payload['arguments'].execute.inArguments = [{
         "dataExtensionObj": JSON.parse(dataExtensionObj),"personalFieldArr": personalFieldArr,
			"msgtype": msgtype ,"filepath1": filepath1, "filepath2": filepath2, "filepath3": filepath3,"filetype1": filetype1, "filetype2": filetype2, "filetype3": filetype3, "filecnt": filecnt, "profilekeyval": profilekeyval,
        	"failmsgtype": failmsgtype, "failmsgyn": failmsgyn, "failfilepath": failfilepath, "wideyn": wideyn, "subject": subject, "msg": msg, "templatecode": templatecode, "failsubject": failsubject,
        	"failmsg": failmsg,"img_url":img_url, "buttonTypeTmp": buttonTypeTmp, "buttonNameTmp": buttonNameTmp, "buttonMobileTmp": buttonMobileTmp, "buttonPCTmp": buttonPCTmp, "buttonIOSTmp": buttonIOSTmp, "buttonAndroidTmp": buttonAndroidTmp,
        	"name": name, "mobile": mobile, "store": store, "store_tel" : store_tel, "m_mileage" : m_mileage, "m_grade" : m_grade, "sender" : sender, "rejectnum" : rejectnum, "url1" : url1,
        	"url2" : url2,"url3" : url3, "url4" : url4, "url5" : url5, "option1" : option1, "option2" : option2, "option3" : option3, "option4" : option4, "option5" : option5, "option6" : option6, "option7" : option7,
        	"option8" : option8,"option9" : option9,"option10" : option10,"cid" : cid,"campaign_code" : campaign_code,"mid" : mid,"sfmcid" : sfmcid, "groupId" : groupId,"messageId" : messageId,"adYN" : adYN,"sendTime": sendTime,"emid": emid, "barcodeYN" : barcodeYN}];

		 //"sender" : sender, "cid" : cid, "mobile": mobile,
         //"msgtype": msgtype ,"filepath1": filepath1, "filepath2": filepath2, "filepath3": filepath3,"filetype1": filetype1, "filetype2": filetype2, "filetype3": filetype3, "filecnt": filecnt, "profilekeyval": profilekeyval,
         //  "failmsgtype": failmsgtype, "failmsgyn": failmsgyn, "failfilepath": failfilepath, "wideyn": wideyn, "subject": subject, "msg": msg, "templatecode": templatecode, "failsubject": failsubject,
         //  "failmsg": failmsg,"img_url":img_url, "buttonTypeTmp": buttonTypeTmp, "buttonNameTmp": buttonNameTmp, "buttonMobileTmp": buttonMobileTmp, "buttonPCTmp": buttonPCTmp, "buttonIOSTmp": buttonIOSTmp, "buttonAndroidTmp": buttonAndroidTmp,
		 //  "campaign_code" : campaign_code,"mid" : mid,"sfmcid" : sfmcid, "groupId" : groupId,"messageId" : messageId,"adYN" : adYN,"sendTime": sendTime,"emid": emid}];

		//변수 설명 : dataExtensionObj => DE 전체 필드명과 필드치환위한 형태	{ "필드명1" : "{{Event.eventDefinitionKey.필드명1}}" , "필드명2" : "{{Event.eventDefinitionKey.필드명2}}" }
		//변수 설명 : 개인화필드 화면에 출력하기 위한 배열변수 => personalFieldArr	[필드명1, 필드명2, 필드명3] 형태로 저장되며 화면출력용으로 사용
		/*
			개인화필드 사용방법 예시
			$.each(personalFieldArr, function(index, oneField){//개인화 필드 화면에 설정
				$("#msg_cus_list").append("<li><a href='javascript:txtInsert("+oneField+");' class='excel-info'><span>#{"+oneField+"}</span></a></li>");
			});
		*/
		//end : ---------------------- CJO용 가이드 코딩-----------------------------//


        //payload['arguments'].execute.inArguments = [{ "name": name ,"mobile": mobile, "store": store}];

        payload['metaData'].isConfigured = true;

        connection.trigger('updateActivity', payload);
    }

    function getMessage() {
        return $('#msg').val();
    }



/*
//start : ----------------------CJO용 가이드 코딩-----------------------------//
index 코딩 추가
//data extension상의 필드 유무로 sender 셀렉트박스 선택요소 추가
셀렉트박스의 요소를 추가하기위해 각각의 탭클릭시 호출되는 loadKkfForm loadKkoForm loadMsgForm 함수에서 AJAX 호출시 success 후 추가하여 사용해야함
만약 customActivity.js 상에 있는 dataExtensionObj 변수와  personalFieldArr 변수를 인식 못한다면 index 상에 전역변수로 선언하여 사용해야함
마찬가지로 addSenderAccount() 함수 인식 못할 시 index 상에 선언하여 사용해야합니다.

function addSenderAccount(){
	var deObj = JSON.parse(dataExtensionObj);
	if(deObj.마이샵매장연락처 != undefined){//이니스프리
		$("#sender").append("<option value='주관리거래처'>주관리거래처</option>");
		$("#sender").append("<option value='마이샵매장'>마이샵매장</option>");
	}else if(deObj.주관리거래처연락처 != undefined){//에스쁘아
		$("#sender").append("<option value='주관리거래처'>주관리거래처</option>");
	}
}
//END : ----------------------CJO용 가이드 코딩-----------------------------//
*/

});