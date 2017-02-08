function htype(house){
    switch(house) {
        case 'lower':
            return '저압'
            break;
        case 'higher':
            return '고압'
            break;
    }
};

function dwFam(word,hslb){
    if(hslb === '해당없음'){
        var txt = word +' 해당없음';
      return txt;
    } else{
      return hslb;
    }
};

function displayNum(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//콤마풀기
function uncomma(str) {
    var strplit = str.split(' ')
    // str = String(str);
    return strplit[0].replace(/[^\d]+/g, '');
}

function leadingZeros(n, digits) {
var zero = '';
n = n.toString();
if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
        zero += '0';
}
return zero + n;
};

function getTimeStamp() {
    var d = new Date();
    s =
        leadingZeros(d.getFullYear(), 4) + '.' +
        leadingZeros(d.getMonth() + 1, 2) + '.' +
        leadingZeros(d.getDate(), 2);

    console.log('s = ' + s);
    // return s;
    var s_month = s.split(".")[1];
    // console.log('s_month = ' + s_month);

    winter = '12,01,02,';
    spring = '03,04,05,';
    summer = '06,07,08,';
    fall = '09,10,11,';
    season = 'unknown';
    if (winter.indexOf(s_month) != -1) {
        season = 'winter';
    } else if (spring.indexOf(s_month) != -1) {
        season = 'spring';
    } else if (summer.indexOf(s_month) != -1) {
        season = 'summer';
    } else if (fall.indexOf(s_month) != -1) {
        season = 'fall';
    }
    console.log("season = " + season);
    return season;
};
function replace(sea){
    switch(sea) {
        case 'spring':
            return 'spr'
            break;
        case 'summer':
            return 'sm'
            break;
        case 'fall':
            return 'fl'
            break;
        case 'winter':
            return 'wt'
            break;
        case 'kitchen':
            return 'kit'
            break;
        case 'living':
            return 'lv'
            break;
        case 'season':
            return 'ss'
            break;
    }
}

function nmTranslate(sea){
    switch(sea) {
        case 'kit':
            return '주방'
            break;
        case 'lv':
            return '생활'
            break;
        case 'ss':
            return '계절'
            break;
        case 'kitchen':
            return '주방'
            break;
        case 'living':
            return '생활'
            break;
        case 'season':
            return '계절'
            break;
        case 'spring':
            return '봄'
            break;
        case 'summer':
            return '여름'
            break;
        case 'fall':
            return '가을'
            break;
        case 'winter':
            return '겨울'
            break
    }
}