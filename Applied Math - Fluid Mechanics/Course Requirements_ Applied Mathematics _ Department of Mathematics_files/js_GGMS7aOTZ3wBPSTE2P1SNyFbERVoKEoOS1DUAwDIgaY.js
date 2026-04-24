/*! maphilight 26-10-2017 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):b(a.jQuery)}(this,function(a){var b,c,d,e,f,g,h,j,k,l,m;if(c=!!document.createElement("canvas").getContext,b=function(){var a=document.createElement("div");a.innerHTML='<v:shape id="vml_flag1" adj="1" />';var b=a.firstChild;return b.style.behavior="url(#default#VML)",!b||"object"==typeof b.adj}(),!c&&!b)return void(a.fn.maphilight=function(){return this});if(c){j=function(a){return Math.max(0,Math.min(parseInt(a,16),255))},k=function(a,b){return"rgba("+j(a.substr(0,2))+","+j(a.substr(2,2))+","+j(a.substr(4,2))+","+b+")"},d=function(b){var c=a('<canvas style="width:'+a(b).width()+"px;height:"+a(b).height()+'px;"></canvas>').get(0);return c.getContext("2d").clearRect(0,0,a(b).width(),a(b).height()),c};var n=function(a,b,c,d,e){if(d=d||0,e=e||0,a.beginPath(),"rect"==b)a.rect(c[0]+d,c[1]+e,c[2]-c[0],c[3]-c[1]);else if("poly"==b)for(a.moveTo(c[0]+d,c[1]+e),i=2;i<c.length;i+=2)a.lineTo(c[i]+d,c[i+1]+e);else"circ"==b&&a.arc(c[0]+d,c[1]+e,c[2],0,2*Math.PI,!1);a.closePath()};e=function(b,c,d,e,f){var g=b.getContext("2d");if(e.shadow){g.save(),"inside"==e.shadowPosition&&(n(g,c,d),g.clip());var h=100*b.width,i=100*b.height;n(g,c,d,h,i),g.shadowOffsetX=e.shadowX-h,g.shadowOffsetY=e.shadowY-i,g.shadowBlur=e.shadowRadius,g.shadowColor=k(e.shadowColor,e.shadowOpacity);var j=e.shadowFrom;j||(j="outside"==e.shadowPosition?"fill":"stroke"),"stroke"==j?(g.strokeStyle="rgba(0,0,0,1)",g.stroke()):"fill"==j&&(g.fillStyle="rgba(0,0,0,1)",g.fill()),g.restore(),"outside"==e.shadowPosition&&(g.save(),n(g,c,d),g.globalCompositeOperation="destination-out",g.fillStyle="rgba(0,0,0,1);",g.fill(),g.restore())}g.save(),n(g,c,d),e.fill&&(g.fillStyle=k(e.fillColor,e.fillOpacity),g.fill()),e.stroke&&(g.strokeStyle=k(e.strokeColor,e.strokeOpacity),g.lineWidth=e.strokeWidth,g.stroke()),g.restore(),e.fade&&a(b).css("opacity",0).animate({opacity:1},100)},f=function(a){a.getContext("2d").clearRect(0,0,a.width,a.height)}}else d=function(b){return a('<var style="zoom:1;overflow:hidden;display:block;width:'+b.width+"px;height:"+b.height+'px;"></var>').get(0)},e=function(b,c,d,e,f){var g,h,i,j;for(var k in d)d[k]=parseInt(d[k],10);g='<v:fill color="#'+e.fillColor+'" opacity="'+(e.fill?e.fillOpacity:0)+'" />',h=e.stroke?'strokeweight="'+e.strokeWidth+'" stroked="t" strokecolor="#'+e.strokeColor+'"':'stroked="f"',i='<v:stroke opacity="'+e.strokeOpacity+'"/>',"rect"==c?j=a('<v:rect name="'+f+'" filled="t" '+h+' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:'+d[0]+"px;top:"+d[1]+"px;width:"+(d[2]-d[0])+"px;height:"+(d[3]-d[1])+'px;"></v:rect>'):"poly"==c?j=a('<v:shape name="'+f+'" filled="t" '+h+' coordorigin="0,0" coordsize="'+b.width+","+b.height+'" path="m '+d[0]+","+d[1]+" l "+d.join(",")+' x e" style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:0px;left:0px;width:'+b.width+"px;height:"+b.height+'px;"></v:shape>'):"circ"==c&&(j=a('<v:oval name="'+f+'" filled="t" '+h+' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:'+(d[0]-d[2])+"px;top:"+(d[1]-d[2])+"px;width:"+2*d[2]+"px;height:"+2*d[2]+'px;"></v:oval>')),j.get(0).innerHTML=g+i,a(b).append(j)},f=function(b){var c=a("<div>"+b.innerHTML+"</div>");c.children("[name=highlighted]").remove(),b.innerHTML=c.html()};g=function(a){var b,c=a.getAttribute("coords").split(",");for(b=0;b<c.length;b++)c[b]=parseFloat(c[b]);return[a.getAttribute("shape").toLowerCase().substr(0,4),c]},m=function(b,c){var d=a(b);return a.extend({},c,!!a.metadata&&d.metadata(),d.data("maphilight"))},l=function(a){return!!a.complete&&(void 0===a.naturalWidth||0!==a.naturalWidth)},h={position:"absolute",left:0,top:0,padding:0,border:0};var o=!1;a.fn.maphilight=function(i){return i=a.extend({},a.fn.maphilight.defaults,i),c||o||(a(window).ready(function(){document.namespaces.add("v","urn:schemas-microsoft-com:vml");var b=document.createStyleSheet(),c=["shape","rect","oval","circ","fill","stroke","imagedata","group","textbox"];a.each(c,function(){b.addRule("v\\:"+this,"behavior: url(#default#VML); antialias:true")})}),o=!0),this.each(function(){var j,k,n,o,p,q,r;if(j=a(this),!l(this))return window.setTimeout(function(){j.maphilight(i)},200);if(n=a.extend({},i,!!a.metadata&&j.metadata(),j.data("maphilight")),(r=j.get(0).getAttribute("usemap"))&&(o=a('map[name="'+r.substr(1)+'"]'),j.is('img,input[type="image"]')&&r&&o.length>0)){if(j.hasClass("maphilighted")){var s=j.parent();j.insertBefore(s),s.remove(),a(o).unbind(".maphilight")}k=a("<div></div>").css({display:"block",backgroundImage:'url("'+this.src+'")',backgroundSize:"contain",position:"relative",padding:0,width:this.width,height:this.height}),n.wrapClass&&(!0===n.wrapClass?k.addClass(a(this).attr("class")):k.addClass(n.wrapClass)),j.before(k).css("opacity",1e-10).css(h).remove(),b&&j.css("filter","Alpha(opacity=0)"),k.append(j),p=d(this),a(p).css(h),p.height=this.height,p.width=this.width,a(o).bind("alwaysOn.maphilight",function(){q&&f(q),c||a(p).empty(),a(o).find("area[coords]").each(function(){var b,f;f=m(this,n),f.alwaysOn&&(!q&&c&&(q=d(j[0]),a(q).css(h),q.width=j[0].width,q.height=j[0].height,j.before(q)),f.fade=f.alwaysOnFade,b=g(this),c?e(q,b[0],b[1],f,""):e(p,b[0],b[1],f,""))})}).trigger("alwaysOn.maphilight").bind("mouseover.maphilight, focusin.maphilight",function(b){var d,f,h=b.target;if(f=m(h,n),!f.neverOn&&!f.alwaysOn){if(d=g(h),e(p,d[0],d[1],f,"highlighted"),f.groupBy){var i;i=/^[a-zA-Z][\-a-zA-Z]+$/.test(f.groupBy)?o.find("area["+f.groupBy+'="'+a(h).attr(f.groupBy)+'"]'):o.find(f.groupBy);var j=h;i.each(function(){if(this!=j){var a=m(this,n);if(!a.neverOn&&!a.alwaysOn){var b=g(this);e(p,b[0],b[1],a,"highlighted")}}})}c||a(p).append("<v:rect></v:rect>")}}).bind("mouseout.maphilight, focusout.maphilight",function(a){f(p)}),j.before(p),j.addClass("maphilighted")}})},a.fn.maphilight.defaults={fill:!0,fillColor:"000000",fillOpacity:.2,stroke:!0,strokeColor:"ff0000",strokeOpacity:1,strokeWidth:1,fade:!0,alwaysOn:!1,neverOn:!1,groupBy:!1,wrapClass:!0,shadow:!1,shadowX:0,shadowY:0,shadowRadius:6,shadowColor:"000000",shadowOpacity:.8,shadowPosition:"outside",shadowFrom:!1}});;
(function(c,q){var m="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function n(){var b=c(j),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function p(b){k(b.target,"error"===b.type)}function k(b,a){b.src===m||-1!==c.inArray(b,l)||(l.push(b),a?h.push(b):j.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),r&&d.notifyWith(c(b),[a,e,c(j),c(h)]),e.length===l.length&&(setTimeout(n),e.unbind(".imagesLoaded",
p)))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():0,r=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),l=[],j=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",p).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)k(a,e.isBroken);else if(a.complete&&a.naturalWidth!==q)k(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=m,a.src=d}):
n();return d?d.promise(g):g}})(jQuery);
;
/**
 * @file
 */

