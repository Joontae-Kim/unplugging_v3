$(function() {
	$('#adddd').on('click', function() {
		var gtype = $('#adddd').data('graph-type');
		switch(gtype) {
		    case 1:
				var kit =['84','15,096','24'];
				var liv =['170','30,821','49'];
				var ss =['96','16,983','27'];
				var grp=[kit,liv,ss];
				var grpNm =['kit','liv','ss']
				var i=0;var grpl=grp.length;
				for(var i=0;i<grpl;i++){
					$('#'+grpNm[i]+'wt').text(grp[i][0])
					$('#'+grpNm[i]+'cs').text(grp[i][1])
					$('#'+grpNm[i]+'per').text(grp[i][2])
					$('#'+grpNm[i]+'bar').css('width',grp[i][2]+'%')
				}
				$('#adddd').data('graph-type',2);
		        break;
		    case 2:
				var kit =['84','11,405','33'];
				var liv =['170','21,155','67'];
				var ss =['0','0','0'];
				var grp=[kit,liv,ss];
				var grpNm =['kit','liv','ss']
				var i=0;var grpl=grp.length;
				for(var i=0;i<grpl;i++){
					$('#'+grpNm[i]+'wt').text(grp[i][0])
					$('#'+grpNm[i]+'cs').text(grp[i][1])
					$('#'+grpNm[i]+'per').text(grp[i][2])
					$('#'+grpNm[i]+'bar').css('width',grp[i][2]+'%')
				}
				$('#adddd').data('graph-type',1);
		        break;
		}
	});
});