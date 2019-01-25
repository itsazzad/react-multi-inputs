import uniqid from "uniqid";

export function generateInputData(size, isNew = false) {
  const inputs = [];
  for (let i = 0; i < (size || 0); i++) {
    inputs.push({
      id: uniqid(),
      label: uniqid(),
      placeholder: uniqid(),
      value: isNew ? "" : uniqid()
    });
  }
  return inputs;
}
