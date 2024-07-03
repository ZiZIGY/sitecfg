export const formDataToJson = (formData: FormData) => {
  const json: any = {};

  for (const [key, value] of formData) json[key] = value;

  return JSON.stringify(json);
};

export const objectToJson = (obj: Object) => {
  return JSON.stringify(obj);
};
