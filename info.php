<?
    include_once "head.php";
?>
<body>
    <div class="container">
        <div class="content info">
            <div class="header-wrap">
                <div class="inner">
                    <h1>
                        <a href="index.php" onclick="gtag('event','click',{'event_label':'로고','event_category':'header'});">
                            <img src="./images/logo.png" alt="로고">
                        </a>
                    </h1>
<?
    include_once "share_area.php";
?>                    
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
                    <div class="sub-title">
                        <span>BIODERMA Cicabio Pommade</span>
                    </div>
                    <div class="title">
                        <img src="./images/info_title.png" alt="">
                        <img src="./images/info_title_on.png" alt="" class="neon-on-title">
                    </div>
                    <div class="desc-title">
                        <span>단 3주 동안만 진행되는 포마드 특별 A/S</span>
                    </div>
                    <div class="event-date">
                        <span>2018. 10. 14  –  2018. 11. 05</span>
                    </div>
                    <div class="sale-image">
                        <div class="sale-text">
                            <img src="./images/info_sale_text.png" alt="">
                        </div>
                        <div class="store">
                            <img src="./images/info_store.png" alt="">
                        </div>
                    </div>
                    <div class="desc-text">
						<p class="top-desc">자사몰 및 일부 올리브영 매장에서 빠르게 A/S를 경험해보세요!</p>
                        <p>기존 시카 제품의 불만족스러운 부분을 개선해주는 포마드는</p>
						<p>자사몰 및 전국 올리브영 매장 바이오더마 코너에서 만나 보실 수 있습니다</p>
                    </div>
                    <div class="btn-area">
                        <a href="http://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000117811&dispCatNo=1000001000100010004" target="_blank"  onclick="gtag('event','click',{'event_label':'포마드A/S경험하기','event_category':'info'});">
                       <!-- <a href="sub.php" onclick="gtag('event','click',{'event_label':'포마드A/S경험하기','event_category':'info'});"> -->
                            <button type="button">포마드로 A/S 경험하기</button>
                        </a>
                    </div>
                    <div>
                        <img src="./images/info_product.png" alt="" style="display: block; margin: 0 auto;">
                    </div>
<?
    // include_once "share_area.php";
?>                    
                </div>
            </div>
            <div class="footer-wrap">
                <div class="inner">
					<p><a href="http://www.bioderma.co.kr/page/brand_philosophy.php?utm_source=pommade-as&utm_medium=link&utm_campaign=by-pommade&utm_content=btn-footer-brand" target="_blank" onclick="gtag('event','click',{'event_label':'바이오더마소개','event_category':'footer'});"><b>바이오더마 소개</b></a> | <a href="http://www.bioderma.co.kr/front/board.php?bbs_id=notice&utm_source=pommade-as&utm_medium=link&utm_campaign=by-pommade&utm_content=btn-footer-notice" target="_blank" onclick="gtag('event','click',{'event_label':'온라인고객센터','event_category':'footer'});"><b>온라인 고객센터</b></a></p>
					<p>나오스코리아 유한회사 | 대표: 장이브데모트 | 사업자등록번호: 214-88-79685 <a href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=&apv_perm_no=2015321015330200215">(사업자정보확인)</a></p>
                    <p>주소: 서울특별시 서초구 서초중앙로 138 우림빌딩 7층 나오스코리아 유한회사 | 개인정보책임자: 김민정</p>
                    <p>고객 센터: 02-523-7676 | 통신판매업신고번호: 2015-서울서초-0215 | E-MAIL: bioderma@bioderma.kr</p>
                    <p>©2018  BIODERMA.  ALL RIGHT RESERVED.</p>
                </div>
            </div>
        </div>
    </div>
    <script>
    $(window).on('load', function() {
        var tl = new TimelineMax();
        tl.to($(".neon-on-title"), 0.3, {alpha:0, repeatDelay:0.3, repeat:-1, yoyo:true})
        tl.play();
    });
    </script>
</body>
</html>