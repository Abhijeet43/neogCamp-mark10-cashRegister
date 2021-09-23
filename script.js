const billAmountEl = document.querySelector("#bill-amount");
const cashGivenEl = document.querySelector("#cash-given");

const cashGivenSectionEl = document.querySelector("#cash-given-section");

const nextBtn = document.querySelector("#btn-next");
const checkBtn = document.querySelector("#btn-check");

const returnChangeEl = document.querySelector("#return-change");

const error = document.querySelector("#error");
const changeTableEl = document.querySelector("#change-table");
const noOfNotes = document.querySelectorAll(".no-of-notes");

const availableNotes = [2000, 500, 100, 20, 10, 5, 1];

hideCashGivenSection();

function changeToBeReturned(billAmount, cashGiven) {
  return cashGiven - billAmount;
}

function showCashGivenSection() {
  nextBtn.style.display = "none";
  cashGivenSectionEl.style.display = "flex";
}

function hideCashGivenSection() {
  cashGivenSectionEl.style.display = "none";
}

function showError(err, flag) {
  error.style.color = "red";
  error.style.display = "block";
  error.innerText = err;
  changeTableEl.style.display = "none";
  if (flag) {
    error.style.color = "white";
  }
}

function hideError() {
  error.style.display = "none";
}

function showChangeTable() {
  changeTableEl.style.display = "table";
}

function calculateChange(amountToBeReturned) {
  showChangeTable();
  for (let i = 0; i < availableNotes.length; i++) {
    const numberOfNotes = Math.trunc(amountToBeReturned / availableNotes[i]);
    amountToBeReturned %= availableNotes[i];
    noOfNotes[i].innerText = numberOfNotes;
  }
}

nextBtn.addEventListener("click", () => {
  if (billAmountEl.value) {
    if (billAmountEl.value > 0) {
      hideError();
      showCashGivenSection();
    } else {
      showError("bill amount cannot be negative or 0");
    }
  } else {
    showError("Field cannot be empty");
  }
});

checkBtn.addEventListener("click", () => {
  hideError();
  const billAmountValue = Number(billAmountEl.value);
  const cashGivenValue = Number(cashGivenEl.value);
  if (cashGivenValue && billAmountValue) {
    if (cashGivenValue > 0 && billAmountValue > 0) {
      if (cashGivenValue > billAmountValue) {
        const change = changeToBeReturned(billAmountValue, cashGivenValue);
        returnChangeEl.innerText = `Return Change: ₹${change}`;
        calculateChange(change);
      } else if (cashGivenValue === billAmountValue) {
        changeTableEl.style.display = "none";
        showError("No change to be returned", "nochange");
      } else {
        showError("Cash Given must be equal to or greater than bill amount");
      }
    } else {
      showError("Negative values are not allowed");
    }
  } else {
    showError("Fields cannot be empty or 0");
  }
});
