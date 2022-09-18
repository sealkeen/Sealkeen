export default { 
    toggleBodyBackground()
    {
        if ($('body').hasClass('white')) {
            $('body').toggleClass('white');
            //$('body').css('background-color', 'white');
        } else {
            $('body').toggleClass('white');
            //$('body').css('background-color', 'grey');
        }
    }
}

export function toggleBodyBackground()
{
    if ($('body').hasClass('white')) {
        $('body').toggleClass('white');
        //$('body').css('background-color', 'white');
    } else {
        $('body').toggleClass('white');
        //$('body').css('background-color', 'grey');
    }
}