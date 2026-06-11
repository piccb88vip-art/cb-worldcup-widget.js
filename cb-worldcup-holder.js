(function(){
  if (window.innerWidth < 992) return;

  const IMG = "https://plcl.me/images/D4vzY.jpg";

  function applyHolder(){
    const els = Array.from(document.querySelectorAll("div, nav, header, section"));

    const target = els.find(el => {
      const text = (el.innerText || "").toLowerCase();
      const r = el.getBoundingClientRect();

      return (
        r.top >= 40 &&
        r.top <= 180 &&
        r.width > 700 &&
        r.height >= 50 &&
        r.height <= 120 &&
        text.includes("beranda") &&
        text.includes("slot") &&
        text.includes("casino")
      );
    });

    if (!target) return;

    target.style.setProperty("background", `url("${IMG}") center center / cover no-repeat`, "important");
    target.style.setProperty("overflow", "hidden", "important");
    target.style.setProperty("position", "relative", "important");

    target.querySelectorAll('img[alt="header-bg"]').forEach(img=>{
      img.style.setProperty("display","none","important");
    });
  }

  applyHolder();
  setTimeout(applyHolder, 800);
  setTimeout(applyHolder, 2000);
})();
