export function addRedirectEventListener(query_selector, event_handler)
{
    // shows the modal when the user clicks "query_selector"
    document.querySelector(query_selector)?.addEventListener('click', function(e) {
        event_handler(e);
    });  
}