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
    const input = targets[i];
    if (input.type === 'number' && !validateNumber(input.value)) {
      input.setCustomValidity('El campo debe ser un número');
      isValid = false;
    }

    if (input.type === 'email' && !validateEmail(input.value)) {
      input.setCustomValidity('El campo debe ser un correo electrónico válido');
      isValid = false;
    }

    if (input.type === 'text' && input.name === 'name' && input.value === '') {
      input.setCustomValidity('El nombre es obligatorio');
      input.focus();
      isValid = false;
    }

    if (input.type === 'url' && !validateUrl(input.value)) {
      input.setCustomValidity('El campo debe ser una url');
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
