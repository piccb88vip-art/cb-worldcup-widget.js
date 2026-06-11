(function(){
  const css = `
  .c-ptpKx{
    position:relative!important;
    overflow:hidden!important;
    background:url("https://plcl.me/images/D4vzY.jpg") center center/cover no-repeat!important;
  }
  .c-ptpKx img[alt="header-bg"]{
    display:none!important;
  }
  .c-ptpKx::before{
    content:"";
    position:absolute;
    inset:0;
    background:rgba(0,0,0,.20);
    pointer-events:none;
    z-index:0;
  }
  .c-ptpKx>*{
    position:relative!important;
    z-index:1!important;
  }
  `;
  const style=document.createElement("style");
  style.innerHTML=css;
  document.head.appendChild(style);
})();
