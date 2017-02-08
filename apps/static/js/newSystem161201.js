$(function() {
	$('#kw').change(function(){
        var chk=/[0-9]/.test(this.value);
        if(chk==false){
        	$(this).val('');
	    	alert("숫자만 입력 가능합니다")
        }
    });

	$('#calBtn').on('click',function(){
		var wt = $('#kw').val();
		var houseRadio = $('input:radio[name=house]').is(':checked');
		if(houseRadio==false){
			alert("주거형태를 선택해주세요")
		} else if(wt==''){
	    	alert("월간 전력량을 입력해주세요")
		} else{
			consumeCost(wt);
		}
	});
})

// selwelfare
var welrray1 = [{"txt":"해당없음","read":"해당없음","benefit":"0"},{"txt":"생명유지 장치","read":"생명유지 장치","benefit":"0.3"},{"txt":"3자녀이상 가구","read":"3자녀이상 가구","benefit":"0.3"},
			{"txt":"5인이상 가구","read":"5인이상 가구","benefit":"0.3"}, {"txt":"출산 가구","read":"출산 가구","benefit":"0.3"}];

var welrray2 = [{"txt":"해당없음","read":"해당없음","benefit":"0"},{"txt":"장애인","read":"장애인","benefit":"16000"},{"txt":"국가유공자","read":"국가유공자","benefit":"16000"},
			{"txt":"독립유공자","read":"독립유공자","benefit":"16000"}, {"txt":"기초생활수급자(생계 및 의료급여)","read":"기초생활수급자(생계 및 의료급여)","benefit":"16000"}, 
			{"txt":"기초생활수급자(주거 및 교육급여)","read":"기초생활수급자(주거 및 교육급여)","benefit":"10000"}, {"txt":"차상위계층","read":"차상위계층","benefit":"8000"},
			{"txt":"사회복지시설","read":"사회복지시설","benefit":"0.3"},{"txt":"5.18 민주화유공자","read":"5.18 민주화유공자","benefit":"16000"}];

var wlen1 = welrray1.length;
var wlen2 = welrray2.length;
var wl_option1 = '<option class="text-center" data-read="'+welrray1[0].read+'" data-benefit="'+welrray1[0].benefit+'" data-opid="wel1'+0+'" selected>'+welrray1[0].txt +'</option>';
    for (var w = 1; w < wlen1; w++) {
      wl_option1 += '<option class="text-center" data-read="' + welrray1[w].read+'" data-benefit="'+welrray1[w].benefit+'" data-opid="wel1'+w+'" >' + welrray1[w].txt + '</option>';
    }
var wl_option2 = '<option class="text-center" data-read="'+welrray2[0].read+'" data-benefit="'+welrray2[0].benefit+'" data-opid="wel2'+0+'" selected>'+welrray2[0].txt +'</option>';
    for (var w = 1; w < wlen2; w++) {
      wl_option2 += '<option class="text-center" data-read="' + welrray2[w].read+'" data-benefit="'+welrray2[w].benefit+'" data-opid="wel2'+w+'" >' + welrray2[w].txt + '</option>';
    }
$("#selwelfare1").html(wl_option1);
$("#selwelfare2").html(wl_option2);



//write sel_wel to welfare text
$('.selwelfare').on('change',function() {
    var selw_id = this.id;
    var txt = $("#"+selw_id+" option:selected").text();
    var benefit = $("#"+selw_id+" option:selected").data('benefit');
    var opid = $("#"+selw_id+" option:selected").data('opid');
});

