// ctrl + alt + f for quick formatter

var About = {

  togglePanels: function() {
    var switcherLink = $("#panel_switcher"),
        firstPanel = $(".first_panel"),
        secondaryPanels = $(".secondary_panels");

    switcherLink.on("click", function(e) {
      e.preventDefault();
      firstPanel.hide();
      secondaryPanels.show();
    });        
  },

};

var Navigation = {

  setCurrentNav: function() {
    var url = location.pathname,
        all_links = $('#top_bar ul li'),
        current_link = $('#top_bar ul li a[href$="' + url + '"]'),
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