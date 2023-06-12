// slide menu 
$('div.top_nav_wrap ul.gnb > li').mouseenter(()=>{
  $('div.top_nav_wrap ul.gnb > li > ul').stop().slideDown();
});
$('div.top_nav_wrap ul.gnb > li').mouseleave(()=>{
  $('div.top_nav_wrap ul.gnb > li > ul').stop().slideUp();
});

// toggle menu
$('div.header__toggle_button').click(()=> {
  $('div.header__toggle_menu').show();
});
$('div.header__toggle__close__button').click(()=> {
  $('div.header__toggle_menu').hide();
});