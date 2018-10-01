
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

//	var tap = {
//		bind: function() {
//			$(document).on('mouseover', '[data-tap-target]', function() {
//				tap.show($(this));
//			});
//		},
//		show: function(target) {
//			var targetIdx = target.data('tap-target');
//			$("[data-tap-target]").each(function() {
//				var imgSrcs = $(this).find('img').attr('src').replace('_on', '_off');
//				$(this).find('img').attr('src', imgSrcs);
//			});
//			target.siblings().removeClass('is-active');
//			$("[data-tap-content]").removeClass('is-active');
//			
//			
//
//			target.addClass('is-active');
//			$("[data-tap-content='"+targetIdx+"']").addClass('is-active');
//			target.find('img').attr('src', './images/tap_btn_'+targetIdx+'_on.png');
//			
//			switch (target.data('tapTarget')) {
//				case 1:
//					$('.tab._2').css({
//						background: '#fdf6f7',
//						background: 'rgba(255, 255, 255, 0.6)'
//					});
//					$('.tab._3').css({
//						background: '#fbeff2',
//						background: 'rgba(255, 255, 255, 0.3)'
//					});
//					break;
//				case 2:
//					$('.tab._1').css({
//						background: '#fdf6f7',
//						background: 'rgba(255, 255, 255, 0.6)'
//					});
//					$('.tab._3').css({
//						background: '#fbeff2',
//						background: 'rgba(255, 255, 255, 0.3)'
//					});
//					break;
//				case 3:
//					$('.tab._1').css({
//						background: '#fbeff2',
//						background: 'rgba(255, 255, 255, 0.3)'
//					});
//					$('.tab._2').css({
//						background: '#fdf6f7',
//						background: 'rgba(255, 255, 255, 0.6)'
//					});
//					break;
//			}
//			target.css('background-color', '#ffffff');
//		}
//	}
//	tap.bind();
	
