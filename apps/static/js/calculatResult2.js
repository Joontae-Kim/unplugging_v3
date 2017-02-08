$(function() {
  user();
  getTimeStamp();
  var sprArr = [];var flArr = [];var smArr = [];var wtArr = [];
  var sprArr2 = [];var flArr2 = [];var smArr2 = [];var wtArr2 = [];
  var options = {
    pieSliceText: 'percentage',
    pieSliceTextStyle: {'fontSize':11},
    legend: {position:'right',textStyle: { color: 'black', fontSize: 12}},
    backgroundColor:'none',
    width: 300,
    height: 270, // height: 250,
    chartArea: {left:10, top:10,'width': '100%', 'height': '100%'}
  };

  var userInf = new Firebase("https://electricbillcount.firebaseio.com/users/"+user());
  userInf.on("value", function(snapshot) {
    var rtPth = snapshot.val();
      $('.sdisNm').text(rtPth.name);
  });

  var usrBss = new Firebase("https://electricbillcount.firebaseio.com/billInfo/"+user()+'/userInfo');
  usrBss.on("value", function(snapshot) {
    var rtPth = snapshot.val();
      $('#sadj').text('주거용 ' + htype(rtPth.houseType.adjust));
      $('#dadj').html('주거용 ' + htype(rtPth.houseType.adjust) + ' <span class="glyphicon glyphicon-exclamation-sign"  aria-hidden="true"></span>');
      $('#shous').text(rtPth.houseType.lb);
      $('#sfam').text(rtPth.familyType.lb + ' 가족');
      $('#dwFapt').text(dwFam('대가족 할인',rtPth.welFare.famNlife.lb));
      $('#dwWelapt').text(dwFam('복지 할인',rtPth.welFare.welfare.lb));
  });

  var usrSmr = new Firebase("https://electricbillcount.firebaseio.com/billInfo/"+user()+'/userBoard/'+getTimeStamp()+'/Bills');
  usrSmr.on("value", function(snapshot) {
    var rtPth = snapshot.val();
    $('.slevel, .dlevel').text(rtPth.Level + ' 단계');
    $('.dir_cle').addClass(lvBckColor(rtPth.Level));
    $('.scost, .dtotal').text(displayNum(rtPth.toTal) + ' 원');
    $('#sdate').text(s);
    $('#sconsm').text(rtPth.consumpTion + ' kW');
    $('#sapplen').text(rtPth.arrLen + ' 개');
    
    $('#dbse').text(displayNum(rtPth.Base)+ ' 원');
    $('#delec').text(displayNum(rtPth.Elec)+ ' 원');
    $('#dwel').text(displayNum(rtPth.wl)+ ' 원');
    $('#dbasetotal').text(displayNum(rtPth.bsetotal)+ ' 원');
    $('#dvat').text(displayNum(rtPth.vaT)+ ' 원');
    $('#dfund').text(displayNum(rtPth.Fund)+ ' 원');
  });

  var ref = new Firebase("https://electricbillcount.firebaseio.com/billInfo/"+user()+'/userBoard');
  ref.on("child_added", function(snapshot,prevChildKey) {
    var keY = snapshot.key();
    var vaL = snapshot.val();
    
    var ref2 = new Firebase("https://electricbillcount.firebaseio.com/billInfo/"+user()+'/userBoard/'+keY +'/Bills');
    ref2.on("value", function(snapshot, prevChildKey) {
      var costName = snapshot.key();
      var costValue = snapshot.val();
      seasonSumm(replace(keY),costValue.Level, costValue.toTal, costValue.consumpTion, costValue.arrLen);
    });

    var ref3 = new Firebase("https://electricbillcount.firebaseio.com/billInfo/"+user()+'/userBoard/'+keY +'/group');
    ref3.on("child_added", function(snapshot, prevChildKey) {
      var costName = snapshot.key();
      var costValue = snapshot.val();
      bargraph(replace(keY),replace(costName),costValue.consumption, costValue.shrCost, costValue.shr);
    });

    var ref4 = new Firebase("https://electricbillcount.firebaseio.com/billInfo/"+user()+'/userBoard/'+keY +'/each');
    ref4.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var costName = snapshot.key();
        var childData = childSnapshot.val();
        switch (keY){
          case 'spring':
            sprArr.seasonArr(childData.App,childData.sItm,childData.AppNm,Number(childData.consumPtion),Number(childData.shr),Number(childData.shrCost),childData.place,childData.Day,childData.Hour);
            sprArr2.chartArray(childData.AppNm,Number(childData.consumPtion));
            break;
          case 'summer':
            smArr.seasonArr(childData.App,childData.sItm,childData.AppNm,Number(childData.consumPtion),Number(childData.shr),Number(childData.shrCost),childData.place,childData.Day,childData.Hour);
            smArr2.chartArray(childData.AppNm,Number(childData.consumPtion));
            break;
          case 'fall':
            flArr.seasonArr(childData.App,childData.sItm,childData.AppNm,Number(childData.consumPtion),Number(childData.shr),Number(childData.shrCost),childData.place,childData.Day,childData.Hour);
            flArr2.chartArray(childData.AppNm,Number(childData.consumPtion));
            break;
          case 'winter':
            wtArr.seasonArr(childData.App,childData.sItm,childData.AppNm,Number(childData.consumPtion),Number(childData.shr),Number(childData.shrCost),childData.place,childData.Day,childData.Hour);
            wtArr2.chartArray(childData.AppNm,Number(childData.consumPtion));
            break;
        }
      });
        switch (keY){
          case 'spring':
            esepGrp(sprArr,keY);
            rnkTable(sprArr,keY);
            sprmakingPie(season, sprArr2, options);
            break
          case 'summer':
            esepGrp(smArr,keY);
            rnkTable(smArr,keY);
            smmakingPie(season, smArr2, options);
            break
          case 'fall':
            esepGrp(flArr,keY);
            rnkTable(flArr,keY);
            flmakingPie(season, flArr2, options);
            break
          case 'winter':
            esepGrp(wtArr,keY);
            rnkTable(wtArr,keY);
            wtmakingPie(season, wtArr2, options);
            break
        }
    })
  })
});

