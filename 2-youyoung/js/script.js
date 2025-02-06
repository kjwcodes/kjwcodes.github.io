$(document).ready(function () {
  let currentIndex = 0; // 현재 섹션 인덱스
  const scroll = document.getElementById("scroll");

  window.addEventListener(
    "wheel",
    function (event) {
      if (event.deltaY > 0) {
        // 아래로 스크롤
        if (currentIndex < 3) {
          currentIndex++;
        }
      } else {
        // 위로 스크롤
        if (currentIndex > 0) {
          currentIndex--;
        }
      }
      // 섹션 이동
      scroll.style.transform = `translateX(${currentIndex * -100}vw)`;

      // 기본 스크롤 방지
      event.preventDefault();
    },
    { passive: false } // passive 옵션 설정
  );
});


$(function () {
  const $imageList = $('#image-slide > ul');
  const INTERVAL = 3000;

  // 이미지 슬라이드 타이머 설정
  let timerID = window.setInterval(slideImage, INTERVAL);

  // 슬라이드 영역에 마우스 이벤트 처리
  $imageList.parent().on({
    mouseenter: function () {
      window.clearInterval(timerID);
    },
    mouseleave: function () {
      timerID = window.setInterval(slideImage, INTERVAL);
    }
  });

  // 이미지 슬라이드 기능
  function slideImage() {
    $imageList.animate({ marginLeft: '-100%' }, function () {
      $(this).removeAttr('style').children(':first').appendTo(this);
    });
  }
})