export const getFormData = (element: HTMLFormElement) => {
  const formData = new FormData(element);
  const formJson = Object.fromEntries(formData.entries());
  return formJson;
}
