document.addEventListener("DOMContentLoaded", function () {
    const tabsContainer = document.getElementById('tabs-container');
    const imageContainer = document.getElementById('image-container');
    const mobileMenuContainer = document.getElementById('mobile-menu-container');
    const tabNames = ["Generation", "Rising", "Cherry Talk", "Touch", "Girl's Capitalism", "Invincible", "Just Do It"];
    const imageSources = ["generation.png", "rising.png", "cherry-talk.png", "touch.png", "girls-capitalism.png", "invincible.png", "just-do-it.png"];

    // 이미지를 미리 로딩하여 브라우저에 캐시
    const images = [];
    imageSources.forEach(function (src) {
        const img = new Image();
        img.src = src;
        images.push(img);
    });

    // Add tabs dynamically
    for (let i = 0; i < tabNames.length; i++) {
        const tab = document.createElement('div');
        tab.classList.add('desktop-tab');
        tab.innerHTML = `<span class="tab-text">${tabNames[i]}</span>`;
        tabsContainer.appendChild(tab);

        // Event listener for tab click
        tab.addEventListener('click', function () {
            changeTab(i);
        });
    }

    // Initial image display
    showImage(images[0]);

    // Function to change the displayed image
    function showImage(image) {
        // Clear existing images
        imageContainer.innerHTML = '';

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
        showImage(images[index]);
    }

    // Toggle mobile menu
    window.toggleMobileMenu = function () {
        const menuContainer = document.getElementById('mobile-menu-container');
        menuContainer.classList.toggle('active');
    };

    // Create mobile menu
    function createMobileMenu() {
        const menuContainer = document.createElement('div');
        menuContainer.classList.add('mobile-menu');
        
        // Create tabs for mobile menu
        for (let i = 0; i < tabNames.length; i++) {
            const mobileTab = document.createElement('div');
            mobileTab.classList.add('mobile-tab');
            mobileTab.innerHTML = `<span class="tab-text">${tabNames[i]}</span>`;
            
            // Event listener for mobile tab click
            mobileTab.addEventListener('click', function () {
                changeTab(i);
                closeMobileMenu(); // Close the mobile menu after clicking a tab
            });

            // Append mobile tab to the menu
            menuContainer.appendChild(mobileTab);
        }

        // Append mobile menu to the body
        mobileMenuContainer.appendChild(menuContainer);
    }

    // Close mobile menu
    function closeMobileMenu() {
        const menuContainer = document.getElementById('mobile-menu-container');
        menuContainer.classList.remove('active');
    }

    // Check if the device is mobile and create the mobile menu
    if (isMobile()) {
        createMobileMenu();
    }

    // Function to check if the device is mobile view
    function isMobile() {
        return window.innerWidth <= 768; // Adjust the width threshold as needed
    }
});
