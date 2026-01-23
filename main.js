const form = document.querySelector(".date-form");

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const yearResult = document.getElementById("year-result");
const monthResult = document.getElementById("month-result");
const dayResult = document.getElementById("day-result");

const inputs = [dayInput, monthInput, yearInput];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  clearErrors();

  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  let hasError = false;

  inputs.forEach((input) => {
    if (!input.value) {
      showError(input, "This field is required");
      hasError = true;
    }
  });

  if (hasError) return;

  const birthDate = new Date(year, month - 1, day);
  const isValidDate =
    birthDate.getFullYear() === year &&
    birthDate.getMonth() === month - 1 &&
    birthDate.getDate() === day;

  if (!isValidDate) {
    showError(dayInput, "Must be a valid date");
    showError(monthInput, "");
    showError(yearInput, "");
    return;
  }

  calculateAge(birthDate);
});

function calculateAge(birthDate) {
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  yearResult.textContent = years;
  monthResult.textContent = months;
  dayResult.textContent = days;
}

function showError(input, message) {
  input.classList.add("error-box");
  const msg = input.parentElement.querySelector(".requiredMsg");
  msg.textContent = message;
  msg.classList.remove("hideMsg");
  msg.classList.add("error-color");
}

function clearErrors() {
  inputs.forEach((input) => {
    input.classList.remove("error-box");
    const msg = input.parentElement.querySelector(".requiredMsg");
    msg.textContent = "";
    msg.classList.add("hideMsg");
    msg.classList.remove("error-color");
  });
}
