/* 탑바 2depth */
$(document).ready(function() {
$('.gnb > li').mouseenter(function() {
  var $this = $(this);
  var $topBar = $this.closest('.header_wrap');
  var $contentBox = $topBar.find('.content-box');
  $contentBox.find(' ul > li.active').removeClass('active');
  var index = $this.index();
  var $target = $contentBox.find('> ul > li').eq(index);
  $target.addClass('active');
  var height = $target.height();
  $contentBox.css('height', height);
});

$('.header_wrap').mouseleave(function() {
  var $topBar = $(this);
  
  var $contentBox = $topBar.find('.content-box');
  $contentBox.css('height', '');
});

});