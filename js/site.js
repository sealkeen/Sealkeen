// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

const loc = "https://cors.io/?8a2b-37-144-215-79.eu.ngrok.io/";

function setFooterPlayerSourse(el) {
    try {
        console.log(el.children[2].value); //el.children[2] = <data>
        console.log("currentSrc bottom = " + $("#player-source-element").currentSrc);
        console.log("src bottom = " + $("#player-source-element").attr('src'));
        //document.getElementById("player-source-element").src = el.children[2].value;
        //document.getElementById("player-source-element").currentSrc = el.children[2].currentSrc; 
        //alert(el.children[2].currentSrc);
        //let plr = $("#player-audio-element");
        let source = el.children[0].value;
        //$('.audio-source-class').attr('src', source);

        //var source2 = $('.audio-source-class').attr('src');
        //var elmnts = $('.audio-source-class');
        //alert(document.getElementById("player-source-element").src);
        //let a = document.getElementsByClassName("audio-source-class");
        //let c = a.length;
        // add trailing slash
        let ctrl = ( /*el.baseURI*/ loc + 'GetHtmlPlayer/?id=' + source);
        if ($("#player-source-element") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function(response) {
                    console.log('Ajax returned: ' + response);
                    $("#player-audio-div").html('');
                    $("#player-audio-div").append(response);
                    plr = $("#player-audio-element").get(0);
                    plr.play();
                },
                error: function(error_) {
                    console.log("Ajax error: " + error_);
                }
            });

        }

    } catch (e) {
        alert(e)
    }
}

function setCurrentPageGenres() {
    try {
        let ctrl = (loc + 'GetPartialGenresPage');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function(response) {
                    console.log('Ajax returned: ' + response);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function(error_) {
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        alert(e)
    }
}

function setCurrentPageAlbums() {
    try {
        let ctrl = (loc + 'GetPartialAlbumsPage');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function(response) {
                    console.log('Ajax returned: ' + response);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function(error_) {
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        alert(e)
    }
}

function setCurrentPageCompositions() {
    try {
        // let ctrl = (loc + 'GetHtmlCompositionsPage');
        // if ($("#page-body-container") != undefined) {
        //     $.ajax({ //$.get({ //
        //         url: ctrl,
        //         type: 'GET',
        //         contentType: 'html',
        //         /*data: ("_ViewPlayer=" + source),*/
        //         success: function (response) {
        //             console.log('Ajax returned: ' + response);
        //             $("#page-body-container").html('');
        //             $("#page-body-container").append(response);
        //         },
        //         error: function (error_) {
        //             console.log("Ajax error: " + error_);
        //         }
        //     });
        // }
    } catch (e) {
        alert(e)
    }
}


function setCurrentPageCompositionByID(el) {
    try {
        let id = el.children[0].value;
        let ctrl = (loc + 'GetPartialCompositionPageByID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function(response) {
                    console.log('Ajax returned: ' + response);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function(error_) {
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        alert(e)
    }
}

function setCurrentPageAlbumByID(el) {
    try {
        let id = el.children[0].value;
        let ctrl = (loc + 'GetPartialAlbumPageByID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function(response) {
                    console.log('Ajax returned: ' + response);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function(error_) {
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        alert(e)
    }
}

function setCurrentPageSignUp() {
    try {
        let ctrl = (loc + 'GetPartialSignUpPage'); // https://localhost:5001/GetHtmlSignUpPage
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function(response) {
                    console.log('Ajax returned: ' + response);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function(error_) {
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        alert(e)
    }
}