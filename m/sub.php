<?
	include_once "head.php";
?>
	<body>
		<div class="container">
			<div class="content sub">
<?
	include_once "header.php";
?>				
				<div class="content-wrap">
					<div class="inner">
						<div class="notice-area">
							<div class="inner">
								<span>기존 시카 제품에 불만족을 느끼신 <b>100번째 김OO 고객님</b> 께서 포마드로 A/S받으셨습니다</span>
							</div>
						</div>
						<div class="request-form">
							<div class="inner">
								<div class="obj"></div>
								<div class="title">
									<h3>시카 제품 A/S 신청서</h3>
								</div>
								<div class="box _list">
									<div class="qs-txt">
										<b>Q.</b>
										<span>기존에 사용했던 시카 제품에서 어떤 점이 가장 불만족스러우셨나요?</span>
									</div>
									<ul class="check-list">
										<li>
											<div class="check-wrap checkType">
												<input type="checkbox" class="check claimCheck" id="q1_chk1" data-value="1" data-name="진정력">
												<label for="q1_chk1"></label>
												<span>진정력</span>
											</div>
											<div class="img">
												<img src="./images/sub_checklist_img_01.png" alt="">
												<img src="./images/sub_checklist_ellipse.png" alt="">
											</div>
											<div class="desc">
												뒤집어진 피부를
												진정시키지 못함
											</div>
										</li>
										<li>
											<div class="check-wrap checkType">
												<input type="checkbox" class="check claimCheck" id="q1_chk2" data-value="2" data-name="발림성">
												<label for="q1_chk2"></label>
												<span>발림성</span>
											</div>
											<div class="img">
												<img src="./images/sub_checklist_img_02.png" alt="">
												<img src="./images/sub_checklist_ellipse.png" alt="">
											</div>
											<div class="desc">
												텍스쳐에 힘이 없고
												민감한 피부 위에
												매끄럽게 도포되지 못함
											</div>
										</li>
										<li>
											<div class="check-wrap checkType">
												<input type="checkbox" class="check claimCheck" id="q1_chk3" data-value="3" data-name="수분도">
												<label for="q1_chk3"></label>
												<span>수분도</span>
											</div>
											<div class="img">
												<img src="./images/sub_checklist_img_03.png" alt="">
												<img src="./images/sub_checklist_ellipse.png" alt="">
											</div>
											<div class="desc">
												수분감이 오래 유지되지
												않고 시간이 지나면
												보습력이 떨어짐
											</div>
										</li>
										<li style="margin-bottom:5px">
											<div class="check-wrap checkType">
												<input type="checkbox" class="check claimCheck" id="q1_chk4" data-value="4" data-name="손상케어">
												<label for="q1_chk4"></label>
												<span>손상케어</span>
											</div>
											<div class="img">
												<img src="./images/sub_checklist_img_04.png" alt="">
												<img src="./images/sub_checklist_ellipse.png" alt="">
											</div>
											<div class="desc">
												손상* 피부 개선이 
												만족스럽지 않음
											</div>
										</li>
										<li>
											<span style="font-size:10px;letter-spacing:-1.1px">*질병을 진단, 치료, 경감, 처치 또는 예방 등의 의학적 효능,효과와 결부 되지 않음</span>
										</li>
									</ul>
								</div>
								<div class="box _input">
									<div class="qs-txt">
										<b>Q.</b>
										<span>불만족스러웠던 시카 제품을 알려주세요</span>
									</div>
									<div class="answer">
										<input type="text" id="claim_goods" placeholder="입력하기">
									</div>
								</div>
							</div>
						</div>
						<div class="receipt-form">
							<div class="input-wrap">
								<div class="input-group">
									<div class="guide">이 름</div>
									<div class="input">
										<input type="text" id="mb_name">
									</div>
								</div>
								<div class="input-group tel">
									<div class="guide">전화 번호</div>
									<div class="input">
										<input type="tel" id="mb_phone1" onkeyup="lengthCheck(this, 3)">
										<span>-</span>
										<input type="tel" id="mb_phone2" onkeyup="lengthCheck(this, 4)">
										<span>-</span>
										<input type="tel" id="mb_phone3" onkeyup="lengthCheck(this, 4)">
									</div>
								</div>
								<div class="input-group addr">
									<div class="guide">주 소</div>
									<div class="input">
										<input type="text" id="mb_addr1" readonly>
										<button class="find-addr"></button>
									</div>
								</div>
								<div class="input-group">
									<div class="guide"></div>
									<div class="input">
										<input type="text" id="mb_addr2">
									</div>
								</div>
								<div class="input-group email">
									<div class="guide">이메일</div>
									<div class="input">
										<input type="text" id="mb_email1" onkeyup="chk_hangul(this)">
										<span>@</span>
										<input type="text" id="mb_email2" onkeyup="chk_hangul(this)">
									</div>
								</div>
								<div class="input-group email">
									<div class="guide"></div>
									<div class="input">
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
							<div class="agree-wrap">
								<div class="row">
									<div class="guide">개인 정보 취급 위탁에 동의합니다</div>
									<div class="check-wrap">
										<input type="checkbox" class="check" id="mb_agree1">
										<label for="mb_agree1"></label>
										<a href="javascript:void(0)" data-popup="#pt-agree1">약관보기</a>
									</div>
								</div>
								<div class="row">
									<div class="guide">개인 정보 수집 및 이용에 동의합니다</div>
									<div class="check-wrap">
										<input type="checkbox" class="check" id="mb_agree2">
										<label for="mb_agree2"></label>
										<a href="javascript:void(0)" data-popup="#pt-agree2">약관보기</a>
									</div>
								</div>
								<div class="msg">입력하신 정보로 경품이 발송되니 정확하게 입력해주세요 <br>부정확한 정보 입력으로 경품 미발송은 책임지지 않습니다</div>
							</div>
							<button class="btn-submit" onclick="info_submit(this);return false;">
								A/S 신청 접수
							</button>
							<div class="extra-notice">
								<span>A/S는 포마드 샘플 소진 시까지만 진행됩니다</span>
								<span>동일인으로 추정될 경우 최초 참여 내역에만 발송이 진행됩니다</span>
							</div>
						</div>
					</div>
				</div>
				<div class="footer-wrap">
					<div class="inner">
						<p><a href="http://www.bioderma.co.kr/page/brand_philosophy.php?utm_source=pommade-as&utm_medium=link&utm_campaign=by-pommade&utm_content=btn-footer-brand" target="_blank"><b>바이오더마 소개</b></a> | <a href="http://www.bioderma.co.kr/front/board.php?bbs_id=notice&utm_source=pommade-as&utm_medium=link&utm_campaign=by-pommade&utm_content=btn-footer-notice" target="_blank"><b>온라인 고객센터</b></a></p>
						<p>나오스코리아 유한회사 | 대표: 장이브데모트</p>
						<p>사업자등록번호: 214-88-79685 <a href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=&apv_perm_no=2015321015330200215">(사업자정보확인)</a></p>
						<p>주소: 서울특별시 서초구 서초중앙로 138 우림빌딩 7층 나오스코리아 유한회사</p>
						<p>개인정보책임자: 김민정 | 고객 센터: 02-523-7676</p>
						<p>통신판매업신고번호: 2015-서울서초-0215 | E-MAIL: bioderma@bioderma.kr</p>
						<p>©2018  BIODERMA.  ALL RIGHT RESERVED.</p>
					</div>
				</div>
			</div>
		</div>
