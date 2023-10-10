
export function addRedirectEventListener(query_selector, event_handler)
{
    // shows the modal when the user clicks "query_selector"
    let element = document.querySelector(query_selector)
    if (element == null)
        return
    element?.addEventListener('click', function(e) {
        e.preventDefault();
        event_handler();
    }); 
    console.warn(`[WRN] addRedirectEventListener() <${query_selector}> - <${element}> `);
}

export function InvokeAddEventListener(element, event_handler)
{
    const invokeCallback = function(e) {
        e.preventDefault();
        event_handler();
    };
    element?.addEventListener('click', invokeCallback); 
    console.warn(`[WRN] InvokeAddEventListener <${element}> `);
    return invokeCallback;
}