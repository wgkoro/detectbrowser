detectBrowser.js
===================

A tool discern browser and device user using.  

This detects  
- device (PC / Android / iPhone / iPad / Windows Phone)
- tablet or not
- browser (InternetExplorer, Firefox, Chrome, Safari, Opera)
- browser version (IE only)

Copyright (c) 2013 wgkoro ( http://zafiel.wingall.com/ )

Released under MIT license:  
http://www.opensource.org/licenses/mit-license.php

## Basic Usage

```javascript
/*
 Check user using mobile device or not.
 null ... Using PC.
 <String> ... Using mobile device. (String ... "android", "iphone", "ipad", "windows phone")
 */
console.log($.detectBrowser.mobile());

/*
 Check user using tablet or not.
 <Boolean> true: using tablet, false: not tablet.
 */
console.log($.detectBrowser.isTablet());

/*
 Browser name which browser user using.
 <String> ... "ie", "firefox", "chrome", "safari", "opera", "mozilla"
 */
console.log($.detectBrowser.browser());

/*
 If user using Internet Explorer, this returns IE version number.
 null ... User not using IE.
 <Integer> ... IE version (6〜). Example: If user using IE11, this returns 11.
 */
console.log($.detectBrowser.ieVersion());

/*
 Return browser user agent.
 */
console.log($.detectBrowser.ua());

/*
 Do you want all above info? Try using "detect()" method.
 "detect" method returns abject includes all info.
 */
var all = $.detectBrowser.detect();
console.log(all);
// all.mobile
// all.is_tablet
// all.ie_version
// all.browser
// all.ua
```

## Options

If you just want to check "IE or not", you can use "isIE()" method.

```javascript
var ie_version = $detectBrowser.isIE();
if(ie_version){
	console.log("This is IE! Version: %s", ie_version);
}
else{
	console.log("Not IE");
}
```

To add tablet matching pattern, use "addTabletPattern('RegExp String')".

```javascript
$detectBrowser.addTabletPattern("SC-01C");
if($detectBrowser.isTablet()){
	alert("tablet!");
}
```
