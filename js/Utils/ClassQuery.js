
export function toggleForId(left, right, element, boolWhich)
{
    console.log('togglingClass for: ' + element + boolWhich ? "on" : "off" + '...');
    let id = $(element);
    //console.log('Which under JQuery has id: ', id)
    if(id != null) {
        if(boolWhich === true) {
            toggleClass(left, right, id);
        } else {
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