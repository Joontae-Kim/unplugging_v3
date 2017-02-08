$('#choose').on('click', function() {
	var itm = $('#type').data('target');
	var subitm = $('#type').data('sub-target');
	var hr = $('#selhr').find("option:selected").val();
	var day = $('#selday').find("option:selected").data('day');
	var nl = null;
	if(subitm==nl||hr==0||day==0){
		if(subitm==nl){
			$("#type").addClass("err");
	        $("#type").tooltip({title: "제품을 선택해주세요"});
	        $("#type").tooltip('show');
		    setTimeout(function () {
		        $('#type').tooltip('destroy');
	    	}, 1000);
		} else if(day==0){
	        $("#period").tooltip('show');
			setTimeout(function () {
			    $('#period').tooltip('hide');
		    }, 1000);
		} else if(hr==0){
	        $("#hour").tooltip('show');
			    setTimeout(function () {
			        $('#hour').tooltip('hide');
		    }, 1000);
	    }
	} else{
		$('.btn-block').button('loading');
		var totalWatt = Number($('#watt').data('total-watt'));
		var unit = Number(1000);
		var ref = new Firebase("https://electricbillcount.firebaseio.com/appliancelist/"+itm+"/"+subitm+"/");
		ref.on("value", function(snapshot) {
			var itemInfo = snapshot.val();
			var Watt = itemInfo.ConsumeWatt;
			var cal = Number(Watt) * Number(hr) * Number(day);
			totalWatt = Math.floor(Number(totalWatt) + (Number(cal)/Number(unit)));
			$('#watt').data('total-watt',totalWatt);
			var itemNm = $('#type').data('target');
			var itemSeason = $('#slide_'+itemNm).data('item-season');
			var itemPlace = $('#slide_'+itemNm).data('item-place');
			var appName =  $('#app_nm').html();
			seasonCalculate(itemSeason,cal,itemPlace);
			rankingCalculate(itm,subitm,appName,cal,itemSeason,itemPlace,day,hr);
			consumeCost('watt');
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		})
	}
});

var seasonCalculate = function(season, cal, itemPlace) {
    var ss = $('#watt').data('total-spring');
    var ssm = $('#watt').data('total-summer');
    var sf = $('#watt').data('total-fall');
    var sw = $('#watt').data('total-winter');
    var total = $('#watt').data('total-watt');
    var unit = 1000;
    if(cal > 0) {
    	var cal = Math.floor(cal/unit);
    } else if(cal < 0){
    	var cal = cal;
    }
    switch(season) {
	    case 'all':
	    	ssR = Number(ss) + Number(cal);
	    	ssmR = Number(ssm) + Number(cal);
	    	sfR = Number(sf) + Number(cal);
	    	swR = Number(sw) + Number(cal);
		    $('#watt').data('total-spring',ssR);
		    $('#watt').data('total-summer',ssmR);
		    $('#watt').data('total-fall',sfR);
		    $('#watt').data('total-winter',swR);
		    //원본
    		consumeCost('spring');consumeCost('summer');consumeCost('fall');consumeCost('winter');
    		placeCalculate(itemPlace,'spring',cal);placeCalculate(itemPlace,'summer',cal);
    		placeCalculate(itemPlace,'fall',cal);placeCalculate(itemPlace,'winter',cal);
	        break;
	    case 'summer':
		    ssmR = Number(ssm) + Number(cal);
		    $('#watt').data('total-summer',ssmR);
		    consumeCost('summer');
		    placeCalculate(itemPlace,'summer',cal);
	        break;
	    case 'winter':
		    swR = Number(sw) + Number(cal);
		    $('#watt').data('total-winter',swR);
		    consumeCost('winter');
		    placeCalculate(itemPlace,'winter',cal);
	        break;
	}
};

var placeCalculate = function(place, season ,cal) {
    var kt = $('#watt').data('total-'+season+'-kitchen');
    var lv = $('#watt').data('total-'+season+'-living');
    var ssn = $('#watt').data('total-'+season+'-season');
    var total = $('#watt').data('total-'+season+'-watt');
    switch(place) {
	    case 'kitchen':
		    kt = kt + cal;
		    $('#watt').data('total-'+season+'-kitchen',kt);
	        break;
	    case 'living':
		    lv = lv + cal;
		    $('#watt').data('total-'+season+'-living',lv);
	        break;
	    case 'season':
		    ssn = ssn + cal;
		    $('#watt').data('total-'+season+'-season',ssn);
	        break;
	}
	placePercentage(place,season);
};