<?
		include_once "./popup.php";
?>
		<div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:9999;-webkit-overflow-scrolling:touch;">
			<img src="//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="width:7%;cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼">
		</div>

		<input type="button" id="sample-btn" data-popup="#pt-result">
		<script>
			var claimType = "";
			var claimName = "";

			$(window).on('load', function() {
				// $('#sample-btn').trigger('click');

				// $('.checkType .check').on('click', function() {
				// 	var $parent = $(this).parent().parent();
				// 	var _this = $(this);
				// 	$parent.find('.checkType').each(function() {
				// 		if($(this).find('.check').is(_this)) {
				// 			$(this).find('.check').attr('checked', true);
				// 		} else {
				// 			$(this).find('.check').attr('checked', false);
				// 		}
				// 	})
				// 	claimType	= $(this).data("value");
				// 	claimName	= $(this).data("name");
				// 	console.log(claimType);
				// });

				$('.box._list .check').on('click', function() {
					var $parent = $(this).closest('ul');
					var _this = $(this);
					$parent.find('li').each(function() {
						if($(this).find('.check').is(_this)) {
							$(this).find('.check').attr('checked', true);
						} else {
							$(this).find('.check').attr('checked', false);
						}
					})
					claimType	= $(this).data("value");
					claimName	= $(this).data("name");
//					console.log(claimType);
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