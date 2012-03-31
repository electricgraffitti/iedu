var Flash = {

  injectFlashBox: function() {
    $('#flash').addClass("flash_wrap");
    $("#flash").hide();
  },

  setFlash: function() {
    var flash_message = $("#flash").html();
    var msg = $.trim(flash_message);
    if (msg !== "") {
      Flash.activateNotice(flash_message);
    }
  },

  activateNotice: function(flash_message) {
    var flash_div = $("#flash");
    flash_div.html(flash_message);
    flash_div.show("slide", {
      direction: 'up'
    });
    // Set the fadeout
    setTimeout(function() {
      flash_div.hide("slide", {
        direction: 'up'
      },
      function() {
        flash_div.html("");
        flash_div.hide();
      });
    },
    2500);
  }
};

var Ajax = {
  
  ajaxIcon: "<p>Processing... <img src='images/ajax-loader.gif'/></p>",

  ajaxFlash: function() {
    
  },

  ajaxStatus: function() {
    var status = $("#ajax_status");

    $.ajaxSetup({
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
      }
    });

    $("body").ajaxStart(function() {
      status.show();
    });

    $("body").ajaxStop(function() {
      status.fadeOut();
    });
  }
};

var FormFuncs = {

  appendAjaxNotice: function (formElement) {
    var formSubmit = formElement.find("#user_video_submit"),
        submitWrap = formSubmit.parent();

        formSubmit.hide();
        submitWrap.append(VideoUploader.videoProcessingIcon);
  },

  checkForEmptyValue: function(formElement) {
    if (formElement.val() === "") {
      return true;
    }
  }
};

var PanelFader = {

  initPanelFader: function() {
    PanelFader.findPanels();
  },

  findPanels: function() {
    var panels = $(".fade_panel");
    PanelFader.showFirstPanel(panels);
  },

  showFirstPanel: function(panels) {
    panels.eq(0).fadeIn(2000);
    PanelFader.transitionPanels(panels);
  },

  transitionPanels: function(panels) {
    var firstPanel = panels.eq(0),
        secondPanel = panels.eq(1);

    secondPanel.delay(7000).fadeIn(2000);
    firstPanel.delay(7000).fadeOut(2000, function() {
      PanelFader.shiftPanels(panels, firstPanel);
    });
  },

  shiftPanels: function(panels, firstPanel) {
    var panelWrap = $("#fade_panel_wrap");

    firstPanel.remove();
    panelWrap.append(firstPanel);
    PanelFader.transitionPanels(panelWrap.find(".fade_panel"));
  }
};

var PanelScroller = {

  verticalScroller: function() { 
    $("#vert_scroller").simplyScroll({
      customClass: 'vert',
      orientation: 'vertical',
            auto: false,
            manualMode: 'loop',
      frameRate: 20,
      speed: 5
    });
  },
}

var PanelSwitcher = {

  defaults: {
    width: 960,
    height: 540
  },

  initPanelSwitcher: function() {
    var panelWrap = $("#vert_scroller"),
        panel = $(".panel"),
        panels = panelWrap.find("li"),
        topArrow = $('<div class="simply-scroll-back simply-scroll-btn simply-scroll-btn-up"></div>'),
        bottomArrow = $('<div class="simply-scroll-forward simply-scroll-btn simply-scroll-btn-down"></div>');


    panelWrap.append(topArrow).append(bottomArrow);
    panelWrap.css({width: PanelSwitcher.defaults.width, height: PanelSwitcher.defaults.height, overflow: "hidden"});

  }


};

var Video = {
  
  initVideos: function() {
    Video.injectPlayer();
  },

  injectPlayer: function() {
    var playerWrapper = $(".video_container"),
        videoUrl = playerWrapper.data("videourl"),
        thumbUrl = playerWrapper.data("thumburl"),
        player = Video.setupVideoPanelHtml();

    player.find("source").attr("src", videoUrl);
    player.find("video").attr("poster", thumbUrl);

    playerWrapper.append(player);

    Video.setupTriggers();

  },

  setupVideoPanelHtml: function() {
    var videoPanel = $('<div id="video_player" class="hidden"><video id="demo_reel_video" class="video-js vjs-default-skin" controls preload="auto" width="960" height="540" poster="" data-setup="{}"><source src="" type="video/mp4"></video></div>');
    return videoPanel;
  },

  setupTriggers: function() {
    var triggers = $(".video_trigger");

    triggers.on("click", function() {
      var player = _V_("demo_reel_video");
          playerHtml = $("#video_player");

      playerHtml.removeClass("hidden");
      player.play();

    });

  }

};

