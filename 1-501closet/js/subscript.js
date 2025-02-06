$(document).ready(function () {
  const $page3 = $("#page3");
  const $button = $("#button");
  const $sidebar = $('#header > aside');

  $button.on("click", function () {
    const fullHeight = $page3[0].scrollHeight; // 콘텐츠의 전체 높이 계산
    if ($page3.css("max-height") === `${fullHeight}px`) {
      $page3.css("max-height", "1080px"); // 기본 높이로 축소
    } else {
      $page3.css("max-height", `${fullHeight}px`); // 전체 높이로 확장
    }
  });

  // Blue, Gray, Black 
  const $blue = $(".blue");
  const $gray = $(".gray");
  const $black = $(".black");

  $("#blue-btn").on("click", function (e) {
    e.preventDefault();
    $blue.css("display", "flex");
    $gray.css("display", "none");
    $black.css("display", "none");
  });

  $("#gray-btn").on("click", function (e) {
    e.preventDefault();
    $blue.css("display", "none");
    $gray.css("display", "flex");
    $black.css("display", "none");
  });

  $("#black-btn").on("click", function (e) {
    e.preventDefault();
    $blue.css("display", "none");
    $gray.css("display", "none");
    $black.css("display", "flex");
  });

  // top btn
  $("#top").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "smooth");
  });
// add delete
$("#add-btn").on("click", function () {
  const $hm = $("#amount"); 
  const value = parseInt($hm.val());
  if (value < 9) {
    $hm.val(value + 1);
  }
});

$("#del-btn").on("click", function () {
  const $hm = $("#amount"); 
  const value = parseInt($hm.val());
  if (value > 1) {
    $hm.val(value - 1);
  }
});


  // 요소를 클릭하여 aside 나타나게 함
  $('#header > div > button').on('click', function () {
    $sidebar.css('left', 0);
  });

  // aside 요소를 화면 왼쪽으로 숨김
  $('#header > aside > button').on('click', function () {
    $sidebar.removeAttr('style');
  });
});


/* 사진 변화 */
document.addEventListener("DOMContentLoaded", () => {
  const firstListItems = document.querySelectorAll("#page1 > div:first-child > ul:first-of-type > li > img");
  const secondListItems = document.querySelectorAll("#page1 > div:first-child > ul:last-of-type > li > img");

    // 초기 상태는 모든 첫 번째 ul의 img는 opacity 1로 설정
    firstListItems.forEach((img) => {
      img.style.opacity = "1";
      img.style.transition = "opacity 0.5s ease";
    });
  
    // 두 번째 이미지를 클릭했을 때
    secondListItems.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        firstListItems.forEach((img) => {
          img.style.opacity = "0";
        });
  
        firstListItems[index].style.opacity = "1";
      });
    });
  
    // blue, gray, black 버튼 클릭했을 때에도 동일하게 적용
    document.querySelector("#blue-btn").addEventListener("click", () => {
      firstListItems.forEach((img) => {
        if (img.classList.contains("blue")) {
          img.style.opacity = "1";
        } else {
          img.style.opacity = "0";
        }
      });
    });
  
    document.querySelector("#gray-btn").addEventListener("click", () => {
      firstListItems.forEach((img) => {
        if (img.classList.contains("gray")) {
          img.style.opacity = "1";
        } else {
          img.style.opacity = "0";
        }
      });
    });
  
    document.querySelector("#black-btn").addEventListener("click", () => {
      firstListItems.forEach((img) => {
        if (img.classList.contains("black")) {
          img.style.opacity = "1";
        } else {
          img.style.opacity = "0";
        }
      });
    });
  });