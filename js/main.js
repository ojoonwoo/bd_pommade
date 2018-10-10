
$(function(){
	
	window.bato = {};
	
	var $win = $(window),
		$doc = $(document),
		$html = $('html'),
		$body = $('body');
	
	var locationArray = location.href.split('/');
	var currentLocation = locationArray[locationArray.length-1].split('.')[0];
	
	bato.popup = {
		bind : function(){
			$doc
				.on('click', '[data-popup]', function(e){
				var $this = $(this),
					$html = $('html'),
					val = $this.attr('data-popup');

				if (val.match('@close')){
					bato.popup.close($this.closest('.popup'));
				} else {
					bato.popup.show($(val));
				}

				if ($this.is('a')){
					e.preventDefault();
				}
			})
				.on('click', '[data-popup-close]', function(e){
				var $this = $(this),
					val = $this.attr('data-popup-close');

				bato.popup.close($(val));

				if ($this.is('a')){
					e.preventDefault();
				}
			});
		},
		show : function($popup){
			if ($popup.length){
				var $wrap = $popup.parent(),
					$html = $('html');


				if (!$wrap.hasClass('popup-wrap')){
					$popup.wrap('<div class="popup-wrap"></div>');
					$wrap = $popup.parent();
				}

				if (!$wrap.hasClass('is-opened')){
					$wrap
						.stop().fadeIn(10, function(){
						$popup.trigger('afterPopupOpened', $wrap);
					})
						.addClass('is-opened');
				}

				if (!$html.hasClass('popup-opened')){
					$html.addClass('popup-opened');
				}

				$popup.trigger('popupOpened', $wrap);
			}
		},
		close : function($popup){
			if ($popup.length){
				var $wrap = $popup.parent(),
					$html = $('html');

				$wrap.stop().fadeOut(10, function(){
					$wrap.removeClass('is-opened');

					if (!$('.popup-wrap.is-opened').length){
						$html.removeClass('popup-opened');
					}

					//					$popup.trigger('afterpopupClosed', $wrap);
				});

				$popup.trigger('popupClosed', $wrap);
			}
		}
	};
	bato.popup.bind();

	$('#mb_mail3').on('change', function() {
		var val = $(this).val();
		if(val == '') {
			$('#mb_mail2').focus();
		} else if(val == 'input') {
			$('#mb_mail2').val('').focus();
		} else {
			$('#mb_mail2').val(val);	
		}
	});

	$(".search").on("click", function(){
		new daum.Postcode({
			oncomplete: function(data) {
				// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	
				// 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
				// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
				var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
				var extraRoadAddr = ''; // 도로명 조합형 주소 변수
	
				// 법정동명이 있을 경우 추가한다. (법정리는 제외)
				// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
				if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
					extraRoadAddr += data.bname;
				}
				// 건물명이 있고, 공동주택일 경우 추가한다.
				if(data.buildingName !== '' && data.apartment === 'Y'){
				   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
				if(extraRoadAddr !== ''){
					extraRoadAddr = ' (' + extraRoadAddr + ')';
				}
				// 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
				if(fullRoadAddr !== ''){
					fullRoadAddr += extraRoadAddr;
				}
	
				// 우편번호와 주소 정보를 해당 필드에 넣는다.
				// document.getElementById('mb_zipcode').value = data.zonecode; //5자리 새우편번호 사용
				document.getElementById('mb_addr1').value 	= "(" + data.zonecode + ") " + fullRoadAddr;
				search_zipcode 	= data.zonecode;
				search_addr1 	= fullRoadAddr;
			}
		}).open();	
	});
	
	
	$(window).on('load', function() {
		getNoticeInfo('0');
	});

	var $noticeWrap = $('.notice-wrap .inner');
	var $noticeSpan = $('.notice-wrap span');
	function getNoticeInfo(time) {
		var time = time || 20000;
		setTimeout(function() {
			//					가장 최근 참여자 1명 뽑아와서 전광판에 뿌린 후 애니메이션
			//					애니메이션 끝나고 반복
			$.ajax({
				type:"POST",
				data:{
					"exec"				: "notice_get_member",
				},
				url: "./main_exec.php",
				success: function(response){
					var data = $.parseJSON(response);
					var idx = data.idx,
						name = data.mb_name,
						targetPoint = $noticeWrap.outerWidth() + Math.abs(($(window).width() - $noticeWrap.outerWidth()));
					//							console.log(targetPoint);
					if (response != "N")
					{
						$noticeSpan.html('기존 시카 제품에 불만족을 느끼신 '+'<b>'+idx+'번째 '+name+' 고객님</b> 께서 포마드로 A/S받으셨습니다');
						TweenMax.to($noticeWrap, 19, {x: -(targetPoint*2), ease:Linear.easeNone, onComplete: resetAnimation});
					}
				}
			});
			getNoticeInfo();
		}, time);
	}
	function resetAnimation() {
		TweenMax.set($noticeWrap, {clearProps: "all"});
	}

});

