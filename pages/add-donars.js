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

document.getElementById("submit").addEventListener("click", function (event) {
  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const bloodGroup = document.getElementById("blood-group").value;
  const contactNumber = document.getElementById("contact-number").value;

  if (!name || !location || !bloodGroup || !contactNumber) {
    return;
  }

  event.preventDefault();


  console.log("Donor Details:", { name, location, bloodGroup, contactNumber });

  const data = {
    name: name,
    location: location,
    bloodGroup: bloodGroup,
    contactNumber: contactNumber,
  };

  const dbRef = database.ref("donors-list"); // Example path: "users/"

  const newRef = dbRef.push(); // Create a unique key

  newRef
    .set(data)
    .then(() => {
      console.log("Data pushed successfully!");
      document.getElementById("name").value = "";
      document.getElementById("location").value = locationList[0].name;
      document.getElementById("blood-group").value = "";
      document.getElementById("contact-number").value = "";
      alert("Data pushed successfully!");
    })
    .catch((error) => {
      console.error("Error pushing data: ", error);
    });
});

const locationSelect = document.getElementById("location");
locationList.forEach((location) => {
  const option = document.createElement("option");
  option.value = location.name;
  option.textContent = location.name;
  locationSelect.appendChild(option);
});
locationSelect.value = locationList[0].name; // Select Id 1 (Bantwala) as default

