// ctrl + alt + f for quick formatter

var Notice = {

    loginPage: function() {
      $("#login_notice").overlay({
        top: 35,
        expose: {
        color: '#000',
        loadSpeed: 200,
        opacity: 0.2
      },
      // disable this for modal dialog-type of overlays
      closeOnClick: false,
      
      load: true
    });
  }

};

var Forms = {

  initForms: function(chargeAmount){
    Forms.validateSignupForm(chargeAmount);
    Forms.selectInternational();
    Forms.addSpecialCodeButton();
    Forms.paymentMethodRadioSelect();
    Forms.codeCheckBoxes();
  },

  validateSignupForm: function(chargeAmount) {
    $("#new_subscription").ketchup();
    $("input[type='submit']", "#new_subscription").click(function(e) {
        if( $('#new_subscription').ketchup("isValid") ) { 
          Gateway.formSubmit(chargeAmount);
        };
    });
  },

  validateFreePdf: function() {
    $("#new_email_list").ketchup();
    $("input[type='submit']", "#new_email_list").click(function(e) {
        if( $('#new_email_list').ketchup("isValid") ) { 
          
        };
    });
  },

  codeCheckBoxes: function() {
    var checkBoxWrap = $("#code_buttons"),
        codeSections = $(".code_section"),
        checkBoxes = checkBoxWrap.find(":checkbox");

    checkBoxes.on("click", function() {
      var visibleSection = $("#" + $(this).val());

      if ($(this).hasClass("is_visible")) {
        $(this).attr('checked', false);
        visibleSection.hide();
        $(this).removeClass("is_visible");
      } else {
        checkBoxes.removeClass("is_visible")
        codeSections.hide();
        checkBoxes.attr('checked', false);
        $(this).attr('checked', true);
        $(this).addClass("is_visible");
        visibleSection.show();
      }
    });
  },
  
  paymentMethodRadioSelect: function() {
    var radioButtons = $(".payment_method");

    radioButtons.click(function() {
      var ccFields = $("#credit_card_fields"),
          directBilling = $('#direct_billing'),
          paymentHeader = $("#payment_header"),
          billingFirstName = $("#billing_first_name"),
          billingLastName = $("#billing_last_name");

      if ($(this).val() === "direct") {
        ccFields.hide();
        directBilling.val(true);
        paymentHeader.html("Contact Information");
        billingFirstName.html("First Name");
        billingLastName.html("Last Name");
      } else {
        ccFields.show();
        directBilling.removeAttr("value");
        paymentHeader.html("Payment Information");
        billingFirstName.html("Billing first name");
        billingLastName.html("Billing last name");
      }

    });
  },

  selectInternational: function() {
    var intCheckbox = $("#international"),
        stateSelect = $("#subscription_billing_address_state");
        
    intCheckbox.on("click", function() {
      if ($(this).is(':checked')) {
        stateSelect.val("INT");
      } else {
        $(this).attr('checked', false);
        stateSelect.val("");
      }
    });
  },
  
  addSpecialCodeButton: function () {
    var formBlock = $("#special_code");

    formBlock.append("<div class='field inline_field no_label'><a href='' id='code_check' class='button purple_button'>Apply Code</a></div>");
    formBlock.append("<div id='code_response'></div>");
    Forms.checkForUsedSpecialCode();
  },
  
  checkForUsedSpecialCode: function() {
    var button = $("#code_check"),
        codeResponseBlock = $("#code_response"),
        ccFields = $("#credit_card_fields"),
        sidebarPrice = $(".plan_price"),
        code = $("#special_discount_code"),
        directBilling = $('#direct_billing');
    
    button.click(function(e) {
      e.preventDefault();

      codeResponseBlock.html("");
      
      if (code.val() === "") {
        codeResponseBlock.append("<p class='red injected'>Not a valid code. Please try again.</p>");
      } else {
        $.ajax({
          url: "/special-code-check",
          data: {discount_code:code.val()},
          dataType: "json",
          success: function(response) {
            if (response == null || response.activated === true) {
              codeResponseBlock.append("<p class='red'>Invalid Code. Please try again.</p>");
            } else {
              ccFields.remove();
              codeResponseBlock.append("<p class='green injected'>Discount Applied. Total Cost $0.00</p>");
              sidebarPrice.html("$0.00");
              directBilling.val(true);
            }
          },
          error: function(response) {
            codeResponseBlock.append("<p class='red'>Invalid Code. Please try again.</p>");
          }
        });
      }
      
    });
  }
};