//	var share = {
//		bind: function() {
//			Kakao.init('8bd4e13e1a2a0d80bbd60d994b744ce1');
//
//			$(document).on('click', '[data-share-target]', function() {
//
//				share.open($(this));
//			});
//		},
//		open: function(target) {
//			// 공유 로직 들어 가야 함
//			// console.log(target.data("share-target"));
//			if (target.data("share-target") == "fb")
//			{
//				var newWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('http://routine.itsskin.com/index.php?media=fb'),'sharer','toolbar=0,status=0,width=600,height=325');
//
//				$.ajax({
//					type   : "POST",
//					async  : false,
//					url    : "./main_exec.php",
//					data:{
//						"exec"          : "insert_share_info",
//						"sns_media"     : target.data("share-target")
//					}
//				});
//	
//			} else if (target.data("share-target") == "ks") {
//				Kakao.Story.share({
//					url: 'http://routine.itsskin.com/index.php?media=ks'
//				});
//				$.ajax({
//					type   : "POST",
//					async  : false,
//					url    : "./main_exec.php",
//					data:{
//						"exec" : "insert_share_info",
//						"sns_media" : target.data("share-target")
//					}
//				});
//	
//			}else{
//				var newWindow = window.open('http://blog.naver.com/LinkShare.nhn?url=http://routine.itsskin.com/index.php?media=blog','sharer','toolbar=0,status=0,width=600,height=325');
//				$.ajax({
//					type   : "POST",
//					async  : false,
//					url    : "./main_exec.php",
//					data:{
//						"exec" : "insert_share_info",
//						"sns_media" : target.data("share-target")
//					}
//				});
//			}
//		}
//	}
//	share.bind();
	
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
	$(".btn-result").on("click", function(){
		var mb_name 	= $("#mb_name").val();
		var mb_phone1 	= $("#mb_phone1").val();
		var mb_phone2 	= $("#mb_phone2").val();
		var mb_phone3 	= $("#mb_phone3").val();
		var mb_mail1	= $("#mb_mail1").val();
		var mb_mail2	= $("#mb_mail2").val();
		var mb_addr1 	= $("#mb_addr1").val();
		var mb_addr2 	= $("#mb_addr2").val();
		var mb_phone 	= mb_phone1 + mb_phone2 + mb_phone3;
		var mb_mail		= mb_mail1 + "@" + mb_mail2;

		if ($(".check-wrapper .check").hasClass("is-checked") === false) {
			alert("나에게 맞는 PT크림을 선택해주세요");
			return false;
		}
		// console.log($('.mb_type').val());
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
		}
		if (mb_mail2 == "") {
			alert("메일주소를 입력해주세요");
		}

		if ($("#agree1").is(":checked") === false)
		{
			alert('개인정보 수집 및 이용약관에 동의하셔야만 이벤트 참여가 가능합니다.');
			return false;
		}

		if ($("#agree2").is(":checked") === false)
		{
			alert('개인정보 취급 위탁 약관에 동의하셔야만 이벤트 참여가 가능합니다.');
			return false;
		}

		$.ajax({
			type:"POST",
			data:{
				"exec"				: "insert_member_info",
				"mb_name"			: mb_name,
				"mb_phone"			: mb_phone,
				"mb_mail"			: mb_mail,
				"mb_addr1"			: mb_addr1,
				"mb_addr2"			: mb_addr2,
				"mb_type"			: pt_type
			},
			url: "./main_exec.php",
			success: function(response){
				if (response == "Y")
				{
					bato.popup.close($("#pt-pass"));
					console.log(pt_type);
					$("#rs_name").html(mb_name);
					if (pt_type == "light")
					{
						$(".your-status").html("라이트 PT를 선택한 당신은 <b>계절성 건성</b>입니다");
						$(".need").html("아토덤 크림으로 스킨 PT가 필요합니다");
						$("#rs_type").html("라이트 PT");
						$("#rs_status").html("계절성 건성");
						$("#rs_goods").html("아토덤 크림");
						$("#rs_goods_img").attr("src","./images/popup_atoderm_cream.png");
					}else if (pt_type == "medium"){
						$(".your-status").html("미디움 PT를 선택한 당신은 <b>만성 건성</b>입니다");
						$(".need").html("아토덤 PP밤으로 스킨 PT가 필요합니다");
						$("#rs_type").html("미디움 PT");
						$("#rs_status").html("만성 건성");
						$("#rs_goods").html("아토덤 PP밤");
						$("#rs_goods_img").attr("src","./images/popup_atoderm_pp.png");
					}else{
						$(".your-status").html("헤비 PT를 선택한 당신은 <b>문제성 건성</b>입니다");
						$(".need").html("아토덤 인텐시브밤으로 스킨 PT가 필요합니다");
						$("#rs_type").html("헤비 PT");
						$("#rs_status").html("문제성 건성");
						$("#rs_goods").html("아토덤 인텐시브밤");
						$("#rs_goods_img").attr("src","./images/popup_atoderm_intensive.png");
					}
	
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
			}
		}).open();	
	});
});


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

function pt_draw()
{
	$.ajax({
		type:"POST",
		data:{
			"exec"				: "draw_winner"
		},
		url: "./main_exec.php",
		success: function(response){
			console.log(response);
			bato.popup.close($("#pt-success"));

			if (response == "Y")
				bato.popup.show($("#pt-pass"));
			else
				bato.popup.show($("#pt-retry"));

		}
	});
}

function sns_share(media, flag)
{
	if (media == "fb")
	{
        var newWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('http://www.atodermcare.com/?media=share_fb'),'sharer','toolbar=0,status=0,width=600,height=325');

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
		Kakao.init('dce5eef1bd9bc3b9221ded3459d746ef');

		Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
				title: '당신의 스킨도 이제는 체력 관리가 필요하니까! 지금 바이오더마에서 당신에게 필요한 무료 스킨 PT를 받아보세요!',
				// description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
				imageUrl: "http://www.atodermcare.com/images/kakao_share2.jpg",
				link: {
					mobileWebUrl: 'http://www.atodermcare.com/m/index.php?media=share_fb',
					webUrl: 'http://www.atodermcare.com/?media=share_fb'
				}
			},
			buttons: [
				{
					title: '웹으로 보기',
					link: {
						mobileWebUrl: 'http://www.atodermcare.com/m/index.php?media=share_fb',
						webUrl: 'http://www.atodermcare.com/?media=share_fb'
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

