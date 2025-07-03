// 글 목록 페이지인지 확인 (배너 숨김용)
function isListPage() {
  const body = document.body;

  // 1. 명확한 글 목록 페이지 클래스들만 확인 (blog 클래스 제외)
  const listPageClasses = [
    "home",
    "archive",
    "category",
    "tag",
    "search",
    "author",
  ];

  const hasListClass = listPageClasses.some((className) =>
    body.classList.contains(className)
  );

  // 2. 단일 포스팅 페이지 클래스 확인
  const singlePostClasses = ["single-post", "single", "postid-"];

  const hasSingleClass = singlePostClasses.some(
    (className) =>
      body.classList.contains(className) ||
      Array.from(body.classList).some((cls) => cls.startsWith(className))
  );

  // 3. URL 패턴 확인
  const currentUrl = window.location.href;
  const isRootUrl =
    currentUrl === window.location.origin + "/" ||
    currentUrl === window.location.origin;

  console.log("페이지 타입 체크:", {
    url: currentUrl,
    bodyClasses: Array.from(body.classList),
    hasListClass: hasListClass,
    hasSingleClass: hasSingleClass,
    isRootUrl: isRootUrl,
    isListPage: hasListClass || (isRootUrl && !hasSingleClass),
  });

  // 목록 페이지 클래스가 있거나, 루트 URL이면서 단일 포스팅 클래스가 없으면 목록 페이지
  return hasListClass || (isRootUrl && !hasSingleClass);
}

// 글 목록 페이지이면 스크립트 종료
if (isListPage()) {
  console.log("🚫 쿠팡 배너: 글 목록 페이지이므로 배너를 표시하지 않습니다.");
  return;
}

console.log("✅ 쿠팡 배너: 단일 포스팅 페이지이므로 배너를 표시합니다.");

// 현재 시간(초 단위) 가져오기
function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000);
}

// 최초 방문 시 시간 기록
let startTime = getCurrentTimestamp();

// 10초 후 자동으로 변수 대입하는 함수
function checkTimeAndUpdate() {
  let currentTime = getCurrentTimestamp();
  let limit_time = 10; // 10초 후 실행

  if (currentTime - startTime >= limit_time) {
    // 변수 업데이트
    // 링크 이동 url
    slide_target_url_nmd = slide_target_url_main;

    // console.log(slide_target_url_nmd); // 확인용
    clearInterval(interval); // 반복 중지
  }
}

// 1초마다 체크하여 10초 후 자동 업데이트
let interval = setInterval(checkTimeAndUpdate, 1000);

// 포스팅 글에만 배너가 나오도록 설정
let paragraphs = document.querySelectorAll(".entry-content p");

let paragraphCount = paragraphs.length;

let slide_arrow_svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19L8 12L15 5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

let slide_bubble_svg = `<svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 5C5 2.23858 7.23858 0 10 0H70C72.7614 0 75 2.23858 75 5V20C75 22.7614 72.7614 25 70 25H15L5 35V5Z" fill="#DC2626"/>
</svg>`;

let slide_point_nmd =
  typeof location_numer_nmd !== "undefined"
    ? Math.floor(paragraphCount * location_numer_nmd)
    : undefined;
let slide_point_nmd_2a =
  typeof location_numer_nmd_2a !== "undefined"
    ? Math.floor(paragraphCount * location_numer_nmd_2a)
    : undefined;
let slide_point_nmd_3a =
  typeof location_numer_nmd_3a !== "undefined"
    ? Math.floor(paragraphCount * location_numer_nmd_3a)
    : undefined;

let slide_bannerHTML = `
			<div>&nbsp;</div>
			<div class="banner-container-nmd" >
					<div class="slide-shop-banner-back-nmd" >
							<img src="${slide_back_img_nmd}" alt="Icon">
					</div>
					<div class="slide-shop-banner-front-nmd">
							<img class="front-img-nmd" src="${slide_front_img_nmd}" alt="Icon">

							<div class="slide-shop-banner-top-right-nmd bubble active" onclick="event.stopPropagation();">
								<div class="bubble-svg-container">${slide_bubble_svg}</div>
								<div class="bubble-txt-nmd">당겨주세요!</div>
							</div>
								
							<div class="slide-shop-banner-rightbox-nmd arw">
									<div class="slide-shop-banner-rightbox-arrow-nmd">
											<div class="arrow-svg-container">${slide_arrow_svg}</div>
									</div>
							</div>
					</div>
			</div>
			<div><br><br>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</div>
			<div>&nbsp;</div>
	`;

