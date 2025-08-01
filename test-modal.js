// Test modal appearance by opening one
const modalButton = document.querySelector('.modal-trigger');
if (modalButton) {
    modalButton.click();
    console.log('Modal opened - check the frost and glow effects!');
} else {
    console.log('Looking for modal triggers...');
    const buttons = document.querySelectorAll('button, a');
    buttons.forEach(button => {
        if (button.textContent.includes('Learn More') || 
            button.textContent.includes('End-to-End') || 
            button.textContent.includes('Expertise')) {
            console.log('Found potential modal trigger:', button);
        }
    });
}