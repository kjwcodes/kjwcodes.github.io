$(document).ready(function () {
  let currentIndex = 0; // 현재 섹션 인덱스
  const scroll = document.getElementById("scroll");
  let isScrolling = false; // 스크롤 중복 방지

  window.addEventListener(
    "wheel",
    function (event) {
      if (isScrolling) return; // 현재 스크롤 중이면 실행 방지

      isScrolling = true; // 스크롤 시작
      if (event.deltaY > 0) {
        if (currentIndex < 4) {
          currentIndex++;
        }
      } else {
        if (currentIndex > 0) {
          currentIndex--;
        }
      }

      // 섹션 이동
      scroll.style.transform = `translateX(${currentIndex * -100}vw)`;
      scroll.style.transition = "transform 0.6s ease-in-out"; 

      // 기본 스크롤 방지
      event.preventDefault();

      setTimeout(() => {
        isScrolling = false;
      }, 600);
    },
    { passive: false } // 기본 스크롤 동작을 방지하기 위한 옵션
  );
});



document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const ul = entry.target.querySelector("ul");
      const liElements = ul.querySelectorAll(":scope > li"); // 첫 번째 레벨의 li만 선택

      if (entry.isIntersecting) {
        // 리스트 항목이 개별적으로 나타나도록 설정
        liElements.forEach((li, index) => {
          setTimeout(() => {
            li.classList.add("visible");
            li.classList.remove("hidden");
          }, index * 200); // 0.2초 간격으로 순차적 등장
        });
      } else {
        // 화면에서 사라지면 다시 초기화 (첫 번째 레벨의 li만)
        liElements.forEach(li => {
          li.classList.add("hidden");
          li.classList.remove("visible");
        });
      }
    });
  }, { threshold: 0.2 }); // 20% 이상 보이면 실행

  pages.forEach(page => observer.observe(page)); // 모든 페이지 감시
});