for (var i = 0; i < paragraphCount; i++) {
  if (
    typeof slide_point_nmd !== "undefined" &&
    i === Math.floor(slide_point_nmd)
  ) {
    var bannerWrapper = document.createElement("div");
    bannerWrapper.innerHTML = slide_bannerHTML;
    paragraphs[i].insertAdjacentElement("afterend", bannerWrapper);
  }

  if (
    typeof slide_point_nmd_2a !== "undefined" &&
    i === Math.floor(slide_point_nmd_2a)
  ) {
    const bannerWrapper = document.createElement("div");
    bannerWrapper.innerHTML = slide_bannerHTML;
    paragraphs[i].insertAdjacentElement("afterend", bannerWrapper);
  }

  if (
    typeof slide_point_nmd_3a !== "undefined" &&
    i === Math.floor(slide_point_nmd_3a)
  ) {
    const bannerWrapper = document.createElement("div");
    bannerWrapper.innerHTML = slide_bannerHTML;
    paragraphs[i].insertAdjacentElement("afterend", bannerWrapper);
  }
}

document.querySelectorAll(".banner-container-nmd").forEach((banner) => {
  const bubbleText = banner.querySelector(".bubble-txt-nmd");
  let isWhite = true;

  // Bubble text animation
  setInterval(() => {
    bubbleText.style.color = isWhite ? "grey" : "white";
    isWhite = !isWhite;
  }, 1000);

  const foreground = banner.querySelector(".slide-shop-banner-front-nmd");
  let direction = -1;
  let position = -50;
  let moveCount = 0;
  let acceleration = 0;
  let isDragging = false;
  let dragStart = 0;
  let isPaused = false;

  function animate() {
    if (!isPaused) {
      if (moveCount < 4) {
        if (direction === 1) {
          acceleration += 0.05;
          position += 1.5 + acceleration;
          if (position >= -60) {
            direction = -1;
            moveCount++;
            acceleration = 0;
          }
        } else {
          position -= 0.7;
          if (position <= -160) {
            direction = 1;
            moveCount++;
            acceleration = 0;
          }
        }
        foreground.style.left = `${position}px`;
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          moveCount = 0;
          requestAnimationFrame(animate);
        }, 1000);
      }
    }
  }

  // Mouse events
  let mouseStartX = 0;
  let mouseStartY = 0;

  foreground.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragStart = e.clientX - position;
    mouseStartX = e.clientX;
    mouseStartY = e.clientY;
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      // 상하좌우 아주 조금만 드래그해도 이동 (모바일과 동일하게)
      let deltaX = Math.abs(e.clientX - mouseStartX);
      let deltaY = Math.abs(e.clientY - mouseStartY);

      if (deltaX > 5 || deltaY > 5) {
        window.location.href = slide_target_url_nmd;
        return;
      }

      position = e.clientX - dragStart;
      position = Math.min(Math.max(position, -190), -60);
      foreground.style.left = `${position}px`;
    }
  });

  document.addEventListener("mouseup", (e) => {
    if (isDragging) {
      // 클릭으로 인식 (시작 위치와 거의 같은 위치에서 마우스업)
      let deltaX = Math.abs(e.clientX - mouseStartX);
      let deltaY = Math.abs(e.clientY - mouseStartY);

      if (deltaX <= 5 && deltaY <= 5) {
        window.location.href = slide_target_url_nmd;
      }
    }
    isDragging = false;
  });

  // Mobile touch events
  let touchStartX = 0;
  let touchStartY = 0;

  foreground.addEventListener("touchstart", (e) => {
    isDragging = true;
    const touch = e.touches[0];
    dragStart = touch.clientX - position;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    e.preventDefault();
  });

  document.addEventListener("touchmove", (e) => {
    if (isDragging) {
      const touch = e.touches[0];

      // 상하좌우 조금만 드래그해도 이동
      let deltaX = Math.abs(touch.clientX - touchStartX);
      let deltaY = Math.abs(touch.clientY - touchStartY);

      if (deltaX > 15 || deltaY > 15) {
        isDragging = false; // 드래그 비활성화

        const banners = document.querySelectorAll(".banner-container-nmd");

        if (!banners.length) return; // 배너가 없으면 함수 종료

        banners.forEach((banner, index) => {
          // 기존 오버레이 제거 후 다시 추가 (중복 방지)
          let existingOverlay = banner.querySelector(".fade-overlay");
          if (existingOverlay) existingOverlay.remove();

          // 새로운 오버레이 생성
          let fadeOverlay = document.createElement("div");
          fadeOverlay.classList.add("fade-overlay");
          Object.assign(fadeOverlay.style, {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 1)",
            zIndex: "1100",
            transition: "opacity 0.3s ease",
          });
          banner.appendChild(fadeOverlay);

          // 배너 애니메이션 효과 적용
          Object.assign(banner.style, {
            transition: "transform 0.3s ease, left 0.3s ease",
            left: `50%`, // 각 배너의 위치를 조금씩 다르게 설정
            transform: "translateX(-50%) scale(0.9)",
          });

          // 0.3초 후 오버레이 점점 사라짐 & 사이트 이동
          setTimeout(() => {
            fadeOverlay.style.opacity = "0"; // 오버레이 투명화

            setTimeout(() => {
              banner.style.transform = "translateX(-50%) scale(1)"; // 원래 크기로 복귀
              fadeOverlay.remove(); // 오버레이 제거
              if (index === 0) window.location.href = slide_target_url_nmd; // 첫 번째 배너에서만 이동 실행
            }, 300);
          }, 0);
        });
        return;
      }

      position = touch.clientX - dragStart;
      position = Math.min(Math.max(position, -190), -60);
      foreground.style.left = `${position}px`;
    }
  });

  document.addEventListener("touchend", (e) => {
    if (isDragging) {
      // 터치로 인식 (시작 위치와 거의 같은 위치에서 터치 종료)
      const touch = e.changedTouches[0];
      let deltaX = Math.abs(touch.clientX - touchStartX);
      let deltaY = Math.abs(touch.clientY - touchStartY);

      if (deltaX <= 5 && deltaY <= 5) {
        // 터치 효과와 함께 이동
        const banners = document.querySelectorAll(".banner-container-nmd");

        if (banners.length) {
          banners.forEach((banner, index) => {
            // 기존 오버레이 제거 후 다시 추가 (중복 방지)
            let existingOverlay = banner.querySelector(".fade-overlay");
            if (existingOverlay) existingOverlay.remove();

            // 새로운 오버레이 생성
            let fadeOverlay = document.createElement("div");
            fadeOverlay.classList.add("fade-overlay");
            Object.assign(fadeOverlay.style, {
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 1)",
              zIndex: "1100",
              transition: "opacity 0.3s ease",
            });
            banner.appendChild(fadeOverlay);

            // 배너 애니메이션 효과 적용
            Object.assign(banner.style, {
              transition: "transform 0.3s ease, left 0.3s ease",
              left: `50%`,
              transform: "translateX(-50%) scale(0.9)",
            });

            // 0.3초 후 오버레이 점점 사라짐 & 사이트 이동
            setTimeout(() => {
              fadeOverlay.style.opacity = "0";

              setTimeout(() => {
                banner.style.transform = "translateX(-50%) scale(1)";
                fadeOverlay.remove();
                if (index === 0) window.location.href = slide_target_url_nmd;
              }, 300);
            }, 0);
          });
        } else {
          // 배너가 없으면 바로 이동
          window.location.href = slide_target_url_nmd;
        }
      }
    }
    isDragging = false;
  });

  foreground.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  foreground.addEventListener("mouseleave", () => {
    isPaused = false;
    animate();
  });

  // Start animation
  animate();
});
