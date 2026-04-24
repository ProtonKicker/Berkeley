(function($) {
  Drupal.behaviors.panopolyImagesModule = {
    attach: function (context, settings) {
      var captions = $('.caption', context).has('img');
      $(captions).once('panopoly-images').imagesLoaded(function () {
        panopolyImagesResizeCaptionBox(captions);
      });

      function panopolyImagesResizeCaptionBox(captions) {
        captions.each(function() {
          var imageSet = $('img', this),
              imgBoxWidth = getImgWidth(imageSet),
              wrapperBoxWidth =
                  getWrapperSpacing($('.caption-inner', this))
                + getWrapperSpacing($('.caption-width-container', this)),
              totalWidth = imgBoxWidth + wrapperBoxWidth;
          $(this).width(totalWidth);
        });
      }

      // Get width of image plus margins, borders and padding
      function getImgWidth(imageSet) {
        var imgWidth = 0,
            imgBoxExtra = 0,
            testWidth = 0;
        var attrWidth;

        // We shouldn't have more than one image in a caption, but it would be
        // possible, so we make sure we have the widest one
        for (var i = 0; i < imageSet.length; i++) {
          // If we have a hardcoded width attribute from manual resizing in
          // TinMCE, use that. If not, use the image naturalWidth. We can't
          // reliably use width() for responsive images.
          attrWidth = $(imageSet[i]).attr("width");
          if (typeof attrWidth !== 'undefined') {
            // attr() returns a string. Must convert to int for math to work.
            testWidth = parseInt(attrWidth, 10);
          }
          else {
            testWidth = imageSet[i].naturalWidth;
          }
          if (testWidth > imgWidth) {
            imgWidth = testWidth;
            imgBoxExtra = getWrapperSpacing(imageSet[i])
          }
        }
        return imgWidth + imgBoxExtra;
      }

      // We want the total of margin, border and padding on the element
      function getWrapperSpacing(el) {
        var spacing = ['margin-left', 'border-left', 'padding-left', 'padding-right', 'border-right', 'margin-right'],
            totalPx = 0,
            spacePx = 0,
            spaceRaw = '';
        for (var i = 0; i < spacing.length; i++) {
          spaceRaw = $(el).css(spacing[i]);

          // Themers might add padding, borders or margin defined in ems, but we can't
          // add that to pixel dimensions returned by naturalWidth, so we just throw
          // away anything but pixels. Themers have to deal with that.
          if(spaceRaw && spaceRaw.substr(spaceRaw.length - 2) == 'px') {
            spacePx = parseInt(spaceRaw, 10);
            totalPx += ($.isNumeric(spacePx)) ? spacePx : 0;
          }
        }
        return totalPx;
      }
    }
  }
})(jQuery);
;
(function ($) {
    'use strict';
    Drupal.behaviors.ACChangeEnterBehavior = {
        attach: function (context, settings) {
            $('input.form-autocomplete', context).once('ac-change-enter-behavior', function() {
                $(this).keypress(function(e) {
                    var ac = $('#autocomplete');
                    if (e.keyCode == 13 && typeof ac[0] != 'undefined') {
                        e.preventDefault();
                        ac.each(function () {
                            if(this.owner.selected == false){
                                this.owner.selectDown();
                            }
                            this.owner.hidePopup();
                        });
                        $(this).trigger('change');
                    }
                });
            });
        }
    };
}(jQuery));
;
/**
 * @file
 * Javascript to support accessible expanding/collapsing content.
 *
 */

(function ($) {

Drupal.behaviors.openberkeley_faq = {
  attach: function (context, settings) {

    $('body').once('faq-content', function() {
      $('div.faq-category-group.openberkeley-faq-hide-answer .faq-qa-header').first().after( '<div class="openberkeley-expand-all-links"><a class="openberkeley-collapsible-collapse" href="#">collapse all</a> <a class="openberkeley-collapsible-expand" href="#">expand all</a></div>' );
      $('div.faq-category-group.openberkeley-faq-hide-answer .faq-qa').first().addClass( 'openberkeley-faq-clear-both' );

    }); // End functions that only happen once.
  }
};

})(jQuery);
;
/**
 * @file
 * Javascript to support accessible expanding/collapsing content.
 *
 */