function user(){
  var ref = new Firebase("https://electricbillcount.firebaseio.com");
  var authData = ref.getAuth();
    if (authData) {
      return authData.uid;
    } else{
      window.location.replace("/membership");
  }
};

function seasonSumm(seas,lv, cost, watt, len){
  $('#'+seas+'level').text(lv + ' 단계');
  $('.'+seas+'level').addClass(lvBckColor(lv));
  $('#'+seas+'Cost').text(displayNum(cost) + ' 원');
  $('#'+seas+'Watt').text(displayNum(watt) + ' kW');
  $('#'+seas+'Len').text(len + ' 개');
  $('.'+seas+'level').addClass(lv);
}

function barDataprtc(seas, arr){
  var xVals = arr.map(function(obj) { return obj[2]; });
  var max = Math.max.apply(null, xVals);
  var i;var len=arr.length;
  for(var i=0;i<len;i++){
    if(max === arr[i][2]){
       var maxi=i;
    }
  }
  $('.'+seas+'grp').text(nmTranslate(arr[maxi][0]));
  $('#'+seas+'grpShr').text(max + ' %');
  $('#'+seas+'grpCost').text(displayNum(arr[maxi][3]));
}

var sppl=[];var smpl=[];var flpl=[];var wtpl=[];
function bargraph(seas,place,watt,cost,shr){
  $('#'+seas+place+'Cost').text(displayNum(cost) + ' 원');
  $('#'+seas+place+'Watt').text(displayNum(watt) + ' kW');
  $('#'+seas+place+'Shr').text(shr + ' %');
  $('#'+seas+place+'Shrbar').css('width',shr+'%');
  switch (seas){
    case 'spr':
      sppl.push([place, watt, shr, cost]);
      barDataprtc(seas, sppl);
      break;
    case 'sm':
      smpl.push([place, watt, shr, cost]);
      barDataprtc(seas, smpl);
      break;
    case 'fl':
      flpl.push([place, watt, shr, cost]);
      barDataprtc(seas, flpl);
      break;
    case 'wt':
      wtpl.push([place, watt, shr, cost]);
      barDataprtc(seas, wtpl);
      break;
  }
}

