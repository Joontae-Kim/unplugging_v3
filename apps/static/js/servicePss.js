$(function() {
  checkIn();
});   

  function checkIn() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        $("#logoutstatus").css('display','none');
        $(".loginmenu").css('display','initial');
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
          var username = snapshot.val().name;
          $('#accDrop').text(username + " 님");
        });
        console.log('asdfasf')
        $('a#loginstatus').html('로그아웃');
        $('a#loginstatus').click('onclick',function () {
          firebase.auth().signOut();
          window.location.replace("/home2");
        });
      } else {
        // No user is signed in.
        console.log('false')
        //need to login
        $("logoutstatus").css('display','initial');
        $(".loginmenu").css('display','none');
        $('#accDrop').text('로그인');
        $('a#logoutstatus').attr('href','/membership2');
      }
    });
  }