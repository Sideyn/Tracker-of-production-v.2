// Selecting HTML elements and storing them in variables
const btnAdd = document.querySelector("#add");
const btnCancel = document.querySelector("#cancel");
const btnRestart = document.querySelector("#restart");
const table = document.querySelector("table");

// Variables for managing table data
let newRow;
let tableCells = [];
let previousStates = [];
let quantityCompleted = 0;
let quantityRemaining = 0;
let quantityPerCase = 0;
let quantityCasesCompleted = 0;

// Function to create a new row with cells in the table
function createRowCell(nb) {
  newRow = table.insertRow(-1);

  // Create cells in the new row and set initial values
  for (let i = 0; i < nb; i++) {
    let cell = newRow.insertCell();
    cell.textContent = "---";
    cell.id = "cell" + i;
    tableCells.push(cell);
  }
}

// Function to initialize the table and get initial input from the user
function initializeTable() {
  quantityRemaining = parseInt(prompt("How much do you need to make ? "));
  quantityPerCase = parseInt(prompt("How much is in a box ? "));

  // Create initial row in the table and update its content
  createRowCell(4);
  updateTableContent();
}

// Function to update the content of the table cells based on current data
function updateTableContent() {
  const casesRemaining = Math.ceil(quantityRemaining / quantityPerCase);

  // Update cell values with the current data
  tableCells[0].textContent = quantityCasesCompleted;
  tableCells[1].textContent = casesRemaining;
  tableCells[2].textContent = quantityCompleted;
  tableCells[3].textContent = quantityRemaining;
}

// Function to save the current state (data) into a stack
function saveState() {
  previousStates.push({
    completed: quantityCompleted,
    remaining: quantityRemaining,
    perCase: quantityPerCase,
    casesCompleted: quantityCasesCompleted,
  });
}

// Event listener for the "Add" button
btnAdd.addEventListener("click", () => {
  // Save the current state before making changes
  saveState();

  // Check if there is still quantity remaining
  if (quantityRemaining > 0) {
    // Increment completed cases, update quantities, and update the table
    quantityCasesCompleted++;
    quantityRemaining -= quantityPerCase;
    quantityCompleted = quantityCasesCompleted * quantityPerCase;
    updateTableContent();
  }

  // Display alerts based on the remaining quantity
  if (quantityRemaining === 0) {
    alert("You are finished.");
  } else if (quantityRemaining == 0 || quantityRemaining < 0) {
    alert("You've made too many products : " + quantityRemaining);
  }
});

// Event listener for the "Cancel" button
btnCancel.addEventListener("click", () => {
  // Check if there are previous states to revert to
  if (previousStates.length > 0) {
    // Pop the last state from the stack and update the data
    const prevState = previousStates.pop();
    quantityCompleted = prevState.completed;
    quantityRemaining = prevState.remaining;
    quantityPerCase = prevState.perCase;
    quantityCasesCompleted = prevState.casesCompleted;

    // Update the table with the reverted data
    updateTableContent();
  } else {
    // If no previous states, display an alert and reload the page
    alert(
      "No previous collections to cancel. You will be invited to start again."
    );
    location.reload();
  }
});

// Event listener for the "Restart" button
btnRestart.addEventListener("click", () => {
  // Reload the page to reset all data
  location.reload();
});

// Initialize the table when the script is executed
initializeTable();
