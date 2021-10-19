export const EMAIL_REGEXP = /[^@]+@[^@]+\.[^@]+/;
export const NUMBER_REGEXP = /[0-9]/;
export const NUMBER_START_REGEXP = /^[9]/;
export const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,}$/;

export const CODE_REGEXP = /^PR08[0-9]+$/;

export const WORD_REGEXP = /[\w]+/;
export const CUSPP_REGEX =
  /^[0-9](?=.*[a-zA-ZñÑ]).*[0-9].*(?=.*[a-zA-ZñÑ]).*[0-9].*[0-9]$/;

export const IMG_REGEX = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

export const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-|.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
