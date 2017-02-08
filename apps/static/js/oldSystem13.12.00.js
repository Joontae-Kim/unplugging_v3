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
//period select option
var prray = [{"txt": "매일 매일","read":"매일","day": 30},{"txt": "일주일 동안","read":"일주일","day": 4},{"txt": "한달 동안","read":"한달","day": 1}];
var plen = prray.length;
var pr_option = '<option class="text-center" data-read="선택" data-day="0" value="0" selected="selected">선택</option>';
    for (var pr = 0; pr < plen; pr++) {
      pr_option += '<option class="text-center" data-read="' + prray[pr].read+'" data-day="'+prray[pr].day+'">' + prray[pr].txt + '</option>';
    }
$("#selday").html(pr_option);

//hour select option
var hr_option = '<option selected="selected" value="0">선택</option>';
    for (var tm = 1; tm < 25; tm++) {
        hr_option += "<option class='text-center' value='" + tm + "'>" + tm + " 시간" + "</option>";
    }
$("#selhr").html(hr_option);

// selwelfare
var welrray1 = [{"txt":"해당없음","read":"해당없음","benefit":"0"},{"txt":"생명유지 장치","read":"생명유지 장치","benefit":"100"},{"txt":"3자녀이상 가구","read":"3자녀이상 가구","benefit":"0.2"},{"txt":"5인이상 가구","read":"5인이상 가구","benefit":"12000"}];
var welrray2 = [{"txt":"해당없음","read":"해당없음","benefit":"0"},{"txt":"장애인","read":"장애인","benefit":"8000"},{"txt":"국가유공자","read":"국가유공자","benefit":"8000"},{"txt":"상이유공자","read":"상이유공자","benefit":"8000"},{"txt":"기초생활수급자","read":"기초생활수급자","benefit":"8000"},
{"txt":"독립유공자","read":"독립유공자","benefit":"8000"},{"txt":"사회복지시설","read":"사회복지시설","benefit":"0.216"},{"txt":"차상위계층","read":"차상위계층","benefit":"2000"}];
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
	if(totalWt == 0){
		totalCost =0;

	} else if (totalWt < 10) {
        level = Number(1);
        first_cost = base[0].ConsumeFee;
        secon_cost = Math.floor(totalWt * elec[0].ConsumeFee);
        org_third_cost = Number(1000);
        kd=kid(org_third_cost);fd=0;wel=wel(org_third_cost-fd);
        wel_total = weltra(kd,fd,wel);
        third_cost = org_third_cost - wel_total;
        fourth_cost = Math.round(third_cost * tax);
        fifth_cost = Math.floor((third_cost * fund_tax)/10)*10;
        totalCost = Math.floor((third_cost + fourth_cost + fifth_cost)/10)*10;

	} else if(totalWt < 101) {
        level = Number(1);
        first_cost = base[0].ConsumeFee;
        secon_cost = Math.floor(totalWt * elec[0].ConsumeFee);
        org_third_cost = first_cost + secon_cost;
        kd=kid(org_third_cost);fd=0;wel=wel(org_third_cost-fd);
        wel_total = weltra(kd,fd,wel);
        third_cost = org_third_cost - wel_total;
        fourth_cost = Math.round(third_cost * tax);
        fifth_cost = Math.floor((third_cost * fund_tax)/10)*10;
        totalCost = Math.floor((third_cost + fourth_cost + fifth_cost)/10)*10;

	} else if(totalWt < 201){
		level = Number(2);
        first_cost = base[1].ConsumeFee;
        af_first_cost = baseCost(1,first_cost,totalWt); //famNlife discount
        secon_cost1 = Math.floor(100 * elec[0].ConsumeFee);
        secon_cost2 = Math.floor((totalWt-100) * elec[1].ConsumeFee);
        secon_cost = secon_cost1 + secon_cost2;
        org_third_cost = first_cost + secon_cost1 + secon_cost2;
        kd=kid(org_third_cost);fd=0;wel=wel(org_third_cost-fd);
        wel_total = weltra(kd,fd,wel);
        third_cost = org_third_cost - wel_total;
        fourth_cost = Math.round(third_cost * tax);
        fifth_cost = Math.floor((third_cost * fund_tax)/10)*10;
        totalCost = Math.floor((third_cost + fourth_cost + fifth_cost)/10)*10;

	} else if(totalWt < 301){
		level = Number(3);
        first_cost = base[2].ConsumeFee;
        af_first_cost = baseCost(2,first_cost,totalWt); //famNlife discount
        secon_cost1 = Math.floor(100 * elec[0].ConsumeFee);
        secon_cost2 = Math.floor(100 * elec[1].ConsumeFee);
        secon_cost3 = Math.floor((totalWt-200) * elec[2].ConsumeFee);
        secon_cost = secon_cost1 + secon_cost2 + secon_cost3;
        org_third_cost = first_cost + secon_cost1 + secon_cost2 + secon_cost3;
        kd=kid(org_third_cost);fd=0;wel=wel(org_third_cost-fd);
        wel_total = weltra(kd,fd,wel);
        third_cost = org_third_cost - wel_total;
        fourth_cost = Math.round(third_cost * tax);
        fifth_cost = Math.floor((third_cost * fund_tax)/10)*10;
        totalCost = Math.floor((third_cost + fourth_cost + fifth_cost)/10)*10;

	} else if(totalWt < 401) {
		level = Number(4);
        first_cost = base[3].ConsumeFee;
        af_first_cost = baseCost(3,first_cost,totalWt); //famNlife discount
        secon_cost1 = Math.floor(100 * elec[0].ConsumeFee);
        secon_cost2 = Math.floor(100 * elec[1].ConsumeFee);
        secon_cost3 = Math.floor(100 * elec[2].ConsumeFee);
        secon_cost4 = Math.floor((totalWt-300) * elec[3].ConsumeFee);
        af_secon_cost_4 = secon(totalWt-300,3); //famNlife discount
        secon_cost = secon_cost1 + secon_cost2 + secon_cost3 + secon_cost4;
        famCost = af_first_cost + af_secon_cost_4;
        org_third_cost = first_cost + secon_cost1 + secon_cost2 + secon_cost3 + secon_cost4;
        kd=kid(org_third_cost);fd=fam(famCost);wel=wel(org_third_cost-fd);
        wel_total = weltra(kd,fd,wel);
        third_cost = org_third_cost - wel_total;
        fourth_cost = Math.round(third_cost * tax);
        fifth_cost = Math.floor((third_cost * fund_tax)/10)*10;
        totalCost = Math.floor((third_cost + fourth_cost + fifth_cost)/10)*10;

	} else if(totalWt < 501) {
		level = Number(5);
        first_cost = base[4].ConsumeFee;
        af_first_cost = baseCost(4,first_cost,totalWt); //famNlife discount
        secon_cost1 = Math.floor(100 * elec[0].ConsumeFee);
        secon_cost2 = Math.floor(100 * elec[1].ConsumeFee);
        secon_cost3 = Math.floor(100 * elec[2].ConsumeFee);
        secon_cost4 = Math.floor(100 * elec[3].ConsumeFee);
        secon_cost5 = Math.floor((totalWt-400) * elec[4].ConsumeFee);
        secon_cost = secon_cost1 + secon_cost2 + secon_cost3 + secon_cost4 + secon_cost5;
        af_secon_cost_4 = secon(100,3); //famNlife discount
        af_secon_cost_5 = secon(totalWt-400,4); //famNlife discount
        famCost = af_first_cost + af_secon_cost_4 + af_secon_cost_5;
       	org_third_cost = first_cost + secon_cost;
        kd=kid(org_third_cost);fd=fam(famCost);wel=wel(org_third_cost-fd);
        wel_total = weltra(kd,fd,wel);
        third_cost = org_third_cost - wel_total;
        fourth_cost = Math.round(third_cost * tax);
        fifth_cost = Math.floor((third_cost * fund_tax)/10)*10;
        totalCost = Math.floor((third_cost + fourth_cost + fifth_cost)/10)*10;

	} else if(totalWt >= 501) {
		level = Number(6);
        first_cost = base[5].ConsumeFee;
        af_first_cost = baseCost(5,first_cost,totalWt); //famNlife discount
        secon_cost1 = Math.floor(100 * elec[0].ConsumeFee);
        secon_cost2 = Math.floor(100 * elec[1].ConsumeFee);
        secon_cost3 = Math.floor(100 * elec[2].ConsumeFee);
        secon_cost4 = Math.floor(100 * elec[3].ConsumeFee);
        secon_cost5 = Math.floor(100 * elec[4].ConsumeFee);
        secon_cost6 = Math.floor((totalWt-500) * elec[5].ConsumeFee);
        secon_cost = secon_cost1 + secon_cost2 + secon_cost3 + secon_cost4 + secon_cost5 + secon_cost6;
        af_secon_cost_4 = secon(100,3); //famNlife discount
        af_secon_cost_5 = secon(100,4); //famNlife discount
        af_secon_cost_6 = secon((totalWt-500),5); //famNlife discount
        famCost = af_first_cost + af_secon_cost_4 + af_secon_cost_5 + af_secon_cost_6;
		org_third_cost = first_cost + secon_cost;
        kd=kid(org_third_cost);fd=fam(famCost);wel=wel(org_third_cost-fd);
        wel_total = weltra(kd,fd,wel);
        third_cost = org_third_cost - wel_total;
        fourth_cost = Math.round(third_cost * tax);
        fifth_cost = Math.floor((third_cost * fund_tax)/10)*10;
        totalCost = Math.floor((third_cost + fourth_cost + fifth_cost)/10)*10;
	}

	$('#won').val(displayNum(totalCost));
    $('#tt').text(displayNum(totalCost) + " 원");
	$('#level').text(level + " 단계");
	$('#bse').text(displayNum(first_cost) + " 원");
	$('#ele').text(displayNum(secon_cost) + " 원");
	$('#wl').text(displayNum(wel_total) + " 원");
	$('#bsett').text(displayNum(third_cost) + " 원");
	$('#vat').text(displayNum(fourth_cost) + " 원");
	$('#fund').text(displayNum(fifth_cost) + " 원");
	$('#cost').text(displayNum(totalCost) + " 원");
	
	function wel(bf_third_cost) {
		var benefit1 = $("#selwelfare1 option:selected").data('benefit');
		var benefit2 = $("#selwelfare2 option:selected").data('benefit');
		var opid1 = $("#selwelfare1 option:selected").data('opid');
		var opid2 = $("#selwelfare2 option:selected").data('opid');
		switch(opid2) {
		    case 'wel20':
		        return 0;
		        break;
		    case 'wel21':
		    case 'wel22':
		    case 'wel23':
		    case 'wel24':
		    case 'wel25':
		    	if(bf_third_cost < 8000) {
		    		return bf_third_cost;
		    	} else if(bf_third_cost > 8000)
			        return Number(benefit2);
		        break;
		    case 'wel26':
		    	// console.log('third_cost = ' + (Number(bf_third_cost * Number(0.216))));
		        return Number(bf_third_cost * Number(0.216));
		        break;
		    case 'wel27':
		    	if(bf_third_cost < 2000) {
		    		// console.log('third_cost = ' + (bf_third_cost));
		    		return bf_third_cost;
		    	} else if(bf_third_cost > 2000)
			    	// console.log('third_cost = ' + (Number(benefit2)));
			        return Number(benefit2);
		        break;
		}
	}
}

	//3자녀 이상 복지할인
	function kid(org_third_cost) {
		var benefit1 = $("#selwelfare1 option:selected").data('benefit');
		var opid1 = $("#selwelfare1 option:selected").data('opid');
		switch(opid1){
			case 'wel10':
			case 'wel11':
			case 'wel13':
				var dis_child = 0;
				return dis_child;
			case 'wel12':
				var dis_child = Math.floor(org_third_cost*0.2);
				if(dis_child < 12000){
					var dis_child = dis_child;
				} else{
					var dis_child = 12000;
				}
				return dis_child;
				break;
		}
	}

	//대가족 요금할인 및 생명유지장치
	function fam(wlp){
		var benefit1 = $("#selwelfare1 option:selected").data('benefit');
		var opid1 = $("#selwelfare1 option:selected").data('opid');
		switch(opid1) {
			case 'wel10':
				return 0;
				break;
			case 'wel11':
				var wlp = Math.floor(wlp);
				return wlp;
				break;
			case 'wel12':
			case 'wel13':
				var watt = $('#watt').data('total-'+season);
				var wlp = Math.floor(wlp);
				if(watt < 301) {
					var wlp = 0;
				} else {
					if(wlp){
						if(wlp<12000) {
							var wlp = wlp;	
						} else {
							var wlp = 12000;
						}
				}
				return wlp;
				break;
				}
		}
	}

	//base_cost
	function baseCost(x,q,watt){
		var benefit1 = $("#selwelfare1 option:selected").data('benefit');
		var opid1 = $("#selwelfare1 option:selected").data('opid');
		switch(opid1) {
		    case 'wel10':
		        return q;
		        break;
		    case 'wel11':
		    case 'wel12':
		    case 'wel13':
		    	if(watt > 600) {
		    		var dis_base = 0;
		    	} else {
		    		var dis_base = (q - base[x-1].ConsumeFee);
		    	}
		    	return dis_base;
		        break;
		}
	}

	//secon_cost
	function secon(watt,x){
		var benefit1 = $("#selwelfare1 option:selected").data('benefit');
		var opid1 = $("#selwelfare1 option:selected").data('opid');
		switch(opid1) {
		    case 'wel10':
		    	return 0;
		        break;
		    case 'wel11':
		    case 'wel12':
		    case 'wel13':
		    	var y = Number(x)-1;
		    	var dis_consume = Number((elec[x].ConsumeFee - elec[y].ConsumeFee).toFixed(1));
		    	if(watt > 100) {
		    		var watt = 100;
		    	} else {
		    		var watt = watt
		    	}
		    	var dis_consume_price = Number(dis_consume*watt);
		    	var dis_consume_price = Math.round(dis_consume_price*100)/100;
		    	// 원단위 절사  = Math.floor(n/10) * 10;
		    	// console.log('dis_consume_price = '+ watt +' / ' + dis_consume_price);
		        return dis_consume_price;
		        break;
		}
	}

	// a=kid, b=family, c=welfare;
	function weltra(a,b,c) {
		var opid1 = $("#selwelfare1 option:selected").data('opid');
		var opid2 = $("#selwelfare2 option:selected").data('opid');
		// 3자녀이사 가구
		switch (opid1) {
			//아무것도 선택안했을때. but, 복지할인은 선택했을경우(선택하지 않아도 복지할인 요금은 0)
			case 'wel10':
				return c;
				break;
			//생명유지장치를 선택했을때. but, 복지할인은 선택했을경우(선택하지 않아도 복지할인 요금은 0)
			//다가족요금를 선택했을때. but, 복지할인은 선택했을경우(선택하지 않아도 복지할인 요금은 0)
			case 'wel11':
			case 'wel13':
				return a+b+c;
				break;
			//3자녀 요금제를 선택했을때. but, 복지할인은 선택했을경우(선택하지 않아도 복지할인 요금은 0)
			case 'wel12':
				var kdis = a;
				var fdis = b+c;
				if(kdis > fdis) {
					return kdis;
				} else{
					return fdis;
				}
				break;
		}
	}