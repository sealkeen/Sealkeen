export function addEventOnWindowResize() {
    try {
        if (document.querySelector('.spacer') == null)
            return;
        document.querySelector('.spacer').style.height = $('.navbar').height() * 1.5 + 'px';
        console.log('[INF] Adding sidenav resize handlers...')
        $('.sidenav').each(function() {
            let navHeight = $('nav').outerHeight();
            $(this).css('top', navHeight);
        });

        $('.navbar-toggler').on('click', function() {
            $('nav').one('transitionend', function() {
            let navHeight = $(this).outerHeight();
            $('.sidenav').each(function() {
                $(this).css('top', navHeight);
            });
            });
        });

        window.addEventListener('resize', function(event) {
            document.querySelector('.spacer').style.height = $('.navbar').height() * 1.5 + 'px';

            // sidenavs on resize
            let navHeight = $('nav').outerHeight();
            $('.sidenav').each(function() {
                $(this).css('top', navHeight);
            });
        }, true);
    } catch (e) {
        console.log(e);
    } 
}