var placePercentage = function(place,season){
	var total = $('#watt').data('total-'+season);
    var kt = $('#watt').data('total-'+season+'-kitchen');
    var lv = $('#watt').data('total-'+season+'-living');
    var ssn = $('#watt').data('total-'+season+'-season');
    switch(place) {
	    case 'kitchen':
			$('#cost').data('cost-'+season+'-'+place+'-per',((kt/total)*100||0).toFixed(1));
			$('#cost').data('cost-'+season+'-living-per',((lv/total)*100||0).toFixed(1));
			$('#cost').data('cost-'+season+'-season-per',((ssn/total)*100||0).toFixed(1));
	        break;

	    case 'living':
			$('#cost').data('cost-'+season+'-'+place+'-per',((lv/total)*100||0).toFixed(1));
			$('#cost').data('cost-'+season+'-kitchen-per',((kt/total)*100||0).toFixed(1));
			$('#cost').data('cost-'+season+'-season-per',((ssn/total)*100||0).toFixed(1));
	        break;

	    case 'season':
			$('#cost').data('cost-'+season+'-'+place+'-per',((ssn/total)*100||0).toFixed(1));
			$('#cost').data('cost-'+season+'-kitchen-per',((kt/total)*100||0).toFixed(1));
			$('#cost').data('cost-'+season+'-living-per',((lv/total)*100||0).toFixed(1));
	        break;
	}
	var total_per = Number($('#cost').data('cost-'+season+'-kitchen-per')) + Number($('#cost').data('cost-'+season+'-living-per')) + Number($('#cost').data('cost-'+season+'-season-per'));
};

var appArray = new Array();
var sprArray = new Array();
var sumArray = new Array();
var falArray = new Array();
var winArray = new Array();
// var rankingCalculate = function(itm,subitm,appName,cal) { //원래 버전
var rankingCalculate = function(itm,subitm,appName,cal,itemSeason,itemPlace,day,hr) {
	console.log('rankingCalculate - Start')
    var unit = 1000;
    var cal = Math.floor(cal/unit);
    var rnd = Math.floor(Math.random()*10000000);
	Array.prototype.putseaonArr = function(itm,subitm,appName,cal,rnd,itemSeason,itemPlace,day,hr) {
	    this.push({ID: itm, SubItm: subitm, ItemName: appName, Watt: cal, Serial: rnd, Season:itemSeason, Place:itemPlace, Useday: day, Usehour: hr});
		this.sort(function appArray_sort(a,b) {
			return b.Watt - a.Watt;
		});
	}
	
	appArray.putseaonArr(itm,subitm,appName,cal,rnd,itemSeason,itemPlace,day,hr);
	$('#dis_count').text(appArray.length);
	var cardNumber = appArray.length;
	switch(itemSeason){
		case 'all':
			sprArray.putseaonArr(itm,subitm,appName,cal,rnd,itemSeason,itemPlace,day,hr);
			sumArray.putseaonArr(itm,subitm,appName,cal,rnd,itemSeason,itemPlace,day,hr);
			falArray.putseaonArr(itm,subitm,appName,cal,rnd,itemSeason,itemPlace,day,hr);
			winArray.putseaonArr(itm,subitm,appName,cal,rnd,itemSeason,itemPlace,day,hr);
			break;
		case 'summer':
			sumArray.putseaonArr(itm,subitm,appName,cal,rnd,itemSeason,itemPlace,day,hr);
			break;
		case 'winter':
			winArray.putseaonArr(itm,subitm,appName,cal,rnd,itemSeason,itemPlace,day,hr);
			break;
	}

	if (itm === 'item14'||itm === 'item18'||itm === 'item22'||itm === 'item24'||itm === 'item25') {
		var subItem = $(subitm).data('sub');
		var labelText = $('#'+subitm).data('read');
	} else {
		var labelText = $('label[for="' + subitm + '"]').html();
	}
	var periodText = $('#period').html();
	var hourText = $('#hour').html();
	$('#userAppstatus').before('<div class="card text-center" id="card'+cardNumber+'"><h4>'+cardNumber+ "번"+
		'</h4><h4>'+appName+'<small> '+labelText+'</small></h4><h4>'+periodText+', '+hourText+'</h4><hr>'+
		'<button type="button" id=deleteBtn'+cardNumber+' class="btn btn-warning btn-sm removeAppcard col-xs-offset-7" data-itm='+itm+' data-sub='+subitm+' data-cal='+cal+' data-serial='+rnd+' data-season='+itemSeason+'>삭제</button></div>');

	$('#deleteBtn'+cardNumber).on('click',function(){
		var main = $(this).data('itm');
		var sub = $(this).data('sub');
		var substractWatt = $(this).data('cal');
		var appSerial = $(this).data('serial');
		var substractWatt =-substractWatt;
		var item_Place = $('#slide_'+main).data('item-place');
		var item_Season = $('#slide_'+main).data('item-season');
		var total = $('#watt').data('total-watt');
		total = total+substractWatt;
		$('#watt').data('total-watt',total);
		seasonCalculate(item_Season, substractWatt);
		placeCalculate(item_Place, item_Season, substractWatt);
		Array.prototype.getIndexbyid = function(itm, appSerial) {
			var thlen = this.length
			for(var i=0;i<thlen;i++){
			    if(this[i].ID === itm && this[i].Serial === appSerial) {
			      this.splice(i,1);
			      return i
			    }
			}
		}
		appArray.getIndexbyid(main, appSerial);
		switch(itemSeason){
			case 'all':
				sprArray.getIndexbyid(main, appSerial);
				sumArray.getIndexbyid(main, appSerial);
				falArray.getIndexbyid(main, appSerial);
				winArray.getIndexbyid(main, appSerial);
				break;
			case 'summer':
				sumArray.getIndexbyid(main, appSerial);
				break;
			case 'winter':
				winArray.getIndexbyid(main, appSerial);
				break;
		}		
		var parCard = $(this).parent().attr('id');
		$('#'+parCard).remove();
		$('#dis_count').text(appArray.length);
	})
};


