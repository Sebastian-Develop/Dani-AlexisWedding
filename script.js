document.getElementById('imageUpload').addEventListener('change', function(event) {
    const files = event.target.files;
    const gallery = document.getElementById('imageGallery');
    const lastImages = document.getElementById('lastImages');
    
    // Clear the current gallery and last images
    gallery.innerHTML = '';
    lastImages.innerHTML = '';

    // Process each file
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name;

            // Add image to the gallery
            gallery.appendChild(img);

            // Add image to the last images section
            if (i >= files.length - 5) { // Show last 5 images
                lastImages.appendChild(img.cloneNode());
            }

            // Add click event to enlarge image
            img.addEventListener('click', function() {
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';

                const modalImg = document.createElement('img');
                modalImg.src = e.target.result;
                modalImg.style.maxWidth = '90%';
                modalImg.style.maxHeight = '90%';
                modal.appendChild(modalImg);

                modal.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });

                document.body.appendChild(modal);
            });
        };

        reader.readAsDataURL(file);
    }
});
