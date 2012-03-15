var Navigation = {

  setCurrentNav: function() {
    var url = location.pathname,
        all_links = $('ul.main_nav li'),
        current_link = $('ul.main_nav li a[href$="' + url + '"]'),
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

var Admin = {

	initAdminScripts: function() {
		Admin.setDatatables();
		Admin.videoApproval();
		Admin.editUserVideo();
		Admin.setupDiscountForm();
	},

	videoApproval: function() {
		var approvalLinks = $(".approval_link");

		approvalLinks.on("click", function(e) {
			e.preventDefault();
			var self = $(this),
					param = self.text(),
					url = self.attr("href");

			$.ajax({
				url: url,
				type: "PUT",
				data: {"approval_type": param},
				success: function(response) {
					if(param === "approve") {
						self.text("unapprove");
					} else {
						self.text("approve")
					}
				},
				error: function(response, text, message) {
					var errorMessage = text + " - " + message;
        	Modal.loadModal(errorMessage);
				}

			});

		});
	},

	editUserVideo: function() {
		var editLink = $(".edit_user_video");

		editLink.on("click", function(e) {
			e.preventDefault();
			var url = $(this).attr("href");

			$.ajax({
				url: url,
				success: function(response) {
					Modal.loadModal(response);
				},
				error: function(response, text, message) {
					alert(text + " " + message);
				}
			});

		});
	},

	setupDiscountForm: function() {
		var trigger = $("#form_toggle");
				
		trigger.click(function(e) {
			e.preventDefault();
			var formBlock = $("#new_codes");
			
			formBlock.slideToggle();
			
		});
	},

	setDatatables: function() {
    var tables = $("table");

    tables.dataTable({
      "fnDrawCallback": function () {
        Admin.videoApproval();
      },
      "bJQueryUI": true,
      "bDeferRender": true,
      "sPaginationType": "full_numbers"
    });
  }
};

$(document).ready(function() {
	Admin.initAdminScripts();
	Navigation.setCurrentNav();
});