function info_submit() {
	var claim_goods 	= $("#claim_goods").val();
	var mb_name 		= $("#mb_name").val();
	var mb_phone1 		= $("#mb_phone1").val();
	var mb_phone2 		= $("#mb_phone2").val();
	var mb_phone3 		= $("#mb_phone3").val();
	var mb_mail1		= $("#mb_email1").val();
	var mb_mail2		= $("#mb_email2").val();
	var mb_addr1 		= $("#mb_addr1").val();
	var mb_addr2 		= $("#mb_addr2").val();
	var mb_phone 		= mb_phone1 + mb_phone2 + mb_phone3;
	var mb_mail			= mb_mail1 + "@" + mb_mail2;
// console.log(cutStr(claim_goods));
// return false;
	if ($(".check").is(":checked") === false) {
		alert("기존에 사용했던 시카제품의 불만족스런 이유를 선택해 주세요");
		return false;
	}

	if (claim_goods == "") {
		alert("불만족스런 시카제품을 입력해주세요.");
		$("#claim_goods").focus();
		return false;
	}

	if (mb_name == "") {
		alert("이름을 입력해 주세요.");
		$("#mb_name").focus();
		return false;
	}

	if (mb_phone1 == "") {
		alert("전화번호를 입력해 주세요.");
		$("#mb_phone1").focus();
		return false;
	}
	
	if (mb_phone2 == "") {
		alert("전화번호를 입력해 주세요.");
		$("#mb_phone2").focus();
		return false;
	}
	if (mb_phone3 == "") {
		alert("전화번호를 입력해 주세요.");
		$("#mb_phone3").focus();
		return false;
	}
	if (mb_addr1 == "") {
		alert("주소를 입력해 주세요.");
		return false;
	}
	if (mb_addr2 == "") {
		alert("상세주소를 입력해 주세요.");
		$("#mb_addr2").focus();
		return false;
	}
	if (mb_mail1 == "") {
		alert("메일주소를 입력해주세요");
		return false;
	}
	if (mb_mail2 == "") {
		alert("메일주소를 입력해주세요");
		return false;
	}

	if ($("#mb_agree1").is(":checked") === false)
	{
		alert('개인정보 수집 및 이용약관에 동의하셔야만 이벤트 참여가 가능합니다.');
		return false;
	}

	if ($("#mb_agree2").is(":checked") === false)
	{
		alert('개인정보 취급 위탁 약관에 동의하셔야만 이벤트 참여가 가능합니다.');
		return false;
	}

	$.ajax({
		type:"POST",
		data:{
			"exec"				: "insert_member_info",
			"claim_goods"		: claim_goods,
			"mb_name"			: mb_name,
			"mb_phone"			: mb_phone,
			"mb_mail"			: mb_mail,
			"mb_zipcode"		: search_zipcode,
			"mb_addr1"			: search_addr1,
			"mb_addr2"			: mb_addr2,
			"claimType"			: claimType
		},
		url: "./main_exec.php",
		success: function(response){
			console.log(response);
//			alert(response);
			if (response == "Y")
			{
				// bato.popup.close($("#pt-pass"));
				// console.log(pt_type);
				// $("#rs_name").html(mb_name);
				$("#req_name").html(mb_name);
				$("#req_goods").html(cutStr(claim_goods));
				$("#req_req").html(claimName);
				$(".result-image img").attr("src","./images/popup_result"+claimType+".png");
				bato.popup.show($("#pt-result"));
			}else if (response == "D") {
				alert("이미 참여하셨습니다. 감사합니다!");
				location.href = "index.php";
			}else{
				alert("참여자가 많습니다. 다시시도해 주세요!");
				location.reload();
			}
		}
	});
}

