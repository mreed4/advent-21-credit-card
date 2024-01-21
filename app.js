const creditCard = document.querySelector(".credit-card__wrapper");
const form = document.querySelector("form");

(function init() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submitted");
  });

  cardNumberInputListener();
  cardHolderInputListener();
  monthInputListener();
  yearInputListener();
  cvvInputListener();
})();

function cvvInputListener() {
  const cvvInput = document.querySelector("form #cvv");
  const cvv = document.querySelector(".credit-card--back .cvv");

  cvvInput.addEventListener("focus", () => {
    creditCard.classList.add("flip");
  });

  cvvInput.addEventListener("blur", () => {
    creditCard.classList.remove("flip");
  });

  cvvInput.addEventListener("input", (e) => {
    const { value } = e.target;

    const regex = /^[0-9]{3,4}$/;

    if (!regex.test(value)) {
      cvvInput.classList.add("error");
      return;
    }

    if (value.length > 3) return;

    cvv.textContent = value;
  });
}

function cardNumberInputListener() {
  const cardNumberInput = document.querySelector("#card-number");
  const cardNumber = document.querySelector(".card-number").children;
  const [numberShadow, numberEmboss] = cardNumber;

  cardNumberInput.addEventListener("input", (e) => {
    /* */
    const { value } = e.target;

    if (value[0] === "3") {
      creditCard.classList.remove("visa", "mastercard", "discover");
      creditCard.classList.add("american");
    }

    if (value[0] === "4") {
      creditCard.classList.remove("mastercard", "discover", "american");
      creditCard.classList.add("visa");
    }

    if (value[0] === "5") {
      creditCard.classList.remove("visa", "discover", "american");
      creditCard.classList.add("mastercard");
    }

    if (value[0] === "6") {
      creditCard.classList.remove("visa", "mastercard", "american");
      creditCard.classList.add("discover");
    }

    if (value.length > 19) return;

    // Insert space between digits grouped into four
    const formattedValue = value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();

    cardNumberInput.value = formattedValue;

    numberEmboss.textContent = formattedValue;
    numberShadow.textContent = formattedValue;
  });
}

function cardHolderInputListener() {
  const cardHolderInput = document.querySelector("#card-holder");
  const cardHolder = document.querySelector(".card-holder").children;
  const [holderShadow, holderEmboss] = cardHolder;
  const signature = document.querySelector(".signature");

  cardHolderInput.addEventListener("input", (e) => {
    const { value } = e.target;

    if (value.length > 19) return;

    const formattedValue = value.toUpperCase();

    cardHolderInput.value = value;

    holderEmboss.textContent = formattedValue ? formattedValue : "FULL NAME";
    holderShadow.textContent = formattedValue ? formattedValue : "FULL NAME";
    signature.textContent = value;
  });
}

function monthInputListener() {
  const cardExpireMonthInput = document.querySelector("#expiration-date-month");
  const cardExpireYearInput = document.querySelector("#expiration-date-year");
  const cardExpire = document.querySelector(".expiration-date").children;
  const [expireShadow, expireEmboss] = cardExpire;

  cardExpireMonthInput.addEventListener("change", (e) => {
    const { value } = e.target;

    const isLabel = cardExpireYearInput.value === "Year" ? "2029" : cardExpireYearInput.value;

    expireEmboss.textContent = `${addLeadingZero(value)}/${isLabel}`;
    expireShadow.textContent = `${addLeadingZero(value)}/${isLabel}`;
  });
}

function yearInputListener() {
  const cardExpireMonthInput = document.querySelector("#expiration-date-month");
  const cardExpireYearInput = document.querySelector("#expiration-date-year");
  const cardExpire = document.querySelector(".expiration-date").children;
  const [expireShadow, expireEmboss] = cardExpire;

  cardExpireYearInput.addEventListener("change", (e) => {
    const { value } = e.target;

    const isLabel = cardExpireMonthInput.value === "Month" ? "12" : cardExpireMonthInput.value;

    expireEmboss.textContent = `${addLeadingZero(isLabel)}/${value}`;
    expireShadow.textContent = `${addLeadingZero(isLabel)}/${value}`;
  });
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
