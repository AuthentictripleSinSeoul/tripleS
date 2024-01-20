// script.js
document.addEventListener("DOMContentLoaded", function () {
    const tabsContainer = document.getElementById('tabs-container');
    const imageContainer = document.getElementById('image-container');

    const tabNames = ["Generation", "Rising", "Cherry Talk", "Touch+", "Girl's Capitalism", "Invincible", "Just Do It"];
    const imageSources = ["generation.png", "rising.jpg", "cherry-talk.jpg", "touch-plus.jpg", "girls-capitalism.jpg", "invincible.jpg", "just-do-it.jpg"];

    // Add tabs dynamically
    for (let i = 0; i < tabNames.length; i++) {
        const tab = document.createElement('div');
        tab.classList.add('desktop-tab');
        tab.innerHTML = `<span class="tab-text">${tabNames[i]}</span>`;

        // Event listener for tab click
        tab.addEventListener('click', function () {
            changeTab(i);
        });

        tabsContainer.appendChild(tab);
    }

    // Initial image display
    showImage(imageSources[0]);

    // Function to change the displayed image
    function showImage(imageSource) {
        // Clear existing images
        imageContainer.innerHTML = '';

        // Create new image element
        const image = document.createElement('img');
        image.src = imageSource;
        image.alt = 'Page Image';

        // Append image to the container
        imageContainer.appendChild(image);
    }

    // Function to change the active tab
    function changeTab(index) {
        // Remove active class from all tabs
        document.querySelectorAll('.desktop-tab').forEach(function (tab) {
            tab.classList.remove('active-tab');
        });

        // Add active class to the clicked tab
        tabsContainer.children[index].classList.add('active-tab');

        // Change the displayed image
        showImage(imageSources[index]);
    }

    // Function to check if the device is in mobile view
    function isMobile() {
        return window.innerWidth <= 768; // Adjust the width threshold as needed
    }

    // Event listener for touch/swipe on mobile
    let startX;

    tabsContainer.addEventListener('touchstart', function (e) {
        if (isMobile()) {
            startX = e.touches[0].clientX;
        }
    });

    tabsContainer.addEventListener('touchmove', function (e) {
        if (isMobile()) {
            const moveX = e.touches[0].clientX;
            const diffX = startX - moveX;

            // Threshold for swipe detection
            if (Math.abs(diffX) > 50) {
                // Swipe right
                if (diffX > 0) {
                    const currentTabIndex = Array.from(tabsContainer.children).findIndex(tab => tab.classList.contains('active-tab'));
                    const nextTabIndex = (currentTabIndex < tabNames.length - 1) ? currentTabIndex + 1 : 0;
                    changeTab(nextTabIndex);
                }
                // Swipe left
                else {
                    const currentTabIndex = Array.from(tabsContainer.children).findIndex(tab => tab.classList.contains('active-tab'));
                    const prevTabIndex = (currentTabIndex > 0) ? currentTabIndex - 1 : tabNames.length - 1;
                    changeTab(prevTabIndex);
                }
            }
        }
    });
});
