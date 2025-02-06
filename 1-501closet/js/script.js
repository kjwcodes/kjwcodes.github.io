$(function () {
  // 참조하는 요소 탐색
  const $sidebar = $('#header > aside');
  const $imageList = $('#image-slide > ul');
  const $html = $('html');
  const $window = $(window);
  const $document = $(document);
  const $newGoods = $('#new');
  const $bestGoods = $('#best');
  const INTERVAL = 4000;

  // 요소를 클릭하여 aside 나타나게 함
  $('#header > div > button').on('click', function () {
    $sidebar.css('left', 0);
  });

  // aside 요소를 화면 왼쪽으로 숨김
  $('#header > aside > button').on('click', function () {
    $sidebar.removeAttr('style');
  });

  // #top 요소의 click 이벤트 핸들러
  $('#top').on('click', function (event) {
    event.preventDefault();
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  });

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

  // 다음 이미지로 이동
  $('#next').on('click', slideImage);

  // 이전 이미지로 이동
  $('#pre').on('click', function () {
    $imageList.prepend($imageList.children(':last'))
      .css('margin-left', '-100%').animate({ marginLeft: 0 });
  });

  // 이미지 슬라이드 기능
  function slideImage() {
    $imageList.animate({ marginLeft: '-100%' }, function () {
      $(this).removeAttr('style').children(':first').appendTo(this);
    });
  }

  // 특정 요소가 뷰포트 안에 있는지 확인하는 함수
  function isInViewport($element) {
    const rect = $element[0].getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < windowHeight && rect.bottom > 0;
  }

  // 스크롤 이벤트 핸들러
  function handleScroll() {
    if (isInViewport($newGoods)) {
      $newGoods.addClass('visible');
    } else {
      $newGoods.removeClass('visible');
    }

    if (isInViewport($bestGoods)) {
      $bestGoods.addClass('visible');
    } else {
      $bestGoods.removeClass('visible');
    }
  }

  // 스크롤 이벤트 등록
  $window.on('scroll', handleScroll);

  // 초기 로드 시 실행
  handleScroll();
});
