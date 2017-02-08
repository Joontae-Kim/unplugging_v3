$(function() {
  btmSetting();
  $('#btnLogin').on("click", lgg);
  $('#usrslogout').on('click',userout);
  $('#btnFacebookLogin').on('click',fblogging);
  $('#btnGoogleLogin').on('click',gglogging);
  $('#newUsr').on('click',createMb);
});

  function lgg() {
    var alrm = $('#logalrm');
    var rmchk = $('.rechk label')
    var ref = new Firebase("https://electricbillcount.firebaseio.com");
    var userid = $('#usermebersEmail').val();
    var userpw = $('#usermebersPw').val();
      ref.authWithPassword({
        email    : userid,
        password : userpw
      }, function(error, authData) {
        if (error) {
          remember: "sessionOnly";
          switch (error.code) {
            case "INVALID_EMAIL":
              console.log("The specified user account email is invalid.");
              rmchk.css('display','none')
              alrm.html('<p><strong> 유효하지 않은 계정입니다. </strong></p>');
              break;

            case "INVALID_PASSWORD":
              console.log("The specified user account password is incorrect.");
              rmchk.css('display','none')
              alrm.html('<p><strong> 비밀번호가 틀렸습니다. </strong></p>')
              break;

            case "INVALID_USER":
              console.log("The specified user account does not exist.");
              rmchk.css('display','none')
              alrm.html('<p><strong> 등록되지 않은 계정입니다. </strong></p>')
              break;

            default:
              console.log("Error logging user in:", error);
              rmchk.css('display','none')
              alrm.html('<p><strong> 등록되지 않은 계정입니다. </strong></p>')
          }
        } else {
          rmchk.css('display','none')
          userAgt(authData);
          alrm.html('<p class="text-primary text-center"> <strong> 로그인 성공! </strong> </p>')
          userAgt(authData);
        }
        setTimeout(function() {
          alrm.empty();
          rmchk.css('display','initial')
        }, 3000);
        
    })
  };

  function userout(){
    document.getElementById('mbrEmail').value = '';
    document.getElementById('mbrPw').value = '';
    console.log("로그아웃");
    var ref = new Firebase("https://electricbillcount.firebaseio.com");
    ref.unauth();
  };

  //facebook login script
  function fblogging(){
    var ref = new Firebase("https://electricbillcount.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        errorCode(error.code);
      } else {
        userAgt(authData);
      }
    }, {
      scope: "email,user_likes" // the permissions requested
    })
  };


  //facebook login script
  function fblogging(){
    var ref = new Firebase("https://electricbillcount.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        errorCode(error);
      } else {
        console.log("Authenticated successfully with payload:", authData);;
        userAgt(authData);
      }
    }, {
      scope: "email,user_likes" // the permissions requested
    })
  };



  //google login script
  function gglogging(){
    var ref = new Firebase("https://electricbillcount.firebaseio.com");
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        errorCode(error);
      } else {
        userAgt(authData);
      } 
    },{
      scope: "email" // the permissions requested
    });
  }

  function createMb(){
    var pw1 = $('#rgtrPassword').val();
    var pw2 = $('#rgtrConfirm').val();
    var usrnm = $('#rgtrName').val();
    if(pw1===pw2){
    var $this = $('#newUsr');
    $this.button('loading');
    var ref = new Firebase("https://electricbillcount.firebaseio.com");
      ref.createUser({
        email: $('#rgtrEmail').val(),
        password: $('#rgtrPassword').val()
      }, function(error, authData) {
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              console.log("The new user account cannot be created because the email is already in use.");
              $this.html("이미 사용중인 이메일 입니다. <i class='fa fa-circle-o-notch fa-spin'></i>");
              break;
            case "INVALID_EMAIL":
              console.log("The specified email is not a valid email.");
              $this.html("이메일이 유효하지 않습니다. <i class='fa fa-circle-o-notch fa-spin'></i>");
              break;
            default:
              console.log("Error creating user:", error);
          }
        } else {
          $this.html("회원가입 성공! <i class='fa fa-circle-o-notch fa-spin'></i>");
        }
        $this.button('reset');
        setTimeout(function() {
         window.location.replace("/");
        }, 2000);
      });
    } else {
      var $this = $('#newUsr');
      $this.html("비밀번호가 일치하지 않습니다. <i class='fa fa-circle-o-notch fa-spin'></i>");
      setTimeout(function() {
       $this.button('reset');
      }, 2000);
    }
  };

  function usrChk(authData) {
    var ref = new Firebase("https://electricbillcount.firebaseio.com/users/"+authData.uid);
    ref.once("value", function(snapshot) {
      var ext = snapshot.exists();
      return ext;
    });
  };

  function userAgt(authData){
    var isNewUser = !usrChk(authData);
    var ref = new Firebase("https://electricbillcount.firebaseio.com");
    ref.onAuth(function(authData) {
      if (authData && isNewUser) {
        switch(authData.provider) {
          case 'password':
              var uid = authData.uid;
              var prv = authData.provider;
              var email = authData.password.email;
              var prv_nm = email.replace(/@.*/, '');
              var prv_id = email.replace(/@.*/, '');
              break;

         case 'facebook':
              var uid = authData.uid;
              var prv = authData.provider;
              var email = authData.facebook.email;
              var prv_nm = authData.facebook.displayName;
              var prv_id = authData.facebook.id;
              break;

         case 'google':
              var uid = authData.uid;
              var prv = authData.provider;
              var email = authData.google.email;
              var prv_nm = authData.google.displayName;
              var prv_id = authData.google.id;
              break;
          default:
              var uid = authData.uid;
              var prv = authData.provider;
              var email = $('#rgsEm').val()
              var prv_nm = $('#rgsNm').val()
              var prv_id = $('#rgsEm').val()
              break;
        }
        ref.child("users").child(authData.uid).set({
          id : prv_id,
          uid : uid,
          provider : prv,
          email: email,
          name: prv_nm
        });
      }
      window.location.replace("/");
    })
  };

  function errorCode(err){
    switch (error.code) {
      case "INVALID_EMAIL":
        console.log("The specified user account email is invalid.");
        break;

      case "INVALID_PASSWORD":
        console.log("The specified user account password is incorrect.");
        break;

      case "INVALID_USER":
        console.log("The specified user account does not exist.");
        break;

      default:
        console.log("Error logging user in:", error);
    }
  }

  function stts(){
    var ref = new Firebase("https://electricbillcount.firebaseio.com");
    var authData = ref.getAuth();
    if (authData) {
      console.log("User is logged in");
      window.location.replace("/");
    } else {
      console.log("User is logged out");
    }
  };

  function btmSetting(){
    var sw = screen.width;
    if(sw < 768){
      $('.footer').removeClass('navbar-fixed-bottom')
    } else (
      $('.footer').addClass('navbar-fixed-bottom')
    )
  }