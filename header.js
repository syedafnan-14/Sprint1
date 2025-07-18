  // Load logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('bijliseva_logged_in_user'));
  
  if (!loggedInUser) {
      // If not logged in, redirect to login
      window.location.href = "login.html";
  } else {
      // Show user name on the top right
      document.querySelector('.welcome').textContent = `Welcome, ${loggedInUser.customerName}`;
  }

  function logout() {
      localStorage.removeItem('bijliseva_logged_in_user');
      window.location.href = "login.html";
  }