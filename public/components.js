let user={
    name:"",
    surname:"",
    email:"",
    password:"",
    date:"",
    img:"",
}

/**
 * create input with entered params
 * @param type
 * @param text
 * @param name
 * @param value
 * @returns {HTMLInputElement}
 */
function createInput(type, text, name, value) {

    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;
    if (value !==undefined){
        input.value=value;
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
function createText(tag, text, name) {
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
function createButton(className, text, name) {
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
function createHref(className, text, section) {
    const button = document.createElement('a');
    button.className = className;
    button.textContent = text;
    button.dataset.section = section;
    return button;
}