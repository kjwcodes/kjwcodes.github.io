document.addEventListener("DOMContentLoaded", () => {
  // 요소 선택
  const targets = [
    { elements: document.querySelectorAll("#right2-box > div"), offset: 0, type: "page2" },
    { elements: document.querySelectorAll("#mbti > div > div > div"), offset: 0, type: "progressBar" },
    { elements: document.querySelectorAll(".closet-explain"), offset: 0, type: "closetMain" },
    { elements: [document.querySelector("#closet-sub-cen > div")], offset: 100, type: "closetSub" },
    { elements: [document.querySelector("#youyoung-main > div > div")], offset: 0, type: "youyoungMain" },
    { elements: [document.querySelector("#youyoung-sub > div > div")], offset: 100, type: "youyoungSub" },
  ];

  // Intersection Observer 생성 및 반복복
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const targetType = entry.target.dataset.type;   // 데이터타입지정
      const isVisible = entry.isIntersecting; // 교차하는지 확인인
      

      // 각 요소 타입에 따른 처리
      switch (targetType) {
        case "page2":
          entry.target.style.transition = "all 1.5s ease";
          entry.target.style.opacity = isVisible ? "1" : "0";
          entry.target.style.right = isVisible ? "0" : "-100%";
          break;
        case "progressBar":
          entry.target.style.transition = isVisible ? "width 1s ease-out" : "none";
          entry.target.style.width = isVisible ? `calc(100% * ${getComputedStyle(entry.target).getPropertyValue("--progress")})` : "0";
          break;
        case "closetMain":
        case "closetSub":
          entry.target.style.transition = "all 2s ease";
          entry.target.style.opacity = isVisible ? "1" : "0";
          break;
        case "youyoungMain":
          entry.target.style.transition = "all 1s ease";
          entry.target.style.opacity = isVisible ? "1" : "0";
          break;
        case "youyoungSub":
          entry.target.style.transition = "all 1s ease";
          entry.target.style.opacity = isVisible ? "1" : "0";
          break;
      }
    });
  }, {
    root: null, // 뷰포트를 기준으로 출력력
    rootMargin: "0px", // 추가 마진 없음
    threshold: 0, // 요소가 조금이라도 보이면 콜백 실행
  });

  // 각 타겟 요소에 데이터 속성 추가 및 옵저버 등록 및 반복
  targets.forEach((targetGroup) => {
    targetGroup.elements.forEach((element) => {
      if (element) {
        element.dataset.type = targetGroup.type;
        observer.observe(element);
      }
    });
  });
});



/* split */
$(document).ready(function () {
  const $mainContainer = $(".page");
  const $container = $("#split-page"); // #split-page 컨테이너 요소
  const $contents = $(".content"); // 모든 .content 요소

  // 왼쪽 버튼 클릭 시
  $("#left").on("click", function (e) {
    e.preventDefault();
    $mainContainer.css("display","none"); // 메인 페이지 숨기기
    $("#top").hide(); // top 버튼튼 숨기기
    $('.split-left-page').fadeIn().css("display", "flex"); // 왼쪽 페이지 표시
    $("html, body").scrollTop(0);
  });

  // 오른쪽 버튼 클릭 시
  $("#right").on("click", function (e) {
    e.preventDefault();
    $mainContainer.css("display", "none"); // 메인 페이지 숨기기
    $("#top").hide(); // top 버튼튼 숨기기
    $("body").css("background-color","#b8a995"); // body 색상 변경경
    $(".split-right-page").fadeIn().css("display", "flex"); // 오른쪽 페이지 표시
    $("html, body").scrollTop(0);
  });

  // 돌아가기 버튼 클릭 시
  $(".back-btn").on("click", function (e) {
    e.preventDefault();
    $contents.hide(); // 모든 Split 페이지 숨기기
    $mainContainer.css("display", ""); // 메인 페이지 표시
    // $mainContainer.css("display", "flex");
    $("#top").show();
    $("body").css("background-color","#2d2d2f");
    const move = $container.offset().top;
    $(window).scrollTop(move);
    // → 3번째 페이지로 가려면 어떻게 해야할까? 
  });
});



/* left conetent page */
$(document).ready(function () {
  // 모든 .image-wrapper 선택
  const $wrappers = $('.image-wrapper');

  $wrappers.each(function () {
    const $wrapper = $(this); // 현재 wrapper
    const $images = $wrapper.children('li');

    const imageWidth = 300; // 이미지 너비 (걍 어차피 300px 이니까 300으로 설정하자)
    const marginRight = $(window).width() * 0.15; // 이미지 간격 (15vw); 10vw로 했었는데 1번 image-wrapper가 살짝 잘림...ㅠ
    const totalWidth = $images.length * (imageWidth + marginRight); // 전체 너비
    const speed = 10 / $images.length ; // 속도

    let currentX = 0; // 초기 위치


    // 애니메이션 함수
    function animate() {
      currentX -= speed;

      if (currentX <= -imageWidth - marginRight) {
        const $firstItem = $wrapper.children('li').first();
        $wrapper.append($firstItem); // 첫 번째 li를 마지막으로 이동
        currentX += imageWidth + marginRight; // 위치 보정
      }

      $wrapper.css('transform', `translateX(${currentX}px)`);
      requestAnimationFrame(animate);
    }

    animate();
  });
});




/* top 버튼 */
$(document).ready(function () {
  const $topBtn = $("#top");

  // Top 버튼 클릭 시 화면을 맨 위로 스크롤
  $topBtn.on("click", function (e) {
    e.preventDefault(); // 기본 동작(페이지 이동) 방지
    $("html, body").animate({ scrollTop: 0 }, 300); // 100ms 동안 부드럽게 스크롤
  });
});
