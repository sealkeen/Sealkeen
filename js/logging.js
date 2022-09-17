
export function LogMessageRequest(message) {
    $.ajax({
        type: 'POST',
        // make sure you respect the same origin policy with this url:
        // http://en.wikipedia.org/wiki/Same_origin_policy
        url: 'http://nakolesah.ru/',
        data: //{ //'foo': 'bar', //'ca$libri': 'no$libri' // <-- the $ sign in the parameter name seems unusual, I would avoid it }
            message
        ,
        success: function (msg) {
            alert('wow' + msg);
        }
    });
}