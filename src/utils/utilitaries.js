import { UNHANDLED_ERROR } from "../utils/constants";

export const acceptedFilesAdapter = (filesString, mode = true) => {
  // const splittedAccepted = filesString.split(',');

  const acceptedFormatted = [];
  filesString.split(",").forEach((file) => {
    const fileFormatted = file.trim().toLowerCase();
    switch (fileFormatted) {
      case "pdf":
        if (mode) {
          acceptedFormatted.push(`application/${fileFormatted}`);
        } else {
          acceptedFormatted.push(`${fileFormatted}`);
        }
        break;
      case "jpg":
      case "jpeg":
        if (mode) {
          acceptedFormatted.push(`image/jpeg`);
        } else {
          acceptedFormatted.push(`${fileFormatted}`);
        }
        break;
      case "png":
      case "gif":
        if (mode) {
          acceptedFormatted.push(`image/${fileFormatted}`);
        } else {
          acceptedFormatted.push(`${fileFormatted}`);
        }
        break;
      case "*":
        if (mode) {
          acceptedFormatted.push(`image/${fileFormatted}`);
        } else {
          acceptedFormatted.push(`imagen`);
        }
        break;
      default:
        break;
    }
  });
  return acceptedFormatted.join(", ");
};

export const formatToBytes = (megabytes) => {
  if (megabytes === 0) {
    return 0;
  }
  const k = 1048576; // Byte value per MB
  return parseFloat(megabytes * k);
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

// Resuelve si un objeto esta vacio o no
export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

// Recibe un objeto y el valor a evaluar, devuelve el key que tiene ese valor especifico
export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
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

// Recibe valores a evaluar, devuelve un valor acotado entre ciertos parametros o boolean en caso que haya llegado al limite
export const getLimitIndex = (
  currentValue,
  maxValue,
  direction = true,
  stop = false,
  minValue = 0
) => {
  console.log("nosotros qlq", direction, stop);
  if (direction) {
    if (stop) return true;
    return currentValue + 1 > maxValue - 1 ? true : currentValue + 1;
  }
  return currentValue - 1 < minValue ? false : currentValue - 1;
};

// Username es opcional, se usa cuando llames al adapter para volver a crear una lista de mensajes de megan con el nombre del usuario sobreescrito
export const allMessagesAdapter = (arr, userName = "") => {
  try {
    console.log("messages adapter", arr, userName);
    const finished = arr.pasos.flatMap((step) => {
      const arrSplitted = [];
      const finalArray = [];

      step.mensajes.forEach((mensaje) => {
        arrSplitted.push({
          order: step.orden,
          type: "upper",
          text:
            mensaje.search("{{preNombres}}") > -1
              ? mensaje.replace("{{preNombres}}", userName)
              : mensaje,
          component: null,
        });
      });

      const filtered = arrSplitted.filter((obj) => obj.order === step.orden);

      const formAdapter = (filteredArray, order) => {
        switch (order) {
          case 1:
            return [
              [filteredArray[0]],
              [
                filteredArray[1],
                {
                  order,
                  type: "lower",
                  text: null,
                  component: "dni",
                  stop: true,
                },
              ],
            ];
          case 2:
            return [
              [filteredArray[0]],
              [
                {
                  order,
                  type: "upper--subtitle",
                  text: "¿Cuál es el nombre de tu mamá?",
                  component: null,
                },
                {
                  order,
                  type: "",
                  text: null,
                  component: "validation",
                  stop: true,
                },
              ],
            ];

          case 3:
            return [
              [filteredArray[0]],
              [filteredArray[1]],
              [filteredArray[2]],
              [
                {
                  order,
                  type: "upper--subtitle",
                  // text: 'Ingresa tu correo electrónico y número de celular.',
                  text: "Datos de contacto*",
                  component: null,
                },
                {
                  order,
                  type: "lower",
                  text: null,
                  component: "contact",
                  stop: true,
                },
              ],
              [
                {
                  order,
                  type: "",
                  text: null,
                  component: "address",
                  stop: true,
                },
              ],
            ];
          case 4:
            return [
              [filteredArray[0]],
              [
                {
                  order,
                  type: "",
                  text: null,
                  component: "afp",
                  stop: true,
                },
              ],
              [
                {
                  order,
                  type: "upper--subtitle",
                  text: "¿Indícanos a qué fondo quieres traspasarte?",
                  component: null,
                },
                {
                  order,
                  type: "lower",
                  text: null,
                  component: "fund",
                  stop: true,
                },
              ],
            ];
          case 5:
            return [
              [filteredArray[0]],
              [filteredArray[1]],
              [
                {
                  order,
                  type: "upper--subtitle",
                  text: "Por favor indícanos tus datos laborales.",
                  component: null,
                },
                {
                  order,
                  type: "lower",
                  text: null,
                  component: "workplace",
                  stop: true,
                },
              ],
              [
                {
                  order,
                  type: "",
                  text: null,
                  component: "upload",
                  stop: true,
                },
              ],
            ];
          case 6:
            return [
              [filteredArray[0]],
              [
                {
                  order,
                  type: "upper--subtitle",
                  text: "Selecciona una fecha.",
                  component: null,
                },
                {
                  order,
                  type: "lower",
                  text: null,
                  component: "date",
                },
                {
                  order,
                  type: "upper--subtitle",
                  text: "Selecciona un rango de horas.",
                  component: null,
                },
                {
                  order,
                  type: "lower",
                  text: null,
                  component: "select",
                  stop: true,
                },
              ],
            ];
          case 7:
            return [
              [filteredArray[0]],
              [
                {
                  order,
                  type: "upper--subtitle",
                  text: null,
                  component: "reviewTitle",
                },
                {
                  order,
                  type: "lower",
                  text: null,
                  component: "review",
                  stop: true,
                },
              ],
            ];
          default:
            return [
              {
                order,
                type: "upper",
                text: "megan default",
                component: null,
                stop: true,
              },
            ];
        }
      };

      finalArray.push(formAdapter(filtered, step.orden));

      return finalArray;
    });
    console.log("messages adapter SALE", finished);
    return finished;
  } catch (error) {
    throw new Error(UNHANDLED_ERROR("allMessagesAdapter"));
  }
};

export const allMessagesAdapterPromise = (arr, userName = "") =>
  new Promise((resolve, reject) => {
    const messages = allMessagesAdapter(arr, userName);
    if (messages) {
      resolve(messages);
    } else {
      // Esto envia al catch de la funcion que llamo esta promesa
      reject(new Error(UNHANDLED_ERROR("allMessagesAdapterPromise")));
    }
  });

// recibe un string y devuelve el string con el primer valor en mayuscula
export const capitalizeFirst = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}`;
};

// recibe un string y devuelve el string con el primer valor en mayuscula
export const capitalizeWord = (string) => {
  const stringArray = string.trim().split(" ");
  const response = [];
  stringArray.forEach((item) =>
    response.push(
      `${item.charAt(0).toUpperCase()}${item.slice(1).toLowerCase()}`
    )
  );
  return response.join(" ");
};

// recibe un string y devuelve el boolean si es un valor en base64
export const isBase64 = (string) => {
  try {
    return btoa(atob(string)) === string;
  } catch (err) {
    return false;
  }
};

// recibe un string formato dd/mm/yyyy y devuelve date
export const stringToDate = (string) => {
  const dateParts = string.split("/");
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
};

// recibe un string y devuelve un booleano true si corresponde a la palabra true , caso contrario false
export const stringToBool = (string) => {
  return /true/i.test(string);
};

// recibe un objeto y retorna el objeto sin los campos nulos
export const removeFalsy = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] === null || obj[prop] === undefined || obj[prop] === "") {
    } else {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

// recibe un objeto y cambia sus valores booleanos a string para los servicios que asi lo requieren
export const stingifyBool = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] === true) {
      newObj[prop] = "true";
    } else if (obj[prop] === false) {
      newObj[prop] = "false";
    } else {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

// recibe un arreglo y un valor a eliminar del arreglo, retorna ese arreglo limpio de ese elemento
export const arrayRemove = (arr, value) => arr.filter((ele) => ele !== value);

// recibe un date y devuelve el string de esa fecha con formato dd/mm/yyyy
// opcional recibe un objeto de configuracion para retornar fechas configurables
export const formatDate = (date, options = {}) => {
  if (isEmpty(options)) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // +1 bc getMonth starts with 0
    const year = date.getFullYear();

    const newDate = `${(day < 10 ? "0" : "") + day}/${
      (month < 10 ? "0" : "") + month
    }/${year}`;

    return newDate;
  } else {
    if (options.year) {
      const day = date.getDate();
      const month = date.getMonth() + 1; // +1 bc getMonth starts with 0
      const year = date.getFullYear() + options.year;

      const newDate = `${(day < 10 ? "0" : "") + day}/${
        (month < 10 ? "0" : "") + month
      }/${year}`;

      return newDate;
    }
    if (options.day) {
      const day = date.getDate() + options.day;
      const month = date.getMonth() + 1; // +1 bc getMonth starts with 0
      const year = date.getFullYear();

      const newDate = `${(day < 10 ? "0" : "") + day}/${
        (month < 10 ? "0" : "") + month
      }/${year}`;

      return newDate;
    }
    if (options.month) {
      const day = date.getDate();
      const month = date.getMonth() + (options.month + 1); // +1 bc getMonth starts with 0
      const year = date.getFullYear();

      const newDate = `${(day < 10 ? "0" : "") + day}/${
        (month < 10 ? "0" : "") + month
      }/${year}`;

      return newDate;
    }
  }
};

export const getFilesFromEvent = (event) => {
  let items = [];
  if (event.dataTransfer) {
    const dt = event.dataTransfer;

    // NOTE: Only the 'drop' event has access to DataTransfer.files, otherwise it will always be empty
    if (dt.files && dt.files.length) {
      items = dt.files;
    } else if (dt.items && dt.items.length) {
      items = dt.items;
    }
  } else if (event.target && event.target.files) {
    items = event.target.files;
  }

  return Array.prototype.slice.call(items);
};

export const formatBytes = (b) => {
  const units = ["bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let l = 0;
  let n = b;

  while (n >= 1024) {
    n /= 1024;
    l += 1;
  }

  return `${n.toFixed(n >= 10 || l < 1 ? 0 : 1)}${units[l]}`;
};

// used for dangerouslySetInnerHTML
export const createMarkup = (text) => {
  return { __html: text };
};

export const formatDuration = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  const dateString = date.toISOString().slice(11, 19);
  if (seconds < 3600) return dateString.slice(3);
  return dateString;
};

/**
 * From string search through array and get the same result as the key provided, returns the first oject.
 * .find() can be used instead but doesn't support IE
 */
export const filterFromArray = function (arr, key) {
  return arr.filter((arrObject) => arrObject.key === key).shift();
};

/**
 * Filtra un valor desde un arreglo. pero no compara con el key sino con otro valor
 */
export const filterLikeFromArray = (arr, key, search) => {
  // console.log('busqueda', arr, key, search);
  return arr.filter((arrObject) => arrObject[key] === search).shift();
};

export const filterLikeFromArrayPromise = (array, key, search) =>
  new Promise((resolve, reject) => {
    const filtered = filterLikeFromArray(array, key, search);
    if (filtered) {
      resolve(filtered);
    } else {
      // Esto envia al catch de la funcion que llamo esta promesa
      reject(new Error(UNHANDLED_ERROR("filterLikeFromArrayPromise")));
    }
  });

export const createMarkupFilterLikeFromArray = (arr, key, search, attr) => {
  // console.log('busqueda', arr, key, search);
  return {
    __html: arr.filter((arrObject) => arrObject[key] === search).shift()[attr],
  };
};

export const testPromise = (val) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("aqui vas a resolver el promise");
      if (val) {
        resolve("bien");
      } else {
        reject(new Error(val));
      }
    }, 1000);
  });

// Wizard views
export const moduleName = [
  { name: "formulario" },
  { name: "" },
  { name: "seguimiento", childs: [{ name: "consulta" }] },
  { name: "constancia" },
];
export const viewName = [
  { name: "init" },
  { name: "validation" },
  { name: "contact" },
  { name: "afp" },
  { name: "workplace" },
  { name: "apointment" },
  { name: "review" },
];
export const routeName = [
  { name: "" },
  { name: "validacion" },
  { name: "contacto" },
  { name: "afp" },
  { name: "datos-laborales" },
  { name: "cita" },
  { name: "revision" },
];
export const viewNameSet = new Set([
  "",
  "validacion",
  "contacto",
  "afp",
  "datos-laborales",
  "cita",
  "revision",
]);
export const segmentNameSet = new Set(["X", "Y", "BB"]);
export const realViewName = [
  { name: "inicio" },
  { name: "validacion" },
  { name: "de contacto" },
  { name: "de AFP" },
  { name: "laborales" },
  { name: "de la cita" },
  { name: "review" },
];
