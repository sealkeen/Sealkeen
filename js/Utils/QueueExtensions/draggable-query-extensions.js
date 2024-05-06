import { createErrorMessage, createInfoMessage } from "../../Errors/fetch-errors.js";
import { _trackQueue } from '../Queue.js';

function getQueryCardById(id) {
    const cardColumns = document.querySelector('.card-query-columns'); // Find all elements with the class "card small-card"
    const cardElements = cardColumns.querySelectorAll('.card.small-card');
    for (const cardElement of cardElements) { // Loop through each "card small-card" element
        const dataElement = cardElement.querySelector('data'); // Find the <data> element within the current card element
        if(dataElement == null) {
            createErrorMessage('Query card has no data element for some reason');
            continue;
        }
        const dataId = dataElement.getAttribute('value'); // Retrieve the ID from the <data> element's value attribute
        if(dataId == null) {
            createErrorMessage('Query card data node has no value attribute for some reason');
            continue;
        }
        if (dataId === id) { // Check if the dataId matches the provided ID
            return cardElement; // Return the parent "card small-card" element 
        }
    }
    return null;
}

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

function swapElements(sourceElement, targetElement, sourceId, targetId)
{
    // Swap the elements in the DOM
    //const parent = document.querySelector('.card-query-columns');
    // Swap the elements in the DOM
    const parent = targetElement.parentElement;
    const placeholder = document.createElement('div');
    parent.insertBefore(placeholder, targetElement);
    parent.replaceChild(sourceElement, targetElement);
    parent.replaceChild(targetElement, placeholder);

    // Update the _trackQueue array
    const sourceIndex = _trackQueue.elts.findIndex((elt) => elt.id === sourceId);
    const targetIndex = _trackQueue.elts.findIndex((elt) => elt.id === targetId);
    
    if (sourceIndex !== -1 && targetIndex !== -1) {
        const [sourceElement] = _trackQueue.elts.splice(sourceIndex, 1);
        _trackQueue.elts.splice(targetIndex, 0, sourceElement);
    }
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
    //createInfoMessage('targetId = ' + targetId)
    console.log('1) Retrieve the target ID from the data transfer');
    const sourceId = event.dataTransfer.getData('text/plain');
    //createInfoMessage('sourceId = ' + sourceId)
    console.log('2) Retrieve the dragged ID from the data transfer');

    if (sourceId && targetId) {
        console.log('3) Find the dragged and target elements based on their IDs');
        const cardQueryColumns = document.querySelector('.card-query-columns');
        const sourceElement = cardQueryColumns.querySelector(`.card.small-card data[value="${sourceId}"]`);
        const targetElement = cardQueryColumns.querySelector(`.card.small-card data[value="${targetId}"]`);
        console.log("4) Source element: %j", sourceElement);
        console.log("5) Target element: %j", targetElement);

        console.log('6) Swap the elements in the DOM and update _trackQueue as needed // ...');
        
        //let fromCard = getQueryCardById(targetId)
        if(checkTarget(sourceElement, 'Source dragged node') == false) { return; }
        //let toCard = crdBody.parentElement;
        if(checkTarget(targetElement, 'Target dragging node') == false) { return; }
        
        swapElements(sourceElement, targetElement, sourceId, targetId)
    }
}

// Function to handle the drag over event and allow dropping
function dragOver(event) {
    event.preventDefault();
}
