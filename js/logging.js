import urls from './api.js'
var loc = await urls.getLocation();

export function LogMessageRequest(message) {
    if(urls.isGithub())
        return;

    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        type: 'POST',
        url: loc + 'api/Logger',
        success: function (msg) {
            //alert('wow' + msg);
        },
        data:
            JSON.stringify({ "message": message })
    });
}