function showModal(imageUrl, message) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const caption = document.getElementById("caption");

    modal.style.display = "block";
    modalImage.src = imageUrl; // Set the modal image source
    caption.textContent = message; // Set the caption text
}

// Close the modal when the close button is clicked
document.querySelector(".close").onclick = function () {
    document.getElementById("imageModal").style.display = "none";
};

// Close the modal when clicking outside the modal content
window.onclick = function (event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
