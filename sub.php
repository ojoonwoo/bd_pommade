<?
    include_once "head.php";
?>
<body>
    <div class="container">
        <div class="content sub">
            <div class="header-wrap">
                <div class="inner">
                    <h1>
                        <a href="index.php">
                            <img src="./images/logo.png" alt="로고">
                        </a>
                    </h1>
                </div>
            </div>
            <div class="notice-wrap">
                <div class="inner">
                    <img src="./images/megaphone.png" alt="">
                    <span>기존 시카 제품에 불만족을 느끼신 100번째 김OO 고객님 께서 포마드로 A/S받으셨습니다</span>
                </div>
            </div>
            <div class="content-wrap">
                <div class="inner">
                    <div class="request-area">
                        <div class="mark">
                            <img src="./images/sub_mark2.png" alt="">
                            <img src="./images/sub_mark.png" alt="">
                        </div>
                        <div class="title">
                            <img src="./images/sub_title_dot.png" alt="">
                            <span>시카 제품 A/S 신청서</span>
                            <img src="./images/sub_title_dot.png" alt="">
                        </div>
                        <div class="question1-box">
                            <div class="q1">
                                <span><b>Q.</b> 기존에 사용했던 시카 제품에서 어떤 점이 가장 불만족스러우셨나요?</span>
                            </div>
                            <div class="choice">
                                <div class="_1">
                                    <div class="chk1 chk">
                                        <input type="checkbox" name="q1_chk" id="q1_chk1" class="check" data-value="1" data-name="진정력">
                                        <label for="q1_chk1"></label>
                                    </div>
									<div class="chk2 chk">
										<input type="checkbox" name="q1_chk" id="q1_chk2" class="check" data-value="2" data-name="발림성">
                                        <label for="q1_chk2"></label>
                                    </div>
									<div class="chk3 chk">
										<input type="checkbox" name="q1_chk" id="q1_chk3" class="check" data-value="3" data-name="수분도">
                                        <label for="q1_chk3"></label>
                                    </div>
									<div class="chk4 chk">
										<input type="checkbox" name="q1_chk" id="q1_chk4" class="check" data-value="4" data-name="손상케어">
                                        <label for="q1_chk4"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="question2-box">
                            <div class="q2">
                                <span> 
                                    <p><b>Q.</b> 불만족 스러웠던</p><p>시카 제품을 알려주세요</p>
                                </span>
                            </div>
                            <div class="choice">
                                <div class="_2">
                                    <input type="text" id="claim_goods" placeholder="입력하기">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input-area">
                        <div class="input-box1">
                            <div class="row">
                                <div class="label">
                                    <span>이 름</span>
                                </div>
                                <div class="input">
                                    <input type="text" id="mb_name">
                                </div>
                            </div>
                            <div class="row">
                                <div class="label">
                                    <span>번 호</span>
                                </div>
                                <div class="input tel">
                                    <input type="text" id="mb_phone1" onkeyup="lengthCheck(this, 3)"> -
                                    <input type="text" id="mb_phone2" onkeyup="lengthCheck(this, 4)"> -
                                    <input type="text" id="mb_phone3" onkeyup="lengthCheck(this, 4)">
                                </div>
                            </div>
                        </div>
                        <div class="input-box2">
                            <div class="row">
                                <div class="label">
                                    <span>주 소</span>
                                </div>
                                <div class="input addr">
                                    <input type="text"  id="mb_addr1" readonly>
                                    <button type="button" class="search">
                                        <img src="./images/sub_search_btn.png" alt="">
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="label">
                                    <span></span>
                                </div>
                                <div class="input">
                                    <input type="text" id="mb_addr2">
                                </div>
                            </div>
                        </div>
                        <div class="input-box email">
							<div class="row">
								<div class="label">
									<span>이메일</span>
								</div>
								<div class="input email">
									<input type="text" id="mb_email1">
									<span>@</span>
									<input type="text" id="mb_email2">
									<select name="" id="email-select">
										<option value="direct">직접 입력</option>
										<option value="naver.com">naver.com</option>
										<option value="gmail.com">gmail.com</option>
										<option value="daum.net">daum.net</option>
										<option value="nate.com">nate.com</option>
									</select>
								</div>
							</div>
                        </div>
                        <div class="agree-box">
                            <div class="agree1">
                                <span>개인 정보 수집 및 이용에 동의합니다</span>
                                <input type="checkbox" id="mb_agree1">
                                <label for="mb_agree1"></label>
                                <span style="text-decoration:underline"><a href="javascript:void(0)" data-popup="#pt-agree1">약관보기</a></span>
                            </div>
                            <div class="agree2">
                                <span>개인 정보 취급 위탁에 동의합니다</span>
                                <input type="checkbox" id="mb_agree2">
                                <label for="mb_agree2"></label>
                                <span style="text-decoration:underline"><a href="javascript:void(0)" data-popup="#pt-agree2">약관보기</a></span>
                            </div>
                            <div class="agree-text">
                                <span>입력하신 정보로 경품이 발송되니 정확하게 입력해주세요 부정확한 정보 입력으로 경품 미발송은 책임지지 않습니다</span>
                            </div>
                        </div>
                        <div class="btn-box">
                            <button type="button" onclick="info_submit();return false;">A/S 신청 접수</button>
                        </div>
                    </div>
                    <div class="share-area">
                        <button class="fb"></button>
                        <button class="kt"></button>
                    </div>
                </div>
            </div>
            <div class="footer-wrap">
                <div class="inner">
                    <p>바이오더마 소개 | 온라인 고객센터</p>
                    <p>나오스코리아 유한회사 | 대표: 장이브데모트 | 사업자등록번호: 214-88-79685 (사업자정보확인)</p>
                    <p>주소: 서울특별시 서초구 서초중앙로 138 우림빌딩 7층 나오스코리아 유한회사 | 개인정보책임자: 김민정</p>
                    <p>이벤트 안내 번호: 02-523-7676 | 통신판매업신고번호: 2015-서울서초-0215 | E-MAIL: bioderma@bioderma.kr</p>
                    <p>©2018  BIODERMA.  ALL RIGHT RESERVED.</p>
                </div>
            </div>
        </div>
    </div>
