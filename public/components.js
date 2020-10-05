
function createInput(type, text, name) {

    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;
    return input;
}

function createText(tag, text, name) {
    const someText = document.createElement(tag);
    someText.name = name;
    someText.textContent = text;
    return someText;
}

function createButton(className, text, name) {
    const button = document.createElement('button');
    button.className = className;
    button.textContent = text;
    button.name = name;
    return button;
}

function createHref(className, text, section) {
    const button = document.createElement('a');
    button.className = className;
    button.textContent = text;
    button.dataset.section = section;
    return button;
}