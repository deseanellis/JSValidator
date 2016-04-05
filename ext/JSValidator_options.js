var options = {
  errorMessage: "Enter [placeholder].",
  successMessage: ""
};

var emailOptions = {
  errorMessage: "Your [placeholder] is not valid.",
  successMessage: "Your [placeholder] is valid."
};

var passwordOptions = {
  errorMessage: "Your [placeholder] is not valid.",
  successMessage: "Your [placeholder] is valid.",
  length: {
    check: true,
    min: 6,
    max: 100,
    errorMessage: "Your [placeholder] must be between 0 and 100 characters"
  },
  characters: {
    check: true,
    commonLetters: [1,100],
    capitalLetters: [1,100],
    numbers: [1,100],
    symbols: [1,100],
    symbolsAllowed: true,
    symbolsDisallowed: false,
    symbolsList: [
      "@", "$", "%"
    ],
    errorMessage: "Your [placeholder] can only use the following characters: (@,$,%)"
  },
  confirm: {
    check: false,
    fieldId: "#confirm-password",
    errorMessage: "Your confirmed password does not match."
  }
};

var confirmPasswordOptions = {
  errorMessage: "Your [placeholder] is not valid.",
  successMessage: "Your [placeholder] is a match.",
  length: {
    check: false
  },
  characters: {
    check: false
  },
  confirm: {
    check: true,
    fieldId: "#password",
    errorMessage: "Your confirmed password does not match."
  }
};

var contactNumberOptions = {
  errorMessage: "Your [placeholder] is not valid.",
  successMessage: "Your [placeholder] is valid.",
  length: {
    check: true,
    min: 11,
    max: 12,
    errorMessage: "Please enter valid [placeholder] e.g. 868-999-9999"
  },
  characters: {
    check: true,
    commonLetters: [0,0],
    capitalLetters: [0,0],
    numbers: [10,10],
    symbols: [2,2],
    symbolsAllowed: true,
    symbolsDisallowed: false,
    symbolsList: [
      "-"
    ],
    errorMessage: "Please enter valid [placeholder] e.g. 868-999-9999"
  },
  confirm: {
    check: false,
    fieldId: "#confirm-password",
    errorMessage: "Your confirmed password does not match."
  }
};