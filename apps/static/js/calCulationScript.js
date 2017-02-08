$(function() {
	var uid = user();
	var preInfo = new Array ();
	var preInfo2 = new Array ();
    	window.userbill = function() {
    		var precon = ['house','family'];var prelen=precon.length;
    		for (var i=0;i<prelen;i++){
	    		var type = $(':radio[name="'+precon[i]+'"]:checked').data(precon[i]+'-type');
	    		var opt = $(':radio[name="'+precon[i]+'"]:checked').attr('id');
	    		var lb = $("label[for='"+opt+"']").text();
    			preInfo.push({Con: precon[i], Type: type, Opt: opt, lab: lb});
    		}
    		for (var k=1;k<3;k++){
    			var n =k;
	    		var wtype = $('#selwelfare'+n+' option:selected').data("opid");
	    		var wlab =  $('#selwelfare'+n+' option:selected').data("read");
	    		preInfo2.push({Type: wtype, lab: wlab});
    		}
    		
	    var org = new Firebase("https://electricbillcount.firebaseio.com/billInfo");
		var userSr = org.child(uid);
		userSr.set({
		  userInfo: {
		    houseType: { opt: preInfo[0].Opt,lb: preInfo[0].lab, adjust: preInfo[0].Type},
		    familyType:{ opt: preInfo[1].Opt,lb: preInfo[1].lab, adjust: preInfo[1].Type},
		    welFare:{famNlife:{ opt: preInfo2[0].Type,lb: preInfo2[0].lab},welfare:{ opt: preInfo2[1].Type,lb: preInfo2[1].lab}},
		    date: s
		  }
		}, function(err) {
		});
    };
    var promises = [];
    var seaInfo = new Array ();
	var seasonCost = function() {
	    var seaArr = ['spring','summer','fall','winter'];
	    var peaArr = ['kitchen','living','season'];
	    var sarNm = [sprArray,sumArray,falArray,winArray];
	    var sarNm2 = ['sprArray','sumArray','falArray','winArray'];
	    var si = seaArr.length;
	    var pi = peaArr.length;var s=0;var p=0;
	    var k=0;var kl=seaArr.length;
	    for(var i=0;i<si;i++){
			var lev = $('#watt').data('watt-'+ seaArr[i] + '-level');
			var bse = $('#cost').data('total-'+ seaArr[i] + '-base');
			var elecc = $('#cost').data('total-'+ seaArr[i] + '-elec');
			var orgthid = $('#cost').data('total-'+ seaArr[i] + '-org_third_cost');
			var weltotal = $('#cost').data('total-'+ seaArr[i] + '-wel_total');
			var bst = $('#cost').data('total-'+ seaArr[i] + '-basetotal');
			var vat = $('#cost').data('total-'+ seaArr[i] + '-vat');
			var fnd = $('#cost').data('total-'+ seaArr[i] + '-fund');
			var ttcost = $('#cost').data('total-'+ seaArr[i] + '-total');
	       	var conSnm = $('#watt').data('total-' + seaArr[i]);
	       	var len = sarNm[i].length;
			var userCost = new Firebase("https://electricbillcount.firebaseio.com/billInfo/"+uid+"/userBoard/"+ seaArr[i] + "/Bills");
			var promise = userCost.set({
					Level: lev, Base: bse, Elec: elecc, org_third: orgthid, wl: weltotal, bsetotal: bst, 
					vaT: vat, Fund: fnd, toTal: ttcost, consumpTion: conSnm, arrLen: len
		    });
		    promises.push(promise);
	    	for(var p=0;p<pi;p++){
	            var spWatt = $('#watt').data('total-'+seaArr[i]+'-'+peaArr[p]);
	            var spPer = Number($('#cost').data('cost-'+seaArr[i]+'-'+peaArr[p]+'-per'));
				var sCost = Number($('#cost').data('cost-'+seaArr[i]));
				var spCost = ((spPer*sCost)/100 || 0).toFixed(0); //1 Math.ceil
				var sPath = seaArr[i]; var pPath = peaArr[p];
				var grpSegment = new Firebase("https://electricbillcount.firebaseio.com/billInfo/"+uid+"/userBoard/"+seaArr[i]+'/group');
				var DtlGroup = grpSegment.child(pPath);
				var promise = DtlGroup.set({
					consumption: spWatt, shrCost: spCost, shr: spPer
			    });
			    promises.push(promise);
	    	}
			var sCost = Number($('#cost').data('cost-'+seaArr[i]));
			var sShr = Number($('#watt').data('total-'+seaArr[i]));
			var sarNm_len = sarNm[i].length;
			var sarNmAlt = sarNm[i];var sl=sarNmAlt.length;
			for(var t=0;t<sl;t++){
				var appShr = ((sarNmAlt[t].Watt/$('#watt').data('total-'+seaArr[i]))*100 || 0).toFixed(2);
				var sCost = Number($('#cost').data('cost-'+seaArr[i]));
				var appShrcost = (((sarNmAlt[t].Watt/$('#watt').data('total-'+seaArr[i]))*sCost) || 0).toFixed(2);
				var esApp = sarNmAlt[t].ID;
				console.log('esApp  = ' + esApp + ' appShr = ' + appShr + ' sCost = '+ sCost)
				var eachSeason = new Firebase("https://electricbillcount.firebaseio.com/billInfo/"+uid+"/userBoard/"+seaArr[i]+'/each/');
				var eachGroup = eachSeason.child(t);
				eachGroup.set({
					App:sarNmAlt[t].ID, AppNm:sarNmAlt[t].ItemName, sItm: sarNmAlt[t].SubItm, consumPtion: sarNmAlt[t].Watt, place: sarNmAlt[t].Place, shr:appShr, shrCost: appShrcost,
					Hour: sarNmAlt[t].Usehour , Day: sarNmAlt[t].Useday
			    })
			     promises.push(promise);
			}
		}
		Promise
			.all(promises)
			.then(function () {
				location.replace("/result");
			});
	}
	$("#complete").click(seasonCost);

 	function user() {
		var ref = new Firebase("https://electricbillcount.firebaseio.com");
		var authData = ref.getAuth();
	  	if (authData) {
		    return authData.uid; 
	  	} else{
		    window.location.replace("/membership");
		}
	};
});