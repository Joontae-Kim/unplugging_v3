$(function() {
  $('#caltype1').on("click", function(){
    var pth = $(this).data('path');
    console.log(pth);
    var ref = new Firebase("https://electricbillcount.firebaseio.com");
    var authData = ref.getAuth();
      if (authData) {
        window.location.replace(pth);
      } else{
        window.location.replace("/membership");
      }
  });
  loginsts();
});   

function loginsts(){
  var ref = new Firebase("https://electricbillcount.firebaseio.com");
  var authData = ref.getAuth();
    if (authData) {
      $("#logoutstatus").css('display','none');
      $(".loginmenu").css('display','initial');
      var ref = new Firebase("https://electricbillcount.firebaseio.com/users/"+authData.uid+"/name");
      ref.on("value", function(snapshot) {
        $('#accDrop').text(snapshot.val() + " 님");
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      usrChk(authData);
      $('a#loginstatus').html('로그아웃');
      $('a#loginstatus').attr('onclick','userout()');

    } else{
      //need to login
      $("logoutstatus").css('display','initial');
      $(".loginmenu").css('display','none');
      $('#accDrop').text('로그인');
      $('a#logoutstatus').attr('href','/membership');
    }
}

//로그 아웃 
function userout() {
  var ref = new Firebase("https://electricbillcount.firebaseio.com");
  ref.unauth();
  $('a#loginstatus').html('Login');
  setInterval(function(){ 
    $('a#loginstatus').attr('href','/membership');
  }, 1000);
  location.reload();
};

function usrChk(authData) {
  var ref = new Firebase("https://electricbillcount.firebaseio.com/users/"+authData.uid);
  ref.once("value", function(snapshot) {
    var ext = snapshot.exists();
  });
};