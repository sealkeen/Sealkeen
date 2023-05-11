export function createErrorMessage(message) {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    
    // Get the position of the page-body-container element
    const pageBodyContainer = document.querySelector("#page-body-container");
    const pageBodyContainerRect = pageBodyContainer.getBoundingClientRect();
    const pageBodyContainerTop = pageBodyContainerRect.top + window.pageYOffset;
    
    // Set the top position of the error message to the top of the page-body-container element
    // if there are no existing error messages, otherwise position it below the previous messages
    const existingErrorMessages = document.querySelectorAll(".error-message");
    let topPosition;
    if (existingErrorMessages.length === 0) {
      topPosition = pageBodyContainerTop;
    } else {
      const lastErrorMessage = existingErrorMessages[existingErrorMessages.length - 1];
      const lastErrorMessageRect = lastErrorMessage.getBoundingClientRect();
      topPosition = lastErrorMessageRect.bottom + window.pageYOffset + 10; // adjust 10 to desired spacing between error messages
    }
    errorMessage.style.top = `${topPosition}px`;
    errorMessage.style.left = `15px`;
      
    errorMessage.textContent = message;
  
    document.body.appendChild(errorMessage);
    
    // Remove the error message after 5 seconds
    setTimeout(() => {
      errorMessage.remove();
    }, 5000);
}