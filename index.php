<?
include_once "./include/autoload.php";

$mnv_f 			= new mnv_function();
$my_db         = $mnv_f->Connect_MySQL();
$mobileYN      = $mnv_f->MobileCheck();
// $obYN          = $mnv_f->BrowserCheck();
$IEYN          = $mnv_f->IECheck();
$SafariYN          = $mnv_f->SafariCheck();
// print_r($_SERVER["HTTP_USER_AGENT"]);
if ($mobileYN == "MOBILE")
{
	echo "<script>location.href='m/index.php?media=".$_REQUEST["media"]."';</script>";
}else{
	$saveMedia     = $mnv_f->SaveMedia();
	$rs_tracking   = $mnv_f->InsertTrackingInfo($mobileYN);
}

include_once "head.php";
?>
<body>
	<div class="container">
		<div class="content main">
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
					<span>기존 시카 제품에 불만족을 느끼신 <b>100번째 김OO 고객님</b> 께서 포마드로 A/S받으셨습니다</span>
				</div>
			</div>
			<div class="content-wrap">
				<div class="inner">
					<div class="desc-area">
						<span class="sub-text">바이오더마 포마드 -  <small>Cicabio Pommade</small></span>
						<img src="./images/title_image.png" alt="" class="neon-title">
						<img src="./images/title_on_image.png" alt="" class="neon-on-title">
						<span class="desc1">불만족스러웠던 기존의 시카 제품들!</span>
						<span class="desc2">바이오더마의 특허 다프 성분과 안탈지신 기술이 담긴<br>포마드로 A/S 받으세요!</span>
					</div>
					<div class="btn-area">
						<button type="button" class="give" onclick="go_link('sub.php')">무료 A/S 받기</button><br>
						<button type="button" class="find" onclick="go_link('info.php')">시카 A/S 알아보기</button>
					</div>
					<div class="goods-area">
						<img src="./images/goods_img.png" alt="">
                    </div>
<?
    include_once "share_area.php";
?>                    
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
	<script>
		$(window).on('load', function() {
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

			//		getNoticeInfo('0');
		});
		//		var $noticeWrap = $('.notice-wrap .inner');
		//		var $noticeSpan = $('.notice-wrap span');
		//		function getNoticeInfo(time) {
		//			var time = time || 20000;
		//			setTimeout(function() {
		//				//					가장 최근 참여자 1명 뽑아와서 전광판에 뿌린 후 애니메이션
		//				//					애니메이션 끝나고 반복
		//				$.ajax({
		//					type:"POST",
		//					data:{
		//						"exec"				: "notice_get_member",
		//					},
		//					url: "./main_exec.php",
		//					success: function(response){
		//						var data = $.parseJSON(response);
		//						var idx = data.idx,
		//							name = data.mb_name,
		//							targetPoint = $noticeWrap.outerWidth() + Math.abs(($(window).width() - $noticeWrap.outerWidth()));
		////							console.log(targetPoint);
		//						if (response != "N")
		//						{
		//							$noticeSpan.html('기존 시카 제품에 불만족을 느끼신 '+'<b>'+idx+'번째 '+name+' 고객님</b> 께서 포마드로 A/S받으셨습니다');
		//							TweenMax.to($noticeWrap, 19, {x: -(targetPoint*2), ease:Linear.easeNone, onComplete: resetAnimation});
		//						}
		//					}
		//				});
		//				getNoticeInfo();
		//			}, time);
		//		}
		//		function resetAnimation() {
		//			TweenMax.set($noticeWrap, {clearProps: "all"});
		//		}
	</script>
</body>
</html>