<?
	include_once "./popup.php";
?>
    <input type="button" id="sample-btn" data-popup="#pt-result">
    <script>
    var claimType = "";
    var claimName = "";
    var search_zipcode	= "";
    var search_addr1	= "";
    $(window).on('load', function() {
    	// $('#sample-btn').trigger('click');

        var tl = new TimelineMax();
        var tl2 = new TimelineMax();
        // tl.to($(".neon-on-title"), 5, {autoAlpha:1, repeat:1, yoyo:true, ease: Linear.easeNone}, 0);
        // tl.play();
        tl.to($(".neon-on-title"), 0.3, {alpha:0, repeatDelay:0.3, repeat:-1, yoyo:true})
        tl.play();

        setTimeout(function(){
            tl2.to($(".goods-area"), 1, {alpha:1})
            tl2.play();
        },1500);
		
		$('.choice .check').on('click', function() {
			var $parent = $(this).parent().parent();
			var _this = $(this);
			$parent.find('.chk').each(function() {
				if($(this).find('.check').is(_this)) {
                    $(this).find('.check').attr('checked', true);
				} else {
					$(this).find('.check').attr('checked', false);
				}
            })
            claimType	= $(this).data("value");
            claimName	= $(this).data("name");
    		// console.log(claimType);
		});
    });
		
		$('#email-select').on('change', function() {
			var selectVal = $(this).val();
			if(selectVal == 'direct') {
				$('#mb_email2').val('').focus().attr('readonly', false);
			} else {
				$('#mb_email2').val(selectVal).attr('readonly', true);
			}
		});

	
    </script>
</body>
</html>