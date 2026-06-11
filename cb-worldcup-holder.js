(function(){
  var DESKTOP_IMG = "https://plcl.me/images/D4vzY.jpg";
  var MOBILE_IMG  = "https://plcl.me/images/uTQCo.jpg";

  function applyHolder(){
    var img = window.innerWidth <= 991 ? MOBILE_IMG : DESKTOP_IMG;

    var els = Array.from(document.querySelectorAll("div, nav, header, section"));

    var target = els.find(function(el){
      var text = (el.innerText || "").toLowerCase();
      var r = el.getBoundingClientRect();

      return (
        r.top >= 40 &&
        r.top <= 190 &&
        r.width > 300 &&
        r.height >= 45 &&
        r.height <= 130 &&
        text.includes("beranda") &&
        text.includes("slot")
      );
    });

    if (!target) return;

    target.style.setProperty("background", 'url("' + img + '") center center / cover no-repeat', "important");
    target.style.setProperty("overflow", "hidden", "important");
    target.style.setProperty("position", "relative", "important");
  }

  applyHolder();
  setTimeout(applyHolder, 500);
  setTimeout(applyHolder, 1500);
  window.addEventListener("resize", applyHolder);
})();
