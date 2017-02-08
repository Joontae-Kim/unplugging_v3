$(function() {
	userstatus();
    var ref = new Firebase("https://electricbillcount.firebaseio.com/appliancelist/");
    ref.once("value", function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	        var key = childSnapshot.key();
	        var refItem = new Firebase("https://electricbillcount.firebaseio.com/appliancelist/"+ key+'/season');
	            refItem.on("value", function(snapshot) {
	            var itemSeason = snapshot.val();
	            $('#slide_'+key).data('item-season',itemSeason);
		     })
	    })

    	snapshot.forEach(function(childSnapshot) {
	        var key = childSnapshot.key();
	        var refItem = new Firebase("https://electricbillcount.firebaseio.com/appliancelist/"+ key+'/place');
	            refItem.on("value", function(snapshot) {
	            var itemPlace = snapshot.val();
	            $('#slide_'+key).data('item-place',itemPlace);
		    })
	    })
	})

	//choose familytype and print it's appliance group
	//2016년 1월 전기요금 체계
	$('input[name="house"]').click(function(){
		// newSystem  // usetype
		base = new Array();elec = new Array();
		var housetype = $('#'+this.id).data('house-type');
		console.log(this.id + "  " + housetype);
		console.log('Base')
		var refBase = new Firebase("https://electricbillcount.firebaseio.com/newSystem/"+housetype+"/base");
		refBase.once("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
			    var key = childSnapshot.key();
			    var childData = childSnapshot.val();
			    console.log('key = ' + key + ' childData = ' + childData);
			    base.push({Level: key, ConsumeFee: childData });
			})
		})

		console.log('Electric')
		var refElec = new Firebase("https://electricbillcount.firebaseio.com/newSystem/"+housetype+"/electric");
		refElec.once("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
			    var key = childSnapshot.key();
			    var childData = childSnapshot.val();
			    console.log('key = ' + key + ' childData = ' + childData);
			    elec.push({Level: key, ConsumeFee: childData });
			})
		})

	})
});

// 유저 로그인 & 로그아웃 상태체크
function userstatus() {
	var ref = new Firebase("https://electricbillcount.firebaseio.com");
	var authData = ref.getAuth();
  	if (authData) {
  	} else{
	    window.location.replace("/membership");
	}
};