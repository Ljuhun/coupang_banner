// coupang_loader.js
// 외부 JSON(allowed-domains.json)에 등록된 도메인만 배너 스크립트를 로드합니다.
(function () {
  var currentDomain = window.location.hostname;

  // 깃허브 JSON (raw.githack 경로 사용) - 필요 시 본인 레포 경로로 변경
  var jsonUrl =
    "https://raw.githack.com/Ljuhun/coupang_banner/main/allowed-domains.json";

  function normalizeHost(hostname) {
    var h = (hostname || "").toLowerCase().trim();
    if (h.indexOf("www.") === 0) h = h.slice(4);
    return h;
  }

  function isAllowed(hostname, allowedList) {
    var host = normalizeHost(hostname);
    for (var i = 0; i < allowedList.length; i++) {
      var rule = (allowedList[i] || "").toLowerCase().trim();
      if (!rule) continue;

      // 와일드카드 지원: *.example.com
      if (rule.indexOf("*.") === 0) {
        var root = rule.slice(2); // example.com
        if (
          host === root ||
          (host.length > root.length &&
            host.slice(-root.length - 1) === "." + root)
        )
          return true;
      } else {
        if (host === normalizeHost(rule)) return true;
      }
    }
    return false;
  }

  function detectPlatform() {
    // 간단 감지: 워드프레스는 전역 변수/메타태그, 티스토리는 도메인/메타태그 등
    var ua = navigator.userAgent || "";
    var hostname = (location.hostname || "").toLowerCase();
    // 워드프레스 흔적: wp-*, window.wp, generator 메타에 WordPress
    var isWordPress = !!(
      window.wp ||
      document.querySelector('link[href*="wp-"]') ||
      document.querySelector('script[src*="wp-"]') ||
      document.querySelector('meta[name="generator"][content*="WordPress"]')
    );
    // 티스토리 흔적: tistory 도메인/리소스
    var isTistory =
      hostname.indexOf("tistory.com") !== -1 ||
      !!document.querySelector('script[src*="tistory"]');

    return { isWordPress: !!isWordPress, isTistory: !!isTistory };
  }

  function loadBannerScript() {
    var platform = detectPlatform();
    var scriptUrl =
      "https://raw.githack.com/Ljuhun/coupang_banner/main/coupang_Tstory.js";
    if (platform.isWordPress && !platform.isTistory) {
      scriptUrl =
        "https://raw.githack.com/Ljuhun/coupang_banner/main/coupang_wp.js";
    }

    var s = document.createElement("script");
    s.src = scriptUrl;
    s.referrerPolicy = "no-referrer-when-downgrade";
    document.body.appendChild(s);
  }

  fetch(jsonUrl, { cache: "no-store" })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var allowedDomains = (data && data.domains) || [];
      if (!isAllowed(currentDomain, allowedDomains)) {
        console.warn(
          "\ud83d\udeab \uc774 \ub3c4\uba54\uc778(" +
            currentDomain +
            ")\uc5d0\uc11c\ub294 \ucfe0\ud321 \ubc30\ub108\uac00 \ud5c8\uc6a9\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4."
        );
        return; // 차단
      }
      loadBannerScript();
    })
    .catch(function (err) {
      console.error(
        "\ud654\uc774\ud2b8\ub9ac\uc2a4\ud2b8 JSON\uc744 \ubd88\ub7ec\uc624\ub294 \uc911 \uc624\ub958 \ubc1c\uc0dd:",
        err
      );
    });
})();
