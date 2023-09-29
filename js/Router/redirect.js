
export function addRedirectEventListener(query_selector, event_handler)
{
    // shows the modal when the user clicks "query_selector"
    let element = document.querySelector(query_selector)
    element?.addEventListener('click', function(e) {
        event_handler(e);
    }); 
    console.warn(`[WRN] addRedirectEventListener() <${query_selector}> - <${element}> `);
}

export function InvokeAddEventListener(element, event_handler)
{
    element?.addEventListener('click', function(e) {
        e.preventDefault();
        event_handler(e);
    }); 
    console.warn(`[WRN] InvokeAddEventListener <${element}> `);
}