(function ($) {

Drupal.behaviors.openberkeley_theme = {
  attach: function (context, settings) {

    // Set show/hide text variables.
    // Not configurable by the end-user.
    var iconShowClass = "fa-plus";
    var iconHideClass = "fa-minus";
    var statusLink;

  // Helper functions.
  function toggleCollapse(toggleStatus) {
    if (toggleStatus === 'true') {
      // Set toggle to collapse all state.
      $('a.openberkeley-collapsible-collapse').show();
      $('a.openberkeley-collapsible-expand').hide();
      $('a.openberkeley-collapsible-trigger').attr('aria-expanded','true');
      $('a.openberkeley-collapsible-trigger').each(function() {
        statusLink = $(this).find('.openberkeley-collapsible-status');
        $(statusLink).find('> span').removeClass(iconShowClass);
        $(statusLink).find('> span').addClass(iconHideClass);
      });
    } else if (toggleStatus === 'false') {
      // Set toggle to expand all state.
      $('a.openberkeley-collapsible-expand').show();
      $('a.openberkeley-collapsible-collapse').hide();
      $('a.openberkeley-collapsible-trigger').attr('aria-expanded','false');
      $('a.openberkeley-collapsible-trigger').each(function() {
        statusLink = $(this).find('.openberkeley-collapsible-status');
        $(statusLink).find('> span').removeClass(iconHideClass);
        $(statusLink).find('> span').addClass(iconShowClass);
      });
    }
  }

  // Helper function to add event handlers to links with role=button.
    window.addKeydownHandler = function(selector) {
    $(selector, context).once('openberkeley_theme').on('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        $(this).click();
      }
    });
  }

    // The following actions should only happen once.
    $('body').once('openberkeley-collapsible', function() {

      // Hide all expand targets.
      $('.openberkeley-collapsible-target, a.openberkeley-collapsible-collapse').hide();

      // Remove any existing links from within controllers.
      $('h2.openberkeley-collapsible-controller, h3.openberkeley-collapsible-controller, h4.openberkeley-collapsible-controller, h5.openberkeley-collapsible-controller').find('a').each(function() {
        $(this).replaceWith($(this).contents());
      });
    
      // Wrap the contents of each controller in a link with a button role.
      $('h2.openberkeley-collapsible-controller, h3.openberkeley-collapsible-controller, h4.openberkeley-collapsible-controller, h5.openberkeley-collapsible-controller').wrapInner( "<a href=\"#details\" class=\"openberkeley-collapsible-trigger\" role=\"button\"></a>" );

      // Set aria-expanded on all triggers.
      $('a.openberkeley-collapsible-trigger, a.openberkeley-collapsible-expand').attr('aria-expanded', 'false');
      $('a.openberkeley-collapsible-collapse').attr('aria-expanded', 'true');

      // Set show/hide text.
      $('a.openberkeley-collapsible-trigger').append( ' <span class="openberkeley-collapsible-status" aria-hidden="true"><span class="fa ' + iconShowClass + '"></span></span>' );

      // Add IDs to containers.
      $('.openberkeley-collapsible-container').each(function (i) {
        $(this).attr('id','openberkeley-collapsible-container-' + i);
      });

      // Add IDs to triggers.
      $('.openberkeley-collapsible-trigger').each(function() {
        var parentId = $(this).closest('.openberkeley-collapsible-container').attr('id');
        $(this).attr('id', parentId + '-trigger');
      });

      // Add IDs to targets.
      $('.openberkeley-collapsible-target').each(function() {
        var parentId = $(this).closest('.openberkeley-collapsible-container').attr('id');
        $(this).attr('id', parentId + '-target');
      });

      // Add aria properties to info targets.
      $('.openberkeley-collapsible-info-target').each(function() {
        var infoId = $(this).closest('.openberkeley-collapsible-container').find('.openberkeley-collapsible-trigger').attr('id');
        $(this).attr('aria-describedby', infoId);
      });

      // Add aria properties to triggers.
      $('a.openberkeley-collapsible-trigger').each(function() {
        $(this).attr('aria-expanded', 'false');
        var targetId = $(this).closest('.openberkeley-collapsible-container').find('.openberkeley-collapsible-target').attr('id');
        $(this).attr('aria-controls', targetId);
        $(this).attr('href', '#' + targetId);
      });

      // Get a list of all the target IDs for aria-controls.
      var targetIds = $.map($(".openberkeley-collapsible-target"), function(n, i) {
        return n.id;
      });
      var controlIds = targetIds.join(' ');
      var firstTargetId = $('body').find('.openberkeley-collapsible-target').attr('id');

      // Make IDs of expand/collapse sections unique.
      $('div#openberkeley-expand-all,div.openberkeley-expand-all-links').each(function (i) {
        $(this).attr('id','openberkeley-expand-all-' + i);
        $(this).addClass('openberkeley-expand-all-links');
        $(this).find('a.openberkeley-collapsible-collapse').attr('href', '#openberkeley-expand-all-' + i)
      });

      // Add aria-controls and href to expand all.
      $('a.openberkeley-collapsible-expand').attr('aria-controls', controlIds);
      $('a.openberkeley-collapsible-expand').attr('href', '#' + firstTargetId);
      $('a.openberkeley-collapsible-expand').attr('role', 'button');
      $('a.openberkeley-collapsible-collapse').attr('role', 'button');

      // Add Drupal clearfix class (OPENUCB-2076)
      $('.openberkeley-collapsible-target').addClass("clearfix");

      // Add event handlers to links with role=button.
      addKeydownHandler('.openberkeley-expand-all-links a[role="button"]');
      addKeydownHandler('.openberkeley-collapsible-container a[role="button"]');

    });

    $('body').once('panopoly-spotlight-widget-wrapper', function() {
      addKeydownHandler('a[role="button"]');
    });

    // End functions that only happen once.

    // Handle clicks - prevent default action first.
    $('a.openberkeley-collapsible-trigger').click(function(event) {
      event.preventDefault();
      var target = $('#' + $(this).attr('aria-controls'));
      target.slideToggle();
      $(this).attr('aria-expanded',$(this).attr('aria-expanded') == 'true' ? 'false' : 'true');
      var expandedStatus = $(this).attr('aria-expanded');
      statusLink = $(this).find('.openberkeley-collapsible-status');
      $(statusLink).find('> span').removeClass();
      $(statusLink).find('> span').addClass(function() {
        newClass = expandedStatus == 'true' ? iconHideClass : iconShowClass;
        return "fa " + newClass;
      });
      // If all items are manually set to expanded or collapsed, then the global
      // toggle may be out of sync. Check for this condition and update the toggle.

      // Get the expand/collapse status of all items into an array.
      var itemsExpandedStatus = [];
      $('a.openberkeley-collapsible-trigger').each(function(){
        itemsExpandedStatus.push($(this).attr('aria-expanded'));
      });
      // Check if all items in the array are the same.
      var toggleStatus = itemsExpandedStatus.reduce(function(a, b){return (a === b)?a:false;});
      if (toggleStatus) {
        toggleCollapse(toggleStatus);
      }
    });

    // Collapse all.
    $('a.openberkeley-collapsible-collapse').click(function(event) {
      event.preventDefault();
      $('.openberkeley-collapsible-target').hide();
      toggleCollapse('false');
      $(this).parent().find('a.openberkeley-collapsible-expand').focus();
    });

    // Expand all.
    $('a.openberkeley-collapsible-expand').click(function(event) {
      event.preventDefault(); 
      $('.openberkeley-collapsible-target').show();
      toggleCollapse('true');
      $(this).parent().find('a.openberkeley-collapsible-collapse').focus();
    });
  }
};

})(jQuery);
;
(function ($) {
  var twitterBackup = {};

  // Hack to make the twttr.ready() function available before the script has
  // loaded. This was inspired from this snippet in the Twitter docs:
  //   https://dev.twitter.com/web/javascript/loading
  if (typeof twttr === 'undefined') {
    twttr = {
      _e: [],
      ready: function (f) {
        twttr._e.push(f);
      }
    };
  }

  // Bind to the Twitter widgets load event to add some custom CSS.
  twttr.ready(function () {
    twttr.events.bind('rendered', function (evt) {
      if (!evt.target.src) {
        $(evt.target).contents().find(".timeline").attr("style","max-width: 100% !important;");
        $(evt.target).attr("style","max-width: 100% !important; width: 100% !important;");
      }
    });
  });
})(jQuery);
;
(function ($) {
  Drupal.behaviors.openberkeley_wysiwyg_override = {
    attach: function (context, settings) {
      $('img[usemap]', context).maphilight({ stroke: false, fillColor: 'FFFFFF',fillOpacity: 0.3 });
    }
  };
})(jQuery);
;
(function ($) {
  Drupal.behaviors.panopolyMagic = {
    attach: function (context, settings) {
      /**
       * Title Hax for Panopoly
       *
       * Replaces the markup of a node title pane with
       * the h1.title page element
       */
      if ($.trim($('.pane-node-title .pane-content').html()) == $.trim($('h1.title').html())) {
        $('.pane-node-title .pane-content').html('');
        $('h1.title').hide().clone().prependTo('.pane-node-title .pane-content');
        $('.pane-node-title h1.title').show();
      }
    }
  };
})(jQuery);