(function ($) {

  'use strict';

  Drupal.extlink = Drupal.extlink || {};

  Drupal.extlink.attach = function (context, settings) {
    if (!settings.hasOwnProperty('extlink')) {
      return;
    }

    // Strip the host name down, removing ports, subdomains, or www.
    var pattern = /^(([^\/:]+?\.)*)([^\.:]{1,})((\.[a-z0-9]{1,253})*)(:[0-9]{1,5})?$/;
    var host = window.location.host.replace(pattern, '$2$3$6');
    var subdomain = window.location.host.replace(host, '');

    // Determine what subdomains are considered internal.
    var subdomains;
    if (settings.extlink.extSubdomains) {
      subdomains = '([^/]*\\.)?';
    }
    else if (subdomain === 'www.' || subdomain === '') {
      subdomains = '(www\\.)?';
    }
    else {
      subdomains = subdomain.replace('.', '\\.');
    }

    // Build regular expressions that define an internal link.
    var internal_link = new RegExp('^https?://([^@]*@)?' + subdomains + host, 'i');

    // Extra internal link matching.
    var extInclude = false;
    if (settings.extlink.extInclude) {
      extInclude = new RegExp(settings.extlink.extInclude.replace(/\\/, '\\'), 'i');
    }

    // Extra external link matching.
    var extExclude = false;
    if (settings.extlink.extExclude) {
      extExclude = new RegExp(settings.extlink.extExclude.replace(/\\/, '\\'), 'i');
    }

    // Extra external link CSS selector exclusion.
    var extCssExclude = false;
    if (settings.extlink.extCssExclude) {
      extCssExclude = settings.extlink.extCssExclude;
    }

    // Extra external link CSS selector explicit.
    var extCssExplicit = false;
    if (settings.extlink.extCssExplicit) {
      extCssExplicit = settings.extlink.extCssExplicit;
    }

    // Define the jQuery method (either 'append' or 'prepend') of placing the icon, defaults to 'append'.
    var extIconPlacement = settings.extlink.extIconPlacement || 'append';

    // Find all links which are NOT internal and begin with http as opposed
    // to ftp://, javascript:, etc. other kinds of links.
    // When operating on the 'this' variable, the host has been appended to
    // all links by the browser, even local ones.
    // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
    // available in jQuery 1.0 (Drupal 5 default).
    var external_links = [];
    var mailto_links = [];
    $('a:not([data-extlink]), area:not([data-extlink])', context).each(function (el) {
      try {
        var url = '';
        if (typeof this.href == 'string') {
          url = this.href.toLowerCase();
        }
        // Handle SVG links (xlink:href).
        else if (typeof this.href == 'object') {
          url = this.href.baseVal;
        }
        if (url.indexOf('http') === 0
          && ((!url.match(internal_link) && !(extExclude && url.match(extExclude))) || (extInclude && url.match(extInclude)))
          && !(extCssExclude && $(this).is(extCssExclude))
          && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
          && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          external_links.push(this);
        }
        // Do not include area tags with begin with mailto: (this prohibits
        // icons from being added to image-maps).
        else if (this.tagName !== 'AREA'
          && url.indexOf('mailto:') === 0
          && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
          && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          mailto_links.push(this);
        }
      }
      // IE7 throws errors often when dealing with irregular links, such as:
      // <a href="node/10"></a> Empty tags.
      // <a href="http://user:pass@example.com">example</a> User:pass syntax.
      catch (error) {
        return false;
      }
    });

    if (settings.extlink.extClass) {
      Drupal.extlink.applyClassAndSpan(external_links, settings.extlink.extClass, extIconPlacement);
    }

    if (settings.extlink.mailtoClass) {
      Drupal.extlink.applyClassAndSpan(mailto_links, settings.extlink.mailtoClass, extIconPlacement);
    }

    if (settings.extlink.extTarget) {
      // Apply the target attribute to all links.
      $(external_links).attr('target', settings.extlink.extTarget);
      // Add rel attributes noopener and noreferrer.
      $(external_links).attr('rel', function (i, val) {
        // If no rel attribute is present, create one with the values noopener and noreferrer.
        if (val == null) {
          return 'noopener noreferrer';
        }
        // Check to see if rel contains noopener or noreferrer. Add what doesn't exist.
        if (val.indexOf('noopener') > -1 || val.indexOf('noreferrer') > -1) {
          if (val.indexOf('noopener') === -1) {
            return val + ' noopener';
          }
          if (val.indexOf('noreferrer') === -1) {
            return val + ' noreferrer';
          }
          // Both noopener and noreferrer exist. Nothing needs to be added.
          else {
            return val;
          }
        }
        // Else, append noopener and noreferrer to val.
        else {
          return val + ' noopener noreferrer';
        }
      });
    }

    Drupal.extlink = Drupal.extlink || {};

    // Set up default click function for the external links popup. This should be
    // overridden by modules wanting to alter the popup.
    Drupal.extlink.popupClickHandler = Drupal.extlink.popupClickHandler || function () {
      if (settings.extlink.extAlert) {
        return confirm(settings.extlink.extAlertText);
      }
    };

    $(external_links).click(function (e) {
      return Drupal.extlink.popupClickHandler(e, this);
    });
  };

  /**
   * Apply a class and a trailing <span> to all links not containing images.
   *
   * @param {object[]} links
   *   An array of DOM elements representing the links.
   * @param {string} class_name
   *   The class to apply to the links.
   * @param {string} icon_placement
   *   'append' or 'prepend' the icon to the link.
   */
  Drupal.extlink.applyClassAndSpan = function (links, class_name, icon_placement) {
    var $links_to_process;
    if (Drupal.settings.extlink.extImgClass) {
      $links_to_process = $(links);
    }
    else {
      var links_with_images = $(links).find('img').parents('a');
      $links_to_process = $(links).not(links_with_images);
    }
    // Add data-extlink attribute.
    $links_to_process.attr('data-extlink', '');
    var i;
    var length = $links_to_process.length;
    for (i = 0; i < length; i++) {
      var $link = $($links_to_process[i]);
      if ($link.css('display') === 'inline' || $link.css('display') === 'inline-block') {
        if (Drupal.settings.extlink.extUseFontAwesome) {
          if (class_name === Drupal.settings.extlink.mailtoClass) {
            $link[icon_placement]('<span class="fa-' + class_name + ' extlink"><span class="fa fa-envelope-o" title="' + Drupal.settings.extlink.mailtoLabel + '"></span><span class="element-invisible">' + Drupal.settings.extlink.mailtoLabel + '</span></span>');
          }
          else {
            $link[icon_placement]('<span class="fa-' + class_name + ' extlink"><span class="fa fa-external-link" title="' + Drupal.settings.extlink.extLabel + '"></span><span class="element-invisible">' + Drupal.settings.extlink.extLabel + '</span></span>');
          }
        }
        else {
          if (class_name === Drupal.settings.extlink.mailtoClass) {
            $link[icon_placement]('<span class="' + class_name + '"><span class="element-invisible">' + Drupal.settings.extlink.mailtoLabel + '</span></span>');
          }
          else {
            $link[icon_placement]('<span class="' + class_name + '"><span class="element-invisible">' + Drupal.settings.extlink.extLabel + '</span></span>');
          }
        }
      }
    }
  };

  Drupal.behaviors.extlink = Drupal.behaviors.extlink || {};
  Drupal.behaviors.extlink.attach = function (context, settings) {
    // Backwards compatibility, for the benefit of modules overriding extlink
    // functionality by defining an "extlinkAttach" global function.
    if (typeof extlinkAttach === 'function') {
      extlinkAttach(context);
    }
    else {
      Drupal.extlink.attach(context, settings);
    }
  };

})(jQuery);
;
