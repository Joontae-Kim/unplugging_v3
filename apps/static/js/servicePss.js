$(function() {
  initApp();
  btmSetting();
});

function email_SignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut(); signout
  } else {
    var email = $('#usermebersEmail').val();
    var password = $('#usermebersPw').val();

    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      $('#btnLogin').attr('disabled', false);
    });
  }
  $('#btnLogin').attr('disabled', true);
};

// Facebook login
function facebook_SignIn() {
  console.log("click")
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.FacebookAuthProvider(); //Facebook-Auth-Provider
    firebase.auth().signInWithRedirect(provider); // sign-in redirect
  } else {
    firebase.auth().signOut(); // signout
  }
  $('#btnFacebookLogin').attr('disabled',false)
};

// Google login
function google_SignIn() {
  if (!firebase.auth().currentUser) {
    // createprovider
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    // start signin by Google
    firebase.auth().signInWithRedirect(provider);
    provider.addScope('email');
    provider.addScope('profile');
  } else {
    firebase.auth().signOut();
  }
  $('#btnGoogleLogin').attr('disabled',true);
};

function email_handleSignUp() {
  var email = $('#rgtrEmail').val();
  var name = $('#rgtrName').val();
  var password = $('#rgtrPassword').val();
  var password_confirm = $('#rgtrConfirm').val();
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  if (password === password_confirm) {
  } else {
    alert('비밀번호가 틀립니다.')
    return;
  }
  
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

function initApp() {
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      var token = result.credential.accessToken; 
    } else {
    }
    var user = result.user;
  }).catch(function(error) { 
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    // Handle Errors here.
    var credential = error.credential;
    if (errorCode === 'auth/account-exists-with-different-credential') {
      alert('You have already signed up with a different auth provider for that email.');
      // If you are using multiple auth providers on your app you should handle linking the user's accounts here.
    } else {
      console.error(error);
    }
  });


  // firebase.auth().onAuthStateChanged // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var user = firebase.auth().currentUser;
      if (user != null) {
        user.providerData.forEach(function (profile) {
          var ref = firebase.database().ref("users/"+user.uid);
          ref.once("value")
            .then(function(snapshot) {
              var user_exists = snapshot.exists();
              if (!user_exists) {
                function writeUserData(userId, name, email, imageUrl) {
                  firebase.database().ref('users/' + user.uid).set({
                    email: email,
                    id: profile.uid,
                    name: profile.displayName,
                    provider: profile.providerId,
                    uid: user.uid
                  });
                }
              }
          })
          window.location.replace("/");
        });
      }
    } else {
    }
  }); // authstatelistener end
  $('#btnFacebookLogin').click(facebook_SignIn);
  $('#btnGoogleLogin').click(google_SignIn);
  $('#btnLogin').click(email_SignIn);
  $('#newUsr').click(email_handleSignUp);
}

function btmSetting(){
    var sw = screen.width;
    if(sw < 768){
      $('.footer').removeClass('navbar-fixed-bottom')
    } else (
      $('.footer').addClass('navbar-fixed-bottom')
    )
}