(function ($) {
  // Used to only update preview after changes stop for a second.
  var timer;

  // Used to make sure we don't wrap Drupal.wysiwygAttach() more than once.
  var wrappedWysiwygAttach = false;

  // Used to make sure we don't wrap insertLink() on the Linkit field helper
  // more than once.
  var wrappedLinkitField = false;

  // Triggers the CTools autosubmit on the given form. If timeout is passed,
  // it'll set a timeout to do the actual submit rather than calling it directly
  // and return the timer handle.
  function triggerSubmit(form, timeout) {
    var $form = $(form),
        preview_widget = $('#panopoly-form-widget-preview'),
        submit;
    if (!preview_widget.hasClass('panopoly-magic-loading')) {
      preview_widget.addClass('panopoly-magic-loading');
      submit = function () {
        if (document.contains(form)) {
          $form.find('.ctools-auto-submit-click').click();
        }
      };
      if (typeof timeout === 'number') {
        return setTimeout(submit, timeout);
      }
      else {
        submit();
      }
    }
  }

  // Used to cancel a submit. It'll clear the timer and the class marking the
  // loading operation.
  function cancelSubmit(form, timer) {
    var $form = $(form),
        preview_widget = $('#panopoly-form-widget-preview');
    preview_widget.removeClass('panopoly-magic-loading');
    clearTimeout(timer);
  }

  function onWysiwygChangeFactory(editorId) {
    return function () {
      var textarea = $('#' + editorId),
          form = textarea.get(0).form;

      if (textarea.hasClass('panopoly-textarea-autosubmit')) {
        // Wait a second and then submit.
        cancelSubmit(form, timer); 
        timer = triggerSubmit(form, 1000);
      }
    };
  }

  // A function to run before Drupal.wysiwyg.editor.attach.tinymce() with the
  // same arguments.
  function wysiwygTinymceBeforeAttach(context, params, settings) {
    var onWysiwygChange = onWysiwygChangeFactory(params.field);
    settings['setup'] = function (editor) {
      editor.onChange.add(onWysiwygChange);
      editor.onKeyUp.add(onWysiwygChange);
    };
  }

  // A function to run before Drupal.wysiwyg.editor.attach.markitup() with the
  // same arguments.
  function wysiwygMarkitupBeforeAttach(context, params, settings) {
    var onWysiwygChange = onWysiwygChangeFactory(params.field);
    $.each(['afterInsert', 'onEnter'], function (index, funcName) {
      settings[funcName] = onWysiwygChange;
    });
  }

  // Used to wrap a function with a beforeFunc (we use it for wrapping
  // Drupal.wysiwygAttach()).
  function wrapFunctionBefore(parent, name, beforeFunc) {
    var originalFunc = parent[name];
    parent[name] = function () {
      beforeFunc.apply(this, arguments);
      return originalFunc.apply(this, arguments);
    };
  }

  // Used to wrap a function with an afterFunc (we use it for wrapping
  // insertLink() on the Linkit field helper);
  function wrapFunctionAfter(parent, name, afterFunc) {
    var originalFunc = parent[name];
    parent[name] = function () {
      var retval = originalFunc.apply(this, arguments);
      afterFunc.apply(this, arguments);
      return retval;
    };
  }

  /**
   * Improves the Auto Submit Experience for CTools Modals
   */
  Drupal.behaviors.panopolyMagicAutosubmit = {
    attach: function (context, settings) {
      // Move focus to preview after it's shown.
      $('body').once(function () {
        if (typeof Drupal.CTools !== 'undefined' && typeof Drupal.CTools.Modal !== 'undefined' && typeof Drupal.CTools.Modal.modal_display) {
          var modal_display = Drupal.CTools.Modal.modal_display;
          Drupal.CTools.Modal.modal_display = function (ajax, response, status) {
            var url = ajax.url,
                params = {},
                widget_name;

            // Do the parent operation.
            modal_display(ajax, response, status);

            // Parse the GET arguments.
            url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
              params[key] = value;
            })
            if (params['panopoly_magic_preview'] == 'manual') {
              widget_name = decodeURIComponent(params['preview_panes']).split(',').pop();
              widget_name.replace(':', '-');
              widget_name.replace(/[^a-zA-Z0-9_]/g, '');
              // Need to defer until current set of behaviors is done, because Panels
              // will move the focus to the first widget by default.
              setTimeout(function () {
                $('#modal-content .panopoly-magic-preview-' + widget_name + ' :focusable:first').focus();
              }, 0);
            }
            else if (params['panopoly_magic_preview'] == 'single') {
              // Ditto.
              setTimeout(function () {
                $('#modal-content .panopoly-magic-preview :focusable:first').focus();
              }, 0);
            }
          };
        }
      });

      // Replaces click with mousedown for submit so both normal and ajax work.
      $('.ctools-auto-submit-click', context)
      .click(function(event) {
        if ($(this).hasClass('ajax-processed')) {
          event.stopImmediatePropagation();
          $(this).trigger('mousedown');
          return false;
        }
      });

      // e.keyCode: key
      var discardKeyCode = [
        16, // shift
        17, // ctrl
        18, // alt
        20, // caps lock
        33, // page up
        34, // page down
        35, // end
        36, // home
        37, // left arrow
        38, // up arrow
        39, // right arrow
        40, // down arrow
         9, // tab
        13, // enter
        27  // esc
      ];

      // Special handling for link field widgets. This ensures content which is ahah'd in still properly autosubmits.
      $('.field-widget-link-field input:text', context).addClass('panopoly-textfield-autosubmit').addClass('ctools-auto-submit-exclude');

      // Handle text fields and textareas.
      $('.panopoly-textfield-autosubmit, .panopoly-textarea-autosubmit', context)
      .once('ctools-auto-submit')
      .bind('keyup blur', function (e) {
        var $element;
        $element = $('.panopoly-magic-preview .pane-title', context);

        cancelSubmit(e.target.form, timer);

        // Filter out discarded keys.
        if (e.type !== 'blur' && $.inArray(e.keyCode, discardKeyCode) > 0) {
          return;
        }

        // Set a timer to submit the form a second after the last activity.
        timer = triggerSubmit(e.target.form, 1000);
      });

      // Handle WYSIWYG fields.
      if (!wrappedWysiwygAttach && typeof Drupal.wysiwyg != 'undefined' && typeof Drupal.wysiwyg.editor.attach.tinymce == 'function' && typeof Drupal.wysiwyg.editor.attach.markitup == 'function') {
        wrapFunctionBefore(Drupal.wysiwyg.editor.attach, 'tinymce', wysiwygTinymceBeforeAttach);
        //wrapFunctionBefore(Drupal.wysiwyg.editor.attach, 'markitup', wysiwygMarkitupBeforeAttach);
        wrappedWysiwygAttach = true;

        // Since the Drupal.behaviors run in a non-deterministic order, we can
        // never be sure that we wrapped Drupal.wysiwygAttach() before it was
        // used! So, we look for already attached editors so we can detach and
        // re-attach them.
        $('.panopoly-textarea-autosubmit', context)
        .once('panopoly-magic-wysiwyg')
        .each(function () {
          var editorId = this.id,
              instance = Drupal.wysiwyg.instances[editorId],
              format = instance ? instance.format : null,
              trigger = instance ? instance.trigger : null;

          if (instance && instance.editor != 'none') {
            params = Drupal.settings.wysiwyg.triggers[trigger];
            if (params) {
              Drupal.wysiwygDetach(context, params[format]);
              Drupal.wysiwygAttach(context, params[format]);
            }
          }
        });
      }
  
      // Handle autocomplete fields.
      $('.panopoly-autocomplete-autosubmit', context)
      .once('ctools-auto-submit')
      .bind('keyup blur', function (e) {
        // Detect when a value is selected via TAB or ENTER.
        if (e.type === 'blur' || e.keyCode === 13) {
          // We defer the submit call so that it happens after autocomplete has
          // had a chance to fill the input with the selected value.
          triggerSubmit(e.target.form, 0);
        }
      });

      // Prevent ctools auto-submit from firing when changing text formats.
      $(':input.filter-list').addClass('ctools-auto-submit-exclude');

      // Handle Linkit fields.
      if (!wrappedLinkitField && typeof Drupal.linkit !== 'undefined') {
        var linkitFieldHelper = Drupal.linkit.getDialogHelper('field');
        if (typeof linkitFieldHelper !== 'undefined') {
          wrapFunctionAfter(linkitFieldHelper, 'insertLink', function (data) {
            var element = document.getElementById(Drupal.settings.linkit.currentInstance.source);
            triggerSubmit(element.form);
          });
          wrappedLinkitField = true;
        }
      }

    }
  }
})(jQuery);
;
(function ($) {

  Drupal.behaviors.PanelsAccordionStyle = {
    attach: function (context, settings) {
      for (region_id in Drupal.settings.accordion) {
        var accordion = Drupal.settings.accordion[region_id];
        if (jQuery('#'+region_id).hasClass("ui-accordion")) {
          jQuery('#'+region_id).accordion("refresh");
        } else {
          jQuery('#'+region_id).accordion(accordion.options);
        }
      }
    }
  };

})(jQuery);
;
/**
 * @file
 * JavaScript integrations between the Caption Filter module and particular
 * WYSIWYG editors. This file also implements Insert module hooks to respond
 * to the insertion of content into a WYSIWYG or textarea.
 */