function esepGrp(seaArr,season){
   var seaplace = seaArr.seasonPlace();
   var e='';var el=seaplace.length;
   for(var e=0;e<el;e++){
    var nm = replace(season)+replace(seaplace[e][0]);
    $('#'+nm+'Count').text(seaplace[e][1] + ' 개');
   }
}

Array.prototype.seasonArr = function(itm,subitm,appName,cal,shr,shrCost,place,day,hour){
  this.push([itm, subitm, appName, cal, shr, shrCost,place,day,hour]);
  this.sort(function appArray_sort(a,b) {
    return b[4] - a[4];
  })
};

Array.prototype.chartArray = function(appName,cal) {
  this.push([appName, cal]);
};

Array.prototype.seasonPlace = function() {
  var k=0; var klen = this.length;var kit=0;var liv=0;var sea=0;
  for(var k=0;k<klen;k++){
    var place=this[k][6]; 
    if(place === 'kitchen'){
     kit+=1;
    } else if(place === 'living'){
     liv+=1;
    } else if(place === 'season'){
     sea+=1;
    }
  }
  var groupArr = [['kitchen',kit],['living',liv],['season',sea]];
  groupArr.sort(
    function(a, b){
      return b[1] - a[1]
  })
  return groupArr;
};

Array.prototype.eachPlace = function() {
  var tblcts = [];
  var numRows2 = this.length;
  if(numRows2<5){
    for (var i = 0; i < numRows2; i++){
      tblcts.push([this[i][2],(this[i][3]).toFixed(1),this[i][4],(this[i][5]).toFixed(0),this[i][6]]);
    }
  } else {
    for (var i = 0; i < 5; i++){
      tblcts.push([this[i][2],(this[i][3]).toFixed(1),this[i][4],(this[i][5]).toFixed(0),this[i][6]]);
    }
  }
  return tblcts;
};

function rnkTable(seaArr,season){
  var rnkCtn = seaArr.eachPlace();
  var t;var tlen = rnkCtn.length;var ctnTr='';
  for(var t=0;t<tlen;t++){
    ctnTr +="<tr class='text-center'><td>"+(t+1)+"</td><td>"+rnkCtn[t][0]+"</td><td>"+rnkCtn[t][1]+"</td><td>"+displayNum(rnkCtn[t][3])+"</td><td>"+(rnkCtn[t][2]).toFixed(1)+"</td></tr>"
  }// 번호, 제품명, 전력사용량, 요금, 비율
  $('#'+replace(season)+'Tbl').append(ctnTr);
  var fter;var cspt=0;var cst=0;var shrCost=0;

  // wtTblfoot
  if(tlen<5){
    for (var t = 0; t < tlen; t++){
      cspt+=Number(rnkCtn[t][1]);cst+=Number(rnkCtn[t][3]);shrCost+=Number(rnkCtn[t][2].toFixed(2));
    }
  } else {
    for (var t = 0; t < 5; t++){
      cspt+=Number(rnkCtn[t][1]);cst+=Number(rnkCtn[t][3]);shrCost+=Number(rnkCtn[t][2].toFixed(2));
    }
  }
  var fter ="<tr class='active text-center'><td> - </td><td> 총합 </td><td>"+(cspt).toFixed(1)+"</td><td>"+displayNum(cst)+"</td><td>"+(shrCost).toFixed(1)+"</td></tr>"
  $('#'+replace(season)+'Tblfoot').append(fter);
};

function lvBckColor(lv){
  console.log(lv);
  switch (lv) {
    case 1:
      console.log('fi');
      return 'fi';
      break;
    case 2:
      console.log('se');
      return 'se';
      break;
    case 3:
      console.log('th');
      return 'th';
      break;
    case 4:
      console.log('fo');
      return 'fo';
      break;
    case 5:
      console.log('fif');
      return 'fif';
      break;
    case 6:
      console.log('si');
      return 'si';
      break;
  }
}