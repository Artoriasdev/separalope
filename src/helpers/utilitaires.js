// used for dangerouslySetInnerHTML
export const createMarkup = (text) => ({ __html: text });

//formatea un número usando notación es_PE.
export const numberFormatterPE = (number) => {
  const formatted = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  });
  return formatted.format(number);
};

// recibe una regexp o string de expresion regular y devuelve valores solo aceptados por la misma. usado para validar campos al hacer input
export const handleRegexDisable = (regex) => (e) => {
  if (regex) {
    const node = e.target;
    const patt =
      /^\//.test(regex) && /\/$/.test(regex) ? regex : new RegExp(regex);
    regex = /^\//.test(regex) && /\/$/.test(regex) ? `${regex}` : regex;

    if (/^\[/.test(regex) && /\$$/.test(regex)) {
      const extensivePattern = `[^${regex.slice(1, -1)}`;
      if (node.value.search(extensivePattern) !== -1) {
        node.value = node.value.slice(0, node.value.search(extensivePattern));
      }
    } else {
      const extensivePattern = `[^${regex.slice(1, regex.length)}`;
      if (node.value.search(extensivePattern) !== -1) {
        node.value = node.value.slice(0, node.value.search(extensivePattern));
      }
    }
    if (node.value && !patt.test(node.value)) {
      node.value = node.value.slice(0, node.value.length - 1);
    }
  }
};

// Recibe valores a evaluar, devuelve un valor acotado entre ciertos parametros
export const getValidIndex = (
  currentValue,
  maxValue,
  direction = true,
  minValue = 0
) => {
  if (direction)
    return currentValue + 1 > maxValue - 1 ? minValue : currentValue + 1;
  return currentValue - 1 < minValue ? maxValue - 1 : currentValue - 1;
};

// recibe un string y devuelve el string con el primer valor en mayuscula
export const capitalizeFirst = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}`;
};
