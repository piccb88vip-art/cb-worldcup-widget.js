/* WORLD CUP HOLDER ONLY - DESKTOP + MOBILE */
.c-ptpKx{
  position:relative!important;
  overflow:hidden!important;
  background:url("https://plcl.me/images/D4vzY.jpg") center center/cover no-repeat!important;
}

/* Matikan background biru bawaan, tapi logo/icon tetap aman */
.c-ptpKx img[alt="header-bg"]{
  display:none!important;
}

/* Biar menu tetap kebaca */
.c-ptpKx:before{
  content:"";
  position:absolute;
  inset:0;
  background:rgba(0,0,0,.18);
  pointer-events:none;
  z-index:0;
}

.c-ptpKx > *{
  position:relative!important;
  z-index:1!important;
}

/* Desktop */
@media(min-width:992px){
  .c-ptpKx{
    min-height:72px!important;
  }
}

/* Mobile */
@media(max-width:991px){
  .c-ptpKx{
    min-height:60px!important;
    background-position:center center!important;
  }
}
