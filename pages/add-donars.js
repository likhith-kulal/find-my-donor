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
      document.getElementById("location").value = "";
      document.getElementById("blood-group").value = "";
      document.getElementById("contact-number").value = "";
      alert("Data pushed successfully!");
    })
    .catch((error) => {
      console.error("Error pushing data: ", error);
    });
});
