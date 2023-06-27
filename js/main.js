// slide menu 
$('.gnb ul.menu > li').mouseenter(()=>{
  $('.gnb ul.menu > li > ul').stop().slideDown();
});
$('.gnb ul.menu > li').mouseleave(()=>{
  $('.gnb ul.menu > li > ul').stop().slideUp();
});


// toggle menu
$('div.top-menu a').click(()=> {
  $('div.header__toggle_menu').show();
});
$('div.header__toggle__close__button').click(()=> {
  $('div.header__toggle_menu').hide();
});

