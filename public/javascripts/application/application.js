// ctrl + alt + f for quick formatter
var Navigation = {

  setCurrentNav: function() {
    var url = location.pathname,
        all_links = $('ul#main_nav li'),
        current_link = $('ul#main_nav li a[href$="' + url + '"]'),
        active_link = current_link.parent("li");

    if (url == "/") {
      all_links.removeClass('active');
      $('.home').addClass('active');
    } else {
      all_links.removeClass('active');
      active_link.addClass('active');
    }
  }
};



//**********Initialize Document**********//
$(document).ready(function() {
  Navigation.setCurrentNav();
});