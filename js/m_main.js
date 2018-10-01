
$(function(){

	window.bato = {};

	var $win = $(window),
		$doc = $(document),
		$html = $('html'),
		$body = $('body');

	var locationArray = location.href.split('/');
	var currentLocation = locationArray[locationArray.length-1].split('.')[0];



	var agree1 	= "N";
	var agree2 	= "N";

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
	
	$('#rs1').on('click', function() {
		// console.log("1111");
		if ($(".check-wrapper .check").hasClass("is-checked") === false) {
			alert("나에게 맞는 PT크림을 선택해주세요");
			return false;
		}

		bato.popup.close($("#pt-pass"));
		bato.popup.show($("#pt-pass2"));
	});
	$('#rs2').on('click', function() {
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
			url: "../main_exec.php",
			success: function(response){
				console.log(response);
				if (response == "Y")
				{
					bato.popup.close($("#pt-pass"));
					// 사용자가 선택한 피부타입에 맞는 제품 및 문구 변경
					if (pt_type == "light")
					{
						$(".your-status").html("라이트 PT를 선택한 당신은 <b>계절성 건성</b>입니다");
						$(".need").html("아토덤 크림으로 스킨 PT가 필요합니다");
						$("#rs_goods").attr("src","./images/popup_atoderm_cream.png")
					}else if (pt_type == "medium"){
						$(".your-status").html("미디움 PT를 선택한 당신은 <b>만성 건성</b>입니다");
						$(".need").html("아토덤 PP밤으로 스킨 PT가 필요합니다");
						$("#rs_goods").attr("src","./images/popup_atoderm_pp.png")
					}else{
						$(".your-status").html("헤비 PT를 선택한 당신은 <b>문제성 건성</b>입니다");
						$(".need").html("아토덤 인텐시브밤으로 스킨 PT가 필요합니다");
						$("#rs_goods").attr("src","./images/popup_atoderm_intensive.png")
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
	
				zipcode	= data.zonecode;
				addr1		= fullAddr;
				// document.getElementById('mb_zipcode').value = data.zonecode; //5자리 새우편번호 사용
				// document.getElementById('mb_addr1').value = "("+zipcode+") "+addr1;
				// document.getElementById('mb_addr1').value = addr1;
				document.getElementById('mb_addr1').value 	= "(" + data.zonecode + ") " + addr1;
				// document.getElementById('mb_addr1').value 	= addr1;
	
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

});


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
		url: "../main_exec.php",
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
			url    : "../main_exec.php",
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
			url    : "../main_exec.php",
			data:{
				"exec" : "insert_share_info",
				"sns_media" : media,
				"sns_flag"		: flag
			}
		});
	}
}