var consumeCost = function(wt) {
	var tax = Number(0.1);
	var fund_tax = Number(0.037);
	var totalWt = Number(wt);
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
        console.log('secon_cost = ' + secon_cost1 + ' ' + secon_cost2 + ' ' + secon_cost3 + ' ' + secon_cost);
        org_third_cost = first_cost + secon_cost;
        nec=nec(totalWt,org_third_cost);wel=wel(org_third_cost,nec);fam=fam(org_third_cost,nec,wel);
        console.log('nec = ' +nec + ' fam = ' + fam + ' wel= ' + wel);
        wel_total = weltra(nec,fam,wel);
        console.log('wel_total = ' + wel_total);

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
        console.log('secon_cost = ' + secon_cost1 + ' ' + secon_cost2 + ' ' + secon_cost3 + ' ' + super_Cost + ' ' + secon_cost);
        org_third_cost = first_cost + secon_cost;

        nec=nec(totalWt,org_third_cost);wel=wel(org_third_cost,nec);fam=fam(org_third_cost,nec,wel);
        console.log('nec = ' +nec + ' fam = ' + fam + ' wel= ' + wel);
        wel_total = weltra(nec,fam,wel);
        console.log('wel_total = ' + wel_total);

        third_cost = Math.floor(org_third_cost - wel_total);
        fourth_cost = Math.round(third_cost * tax);
        fifth_cost = Math.floor((third_cost * fund_tax)/10)*10;
        totalCost = Math.floor((third_cost + fourth_cost + fifth_cost)/10)*10;
	}

	console.log('totalCost = '+ totalCost);
	$('#won').val(displayNum(totalCost));
    console.log('level = ' + level);
	$('#level').text(level + " 단계");
	console.log('first_cost = ' + first_cost);
	$('#bse').text(displayNum(first_cost) + " 원");
	console.log('secon_cost = ' + secon_cost);
	$('#ele').text(displayNum(secon_cost) + " 원");
	console.log('wel_total = ' + wel_total);
	$('#wl').text(displayNum(wel_total) + " 원");
	console.log('third_cost = ' +third_cost);
	$('#bsett').text(displayNum(third_cost) + " 원");
	console.log('fourth_cost = ' +fourth_cost);
	$('#vat').text(displayNum(fourth_cost) + " 원");
	console.log('totalCost = ' + fifth_cost);
	$('#fund').text(displayNum(fifth_cost) + " 원");
	console.log('totalCost = ' + totalCost);
	$('#tt').text(displayNum(totalCost) + " 원");
	

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
		    	console.log('nec  = ' + nec + '  bf_third_cost  =  ' + bf_third_cost + ' benefit2 = ' + benefit2);
		    	var befor = ((bf_third_cost - nec)*benefit2);
		    	console.log('wel   ~   wel27 - befor = ' + befor);
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
	}


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
	}

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
		    	console.log('wel  = ' + wel + '  org_third_cost  =  ' + org_third_cost + ' benefit1 = ' + benefit1);
		    	var dis = (org_third_cost - wel)*benefit1;
		    	return dis;
		    	break
			case 'wel12':
			case 'wel13':
			case 'wel14':
				if ( opid2 == 'wel24' || opid2 == 'wel25' || opid2 =='wel26') {
					console.log('wel  = ' + wel + '  org_third_cost  =  ' + org_third_cost + ' benefit1 = ' + benefit1);
					var dis = ((org_third_cost - wel)*benefit1);
					console.log('wel  ~   wel27 - befor = ' + dis);
					if(dis > 16001) {
						return Number(16000);
						break
					} else {
						return dis;
						break
					}
				} else {
			    	console.log('nec  = ' + nec + '  org_third_cost  =  ' + org_third_cost + ' benefit1 = ' + benefit1);
			    	var dis = ((org_third_cost - nec)*benefit1);
			    	console.log('nec  ~   wel27 - befor = ' + dis);
					if(dis > 16001){
						return Number(16000);
						break
					} else if(dis < 16001){
						return dis;
						break
					}					
				}
		}
	}


	// a=nec, b=family, c=welfare;
	function weltra(a,b,c,bf_third_cost) {
		console.log('nec = ' + a + ' fam = ' + b + ' welfare = ' + c);
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
}