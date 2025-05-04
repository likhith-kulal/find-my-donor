// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const lat = position.coords.latitude;
//       const lon = position.coords.longitude;
//       console.log("Latitude:", lat);
//       console.log("Longitude:", lon);
//       alert("Hello, World!");
//     },
//     (error) => {
//       alert("Hello, World! 123");
//       switch (error.code) {
//         case error.PERMISSION_DENIED:
//           console.error("User denied the request for Geolocation.");
//           break;
//         case error.POSITION_UNAVAILABLE:
//           console.error("Location information is unavailable.");
//           break;
//         case error.TIMEOUT:
//           console.error("The request to get user location timed out.");
//           break;
//         case error.UNKNOWN_ERROR:
//           console.error("An unknown error occurred.");
//           break;
//       }
//       console.error("Full error object:", error);
//     }
//   );
// }

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

const locationList = [
  { id: 1, name: "Bantwala" },
  { id: 2, name: "Mangalore" },
  { id: 3, name: "Udupi" },
  { id: 4, name: "Puttur" },
  { id: 5, name: "Belthangady" },
  { id: 6, name: "Moodbidri" },
  { id: 7, name: "Karkala" },
  { id: 8, name: "Sullia" },
  { id: 9, name: "Kasargod" },
  { id: 10, name: "Surathkal" },
  { id: 11, name: "Mulki" },
  { id: 12, name: "Dharmasthala" },
  { id: 13, name: "Kundapura" },
  { id: 14, name: "Manipal" },
  { id: 15, name: "Thokkottu" },
  { id: 16, name: "Padubidri" },
  { id: 17, name: "Kinnigoli" },
  { id: 18, name: "Nitte" },
  { id: 19, name: "Hebri" },
  { id: 20, name: "Bajpe" },
  { id: 21, name: "Pilikula" },
  { id: 22, name: "Kaup" },
  { id: 23, name: "Shirva" },
  { id: 24, name: "Brahmavar" },
  { id: 25, name: "Sasihithlu" },
  { id: 26, name: "Hosanagara" },
  { id: 27, name: "Sakleshpur" },
  { id: 28, name: "Chikmagalur" },
  { id: 29, name: "Mudigere" },
  { id: 30, name: "Sringeri" },
  { id: 31, name: "Kollur" },
  { id: 32, name: "Hosanadu" },
  { id: 33, name: "Belman" },
  { id: 34, name: "Kundapur" },
  { id: 35, name: "Byndoor" },
  { id: 36, name: "Koteshwara" },
  { id: 37, name: "Saligrama" },
  { id: 38, name: "Basrur" },
  { id: 39, name: "Hiriadka" },
  { id: 40, name: "Perdoor" },
  { id: 41, name: "Barkur" },
  { id: 42, name: "Kemmannu" },
  { id: 43, name: "Malpe" },
  { id: 44, name: "Thirthahalli" },
  { id: 45, name: "Agumbe" },
  { id: 46, name: "Someshwara" },
  { id: 47, name: "Kollamogaru" },
  { id: 48, name: "Charmadi" },
  { id: 49, name: "Naravi" },
  { id: 50, name: "Venur" },
];

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
    let donors = [];
    donors = snapshot.val();
    const donorList = document.getElementById("donor-list");
    donorList.innerHTML = ""; // Clear existing list

    const bloodGroup = document.getElementById("blood-group").value;
    const location = document.getElementById("location").value;

    // console.log("Fetched donors:", bloodGroup);

    for (const id in donors) {
      const donor = donors[id];
      if (donor.bloodGroup !== bloodGroup || donor.location !== location) {
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

const locationSelect = document.getElementById("location");
locationList.forEach((location) => {
  const option = document.createElement("option");
  option.value = location.name;
  option.textContent = location.name;
  locationSelect.appendChild(option);
});
locationSelect.value = locationList[0].name; // Select Id 1 (Bantwala) as default
locationSelect.addEventListener("change", function () {
  const selectedLocation = locationSelect.value;
});

init();
