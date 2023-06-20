export function addEventOnWindowResize() {
    document.querySelector('.spacer').style.height = $('.navbar').height() * 1.5 + 'px';
    
    /*console.log('Adding sidenav resize handlers...')*/
    
    $('.sidenav').each(function() {
        let navHeight = $('nav').outerHeight();
        $(this).css('top', navHeight);
    });

    $('.navbar-toggler').on('click', function() {
        $('nav').one('transitionend', function() {
          let navHeight = $(this).outerHeight();
          $('.sidenav').each(function() {
            //console.log('<nav>\'s transition end has fired into sidenav.')
            $(this).css('top', navHeight);
          });
        });
      });

    window.addEventListener('resize', function(event) {
        //console.log('size changed:' + $('.navbar').height() + 'px');  

        document.querySelector('.spacer').style.height = $('.navbar').height() * 1.5 + 'px';

        // sidenavs on resize
        let navHeight = $('nav').outerHeight();
        $('.sidenav').each(function() {
            $(this).css('top', navHeight);
        });
    }, true);
}