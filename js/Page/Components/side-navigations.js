export function appendSideNavigationBars()
{  
    // Get the height of the navigation bar
    var navHeight = $('nav').outerHeight();
    
    // create the first <div> element
    const mySidenav = $('<div>').attr('id', 'mySidenav').addClass('sidenav bottom-left-nav')
    .css({width: '0px', paddingLeft: '0px', paddingRight: '0px'}).css('top', navHeight + 'px');
      
    // add child elements to mySidenav
    mySidenav.append($('<p>').addClass('closebtn').text('×').attr('href', 'javascript:void(0)'));
    mySidenav.append($('<div>').addClass('circle left-circle').append($('<div>').addClass('line left-line')));
    mySidenav.append($('<p>').addClass('nav-link stroke-shadow-h3 nav-lnk-artists').text('Artists'));
    mySidenav.append($('<p>').addClass('nav-link stroke-shadow-h3 nav-lnk-compositions').text('Tracks'));
    mySidenav.append($('<p>').addClass('nav-link stroke-shadow-h3 nav-lnk-albums').text('Albums'));
    mySidenav.append($('<p>').addClass('nav-link stroke-shadow-h3 nav-lnk-genres').text('Genres'));
    mySidenav.append($('<p>').addClass('nav-link stroke-shadow-h3 nav-lnk-sign-up').text('Sign up'));
    mySidenav.append($('<p>').addClass('nav-link stroke-shadow-h3 nav-lnk-background').text('Background'));
    mySidenav.append($('<a>').addClass('nav-link stroke-shadow-h3-white nav-lnk-about').text('About').attr('href', 'https://about.me/sealkeen'));
  
    // create the second <div> element
    const bottomRightNav = $('<div>').attr('id', 'bottomRightNav').addClass('sidenav bottom-right-nav').css({width: '0px', paddingLeft: '0px', paddingRight: '0px'});
  
    // add child elements to bottomRightNav
    bottomRightNav.append($('<p>').addClass('closeRightNavBtn').text('×').attr('href', 'javascript:void(0)'));
    bottomRightNav.append($('<div>').addClass('circle right-circle').append($('<div>').addClass('line right-line')));
    bottomRightNav.append($('<div>').css('display', 'flex')
      .append($('<p>').addClass('footer-pause-track-btn').text('Pause').attr('href', '#'))
      .append($('<p>').addClass('footer-next-track-btn').text('Next').attr('href', '#')));
    bottomRightNav.append($('<div>').addClass('card-query-columns'));
    bottomRightNav.append($('<input>').attr({type: 'range', id: 'volume-control', class: ''}));
  
    // add both div elements to header as first children
    $('header').prepend(mySidenav).prepend(bottomRightNav);

}