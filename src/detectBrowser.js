/**
 * detectBrowser.js
 * Version: 1.0.1
 *
 * A tool discern browser and device user using.
 *
 * This detects 
 * - device (PC / Android / iPhone / iPad / Windows Phone)
 * - tablet or not
 * - browser (InternetExplorer, Firefox, Chrome, Safari, Opera)
 * - browser version (IE only)
 *
 * Copyright (c) 2013 wgkoro ( http://zafiel.wingall.com/ )
 *
 * Released under MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 **/

(function($){
	var methods	= {
		ua		: null,
		cache	: null,
		device_pattern		: ['iphone', 'ipad', 'android', 'windows phone'],
		browser_pattern		: ['firefox', 'opera', 'chrome', 'safari', 'msie', 'mozilla'],
		tablet_pattern		: [],
		result		: {
			mobile		: null,
			is_tablet	: false,
			browser		: null,
			ie_version	: null
		},

		// for test
		setUa		: function(ua_str){
			this.ua	= ua_str.toLowerCase();
		},

		addDevicePattern	: function(pattern){
			if(! pattern){return}

			this.device_pattern.push(pattern);
			this.cache	= null;
		},

		addTabletPattern	: function(pattern){
			if(! pattern){return}

			this.tablet_pattern.push(pattern);
			this.cache	= null;
		},

		detect		: function(){
			if(this.cache){return this.cache}

			if(! this.ua){
				this.ua	= navigator.userAgent.toLowerCase();
			}

			if(this.isMobile()){
				return this.returnObj();
			}

			var ie_version	= this.isIE();
			if(ie_version){
				this.result.browser		= 'ie';
				this.result.ie_version	= ie_version;
				return this.returnObj();
			}

			this.result.browser	= this.whichBrowser();
			return this.returnObj();
		},

		returnObj	: function(){
			this.result.ua	= navigator.userAgent;
			this.cache		= this.result;
			return	this.cache;
		},

		isMobile	: function(){
			var reg		= new RegExp(this.device_pattern.join('|'), 'i');
			var result	= this.ua.match(reg);
			if(! result){return false}

			var device	= result[0];
			this.result.mobile	= device;
			this.result.browser	= this.whichBrowser();

			if(device == 'ipad'){
				this.result.is_tablet	= true;
			}

			if(device == 'android' && this.isAndroidTablet()){
				this.result.is_tablet	= true;
			}

			return true;
		},

		/**
		 * CAUTION: This method cannot detect few Android tablets(Android2.x).
		 * http://blog.flexfirm.jp/mysta/545/
		 * http://googlewebmastercentral-ja.blogspot.jp/2012/11/giving-tablet-users-full-sized-web.html
		 **/
		isAndroidTablet	: function(){
			if(this.checkTabletPattern()){
				return true;
			}

			if(! this.ua.match('mobile')){
				return true;
			}

			return false;
		},

		checkTabletPattern	: function(){
			var len	= this.tablet_pattern.length;
			if(! len){return false}

			for(var i=0;i<len;i++){
				var reg	= new RegExp(this.tablet_pattern[i], 'i');
				if(this.ua.match(reg)){
					return true;
				}
			}

			return false;
		},

		isIE	: function(){
			if(window.ActiveXObject){
				// IE8 〜
				if(document.documentMode){
					return document.documentMode;
				}

				if(typeof document.documentElement.style.maxHeight == 'undefined'){return 6}
				if(typeof document.querySelectorAll == 'undefined'){return 7}

				return 6;
			}

			// IE11 doesn't have window.ActiveXObject, but it has document.documentMode.
			if(document.documentMode){
				return document.documentMode;
			}

			return false;
		},

		whichBrowser	: function(){
			var len		= this.browser_pattern.length
			for(var i=0;i<len;i++){
				var pattern	= this.browser_pattern[i];
				if(this.ua.match(pattern)){
					return pattern.replace('ms', '');	// Remove strings 'ms' from 'msie'
				}
			}

			return 'unknown';
		}
	};

	$.detectBrowser = {
		isIE	: function(){
			return methods.isIE();
		},

		addTabletPattern	: function(pattern_str){
			methods.addTabletPattern(pattern_str);
		},

		addDevicePattern	: function(pattern_str){
			methods.addDevicePattern(pattern_str);
		},

		detect	: function(){
			var result	= methods.detect();
			return result;
		},

		mobile	: function(){
			return this.detect().mobile;
		},

		is_tablet	: function(){
			return this.detect().is_tablet;
		},

		browser	: function(){
			return this.detect().browser;
		},

		ie_version	: function(){
			return this.detect().ie_version;
		},

		ua	: function(){
			return this.detect().ua;
		}
	};
})(jQuery);
