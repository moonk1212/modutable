
$(document).ready(function(){
  $('#menu_button').click(function(){
    $('#main_sidebar').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
  }); 

  window.onscroll = function(){
    scrollFunction();
  }

  function scrollFunction() {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      $('#head_menu').removeClass('fixed');
    } else {
      $('#head_menu').addClass('fixed');
    }
  }
});