var consumeCost = function(whr) {
	console.log('consumeCost - Start')
	var tax = Number(0.1);
	var fund_tax = Number(0.037);
	var totalWt = Math.floor($('#watt').data('total-'+whr));
	if(totalWt > -1 && totalWt < 201){
        level = Number(1);
        first_cost = Math.floor(bse_cost(base[0].ConsumeFee));
        secon_cost = Math.floor(totalWt * elec[0].ConsumeFee);
        org_third_cost = first_cost + secon_cost;
        nec=nec(totalWt,org_third_cost);wel=wel(org_third_cost,nec);fam=fam(org_third_cost,nec,wel);
        wel_total = Math.floor(weltra(nec,fam,wel));
        third_cost = Math.floor(org_third_cost - wel_total);
        fourth_cost = Math.round(third_cost * tax);
        fifth_cost = Math.floor((third_cost * fund_tax)/10)*10;
        totalCost = Math.floor((third_cost + fourth_cost + fifth_cost)/10)*10;

	} else if (totalWt < 401 && totalWt > 200) {
        level = Number(2);
        first_cost = Math.floor(base[1].ConsumeFee);
        secon_cost1 = Math.floor(200 * elec[0].ConsumeFee);
        secon_cost2 = Math.floor((totalWt-200) * elec[1].ConsumeFee);
        secon_cost = Math.floor(secon_cost1 + secon_cost2);
        org_third_cost = first_cost + secon_cost;
        nec=nec(totalWt,org_third_cost);wel=wel(org_third_cost,nec);fam=fam(org_third_cost,nec,wel);
        wel_total = Math.floor(weltra(nec,fam,wel));
        third_cost = Math.floor(org_third_cost - wel_total);
        fourth_cost = Math.round(third_cost * tax);
        fifth_cost = Math.floor((third_cost * fund_tax)/10)*10;
        totalCost = Math.floor((third_cost + fourth_cost + fifth_cost)/10)*10;

	} else if(totalWt < 1001 && totalWt > 400) {
        level = Number(3);
        first_cost = Math.floor(base[2].ConsumeFee);
        secon_cost1 = Math.floor(200 * elec[0].ConsumeFee);
        secon_cost2 = Math.floor(200 * elec[1].ConsumeFee);
        secon_cost3 = Math.floor((totalWt-400) * elec[2].ConsumeFee);
        secon_cost = Math.floor(secon_cost1 + secon_cost2 + secon_cost3);
        org_third_cost = first_cost + secon_cost;
        nec=nec(totalWt,org_third_cost);wel=wel(org_third_cost,nec);fam=fam(org_third_cost,nec,wel);
        wel_total = weltra(nec,fam,wel);
        third_cost = Math.floor(org_third_cost - wel_total);
        fourth_cost = Math.round(third_cost * tax);
        fifth_cost = Math.floor((third_cost * fund_tax)/10)*10;
        totalCost = Math.floor((third_cost + fourth_cost + fifth_cost)/10)*10;

	} else if(totalWt > 1000){
		level = Number(3);
        first_cost = Math.floor(base[2].ConsumeFee);
        secon_cost1 = Math.floor(200 * elec[0].ConsumeFee);
        secon_cost2 = Math.floor(200 * elec[1].ConsumeFee);
        secon_cost3 = Math.floor(600 * elec[2].ConsumeFee);
        var super_Cost = superCost(wt);
        secon_cost = Math.floor(secon_cost1 + secon_cost2 + secon_cost3 + super_Cost);
        org_third_cost = first_cost + secon_cost;
        nec=nec(totalWt,org_third_cost);wel=wel(org_third_cost,nec);fam=fam(org_third_cost,nec,wel);
        wel_total = weltra(nec,fam,wel);
        third_cost = Math.floor(org_third_cost - wel_total);
        fourth_cost = Math.round(third_cost * tax);
        fifth_cost = Math.floor((third_cost * fund_tax)/10)*10;
        totalCost = Math.floor((third_cost + fourth_cost + fifth_cost)/10)*10;
	}
	
	if(whr === 'watt') {
	} else if(whr === "spring" || whr === "summer" || whr ==="fall" || whr === "winter") {
        $('#cost').data('cost-'+ whr,totalCost);
		$('#watt').data('watt-' + whr +'-level', level);
		$('#cost').data('total-'+ whr + '-level',level);
		$('#cost').data('total-'+ whr + '-base', first_cost);
		$('#cost').data('total-'+ whr + '-elec',secon_cost);
		$('#cost').data('total-'+ whr + '-org_third_cost',org_third_cost);
		$('#cost').data('total-'+ whr + '-wel_total', wel_total);
		$('#cost').data('total-'+ whr + '-basetotal', third_cost);
		$('#cost').data('total-'+ whr + '-vat', fourth_cost);
		$('#cost').data('total-'+ whr + '-fund', fifth_cost);
		$('#cost').data('total-'+ whr + '-total', totalCost);
		var seasonCost = $('#cost').data('total-'+ season + '-total');
		$('#watt').text(displayNum(seasonCost));
	}

	//복지할인 
	function wel(bf_third_cost,nec) {
		var benefit1 = $("#selwelfare1 option:selected").data('benefit');
		var benefit2 = $("#selwelfare2 option:selected").data('benefit');
		var opid1 = $("#selwelfare1 option:selected").data('opid');
		var opid2 = $("#selwelfare2 option:selected").data('opid');
		console.log()
		switch(opid2) {
		    case 'wel20':
		        return 0;
		        break;
		    case 'wel21':
		    case 'wel22':
		    case 'wel23':
		    case 'wel24':
		    	if(bf_third_cost < 16000){
		    		return bf_third_cost;
		    	} else {
		    		return Number(benefit2);
		    	}
		    case 'wel28':
		    	var dis = bf_third_cost*benefit2;
		    	if(dis < 16000){
		    		return dis;
		    	} else {
		    		return Number(benefit2);
		    	}
		    case 'wel25':
		    	if(bf_third_cost < 10000) {
		    		return bf_third_cost;
		    	} else if(bf_third_cost > 10000)
			        return Number(benefit2);
		        break;
		    case 'wel26':
		    	if(bf_third_cost < 8000) {
		    		return bf_third_cost;
		    	} else if(bf_third_cost > 8000)
			        return Number(benefit2);
		        break;
		    case 'wel27':
		    	var befor = ((bf_third_cost - nec)*benefit2);
		    	return befor;
		    	break;
		}
	}

	//필수 사용량 보장공제 && 슈퍼유저 요금제 계산 함수
	function nec(wt,bf_third_cost){
		var housetype = $(':radio[name="house"]:checked').data('house-type');
		if(wt<201){
			switch (housetype){
				case 'higher' :
					var after_dis = +bf_third_cost-Number(2500);
					if(after_dis < 1000){
						return Math.abs(-bf_third_cost+1000);
						break;
					} else {
						return 2500;
						break;
					};
				case 'lower' :
					var after_dis = +bf_third_cost-Number(4000);
					if(after_dis < 1000){
						return Math.abs(-bf_third_cost+1000);
						break;
					} else {
						return 4000;
						break;
					};
				} 
		} else{
			return 0;
		}
	};

	function superCost(wt){
		var housetype = $(':radio[name="house"]:checked').data('house-type');
		switch (housetype){
			case 'higher' :
				var after_fee = (wt-1000)*Number(574.6);
				return after_fee;
				break;
			case 'lower' :
				var after_fee = (wt-1000)*Number(709.5);
				return after_fee;
				break;
			}
	};


	function bse_cost(base_cost){
		var housetype = $(':radio[name="house"]:checked').data('house-type');
		switch (housetype){
			case 'lower':
				return base_cost;
				break;
			case 'higher':
				// return base_cost *0.5;
				return base_cost;
				break;
		}
	};

	//가족 할인요금 계산 함수 (생명유지 장치, 3자녀 이상, 대가족 할인, 출산 가정)
	//하계복지 할인계산 미적용 상태
	function fam(org_third_cost,nec,wel){
		var benefit1 = $("#selwelfare1 option:selected").data('benefit');
		var opid1 = $("#selwelfare1 option:selected").data('opid');
		var opid2 = $("#selwelfare2 option:selected").data('opid');
		switch(opid1){
			case 'wel10':
				return 0;
				break;
			case 'wel11':
		    	var dis = (org_third_cost - wel)*benefit1;
		    	return dis;
		    	break
			case 'wel12':
			case 'wel13':
			case 'wel14':
				if ( opid2 == 'wel24' || opid2 == 'wel25' || opid2 =='wel26') {
					var dis = ((org_third_cost - wel)*benefit1);
					if(dis > 16001) {
						return Number(16000);
						break
					} else {
						return dis;
						break
					}
				} else {
			    	var dis = ((org_third_cost - nec)*benefit1);
					if(dis > 16001){
						return Number(16000);
						break
					} else if(dis < 16001){
						return dis;
						break
					}					
				}
		}
	};


	// a=nec, b=family, c=welfare;
	function weltra(a,b,c,bf_third_cost) {
		var opid1 = $("#selwelfare1 option:selected").data('opid');
		var opid2 = $("#selwelfare2 option:selected").data('opid');
		switch(opid2){
			//장애인, 국가유공자, 독립유공자, 사회복지시설, 5.18 민주화유공자
			case 'wel20':
				return Number(a)+Number(b);
				break;
			case 'wel21':
			case 'wel22':
			case 'wel23':
			case 'wel28':
				var bft1=a+b; var bft2=c;
				if(bft1 > bft2){
					return Math.floor(bft1);
					break
				} else if(bft1 < bft2) {
					return Math.floor(bft2)
					break
				} else if(bft1 == bft2) {
					return Math.floor(bft2)
					break;
				}
			case 'wel27':
				var bft3=a+b; var bft4=a+c;
				if(bft3 > bft4){
					return Math.floor(bft3);
					break
				} else if(bft3 < bft4) {
					return Math.floor(bft4)
					break
				} else if(bft3 == bft4) {
					return Math.floor(bft3)
					break;
				}
			case 'wel24':
			case 'wel25':
			case 'wel26':
				return Math.floor(b + c);
				break
		}
	};
  	$('.btn-block').button('reset');
}