$(function() {
    createSeasonData();
    createPlaceData();
    getTimeStamp();
    preventTab();
    screenWidth();
});

var createSeasonData = function() {
    var season_arr = ['spring','summer','fall','winter'];
    var si = season_arr.length;
    var i=0;
    for(i=0;i<si;i++){
        $('#watt').data('watt-'+ season_arr[i]+'-level',0);
        $('#cost').data('cost-'+ season_arr[i],0);
        $('#watt').data('total-' + season_arr[i],0);
    }
};

var createPlaceData = function() {
    //원본
    var parr = ['kitchen','living','season','total'];var pal=parr.length;
    var sarr = ['spring','summer','fall','winter']; var sap = sarr.length;
    for(var i=0;i<sap;i++){
        var sName = sarr[i];
        for(var q=0;q<pal;q++){
            $('#watt').data('total-'+sName+'-'+parr[q],0);
            $('#cost').data('cost-'+sName+'-'+parr[q],0);
            $('#cost').data('cost-'+sName+'-'+parr[q]+'-per',0);
        }
    }
};

var getTimeStamp = function() {
    var d = new Date();
    s =
        leadingZeros(d.getFullYear(), 4) + '.' +
        leadingZeros(d.getMonth() + 1, 2) + '.' +
        leadingZeros(d.getDate(), 2);

    console.log('s = ' + s);
    // return s;
    var s_month = s.split(".")[1];
    console.log('s_month = ' + s_month);
    getSeason(s_month);
};

function getSeason(month) {
    winter = '12,01,02,';
    spring = '03,04,05,';
    summer = '06,07,08,';
    fall = '09,10,11,';
    season = 'unknown';
    if (winter.indexOf(month) != -1) {
        season = 'winter';
    } else if (spring.indexOf(month) != -1) {
        season = 'spring';
    } else if (summer.indexOf(month) != -1) {
        season = 'summer';
    } else if (fall.indexOf(month) != -1) {
        season = 'fall';
    }
    var nec = ['level','base','elec','org_third_cost','wel_total','basetotal','vat','fund','total'];
    var ni= nec.length;
    for (var i = 0;i<ni; i++) {
        $('#cost').data('total-'+ season +'-'+ nec[i],0);
    }
};

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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


var screenWidth = function(){
    var sw = screen.width;
    console.log(sw);
    var coltype7 = "col-xs-7"
    var coltype8 = "col-xs-8"
    var offtype0 = "col-xs-offset-0";
    var offtype1 = "col-xs-offset-1";
    var offtype2 = "col-xs-offset-2";
    var offtype3 = "col-xs-offset-3";
    var offtype5 = "col-xs-offset-5";
    var offtype6 = "col-xs-offset-6";
    var offtype7 = "col-xs-offset-7";
    var offtype8 = "col-xs-offset-8";
    var txtcen = "text-center";
    if(sw < 360){
        $('.sw320_0').addClass(offtype0);
        $('.sw320_1').addClass(offtype1);
        $('.sw320_8_col').addClass(coltype8);
    } else if(sw > 359 && sw < 375) {
        $('.sw360_0').addClass(offtype0);
        $('.sw360_1').addClass(offtype1);
        $('.sw360_8_col').addClass(coltype8);
    } else if (sw > 374 && sw < 388) {
        $('.sw375_0').addClass(offtype0);
        $('.sw375_1').addClass(offtype1);
        $('.sw375_2').addClass(offtype2);
        $('.sw375_8_col').addClass(coltype8)
    } else if(sw > 387 && sw < 480) {
        $('.sw400_1').addClass(offtype1);
        $('.sw400_2').addClass(offtype2);
        $('.sw400_3').addClass(offtype3);
        $('.sw400_5').addClass(offtype5);
        $('.sw400_7_col').addClass(coltype7);
        $('.sw400_8_col').addClass(coltype8);
    } else if(sw > 479 && sw < 720){
        // $('#myModal').modal({backdrop: 'static', keyboard: false});
        $('.txtcen').addClass(txtcen);
        $('.sw479_2').addClass(offtype2);
        $('.sw479_3').addClass(offtype3);
        $('.sw479_5').addClass(offtype5);
        $('.sw479_6').addClass(offtype6);
        $('.sw479_7_col').addClass(coltype7);
    } else if(sw > 719 && sw < 801){
        $('#myModal').modal({backdrop: 'static', keyboard: false});
        $('.txtcen').addClass(txtcen);
        $('.sw800_8_col').addClass(coltype8);
    }
};

function preventTab(){
    var sw = screen.width;
    if (sw > 580 && sw < 999) {
        $('#myModal').modal({backdrop: 'static', keyboard: false})
    }
}