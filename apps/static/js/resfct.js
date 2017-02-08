$(function() {
    browserLayout();
});

var leadingZeros = function(n, digits) {
    var zero = '';
    n = n.toString();
    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
};

function displayNum(x) {
    console.log('x = ' + x);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function browserLayout(){
    var deviceTp = getDeviceType();
    var browserTp = getBrowserType();
    if(deviceTp =='mobile' && browserTp == 'SamsungBrowser'){
        $('.page_frame').css('margin-top','0.0rem');
    }
}

function getBrowserType(){
    var _ua = navigator.userAgent;
    var rv = -1;
     
    //IE 11,10,9,8
    var trident = _ua.match(/Trident\/(\d.\d)/i);
    if( trident != null )
    {
        if( trident[1] == "7.0" ) return rv = "IE" + 11;
        if( trident[1] == "6.0" ) return rv = "IE" + 10;
        if( trident[1] == "5.0" ) return rv = "IE" + 9;
        if( trident[1] == "4.0" ) return rv = "IE" + 8;
    }
     
    //IE 7...
    if( navigator.appName == 'Microsoft Internet Explorer' ) return rv = "IE" + 7;
    /*
    var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if(re.exec(_ua) != null) rv = parseFloat(RegExp.$1);
    if( rv == 7 ) return rv = "IE" + 7; 
    */
     
    //other
    var agt = _ua.toLowerCase();
    if (agt.indexOf("samsungbrowser") != -1) return 'SamsungBrowser';
    if (agt.indexOf("chrome") != -1) return 'Chrome';
    if (agt.indexOf("opera") != -1) return 'Opera'; 
    if (agt.indexOf("firefox") != -1) return 'Firefox'; 
    if (agt.indexOf("safari") != -1) return 'Safari';
    if (agt.indexOf("netscape") != -1) return 'Netscape'; 
    if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
}

function getDeviceType(){
    var filter = "win16|win32|win64|mac|macintel";
    var d = document;
    if ( navigator.platform ) {
        if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
        return 'mobile';
    } else {
        return 'pc';
        }
    }
}   