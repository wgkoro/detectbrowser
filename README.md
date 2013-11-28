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
var result = $.detectBrowser.detect();

/*
 Check user using mobile device or not.
 return null ... Using PC.
 return String ... Using mobile device. (String ... "android", "iphone", "ipad", "windows phone")
 */
console.log(result.mobile);

/*
 Check user using tablet or not.
 return boolean ... true: using tablet, false: not tablet.
 */
console.log(result.is_tablet);

/*
 Return which browser user using.
 return String ... "ie", "firefox", "chrome", "safari", "opera", "mozilla"
 */
console.log(result.browser);

/*
 If user using Internet Explorer, this returns IE version number.
 return null ... User not using IE.
 return Integer ... IE version (6〜). Example: If user using IE11, this returns 11.
 */
console.log(result.ie_version);

/*
 Return browser user agent.
 */
console.log(result.ua);
```

## Option

If you just want to check "IE or not", you can use "isIE()" method.

```javascript
var ie_version = $detectBrowser.isIE();
if(ie_version){
	console.log("This is IE! version:%s", ie_version);
}
else{
	console.log("Not IE");
}
```