function cutStr(limitText)
{
	if (is_hangul_char(limitText))
		var maxByte = 10;
	else
		var maxByte = 5;
	var strValue = limitText;
	var strLen = strValue.length;
	var totalByte = 0;
	var len = 0;
	var oneChar = "";
	var str2 = "";
	var resultStr	= "";
	for (var i = 0; i < strLen; i++) {
		oneChar = strValue.charAt(i);
		if (escape(oneChar).length > 4) {
			totalByte += 2;
		} else {
			totalByte++;
		}

		// 입력한 문자 길이보다 넘치면 잘라내기 위해 저장
		if (totalByte <= maxByte) {
			len = i + 1;
		}
	}

	// 넘어가는 글자는 자른다.
	// if (totalByte > maxByte) {
		// alert(maxByte + "자를 초과 입력 할 수 없습니다.");
		// str2 = strValue.substr(0, len);
		// obj.value = str2;
		// cutStr(obj.value, 4000);
	// }else{
		// str2 = strValue;
	// }
	str2 = strValue.substr(0, 1);
	resultStr = str2;
	for (var j = 1; j < len; j++) {
		resultStr += "O";
	}
	return resultStr;
}
function is_hangul_char(ch){
	c = ch.charCodeAt(0);
	if( 0x1100<=c && c<=0x11FF ) return true;
	if( 0x3130<=c && c<=0x318F ) return true;
	if( 0xAC00<=c && c<=0xD7A3 ) return true;
	return false;
}
function only_num(obj)
{
	var inText = obj.value;
	var outText = "";
	var flag = true;
	var ret;
	for(var i = 0; i < inText.length; i++)
	{
		ret = inText.charCodeAt(i);
		if((ret < 48) || (ret > 57))
		{
			flag = false;
		}
		else
		{
			outText += inText.charAt(i);
		}
	}

	if(flag == false)
	{
		alert("전화번호는 숫자입력만 가능합니다.");
		obj.value = outText;
		obj.focus();
		return false;
	}
	return true;
}

function chk_numlen(obj, len, num)
{
	if(obj.value.length >= len) {
		// alert("전화번호는 11자를 초과할 수 없습니다.");
		// obj.value = obj.value.slice(0, -(obj.value.length-4));

		if (num == 0)
			$(".blank7").blur();
		else
			$(".blank"+num).focus();
		return false;
	}
	return;
}
function chk_len(obj, len, num)
{
	if(obj.value.length >= len) {
		// alert("전화번호는 11자를 초과할 수 없습니다.");
		// obj.value = obj.value.slice(0, -(obj.value.length-4));

		if (num == 0)
			$("#mb_phone3").blur();
		else
			$("#mb_phone"+num).focus();
		return false;
	}
	return;
}

