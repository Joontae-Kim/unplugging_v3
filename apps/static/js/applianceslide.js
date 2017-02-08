$(function() {
	//set each slide's appliance name
	var slideNm = function() {
		var appnm_len = appname_list.length;
		for (var i=0;i<appnm_len;i++){
			var appId = appname_list[i].Id;
			var appNm = appname_list[i].name;
			var appUnit = appname_list[i].unit;
			$("#slide_"+appId).data("appnm",appNm);
			$("#slide_"+appId).data("appunit",appUnit);
		}
	}

	var $slider1 = $('.bxslider2').bxSlider({
        prevSelector: '#slider-prev2',
        nextSelector: '#slider-next2',
		auto: false,
		mode:'horizontal', //'horizontal' //fade
		touchEnabled: false,
		adaptiveHeight: false,
		infiniteLoop: false,
		pager: false,
		controls: true,
        prevText: '<img src="http://i.imgur.com/AKjTWvT.png" id="slidprev2" class="pull-left" height="30" width="30"/>',
        nextText: '<img src="http://i.imgur.com/TZDsPC0.png" id="slidafter2" class="pull-right" height="30" width="30"/>',
		onSliderLoad: function (currentIndex, $slideElement){
	        var prev = currentIndex + 1;
	        $("#slidprev2").css("visibility", "hidden");
	        $("#currentapplist").html(prev);
	        slideNm();
	    },
	    onSlideBefore: function ($slideElement, oldIndex, newIndex){
	        var next = newIndex + 1;
	        $("#currentapplist").html(next);
	        var slideid = $($slideElement).attr('id');
	        var itemid = slideid.slice(6);
	        var slidenm = $("#"+slideid).data("appnm");
	        var slideunit = $("#"+slideid).data("appunit");
	        var tp_selector = $("#type");
	        $(tp_selector).data('target',itemid);
	        $("#app_nm").html(slidenm);
	        $("#app_unit").html(slideunit);
	        $(tp_selector).html(slidenm);
	        $(tp_selector).removeData('sub-target');
	        var chk = $('.slide_page2 input[name="item_'+itemid+'"]:checked')[0];
			$(tp_selector).attr('data-original-title','')
			$(tp_selector).attr('title','')
	        if(typeof chk === 'undefined'){
	        } else{
	        	var chk_id = $(chk).attr('id')
	        	var labelNm = $('label[for="'+chk_id+'"]').html();
	        	var tp_selector = $("#type");
	        	$(tp_selector).tooltip({title: labelNm , html: true, container:"body", placement: "bottom"}, 'toggle'); 
				$(tp_selector).data('target',itemid);
				$(tp_selector).data('sub-target',chk_id);
	        }
	    }
	});

	$('.slide_page2 input[type="radio"]').click(function() {
		var chk = $('#'+this.id).is(":checked");
		if(chk) {
			var radio_id = this.id
			var radio_nm = ($('#'+radio_id).attr('name')).slice(5);
		    var labelNm = $('label[for="'+radio_id+'"]').html();
			$('#type').data('target',radio_nm);
			$('#type').data('sub-target',this.id);
			$('#type').removeClass('err');
			$('#type').attr("data-original-title",labelNm);
			$('#type').attr("title",labelNm);
			$("#type").tooltip('show');
	       	setTimeout(function () {
	        	$("#type").tooltip('destroy');
	       	}, 1000);
		}
	});

	//period select option
	var prray = [{"txt": "매일 매일","read":"매일","day": 30},{"txt": "일주일 동안","read":"일주일","day": 4},{"txt": "한달 동안","read":"한달","day": 1}];
	var plen = prray.length;
	var pr_option = '<option class="text-center" data-read="선택" data-day="0" value="0" selected="selected">선택</option>';
		for (var pr = 0; pr < plen; pr++) {
		  pr_option += '<option class="text-center" data-read="' + prray[pr].read+'" data-day="'+prray[pr].day+'">' + prray[pr].txt + '</option>';
		}
	$("#selday").html(pr_option);

	//hour select option
	var hr_option = '<option class="text-center" selected="selected" value="0">선택</option>';
		for (var tm = 1; tm < 25; tm++) {
			hr_option += "<option class='text-center' value='" + tm + "'>" + tm + " 시간" + "</option>";
		}
	$("#selhr").html(hr_option);

	// selwelfare
	// var welrray1 = [{"txt":"해당없음","read":"해당없음","benefit":"0"},{"txt":"생명유지 장치","read":"생명유지 장치","benefit":"100"},{"txt":"3자녀이상 가구","read":"3자녀이상 가구","benefit":"0.2"},{"txt":"5인이상 가구","read":"5인이상 가구","benefit":"12000"}];
	// var welrray2 = [{"txt":"해당없음","read":"해당없음","benefit":"0"},{"txt":"장애인","read":"장애인","benefit":"8000"},{"txt":"국가유공자","read":"국가유공자","benefit":"8000"},{"txt":"상이유공자","read":"상이유공자","benefit":"8000"},{"txt":"기초생활수급자","read":"기초생활수급자","benefit":"8000"},
	// {"txt":"독립유공자","read":"독립유공자","benefit":"8000"},{"txt":"사회복지시설","read":"사회복지시설","benefit":"0.216"},{"txt":"차상위계층","read":"차상위계층","benefit":"2000"}];
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
		console.log('sel = ' + selw_id + ' '+ txt + '  ' +  benefit + ' ' + opid);
	});


	//prev pager ui script
	var prevv = function (){	
		var slideQty = $slider1.getSlideCount();
		var current = $slider1.getCurrentSlide();
		var netslideQty = slideQty - 1;
		if(current == "1") {
			$("#slidprev2").css("visibility", "hidden");
		} else if(current == netslideQty) {
			$("#slidafter2").css("visibility", "visible");
		} else {
			$("#slidprev2").css("visibility", "visible");
			$("#slidafter2").css("visibility", "visible");
		}
	};

	//after pager ui script
	var afterr = function (){	
		var slideQty = $slider1.getSlideCount();
		var current = $slider1.getCurrentSlide();
		var netslideQty = slideQty - 1;
		var prevfinal = slideQty - 2;
		if(current == "1") {
			$("#slidprev2").css("visibility", "visible");
		} else if(current == prevfinal) {
			$("#slidafter2").css("visibility", "hidden");
		} else {
			$("#slidprev2").css("visibility", "visible");
			$("#slidafter2").css("visibility", "visible");
		}
	};

	//2nd slide's chk appliance delete script
	slidefade = function (arr) {
		console.log("arr = " + arr);
		var i=0;
		var len = arr.length;
		for(i=0;i<len;i++){
			var slidenm = arr[i];
			$("#"+slidenm).remove();
		}
		$slider1.reloadSlider();
		$("#slidprev2").on("click",prevv);
		$("#slidafter2").on("click",afterr);
	};
});