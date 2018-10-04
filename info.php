<?
    include_once "head.php";
?>
<body>
    <div class="container">
        <div class="content info">
            <div class="header-wrap">
                <div class="inner">
                    <h1>
                        <img src="./images/logo.png" alt="로고">
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
                        <p class="top-desc">가까운 올리브영 매장을 방문하여 빠르게 A/S를 경험해보세요!</p>
                        <p>기존 시카 제품의 불만족스러운 부분을 개선해주는 포마드는</p>
                        <p>전국 올리브영 매장 바이오더마 코너에서 만나 보실 수 있습니다</p>
                    </div>
                    <div class="btn-area">
                        <button type="button">포마드로 A/S 경험하기</button>
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
    <script>
    $(window).on('load', function() {
        var tl = new TimelineMax();
        tl.to($(".neon-on-title"), 0.3, {alpha:0, repeatDelay:0.3, repeat:-1, yoyo:true})
        tl.play();
    });
    </script>
</body>
</html>