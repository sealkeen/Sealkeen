import { createErrorMessage, createInfoMessage } from "../../Errors/fetch-errors.js";
import Debug from "../../Extensions/cs-debug.js";
import { displayQueuedTracks } from "../../utilities.js";
import { _trackQueue, swapQueryElements } from '../Queue.js';

export function attachDraggableEventsToQueue() {
    // Attach the drag and drop event listeners to elements with the class "card-query-columns"
    const cardColumns = document.querySelector('.card-query-columns');
    if(cardColumns == null)
    {
        createErrorMessage('.card-query-columns not found');
    }

    // Find all elements with the class "card small-card"
    const cardElements = document.querySelectorAll('.card.small-card');

    // Make each element draggable
    cardElements.forEach((cardElement) => {
        cardElement.setAttribute('draggable', 'true');
    });

    // Now you can attach the drag-and-drop event listeners as previously described
    // ...

    cardColumns.addEventListener('dragstart', dragStart);
    cardColumns.addEventListener('dragover', dragOver);
    cardColumns.addEventListener('drop', drop);
}

// Function to handle the drag start event
function dragStart(event) {
    console.log('Retrieve the ID from the <data> element\'s value attribute');
    const id = event.target.querySelector('data').getAttribute('value');
    event.dataTransfer.setData('text/plain', id);
}

function isClassOneOfCardChildNodes(className) {
    return className.indexOf('card-text') > -1 || className.indexOf('card-title') > -1
}

function checkTarget(target, description) {
    if(target == null) { 
        console.warn(`draggable-query-extensions.js: On data drop in query columns: ${description} was null.`); 
        return false;
    }
    return true;
}

// Function to handle the drop event
function drop(event) {
    event.preventDefault();
    let crdBody = isClassOneOfCardChildNodes(event.toElement.className) ?
        event.target.parentElement :
        event.target;
    if(checkTarget(crdBody, 'card body') == false) { return; }

    console.log('POSIILBE NULL DATA: %j', crdBody)
    let data = crdBody.querySelector('data') ;
    if(checkTarget(data, 'data node') == false) { return; }

    const targetId = data.getAttribute('value');
    Debug.WriteLine('1) Retrieve the target ID from the data transfer');
    const sourceId = event.dataTransfer.getData('text/plain');
    Debug.WriteLine('2) Retrieve the dragged ID from the data transfer');

    if (sourceId && targetId) {
        Debug.WriteLine('3) Find the dragged and target elements based on their IDs');
        const cardQueryColumns = document.querySelector('.card-query-columns');
        const sourceElement = cardQueryColumns.querySelector(`.card.small-card data[value="${sourceId}"]`);
        const targetElement = cardQueryColumns.querySelector(`.card.small-card data[value="${targetId}"]`);
        
        Debug.WriteLine("4) Source element: %j", sourceElement);
        Debug.WriteLine("5) Target element: %j", targetElement);
        Debug.WriteLine('6) Swap the elements in the DOM and update _trackQueue as needed // ...');
        
        SwapNode(sourceElement.parentNode, targetElement.parentNode);
        swapQueryElements(sourceId, targetId);
        displayQueuedTracks(_trackQueue);
    }
}

function SwapNode(N1, N2)  {
    var P1 = N1.parentNode;
    var T1 = document.createElement("span");    
    P1.insertBefore(T1, N1);

    var P2 = N2.parentNode;
    var T2 = document.createElement("span");
    P2.insertBefore(T2, N2);

    P1.insertBefore(N2, T1);
    P2.insertBefore(N1, T2);

    P1.removeChild(T1);
    P2.removeChild(T2);
}

// Function to handle the drag over event and allow dropping
function dragOver(event) {
    event.preventDefault();
}