(function ($) {

$(document).bind('insertIntoActiveEditor', function(event, options) {
  if (options['fields']['title'] && Drupal.settings.captionFilter.widgets[options['widgetType']]) {
    options['content'] = '[caption caption="' + options['fields']['title'].replace(/"/g, '\\"') + '"]' + options['content'] + '[/caption]';
  }
});

Drupal.captionFilter = Drupal.captionFilter || {};

Drupal.captionFilter.toHTML = function(co, editor) {
  return co.replace(/(?:<p>)?\[caption([^\]]*)\]([\s\S]+?)\[\/caption\](?:<\/p>)?[\s\u00a0]*/g, function(a,b,c){
    var id, cls, w, tempClass;

    b = b.replace(/\\?'|\\&#39;|\\&#039;/g, '&#39;').replace(/\\"|\\&quot;/g, '&quot;');
    c = c.replace(/\\&#39;|\\&#039;/g, '&#39;').replace(/\\&quot;/g, '&quot;');
    id = b.match(/id=['"]([^'"]+)/i);
    cls = b.match(/align=['"]([^'"]+)/i);
    ct = b.match(/caption=['"]([^'"]+)/i);
    w = c.match(/width=['"]([0-9]+)/);

    id = ( id && id[1] ) ? id[1] : '';
    cls = ( cls && cls[1] ) ? 'caption-' + cls[1] : '';
    ct = ( ct && ct[1] ) ? ct[1].replace(/\\\\"/,'"') : '';
    w = ( w && w[1] ) ? parseInt(w[1])+'px' : 'auto';

    if (editor == 'tinymce')
      tempClass = (cls == 'caption-center') ? 'mceTemp mceIEcenter' : 'mceTemp';
    else if (editor == 'ckeditor')
      tempClass = (cls == 'caption-center') ? 'mceTemp mceIEcenter' : 'mceTemp';
    else
      tempClass = '';

    if (ct) {
      return '<div class="caption ' + cls + ' ' + tempClass + ' draggable"><div class="caption-width-container" style="width: ' + w + '"><div class="caption-inner">' + c + '<p class="caption-text">' + ct + '</p></div></div></div><br />';
    }
    else {
      return '<div class="caption ' + cls + ' ' + tempClass + ' draggable"><div class="caption-width-container" style="width: ' + w + '"><div class="caption-inner">' + c + '</div></div></div><br />';
    }
  });
};

Drupal.captionFilter.toTag = function(co) {
  return co.replace(/(<div class="caption [^"]*">)\s*<div[^>]+>\s*<div[^>]+>(.+?)<\/div>\s*<\/div>\s*<\/div>\s*/gi, function(match, captionWrapper, contents) {
    var align;
    align = captionWrapper.match(/class=.*?caption-(left|center|right)/i);
    align = (align && align[1]) ? align[1] : '';
    caption = contents.match(/\<p class=\"caption-text\"\>(.*)\<\/p\>/);
    caption_html = (caption && caption[0]) ? caption[0] : '';
    caption = (caption && caption[1]) ? caption[1].replace(/"/g, '\\"') : '';
    contents = contents.replace(caption_html, '');

    return '[caption' + (caption ? (' caption="' + caption + '"') : '') + (align ? (' align="' + align + '"') : '') + ']' + contents + '[/caption]';
  });
};

})(jQuery);
;
