/* =========================
   WORLD CUP HOLDER CB88
   ========================= */

.c-ptpKx{
  position: relative !important;
  overflow: hidden !important;
  background: url("https://plcl.me/images/D4vzY.jpg") center center / cover no-repeat !important;
}

/* Hilangkan background lama */
.c-ptpKx img[alt="header-bg"]{
  display: none !important;
}

/* Overlay tipis agar menu tetap jelas */
.c-ptpKx::before{
  content:"";
  position:absolute;
  inset:0;
  background:rgba(0,0,0,.15);
  pointer-events:none;
}

.c-ptpKx > *{
  position:relative;
  z-index:1;
}

/* Desktop */
@media (min-width:992px){
  .c-ptpKx{
    min-height:72px !important;
  }
}

/* Mobile */
@media (max-width:991px){
  .c-ptpKx{
    min-height:60px !important;
    background-position:center center !important;
  }
}
