$(function() {
	var slider = $('.bxslider').bxSlider({
        nextSelector: '#slider-next',
        // prevSelector: '#slider-prev',
		auto: false,
		mode:'horizontal', //'horizontal' //fade
		touchEnabled: false,
		adaptiveHeight: true,
		infiniteLoop: false,
		pager: false,
		controls: true,
        nextText: '<button type="button" id="slidepass" class="btn btn-primary btn-block disabled" > 선택완료 <span id="slidepass_count">0</span> / 2 </button>',
	    onSliderLoad: function (currentIndex){
	        $('.page_title_header .current-index').text(currentIndex + 1);
	        var prev = currentIndex + 1;
	        switch(prev) {
			    case 1:
			    	$("#page_title_h4").text(prev+". 요금정보 선택");
				    console.log("onSliderLoad " + prev);
			    	$("#slidepass").click(userbill);
			    	$('.info_tooltip').popover({
						content: "<p>1. 주거형태를 선택해주세요.</p><p>2. 해당되시는 할인혜택을 선택해주세요.</p> <p>3. 월간 사용량을 입력하시고, 계산하기를 눌러주세요.</p>", 
						html: true, placement: "bottom", 
						container: "body", trigger: "click"
					});
			        break;
			    case 2:
				    $("#page_title_h4").text(prev+". 가전제품 카테고리");
				    console.log("onSliderLoad " + prev);
			        break;
			    case 3:
			    	$("#page_title_h4").text(prev+". 사용패턴 선택");
			        $('[data-toggle="popover"]').popover({content: "가전제품 사용유무에 따라 아래의 제품을!"});
			        break;
			}
	    },
	    onSlideBefore: function ($slideElement, oldIndex, newIndex){
	        var next = newIndex + 1;
	        switch(next) {
			    case 1:
			    	$("#page_title_h4").text(next+". 요금 기본사항");
					$('.info_tooltip').popover({
						content: "<p>1. 주거형태를 선택해주세요.</p><p>2. 해당되시는 할인혜택을 선택해주세요.</p> <p>3. 월간 사용량을 입력하시고, 계산하기를 눌러주세요.</p>", 
						html: true, placement: "bottom", 
						container: "body", trigger: "click"
					});
			        break;
			    case 2:
					$('#guidepop').popover('destroy');
				    $("#page_title_h4").text(next+". 가전제품 카테고리");
			        $("#slidepass").text("선택완료");
			        $("#slidepass").on("click",kkk);
			        break;
			    case 3:
			    	$("#page_title_h4").text(next+". 사용패턴 선택");
			    	$("#slidepass").text("선택제품 보기");
			    	$("#slidepass").css("display","none");
			    	$("#checkupChoice").css("display","initial");
			        break;
			}	        
	    }
	});

	// 1st slide form validation
	$('#necform input').on('change', function() {
		var chk = $('input[name="house"]').is(":checked")
		var chk1 = $('input[name="family"]').is(":checked")
		if(chk && chk1) {
			$('#slidepass').removeClass('disabled');
			$('.outside').css('pointer-events','auto')
			$("#slidepass_count").text("2");
		} else {
			$('#slidepass').addClass('disabled');
			$('.outside').css('pointer-events','none')
			$("#slidepass_count").text("1");
		}
	});	

	//choose familytype and print it's appliance group
	$("#family1, #family2, #family3").click(function(){
		var chk = $(this).is(":checked");
		if(chk) {
		  sidechkr(this.id);
		} else{
		  sidechkr(this.id);
		}
	});

	$(".btn_default").click(function(){
		var cls = $(this).hasClass("btn_active");
		console.log(cls);
		if(cls){
		  	$(this).removeClass('btn_active');
		} else{
		  	$(this).addClass('btn_active');
		}
	});


	//familytype switch script before appliance recommendation appliance script
	var sidechkr = function(id) {
		$('.btn_default').removeClass('btn_active');
		var groupid = id + "Group";var i=0;
	    switch(groupid) {
	        case "family1Group":
	        case "family2Group":
			    $.each(family_type12, function (index, value) {
			      	var itmeid= value.Id;
					$("#"+itmeid).addClass('btn_active');
			    })
			    labelcount();
		        break;
	        case "family3Group":
			    $.each(family_type3, function (index, value) {
			      	var itmeid= value.Id;
					$("#"+itmeid).addClass('btn_active');
			    })
			    labelcount();
	          	break;
	    }	    
	}

	//auto checking to 1st slide's family type
	var sidechkr2 = function(group,id) {
		console.log(group,id);
		$('.btn_default').removeClass('btn_active');
		var state = $("#"+id).hasClass("btn_active");
		if (state) {
		    $.each(group, function (index, value) {
		      	var itmeid= value.Id;
				$("#"+itmeid).addClass('btn_active');
		    })
		}
	labelcount();
	};

	// count appalinace labels
	var labelcount = function () {
		var btn_click_len = $('.btn_active').length;
		$("#appliance_count").html(btn_click_len);
	}

	//create 2nd slide's no-chking appliane array
	var kkk = function() {  
		var delarr = new Array();
		$('.btn_default').each(function() {
			var kkk = $("#"+this.id).hasClass("btn_active");
			if(!kkk) {
			  	delarr.push("slide_"+this.id);
			}
		})
	slidefade(delarr);
	};

	//write period_sel to period text
	$('#selday').on('change',function() {
		var txt2 = $("#selday option:selected").data('read');
		$('#period').html(txt2);
	});

	//write hour_sel to hour text
	$('#selhr').on('change',function() {
		var txt = $("#selhr option:selected").text();
		console.log('selhr = ' + txt);
		$('#hour').html(txt);
	});	

	$(".btn_default").click(function(){
		var cls = $(this).hasClass("btn_active");
		if(cls){
		  	$(this).addClass('btn_active');
		} else{
		  	$(this).removeClass('btn_active');
		}
		labelcount();
	});
});