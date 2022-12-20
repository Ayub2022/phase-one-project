const userName = document.querySelector(".username");
const passWord = document.querySelector(".password");
const submitBtn = document.querySelector(".login-button");

var user = null;
submitBtn.addEventListener("click", () => {
  //set the user before sign in
  user = { name: userName.value, isLoggedIn: "true" };

  persistAndRedirect(user);
});

//Persist and redirect user to homepage

const persistAndRedirect = (user) => {
  if (user) {
    //persist user in local storage
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
};
