/**
 * create input with entered params
 * @param type
 * @param className
 * @param text
 * @param name
 * @param value
 * @returns {HTMLInputElement}
 */
export function createInput(type, className, text, name, value) {
  const input = document.createElement('input');
  input.className = className;
  input.type = type;
  input.name = name;
  input.placeholder = text;
  if (value !== undefined) {
    input.value = value;
  }
  return input;
}

/**
 * create text with entered params
 * @param tag
 * @param text
 * @param name
 * @returns {*}
 */
export function createText(tag, text, name) {
  const someText = document.createElement(tag);
  someText.name = name;
  someText.textContent = text;
  return someText;
}

/**
 * create Button with entered params
 * @param className
 * @param text
 * @param name
 * @returns {HTMLButtonElement}
 */
export function createButton(className, text, name) {
  const button = document.createElement('button');
  button.className = className;
  button.textContent = text;
  button.name = name;
  return button;
}

/**
 * create Href with entered params
 * @param className
 * @param text
 * @param section
 * @returns {HTMLAnchorElement}
 */
export function createHref(className, text, section) {
  const button = document.createElement('a');
  button.className = className;
  button.textContent = text;
  button.dataset.section = section;
  return button;
}

/**
 * Creates image with specified parameters and returns it as an object
 * @param {string} src - image source path
 * @param {number} width - image width
 * @param {number} height - image height
 */
export function createImage(src, width, height) {
  const img = document.createElement('img');
  img.src = src;
  img.width = width;
  img.height = height;
  return img;
}

export function createInvalidInput(className, type, text, name, value) {
  const input = document.createElement('input');
  input.className = className;
  input.type = type;
  input.name = name;
  input.placeholder = text;
  if (value !== undefined) {
    input.value = value;
  }
  return input;
}
