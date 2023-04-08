import urls from './api.js'

export function LogMessageRequest(message) {
    if(urls.isGithub())
        return;

    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        type: 'POST',
        url: urls.getLocation() + 'api/Logger',
        success: function (msg) {
            //alert('wow' + msg);
        },
        data:
            JSON.stringify({ "message": message })
    });
}