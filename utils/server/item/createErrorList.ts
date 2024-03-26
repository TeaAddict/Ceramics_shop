export function createErrorList(error: any, backendErrors: {}) {
  error.meta.target.map((val: string) => {
    if (val === "title")
      backendErrors = {
        ...backendErrors,
        title: "Title already exists",
      };
    if (val === "name")
      backendErrors = {
        ...backendErrors,
        pictures: "Image with this name already exists",
      };
  });
  return backendErrors;
}
