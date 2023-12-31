$(document).ready(function(){

  // 이미지슬라이드(좌우, 우좌)
  setInterval(function(){
    $('div.slide ul').animate({
      left:"-1200px"
    },600, function(){
      $('div.slide ul').append($('div.slide ul li').eq(0))
      $('div.slide ul').css({left : 0});
    });
  
  },3000);
  
   


  $('div.header_wrap div.header_menu').click(function(){
    $('div.slide_menu div.nav_wrap div.nav').animate({
      left:"-10px" , top:"0"
      },300);
    });
  $('div.slide_menu div.nav_wrap div.nav').click(function(){
    $('div.slide_menu div.nav_wrap div.nav').fadeOut({
      left:"-1000px" , top:"0"
      },3000);
    });  






  });