document.addEventListener('DOMContentLoaded', () => {
    const lastImages = document.getElementById('lastImages');
    const rsvpForm = document.getElementById('rsvpForm');
    
    const fetchImages = async () => {
        const res = await fetch('http://test-emptysoul.bplaced.net:5001/Dani-AlexisWedding/images'); // Update this URL
        const images = await res.json();
        displayImages(images);
    };

    const displayImages = (images) => {
        lastImages.innerHTML = '';

        images.slice(-5).forEach(filename => {
            const img = document.createElement('img');
            img.src = `http://test-emptysoul.bplaced.net:5001/Dani-AlexisWedding/uploads/${filename}`; // Update this URL
            img.alt = 'Uploaded Image';
            lastImages.appendChild(img);
        });
    };

    rsvpForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(rsvpForm);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
        };

        await fetch('http://test-emptysoul.bplaced.net:5001/Dani-AlexisWedding/rsvp', { // Update this URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        alert('Ihre Antwort wurde gesendet. Vielen Dank!');
        rsvpForm.reset();
    });

    fetchImages();
});
