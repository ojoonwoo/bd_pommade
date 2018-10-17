var search_zipcode	= "";
var search_addr1	= "";

$(function(){

	window.pommd = {};

	var $win = $(window),
		$doc = $(document),
		$html = $('html'),
		$body = $('body');

	var locationArray = location.href.split('/');
	var currentLocation = locationArray[locationArray.length-1].split('.')[0];

	Kakao.init('f5ac4c6fbfcacd558c57ec5a05738a4e');

	
	var agree1 	= "N";
	var agree2 	= "N";

	pommd.popup = {
		bind : function(){
			$doc
				.on('click', '[data-popup]', function(e){
				var $this = $(this),
					$html = $('html'),
					val = $this.attr('data-popup');

				if (val.match('@close')){
					pommd.popup.close($this.closest('.popup'));
				} else {
					pommd.popup.show($(val));
				}

				if ($this.is('a')){
					e.preventDefault();
				}
			})
				.on('click', '[data-popup-close]', function(e){
				var $this = $(this),
					val = $this.attr('data-popup-close');

				pommd.popup.close($(val));

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
	pommd.popup.bind();
	
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

	$(".find-addr").on("click", function(){
		// sample2_execDaumPostcode();
		element_layer = document.getElementById('layer');

		new daum.Postcode({
			oncomplete: function(data) {
				// 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	
				// 각 주소의 노출 규칙에 따라 주소를 조합한다.
				// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
				var fullAddr = data.address; // 최종 주소 변수
				var extraAddr = ''; // 조합형 주소 변수
	
				// 기본 주소가 도로명 타입일때 조합한다.
				if(data.addressType === 'R'){
					//법정동명이 있을 경우 추가한다.
					if(data.bname !== ''){
						extraAddr += data.bname;
					}
					// 건물명이 있을 경우 추가한다.
					if(data.buildingName !== ''){
						extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
					}
					// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
					fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
				}
	
				var addr1		= fullAddr;
				// document.getElementById('mb_zipcode').value = data.zonecode; //5자리 새우편번호 사용
				// document.getElementById('mb_addr1').value = "("+zipcode+") "+addr1;
				// document.getElementById('mb_addr1').value = addr1;
				document.getElementById('mb_addr1').value 	= "(" + data.zonecode + ") " + addr1;
				// document.getElementById('mb_addr1').value 	= addr1;
				search_zipcode 	= data.zonecode;
				search_addr1 	= addr1;
	
				// iframe을 넣은 element를 안보이게 한다.
				// (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
				element_layer.style.display = 'none';
			},
			width : '100%',
			height : '100%'
		}).embed(element_layer);
	
		// iframe을 넣은 element를 보이게 한다.
		element_layer.style.display = 'block';
	
		// iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
		initLayerPosition();
	
	});

	$(window).on('load', function() {
		getNoticeInfo('0');
	});
	var $noticeSpan = $('.notice-area span');
	function getNoticeInfo(time) {
		var time = time || 10000;
		setTimeout(function() {
			//					가장 최근 참여자 1명 뽑아와서 전광판에 뿌린 후 애니메이션
			//					애니메이션 끝나고 반복
			$.ajax({
				type:"POST",
				data:{
					"exec"				: "notice_get_member",
				},
				url: "../main_exec.php",
				success: function(response){
					var data = $.parseJSON(response);
					var idx = data.idx,
						name = data.mb_name,
						targetPoint = $noticeSpan.outerWidth() + Math.abs(($(window).width() - $noticeSpan.outerWidth())) + 50;
					if (response != "N")
					{
						$noticeSpan.html('기존 시카 제품에 불만족을 느끼신 '+'<b>'+idx+'번째 '+name+' 고객님</b> 께서 포마드로 A/S받으셨습니다');
						TweenMax.to($noticeSpan, 9, {x: -(targetPoint*2), ease:Linear.easeNone, onComplete: resetAnimation});
					}
				}
			});
			getNoticeInfo();
		}, time);
	}
	function resetAnimation() {
		TweenMax.set($noticeSpan, {clearProps: "all"});
	}
});

function info_submit(btn) {
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
	
	search_addr1 = search_addr1 || mb_addr1;

	console.log(claimType);
	if ($(".claimCheck").is(":checked") === false) {
		alert("기존에 사용했던 시카제품의 불만족스런 이유를 선택해 주세요");
		return false;
	}

	if (claim_goods == "" || claim_goods == "없음" || claim_goods.trim().length < 1) {
		alert("불만족스런 시카제품을 입력해주세요.");
		$("#claim_goods").focus();
		return false;
	}

	if (mb_name == "" || mb_name.trim().length < 1) {
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
	if (mb_addr1 == "" || mb_addr1.trim().length < 1) {
		alert("주소를 입력해 주세요.");
		return false;
	}
	if (mb_addr2 == "" || mb_addr2.trim().length < 1) {
		alert("상세주소를 입력해 주세요.");
		$("#mb_addr2").focus();
		return false;
	}
	if (mb_mail1 == "" || mb_mail1.trim().length < 1) {
		alert("메일주소를 입력해주세요");
		return false;
	}
	if (mb_mail2 == "" || mb_mail2.trim().length < 1) {
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
	
	$(btn).attr('disabled', true);
	

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
		url: "../main_exec.php",
		success: function(response){
			console.log(response);
			if (response == "Y")
			{
				// bato.popup.close($("#pt-pass"));
				// console.log(pt_type);
				// $("#rs_name").html(mb_name);
				$("#req_name").html(mb_name);
				$("#req_goods").html(cutStr(claim_goods));
				$("#req_req").html(claimName);
				$(".result-image img").attr('class', '_'+claimType).attr("src","./images/popup_result"+claimType+".png");
				pommd.popup.show($("#pt-result"));
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
	resultStr = str2+"0000";
	// resultStr = str2;
	// for (var j = 1; j < len; j++) {
	// 	resultStr += "O";
	// }
	return resultStr;
}
function is_hangul_char(ch){
	c = ch.charCodeAt(0);
	if( 0x1100<=c && c<=0x11FF ) return true;
	if( 0x3130<=c && c<=0x318F ) return true;
	if( 0xAC00<=c && c<=0xD7A3 ) return true;
	return false;
}


function closeDaumPostcode() {
	// iframe을 넣은 element를 안보이게 한다.
	element_layer.style.display = 'none';
}

function initLayerPosition(){
	// var width = 300; //우편번호서비스가 들어갈 element의 width
	var width = $(window).width()*0.94; //우편번호서비스가 들어갈 element의 width
	var height = 360; //우편번호서비스가 들어갈 element의 height
	var borderWidth = 5; //샘플에서 사용하는 border의 두께

	// 위에서 선언한 값들을 실제 element에 넣는다.
	element_layer.style.width = width + 'px';
	element_layer.style.height = height + 'px';
	element_layer.style.border = borderWidth + 'px solid';
	// 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
	element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2) + 'px';
	element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 60 + 'px';
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
function chk_hangul(obj) { 
	// var $obj = $(obj);
	// if (!(event.keyCode >=37 && event.keyCode<=40)) {
	// 	var inputVal = $obj.val();
	// 	$obj.val(inputVal.replace(/[^a-z0-9]/gi,''));
	// }
	//좌우 방향키, 백스페이스, 딜리트, 탭키에 대한 예외
	if(event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39
        || event.keyCode == 46 ) return;
        //obj.value = obj.value.replace(/[\a-zㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
        obj.value = obj.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
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
			url    : "../main_exec.php",
			data:{
				"exec"          : "insert_share_info",
				"sns_media"     : media,
				"sns_flag"		: flag
			}
		});
	}else if (media == "kt"){

		Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
				// title: '불만족스러웠던 기존의 시카 제품들, 해결되지 않던 당신의 피부 고민!\n\n바이오더마의 특허 다프 성분과 안탈지신 기술을 담아 오랜 연구 끝에 탄생한 바이오더마 포마드로 A/S 받으세요!',
				title: '',
				description: '불만족스러웠던 기존의 시카 제품들,\n해결되지 않던 당신의 피부 고민!\n바이오더마의 특허 성분과 기술이 담긴\n포마드로 A/S 받으세요!',
				// description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
				imageUrl: "http://www.pommadecare.com/images/kakao_share3.jpg",
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
			url    : "../main_exec.php",
			data:{
				"exec" : "insert_share_info",
				"sns_media" : media,
				"sns_flag"		: flag
			}
		});
	}
}