function chk_strlen(obj, maxByte, num) {
	var ls_str = obj.value;
	var li_str_len = ls_str.length; 
	var li_byte = 0;
	var li_len = 0;
	var ls_one_char = "";
	var ls_str2 = "";
   
	for ( var i=0; i< li_str_len; i++) {
	  ls_one_char = ls_str.charAt(i);
   
	  if (escape(ls_one_char).length > 4) {
		li_byte += 2;
	  } else {
		li_byte++;
	  }
		  
	  if(li_byte <= maxByte) {
		li_len = i + 1;
	  }
	}
	if(li_byte > maxByte) {
	  	ls_str2 = ls_str.substr(0, li_len);
	  	obj.value = ls_str2;
		chk_strlen(obj, 4000);
	} else {
		if (ls_str == "촉")
			$(".blank"+num).focus();

		// var blank_txt = $(".blank1").val() + $(".blank2").val() + $(".blank3").val() + $(".blank4").val() + $(".blank5").val() + $(".blank6").val() + $(".blank7").val();
		// console.log(blank_txt);
		// if (blank_txt == "촉촉촉촉촉촉촉")
		// {
		// 	$(".quiz-btn").attr({
		// 		"onclick" : "",
		// 		"data-popup-target" : "#popup-input"
		// 	})
		// }
	}
}

function lengthCheck(obj, ln) {
	var $obj = $(obj);
	var regExp = /^[0-9]+$/;
	
	if(!regExp.test($obj.val())) {
		$obj.val($obj.val().replace(/[^0-9]/g, ""));
	} else {
		if($obj.val().length>=ln) {
			// $obj.is('input:last-child') ? $obj.blur() : $obj.next().focus();
			if ($obj.attr("id") == "mb_phone1")
				$("#mb_phone2").focus();
			else if ($obj.attr("id") == "mb_phone2")
				$("#mb_phone3").focus();
			else
				$obj.blur();
		}
	}
}

function confirm_close()
{
	if (confirm("창을 닫으시면 이벤트 참여가 취소됩니다. 닫으시겠습니까?"))
		location.href = "index.php";
}

function go_link(url)
{
	location.href = url;
}

function sns_share(media, flag)
{
	if (media == "fb")
	{
        var newWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('http://www.pommadecare.com/?media=share_fb'),'sharer','toolbar=0,status=0,width=600,height=325');

		$.ajax({
			type   : "POST",
			async  : false,
			url    : "./main_exec.php",
			data:{
				"exec"          : "insert_share_info",
				"sns_media"     : media,
				"sns_flag"		: flag
			}
		});
	}else if (media == "kt"){
		Kakao.init('f5ac4c6fbfcacd558c57ec5a05738a4e');

		Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
				// title: '불만족스러웠던 기존의 시카 제품들, 해결되지 않던 당신의 피부 고민!\n\n바이오더마의 특허 다프 성분과 안탈지신 기술을 담아 오랜 연구 끝에 탄생한 바이오더마 포마드로 A/S 받으세요!',
				title: '',
				description: '불만족스러웠던 기존의 시카 제품들,\n해결되지 않던 당신의 피부 고민!\n바이오더마의 특허 성분과 기술이 담긴\n포마드로 A/S 받으세요!',
				// description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
				imageUrl: "http://www.pommadecare.com/images/kakao_share.jpg",
				link: {
					mobileWebUrl: 'http://www.pommadecare.com/m/index.php?media=share_fb',
					webUrl: 'http://www.pommadecare.com/?media=share_fb'
				}
			},
			buttons: [
				{
					title: '웹으로 보기',
					link: {
						mobileWebUrl: 'http://www.pommadecare.com/m/index.php?media=share_fb',
						webUrl: 'http://www.pommadecare.com/?media=share_fb'
					}
				}
			],
			success: function(res) {
				console.log("success");
				console.log(res);
			},
			fail: function(res) {
				console.log("fail");
				console.log(res);
			},
			callback: function() {
	//					console.log("callback:"+res);
				// shareEnd();
			}
		});
		$.ajax({
			type   : "POST",
			async  : false,
			url    : "./main_exec.php",
			data:{
				"exec" : "insert_share_info",
				"sns_media" : media,
				"sns_flag"		: flag
			}
		});
	}
}

