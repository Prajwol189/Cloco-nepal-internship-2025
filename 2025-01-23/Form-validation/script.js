
const users = [];


const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const errorMessagesContainer = document.getElementById('errorMessages');
const successMessageContainer = document.getElementById('successMessage');

// validate the form
function validateForm() {
    const errors = [];

 
    errorMessagesContainer.textContent = '';
    successMessageContainer.textContent = '';

 
    if (nameInput.value.trim() === '') {
        errors.push('Name is required.');
    }

    if (emailInput.value.trim() === '') {
        errors.push('Email is required.');
    } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
        errors.push('Invalid email format.');
    }


    if (passwordInput.value.trim() === '') {
        errors.push('Password is required.');
    } else if (passwordInput.value.length < 6) {
        errors.push('Password must be at least 6 characters long.');
    }

    return errors;
}
form.addEventListener('submit',()=>{
    const errors=validateForm();
})
// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();


    const errors = validateForm();

    if (errors.length > 0) {
    
        errorMessagesContainer.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
    } else {
       
        const userData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim(),
        };
        users.push(userData);

 
        form.reset();

     
        successMessageContainer.textContent = 'Form submitted successfully!';

       
        console.log('Users:', users);
    }
});