var Modal = {

  createModal: function(insertedData, titleText){
    var modalWrap = $("<div id='modal_wrap'></div>"),
        modalTitle = $("<span id='modal_title'></span>"),
        modalHeader = $("<div id='modal_header' class='black_gradient'></div>"),
        modalCloseLink = $("<div id='close_modal_link' class='button close_button red_button'>X</div>"),
        modalContent = $("<div id='modal_content'></div>");
        
        if (titleText != undefined) {
          modalTitle.text(titleText);
          modalHeader.prepend(modalTitle);
        }
        modalContent.append(insertedData);
        modalHeader.append(modalCloseLink);
        modalWrap.append(modalHeader).append(modalContent);
        return modalWrap;
  },

  confirmDelete: function(message, callback) {
    var confirmMessage = (message ? message : "Are you sure you want to delete?"),
        confirmContent = Modal.confirmModalContent(confirmMessage),
        modal = Modal.loadModal(confirmContent);

    Modal.activateConfirm(callback);
  },

  confirmModalContent: function(message) {
    var confirmWrap = $("<div id='confirm_wrap'></div>"),
        confirmMessage = $("<div id='confirm_message'></div>"),
        confirmOkButton = $("<span id='confirm_ok' class='button green_button'>Ok</span>"),
        confirmCancelButton = $("<span id='confirm_cancel' class='button red_button'>Cancel</span>");

        confirmMessage.text(message);
        confirmWrap.append(confirmMessage).append(confirmOkButton).append(confirmCancelButton);

        return confirmWrap;
  },

  activateConfirm: function(callback) {
    var modal = $("#modal_wrap"),
        okButton = $("#confirm_ok"),
        cancelButton = $("#confirm_cancel");

    okButton.on("click", function() {
      modal.remove();
      callback();
    });
    cancelButton.on("click", function() {
      modal.remove();
      return false;
    });
  },

  loadModal: function(insertedData, titleText) {
    var modal = Modal.createModal(insertedData, titleText);
        
    Modal.removeModal();    
    $('body').append(modal);
    modal.css({"top" : ($("body").scrollTop() + 50) })
    Modal.closeModal();
    Modal.dragModal();
  },

  dragModal: function() {
    var modal = $("#modal_wrap"),
        modalHeader = modal.find("#modal_header");
      
    modal.draggable({
      handle: modalHeader
    });
  },

  closeModal: function() {
    var closeLink = $("#close_modal_link");

    closeLink.on("click", function() {
      Modal.removeModal();
    });
  },

  removeModal: function() {
    var modal = $("#modal_wrap");
    modal.remove();
  }
};

var Tabs = {
  
  initTabs: function() {
    var tabs = $(".tab");

    tabs.on("click", function() {
      var tabSet = $(this).parents(".tab_set").first(),
          tabPanels = tabSet.find(".tab_panel"),
          panelId = $(this).data("panel"),
          currentPanel = $(this).parents(".tab_set").find("#" + panelId);

          tabs.removeClass("active");
          $(this).addClass("active");
          tabPanels.removeClass("active");
          currentPanel.addClass("active");

    });   
  }
};

var ToolTips = {

  initToolTips: function() {
        $(".tooltip").tipTip({
      defaultPosition: "top",
      attribute: "tooltip"
    });
  }
};

var App = {

  initDeleteLinks: function() {
    var deleteLinks = $(".delete_link");

    deleteLinks.on("click", function(e) {
      var self = $(this);
      
      Modal.confirmDelete("Are you sure that you want to delete this record?", function() {
        App.deleteRecord(self);
      });
      e.preventDefault();
    });
  },

  deleteRecord: function(link) {
    var url = link.attr("href"),
        parent = link.parents(".delete_parent").first();

    $.ajax({
      url: url,
      type: "DELETE",
      success: function(response) {
        parent.remove();
        Modal.loadModal("Record deleted.");
      },
      error: function(response, text, message) {
        var errorMessage = text + " - " + message;
        Modal.loadModal(errorMessage);
      }
    }); 
  }
};

//**********Initialize Document**********//
$(document).ready(function() {
  Flash.injectFlashBox();
  Flash.setFlash();
  App.initDeleteLinks();
  ToolTips.initToolTips();
});