export function appendSideNavigationBars()
{  
    if(document.getElementsByClassName('.nav') == null)
      return;
    // Get the height of the navigation bar
    var navHeight = $('nav').outerHeight();
    
    // create the first <div> element
    const leftSideNav = $('<div>').attr('id', 'left-side-nav').addClass('sidenav bottom-left-nav')
    .css({width: '0px', paddingLeft: '0px', paddingRight: '0px'}).css('top', navHeight + 'px');
      
    // add child elements to leftSideNav
    leftSideNav.append($('<p>').addClass('closebtn').text('×').attr('href', 'javascript:void(0)'));
    leftSideNav.append($('<div>').addClass('circle left-circle').append($('<div>').addClass('line left-line')));
    leftSideNav.append($('<p>').addClass('nav-link nav-lnk-artists').text('Artists'));
    leftSideNav.append($('<p>').addClass('nav-link nav-lnk-compositions').text('Tracks'));
    leftSideNav.append($('<p>').addClass('nav-link nav-lnk-albums').text('Albums'));
    leftSideNav.append($('<p>').addClass('nav-link nav-lnk-genres').text('Genres'));
    leftSideNav.append($('<p>').addClass('nav-link nav-lnk-sign-up').text('Sign up'));
    leftSideNav.append($('<p>').addClass('nav-link nav-lnk-background').text('Background'));
    leftSideNav.append($('<a>').addClass('nav-link nav-lnk-about').text('About').attr('href', 'https://about.me/sealkeen'));
  
    // create the second <div> element
    const rightSideNav = $('<div>').attr('id', 'right-side-nav').addClass('sidenav bottom-right-nav').css({width: '0px', paddingLeft: '0px', paddingRight: '0px'});
  
    // add child elements to rightSideNav
    rightSideNav.append($('<p>').addClass('closeRightNavBtn').text('×').attr('href', 'javascript:void(0)'));
    rightSideNav.append($('<div>').addClass('circle right-circle').append($('<div>').addClass('line right-line')));
    rightSideNav.append($('<div>').css('display', 'flex')
      .append($('<p>').addClass('footer-pause-track-btn').text('Pause').attr('href', '#'))
      .append($('<p>').addClass('footer-next-track-btn').text('Next').attr('href', '#')));
    rightSideNav.append($('<div>').addClass('card-query-columns'));
    rightSideNav.append($('<input>').attr({type: 'range', id: 'vertical-volume-control', class: ''}));
  
    // add both div elements to header as first children
    $('header').prepend(leftSideNav).prepend(rightSideNav);
}