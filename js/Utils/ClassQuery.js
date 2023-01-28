
export function toggleForId(left, right, element, boolWhich)
{
    let id = $(element);
    //console.log('Toggling class for id: ', id)
    if(id != null) {
        if(boolWhich === true) {
            id.toggleClass(right); console.log("Server unavailable ⛔");
            toggleClass(left, right, id);
        } else {
            id.addClass(left); console.log("Server available ✅");
            toggleClass(right, left, id);
        }
    } else {
        //console.log('toggling failed for: ' + element + '.');
    }
}

function toggleClass(left, right, id) {
    if(!id.hasClass(left))  {
        id.addClass(left);
    }
    if(id.hasClass(right)) {
        id.toggleClass(right);
    }
}

export function toggleTwoClasses (class1, class2) {
    if( !class1 || !class2 )
        return this;
        
    return this.each(function() {
        var $elm = $(this);

        if( $elm.hasClass(class1) || $elm.hasClass(class2) )
            $elm.toggleClass(class1 +' '+ class2);
        else
            $elm.addClass(class1);
    });
};