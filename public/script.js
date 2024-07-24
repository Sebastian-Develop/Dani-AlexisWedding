document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const imageGallery = document.getElementById('imageGallery');
    const lastImages = document.getElementById('lastImages');
    
    const fetchImages = async () => {
        const res = await fetch('/images');
        const images = await res.json();
        displayImages(images);
    };

    const displayImages = (images) => {
        imageGallery.innerHTML = '';
        lastImages.innerHTML = '';

        images.forEach((filename, index) => {
            const img = document.createElement('img');
            img.src = `/uploads/${filename}`;
            img.alt = 'Uploaded Image';

            // Delete functionality
            img.addEventListener('click', async () => {
                await fetch(`/images/${filename}`, { method: 'DELETE' });
                fetchImages();
            });

            imageGallery.appendChild(img);

            // Add image to the last images section
            if (index >= images.length - 5) {
                lastImages.appendChild(img.cloneNode());
            }
        });
    };

    imageUpload.addEventListener('change', async (event) => {
        const files = event.target.files;
        const formData = new FormData();

        Array.from(files).forEach(file => {
            formData.append('images', file);
        });

        await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        fetchImages();
    });

    fetchImages();
});