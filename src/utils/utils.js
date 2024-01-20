const validateEmail = (email) => {
  const pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
};

const validateUrl = (url) => {
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return pattern.test(url);
};

const validateNumber = (number) => {
  const pattern = /^\d+(\.\d+)?$/;
  return pattern.test(number);
};

const validateInputs = (targets) => {
  let isValid = true;
  for (let i = 0; i < targets.length; i += 1) {
    if (targets[i].type === 'number' && !validateNumber(targets[i].value)) {
      targets[i].setCustomValidity(`El ${targets[i].name} debe ser un número`);
      isValid = false;
    }

    if (targets[i].type === 'url' && !validateUrl(targets[i].value) && targets[i].required) {
      targets[i].setCustomValidity(`La ${targets[i].name} debe ser una url`);
      isValid = false;
    }
  }
  return isValid;
};
const getFormData = (form) => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  return data;
};

export {
  validateEmail,
  validateNumber,
  validateUrl,
  validateInputs,
  getFormData,
};
