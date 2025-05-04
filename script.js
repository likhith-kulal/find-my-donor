if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log("Latitude:", lat);
      console.log("Longitude:", lon);
      alert("Hello, World!");
    },
    (error) => {
      alert("Hello, World! 123");
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.error("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.error("An unknown error occurred.");
          break;
      }
      console.error("Full error object:", error);
    }
  );
}

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

const modal = document.getElementById("donor-modal");
const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");

openModalBtn.addEventListener("click", () => {
  fetchDonors();
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    // alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  document.getElementById("locationField").value = `Lat: ${lat}, Lng: ${lon}`;
}

function showError(error) {
  //   switch (error.code) {
  //     case error.PERMISSION_DENIED:
  //     //   alert("User denied the request for Geolocation.");
  //       break;
  //     case error.POSITION_UNAVAILABLE:
  //     //   alert("Location information is unavailable.");
  //       break;
  //     case error.TIMEOUT:
  //     //   alert("The request to get user location timed out.");
  //       break;
  //     case error.UNKNOWN_ERROR:
  //     //   alert("An unknown error occurred.");
  //       break;
  //   }
  document.getElementById("locationField").innerHTML = `India`;
}

document.getElementById("logout").addEventListener("click", function () {
  window.localStorage.removeItem("user");
  document.getElementById("add-donor").style.display = "none";
  document.getElementById("logout").style.display = "none";
  document.getElementById("login").style.display = "block";
});

document.getElementById("login").addEventListener("click", function () {
  window.location.href = "pages/login.html";
});

document.getElementById("add-donor").addEventListener("click", function () {
  window.location.href = "pages/add-donor.html";
});

function fetchDonors() {
  database.ref("donors-list").once("value", (snapshot) => {
    const donors = snapshot.val();
    const donorList = document.getElementById("donor-list");
    donorList.innerHTML = ""; // Clear existing list

    const bloodGroup = document.getElementById("blood-group").value;

    // console.log("Fetched donors:", bloodGroup);

    for (const id in donors) {
      const donor = donors[id];
      if (donor.bloodGroup !== bloodGroup) {
        continue; // Skip if blood group doesn't match
      }
      const donorItem = document.createElement("div");
      donorItem.className = "donor-item";

      const nameDiv = document.createElement("div");
      nameDiv.className = "name";
      nameDiv.textContent = donor.name;

      const locationDiv = document.createElement("div");
      locationDiv.className = "donar-location";
      locationDiv.textContent = donor.location;

      const contactDiv = document.createElement("div");
      contactDiv.className = "contact-info";
      const contactSpan = document.createElement("span");
      contactSpan.textContent = donor.contactNumber;
      contactDiv.appendChild(contactSpan);

      donorItem.appendChild(nameDiv);
      donorItem.appendChild(locationDiv);
      donorItem.appendChild(contactDiv);

      donorList.appendChild(donorItem);
    }

    if (donorList.children.length === 0) {
      const noDonorsDiv = document.createElement("div");
      noDonorsDiv.className = "no-donors";
      noDonorsDiv.textContent = "No donors found for this blood group.";
      noDonorsDiv.style.marginTop = "90px";
      donorList.appendChild(noDonorsDiv);
    }
  });
}

function init() {
  const user = window.localStorage.getItem("user");
  if (user) {
    document.getElementById("add-donor").style.display = "block";
    document.getElementById("logout").style.display = "block";
    document.getElementById("login").style.display = "none";
  }
}

init();
