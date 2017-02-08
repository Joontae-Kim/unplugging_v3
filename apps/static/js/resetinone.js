$(function() {
  stts();
  $('#reissue').on("click",initPass);
  $('#rstchker').on("click",resttingPass);
});

  function usrChk(authData) {
    var ref = new Firebase("https://electricbillcount.firebaseio.com/users/"+authData.uid);
    ref.once("value", function(snapshot) {
      var ext = snapshot.exists();
      return ext;
    });
  };

  function initPass(){
    var $this = $(this);
    $this.button('loading');
    var ref = new Firebase("https://electricbillcount.firebaseio.com");
    ref.resetPassword({
      email: $('#psresetTxt').val()
    }, function(error) {
      if (error) {
        switch (error.code) {
          case "INVALID_USER":
            $this.button('reset');
            $('#guidline').html("<span class='label label-warning col-md-12' style='font-weight:300'>&nbsp;&nbsp;등록되지 않는 계정입니다.&nbsp;&nbsp;</span>")
            break;
          default:
            $this.button('reset');
            $('#guidline').html("<span class='label label-warning col-md-12' style='font-weight:300'>&nbsp;&nbsp;재발급 중 오류가 발생했습니다.&nbsp;&nbsp;</span>")
        }
      } else {
        $this.button('reset');
        $('#guidline').html("<span class='label label-primary col-md-12' style='font-weight:300'>&nbsp;&nbsp;재발급 완료&nbsp;&nbsp;</span>")
      }
    });
  }

  function resttingPass(){
    var $this = $(this);
    $this.button('loading');
    var ref = new Firebase("https://electricbillcount.firebaseio.com");
    ref.changePassword({
      email: $('#rstEm').val(),
      oldPassword: $('#rstPw').val(),
      newPassword: $('#rstNpw').val()
    }, function(error) {
      if (error) {
        switch (error.code) {
          case "INVALID_PASSWORD":
            // console.log("The specified user account password is incorrect.");
            $this.button('reset');
            $('#resetguidline').html("<span class='label label-warning col-lg-12 col-md-12 col-xs-12' style='font-weight:300'>&nbsp;&nbsp;비밀번호가 틀렸습니다.&nbsp;&nbsp;</span>")
            break;
          case "INVALID_USER":
            // console.log("The specified user account does not exist.");
            $this.button('reset');
            $('#resetguidline').html("<span class='label label-warning col-lg-12 col-md-12 col-xs-12' style='font-weight:300'>&nbsp;&nbsp;등록되지 않은 계정입니다.&nbsp;&nbsp;</span>")
            break;
          default:
            // console.log("Error changing password:", error);
            $this.button('reset');
            $('#resetguidline').html("<span class='label label-warning col-lg-12 col-md-12 col-xs-12' style='font-weight:300'>&nbsp;&nbsp;오류 발생가 발생하여 재시도 해주시기 바랍니다..&nbsp;&nbsp;</span>")
        }
      } else {
        // console.log("User password changed successfully!");
        $this.button('reset');
        $('#resetguidline').html("<span class='label label-primary col-lg-12 col-md-12 col-xs-12' style='font-weight:300'>&nbsp;&nbsp;비밀번호 변경에 성공하셨습니다!&nbsp;&nbsp;</span>")
      }
      setTimeout(function() {
       $('#resetguidline span').remove();
      }, 3000);
    })
  };

  function stts(){
    var ref = new Firebase("https://electricbillcount.firebaseio.com");
    var authData = ref.getAuth();
    if (authData) {
    } else {
    }
  };