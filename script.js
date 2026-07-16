// Movie List provided by the requirements
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];

// --- 1. Select all exactly matching DOM elements ---
const selectMovie = document.getElementById("selectMovie");
const movieNameEl = document.getElementById("movieName");
const moviePriceEl = document.getElementById("moviePrice");
const totalPriceEl = document.getElementById("totalPrice");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const numberOfSeatEl = document.getElementById("numberOfSeat");
const proceedBtn = document.getElementById("proceedBtn"); // Fixed ID
const cancelBtn = document.getElementById("cancelBtn");
const allSeats = document.querySelectorAll("#seatCont .seat");

// --- 2. Initial Setup ---
let currentMoviePrice = 7;
let selectedSeatsArray = []; // Store selected seats as required by Test Case 1

// Populate the dropdown menu
moviesList.forEach((movie) => {
  const option = document.createElement("option");
  option.value = movie.price;
  option.textContent = movie.movieName;
  selectMovie.appendChild(option);
});

// Set default values (Flash and $ 7)
movieNameEl.textContent = moviesList[0].movieName;
moviePriceEl.textContent = `$ ${currentMoviePrice}`;

// --- 3. Core Update Function ---
function updateDOM() {
  const selectedSeatsCount = selectedSeatsArray.length;

  // Update Total Price and Number of Seats (Test Case 2)
  totalPriceEl.textContent = `$ ${selectedSeatsCount * currentMoviePrice}`;
  numberOfSeatEl.textContent = selectedSeatsCount;

  // Update Selected Seats Holder (Test Case 3)
  selectedSeatsHolder.innerHTML = ""; // Clear current holder

  if (selectedSeatsCount > 0) {
    // Append a distinct element for every selected seat to pass the test case
    selectedSeatsArray.forEach(() => {
      const seatSpan = document.createElement("div");
      seatSpan.classList.add("selectedSeat"); // Matches your CSS class
      seatSpan.textContent = "Seat";
      selectedSeatsHolder.appendChild(seatSpan);
    });
  } else {
    // Return to default HTML state
    selectedSeatsHolder.innerHTML = `<span class="noSelected">No Seat Selected</span>`;
  }
}

// --- 4. Dropdown Change Event ---
selectMovie.addEventListener("change", (e) => {
  currentMoviePrice = parseInt(e.target.value);
  const selectedOption = e.target.options[e.target.selectedIndex].text;
  
  movieNameEl.textContent = selectedOption;
  moviePriceEl.textContent = `$ ${currentMoviePrice}`;
  
  updateDOM();
});

// --- 5. Seat Click Events (Test Case 1) ---
allSeats.forEach((seat) => {
  seat.addEventListener("click", () => {
    // Only allow selecting if it's not occupied
    if (!seat.classList.contains("occupied")) {
      seat.classList.toggle("selected");

      // Update the array based on the DOM class
      if (seat.classList.contains("selected")) {
        selectedSeatsArray.push(seat);
      } else {
        selectedSeatsArray = selectedSeatsArray.filter((s) => s !== seat);
      }
      
      updateDOM();
    }
  });
});

// --- 6. Proceed / Continue Button Event ---
proceedBtn.addEventListener("click", () => {
  if (selectedSeatsArray.length === 0) {
    alert("Oops no seat Selected");
  } else {
    alert("Yayy! Your Seats have been booked");
    
    // Change selected to occupied
    selectedSeatsArray.forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("occupied");
    });
    
    // Clear array and update UI
    selectedSeatsArray = [];
    updateDOM();
  }
});

// --- 7. Cancel Button Event ---
cancelBtn.addEventListener("click", () => {
  // Remove selected class
  selectedSeatsArray.forEach((seat) => {
    seat.classList.remove("selected");
  });
  
  // Clear array and update UI
  selectedSeatsArray = [];
  updateDOM();
});