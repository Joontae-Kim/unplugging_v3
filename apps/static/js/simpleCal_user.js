$(function() {
	//choose familytype and print it's appliance group
	$('input[name="house"]').click(function(){
		// newSystem  // usetype
		var housetype = $('#'+this.id).data('house-type');
		console.log(this.id + "  " + housetype);
		base = new Array();
		elec = new Array();
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