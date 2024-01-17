const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const getFormData = (form) => {
  const formData = new FormData(form.target);
  const data = Object.fromEntries(formData);

  return data;
};

export { validateEmail, getFormData };
