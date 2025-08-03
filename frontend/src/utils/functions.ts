export const isValidPassword = (password: string) => {
  if (password.length < 4) {
    return alert("password should be atleast 4 characters");
  }
  const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  if (!specialCharacters.test(password)) {
    return alert("password should have atleast 1 special character");
  }
  return true;
};

export const isValidEmail = (inputValue: string) => {
  const specialCharacters = /^[a-z0-9]*@[a-z]+\.[a-z]{2,3}$/;
  if (!specialCharacters.test(inputValue)) {
    return alert("Give valid email address");
  }
  return true;
};

export const formatAmount = (amount: number) => {
  return amount
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};