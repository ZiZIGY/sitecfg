export const formDataToJson = (formData: FormData) => {
  const json: any = {};

  for (const [key, value] of formData) json[key] = value;

  return JSON.stringify(json);
};

export const objectToJson = (obj: Object) => {
  return JSON.stringify(obj);
};

export const deviceIsMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};
