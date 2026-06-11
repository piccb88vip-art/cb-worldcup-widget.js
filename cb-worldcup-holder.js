(function () {
  if (window.innerWidth < 992) return;

  var css = `
    .c-ptpKx{
      position:relative!important;
      overflow:hidden!important;
      background-image:url("https://plcl.me/images/D4vzY.jpg")!important;
      background-size:cover!important;
      background-position:center center!important;
      background-repeat:no-repeat!important;
    }

    .c-ptpKx img[alt="header-bg"]{
      display:none!important;
    }
  `;

  var style = document.createElement("style");
  style.id = "cb-worldcup-holder-desktop";
  style.innerHTML = css;
  document.head.appendChild(style);
})();
