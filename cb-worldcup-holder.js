(function(){
  var DESKTOP_IMG = "https://plcl.me/images/CzPMv.jpg";
  var MOBILE_IMG  = "https://plcl.me/images/ZasMs.jpg";

  function applyHolder(){
    var isMobile = window.innerWidth <= 991;
    var img = isMobile ? MOBILE_IMG : DESKTOP_IMG;

    var els = Array.from(document.querySelectorAll("div, nav, header, section"));

    var target = els.find(function(el){
      var text = (el.innerText || "").toLowerCase();
      var r = el.getBoundingClientRect();

      if(isMobile){
        return (
          r.top >= 0 &&
          r.top <= 260 &&
          r.width >= 250 &&
          r.height >= 35 &&
          r.height <= 180 &&
          (
            text.includes("daftar") ||
            text.includes("masuk") ||
            text.includes("beranda") ||
            text.includes("promosi") ||
            el.querySelector("button") ||
            el.querySelector("img")
          )
        );
      }

      return (
        r.top >= 40 &&
        r.top <= 220 &&
        r.width > 700 &&
        r.height >= 45 &&
        r.height <= 150 &&
        (
          text.includes("beranda") ||
          text.includes("slot") ||
          text.includes("casino") ||
          text.includes("promosi")
        )
      );
    });

    if(!target) return;

    target.style.setProperty("background", 'url("' + img + '") center center / cover no-repeat', "important");
    target.style.setProperty("overflow", "hidden", "important");
    target.style.setProperty("position", "relative", "important");
    target.style.setProperty("background-color", "transparent", "important");

    target.querySelectorAll('img[alt="header-bg"]').forEach(function(imgEl){
      imgEl.style.setProperty("display", "none", "important");
    });
  }

  function run(){
    applyHolder();
    setTimeout(applyHolder, 300);
    setTimeout(applyHolder, 800);
    setTimeout(applyHolder, 1500);
    setTimeout(applyHolder, 3000);
  }

  run();

  window.addEventListener("load", run);
  window.addEventListener("resize", run);
  window.addEventListener("hashchange", run);
  window.addEventListener("popstate", run);

  document.addEventListener("click", function(){
    setTimeout(run, 300);
    setTimeout(run, 1000);
  }, true);

  new MutationObserver(function(){
    run();
  }).observe(document.body, {
    childList: true,
    subtree: true
  });
})();
