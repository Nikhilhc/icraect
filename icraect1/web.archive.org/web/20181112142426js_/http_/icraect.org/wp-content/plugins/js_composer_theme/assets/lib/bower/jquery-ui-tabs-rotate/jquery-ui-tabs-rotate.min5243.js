!function($){$.extend($.ui.tabs.prototype,{rotation:null,rotationDelay:null,continuing:null,rotate:function(ms,continuing){var self=this,o=this.options;(ms>1||null===self.rotationDelay)&&void 0!==ms&&(self.rotationDelay=ms),void 0!==continuing&&(self.continuing=continuing);var rotate=self._rotate||(self._rotate=function(e){clearTimeout(self.rotation),self.rotation=setTimeout(function(){var t=o.active;self.option("active",++t<self.anchors.length?t:0)},ms),e&&e.stopPropagation()}),stop=self._unrotate||(self._unrotate=continuing?function(e){t=o.active,rotate()}:function(e){e.clientX&&self.rotate(null)});return ms?(this.element.bind("tabsactivate",rotate),this.anchors.bind(o.event+".tabs",stop),rotate()):(clearTimeout(self.rotation),this.element.unbind("tabsactivate",rotate),this.anchors.unbind(o.event+".tabs",stop),delete this._rotate,delete this._unrotate),1===ms&&(ms=self.rotationDelay),this},pause:function(){var self=this;this.options;self.rotate(0)},unpause:function(){var self=this;this.options;self.rotate(1,self.continuing)}})}(jQuery);
/*
     FILE ARCHIVED ON 14:24:26 Nov 12, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:22:14 Aug 14, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  PetaboxLoader3.datanode: 216.532 (4)
  CDXLines.iter: 12.732 (3)
  exclusion.robots.policy: 0.166
  RedisCDXSource: 1.617
  LoadShardBlock: 498.62 (3)
  esindex: 0.016
  load_resource: 117.775
  PetaboxLoader3.resolve: 364.965 (2)
  captures_list: 516.081
  exclusion.robots: 0.179
*/