var Login = {

  toggleLoginForm: function() {
    var loginToggle = $("#login_toggle a"),
        notAText = $("#login_toggle span");

    loginToggle.click(function(e) {
      var toggleType = $(this).html(),
          studentForm = $("#student_login"),
          teacherForm = $("#teacher_login");

      if (toggleType === "Teacher Login") {
        studentForm.hide();
        teacherForm.show();
        $(this).html("Student Login");
        notAText.html("Teacher");
      } else {
        studentForm.show();
        teacherForm.hide();
        $(this).html("Teacher Login");
        notAText.html("Student");
      }
      e.preventDefault();
    });

  }
};

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

var Demo = {
  
  initDemo: function() {
    Demo.launchDemo();
  },

  launchDemo: function() {
    var demoLink = $("#demo_button a");
        playerWrapper = $("#game_window"),
        playerWindow = playerWrapper.find("#inserted_game");

    demoLink.click(function(e) {
      e.preventDefault();
      var closeLink = '<a class="close_link circle_close" href="">Close</a>',
          flashvars = {session_id: "<%= request.session_options[:id] %>"},
          params = {
            // base: "http://flash.kosjourney.com/"
            base: "/game/"
          },
          attributes = {};
    
      swfobject.embedSWF("http://flash.kosjourney.com/KOsJourneyDemo.swf", "inserted_game", "800", "600", "9.0.0", "expressInstall.swf", flashvars, params, attributes);
      // swfobject.embedSWF("http://flash.kosjourney.com/<%= params[:id] %>.swf", "game", "1024", "768", "9.0.0", "expressInstall.swf", flashvars, params, attributes);
      playerWrapper.append(closeLink);
      playerWindow.slideDown();
      playerWrapper.expose({
        color: '#000',
        loadSpeed: 200,
        opacity: 0.95,
        closeOnClick: false
      });
      Demo.closeWindow(playerWrapper, playerWindow);
    });
  },

  closeWindow: function(playerWrapper, playerWindow) {
    var closeLink = $("a.close_link");

    closeLink.live("click", function(e) {
      playerWrapper.html("");
      playerWrapper.append(playerWindow);
      $.mask.close();
      e.preventDefault();
    });
  }
};

var Gateway = {
  
  formSubmit: function(chargeAmount){
    $("#new_subscription").submit(function(event) {
      var submitButton = $(this).find(".submit-button"),
          actionsDiv = $(this).find(".actions"),
          directBilling = $(this).find("#direct_billing");

          $("#submit_error_message").remove();
          $(".actions p").remove();

        if (directBilling.val() === "") {
          event.preventDefault();
          Gateway.stripeVerify($(this), chargeAmount);
          $(".actions").append(Ajax.ajaxIcon);
          submitButton.attr("disabled", "disabled");
          submitButton.addClass("disabled");
        }
    });
  },

  stripeVerify: function(stripeForm, chargeAmount) {
    var self = stripeForm,
        cardNumber = self.find("#credit_card_card_number").val(),
        cardCvc = self.find("#credit_card_verification_value").val(),
        cardMonth = self.find("#credit_card_month").val(),
        cardYear = self.find("#credit_card_year").val(),
        amount = (chargeAmount * 100); // Stripe expects amount to be in cents

      if (cardNumber.length) {
          // Submit Values to Stripe for auth
          Stripe.createToken({
            number: cardNumber,
            cvc: cardCvc,
            exp_month: cardMonth,
            exp_year: parseInt(cardYear)
          }, amount, Gateway.stripeResponseHandler);
      } else {
        return false;
      }

  },

  stripeResponseHandler: function(status, response) {
    if (status == 200) {
      $('#subscription_stripe_card_token').val(response.id)
      $('#new_subscription')[0].submit();
    } else {
      //$('#error_message').text(response.error.message);
      $('.submit-button').attr('disabled', false);
      $('.submit-button').removeClass('disabled');
      $(".actions p").remove();
      $(".actions").append("<div id='submit_error_message' class='red'>" + response.error.message + "</div>");
    }
  }
};

var VidPlayer = {
  
  triggerScottsVideo: function() {
    $f("product_video", "/flowplayer/flowplayer-3.2.7.swf", {
      clip: {
        url: 'https://d2t6ykm9w9thh.cloudfront.net/11_02_Night_F6_Md_1.f4v',
        autoPlay: true,
        autoBuffering: true
      },
      plugins: {
        controls: {
          url: '/flowplayer/flowplayer.controls-3.2.5.swf',
          playlist: false,
          backgroundColor: '#000', 
          height: 18,
          time: false,
          fullscreen: true,
          volume: false,
          bufferColor: '#666666',
          buttonColor: '#666666',
          tooltips: {
            buttons: true, 
            fullscreen: 'Fullscreen' 
          } 
        }
      }
    });
    $f(0).play();
  }
};

//**********Initialize Document**********//
$(document).ready(function() {
  Ajax.ajaxStatus();
  Navigation.setCurrentNav();
});