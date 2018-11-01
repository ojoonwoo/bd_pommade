<?
    include_once "../include/autoload.php";

    $mnv_f 			= new mnv_function();
   	$my_db         = $mnv_f->Connect_MySQL();
    $mobileYN      = $mnv_f->MobileCheck();
    // $obYN          = $mnv_f->BrowserCheck();
    $IEYN          = $mnv_f->IECheck();
    $SafariYN          = $mnv_f->SafariCheck();
    // print_r($_SERVER["HTTP_USER_AGENT"]);
    if ($mobileYN == "PC")
    {
        echo "<script>location.href='../index.php?media=".$_REQUEST["media"]."';</script>";
    }else{
        $saveMedia     = $mnv_f->SaveMedia();
        $rs_tracking   = $mnv_f->InsertTrackingInfo($mobileYN);
    }

    include_once "head.php";
?>
	<body>
		<div class="container">
			<div class="content main">
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
						<div class="desc-area">
							<span class="sub-text">시카비오 포마드 -  <small>Cicabio Pommade</small></span>
							<div class="title-wrap">
								<img src="./images/neon_title.png" alt="" class="neon-title">
								<img src="./images/neon_light.png" alt="" class="neon-on-title">
							</div>
							<div class="desc-wrap">
								<span class="desc desc1">바이오더마의 특허 성분과 기술이 담긴 포마드로</span>
								<span class="desc desc2">불만족스러웠던 기존의 시카 A/S 받으세요<i>!</i></span>
							</div>
						</div>
						<div class="wrap">
							<div class="btn-area">
								<button type="button" class="give" onclick="go_link('sub.php');gtag('event','click',{'event_label':'무료A/S받기','event_category':'main'});">무료 A/S 받기</button><br>
								<button type="button" class="find" onclick="go_link('info.php');gtag('event','click',{'event_label':'시카A/S알아보기','event_category':'main'});">시카 A/S 알아보기</button>
							</div>
							<div class="goods-area">
								<img src="./images/goods_img.png" alt="">
							</div>
						</div>
					</div>
				</div>
				<div class="footer-wrap">
					<div class="inner">
						<p><a href="http://www.bioderma.co.kr/page/brand_philosophy.php?utm_source=pommade-as&utm_medium=miniver-link&utm_campaign=by-pommade&utm_content=btn-footer-brand" target="_blank" onclick="gtag('event','click',{'event_label':'바이오더마소개','event_category':'footer'});"><b>바이오더마 소개</b></a> | <a href="http://www.bioderma.co.kr/front/board.php?bbs_id=notice&utm_source=pommade-as&utm_medium=miniver-link&utm_campaign=by-pommade&utm_content=btn-footer-notice" target="_blank" onclick="gtag('event','click',{'event_label':'온라인고객센터','event_category':'footer'});"><b>온라인 고객센터</b></a></p>
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
				
			});
		</script>
	</body>
</html>