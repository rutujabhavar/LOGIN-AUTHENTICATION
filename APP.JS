function register() {
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value;
  const errorDiv = document.getElementById("registerError");

  errorDiv.textContent = "";

  if (!username || !password) {
    errorDiv.textContent = "All fields are required.";
    return;
  }

  if (password.length < 6) {
    errorDiv.textContent = "Password must be at least 6 characters long.";
    return;
  }

  if (localStorage.getItem(`user_${username}`)) {
    errorDiv.textContent = "Username already taken.";
    return;
  }

  localStorage.setItem(`user_${username}`, password);
  alert("Registration successful!");
  document.getElementById("registerUsername").value = "";
  document.getElementById("registerPassword").value = "";
}

function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errorDiv = document.getElementById("loginError");

  errorDiv.textContent = "";

  if (!username || !password) {
    errorDiv.textContent = "All fields are required.";
    return;
  }

  const storedPassword = localStorage.getItem(`user_${username}`);

  if (storedPassword === password) {
    localStorage.setItem("authenticatedUser", username);
    showSecurePage();
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
  } else {
    errorDiv.textContent = "Invalid username or password.";
  }
}

function showSecurePage() {
  document.getElementById("securePage").style.display = "block";
}

function logout() {
  localStorage.removeItem("authenticatedUser");
  document.getElementById("securePage").style.display = "none";
  alert("You have been logged out.");
}

window.onload = function () {
  const authUser = localStorage.getItem("authenticatedUser");
  if (authUser) {
    showSecurePage();
  }
};
