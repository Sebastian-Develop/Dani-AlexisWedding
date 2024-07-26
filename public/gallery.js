document.addEventListener('DOMContentLoaded', () => {
    const highlightedImages = document.getElementById('highlightedImages');
    const allImages = document.getElementById('allImages');

    const fetchImages = async () => {
        const res = await fetch('http://test-emptysoul.bplaced.net:5001/Dani-AlexisWedding/images'); // Update this URL
        const images = await res.json();
        displayImages(images);
    };

    const displayImages = (images) => {
        highlightedImages.innerHTML = '';
        allImages.innerHTML = '';

        images.slice(-5).forEach(filename => {
            const img = document.createElement('img');
            img.src = `http://test-emptysoul.bplaced.net:5001/Dani-AlexisWedding/uploads/${filename}`; // Update this URL
            img.alt = 'Uploaded Image';
            highlightedImages.appendChild(img);
        });

        images.forEach(filename => {
            const img = document.createElement('img');
            img.src = `http://test-emptysoul.bplaced.net:5001/Dani-AlexisWedding/uploads/${filename}`; // Update this URL
            img.alt = 'Uploaded Image';
            allImages.appendChild(img);
        });
    };

    fetchImages();
});
