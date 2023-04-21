const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });
    if (response.ok) {
        alert("Your message has been sent successfully!");
        form.reset();
    } else {
        alert("There was an error submitting your message. Please try again.");
    }
});

