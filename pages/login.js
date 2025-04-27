// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf-yEbbWqdytCo3ZMxVrSsximgPLxoo-w",
  authDomain: "prems-creations-9e2be.firebaseapp.com",
  databaseURL: "https://prems-creations-9e2be-default-rtdb.firebaseio.com",
  projectId: "prems-creations-9e2be",
  storageBucket: "prems-creations-9e2be.firebasestorage.app",
  messagingSenderId: "208957255376",
  appId: "1:208957255376:web:84592b372c4304f42578d5",
  measurementId: "G-LVR0Q82RZD",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

document.getElementById("submit").addEventListener("click", function () {
  // TODO: Add form validation here after completing the backend

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = { email, password };

  console.log("User data:", user);

  database
    .ref("donors-admin")
    .orderByChild("email")
    .equalTo(user.email)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        window.localStorage.setItem("user", JSON.stringify(userData));
        window.location.href = "../index.html";
      } else {
        console.error("No user found with the given email.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
});

const passwordInput = document.getElementById("password");
const togglePasswordShow = document.getElementById("toggle-password-show");
const togglePasswordHide = document.getElementById("toggle-password-hide");

togglePasswordShow.addEventListener("click", () => {
  passwordInput.setAttribute("type", "text");
  togglePasswordShow.style.display = "none";
  togglePasswordHide.style.display = "inline";
});

togglePasswordHide.addEventListener("click", () => {
  passwordInput.setAttribute("type", "password");
  togglePasswordHide.style.display = "none";
  togglePasswordShow.style.display = "inline";
});

function init() {
  // window.location.href = "pages/home.html";
}

init();
