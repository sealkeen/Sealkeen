var prevState = 'off';

export function toggleForId(left, right, element, boolWhich) {
    const id = $(element);
    if (!id) {
        return;
    }
    if (boolWhich === true) {
        toggleClass(left, right, id);
        if(prevState !== 'off') console.log("Server unavailable ⛔"); //State changed, warn about it
        prevState = 'off'
    } else {
        addClass(left, id);
        toggleClass(right, left, id);
        if(prevState !== 'on') console.log("Server available ✅"); //State changed, warn about it
        prevState = 'on'
    }
}

// the toggle class function only adds the class1 if the id element has it, and toggles the class2 if the id element has it?
function toggleClass(left, right, id) {
    if(!id.hasClass(left))  {
        id.addClass(left);
    }
    if(id.hasClass(right)) {
        id.toggleClass(right);
    }
}

function addClass(className, id) {
    id.addClass(className);
}

export function toggleTwoClasses(class1, class2) {
    if (!class1 || !class2) {
        return;
    }
    const elements = $(this);
    elements.each(function() {
        const $elm = $(this);
        if ($elm.hasClass(class1) || $elm.hasClass(class2)) {
            $elm.toggleClass(`${class1} ${class2}`);
        } else {
            $elm.addClass(class1);
        }
    });
}