var myParameter = "";
const textContent = document.getElementById('text-content');
const textSources = ["generation.txt", "rising.txt", "colorful.txt", "cherry-talk.txt", "touch.txt", "girls-capitalism.txt", "invincible.txt", "just-do-it.txt", "1.txt", "2.txt"];
const videoidlist = [`AXzeTrC2Vlw`, "R_l-UNaXztc", "0fWM8sVy6qM"];
var videoid = videoidlist[0];

// 이미지를 토글하는 함수
function toggleImageContainer() {
    const imageContainer = document.getElementById('image-container');
    if (imageContainer.style.display === 'none' || imageContainer.style.display === '') {
        // 이미지 컨테이너가 숨겨져 있을 때는 보이도록 설정
        imageContainer.style.display = 'flex';
    } else {
        // 이미지 컨테이너가 보이고 있을 때는 숨기도록 설정
        imageContainer.style.display = 'none';
    }
}

// 텍스트를 표시하는 섹션에 YouTube 동영상과 버튼 추가
function loadTextFromFile(fileName) {
    const filePath = `${fileName}`;
    console.log('filePath:', filePath);

    // 동영상 ID
    const youtubeVideoID = videoid; 

    // 유튜브 iframe
    const youtubeEmbedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeVideoID}" frameborder="0" allowfullscreen style="border-radius: 15px; margin-top: 30px; margin-bottom: 30px;"></iframe>`;

    // 텍스트 로드 및 동영상 및 버튼 추가
    $.ajax({
        url: filePath,
        dataType: 'text',
        success: function (data) {
            let formattedText = data.replace(/\n/g, '<br>'); 
            formattedText = formattedText.replace(/\[(.*?)\]/g, '<span class="highlighted">$1</span>');
            formattedText = formattedText.replace(/\{(.*?)\}/g, '<span class="del">$1</span>');
            textContent.innerHTML = `<div style="border-radius: 15px; overflow: hidden; margin-bottom: 10px;">${youtubeEmbedCode}</div><p style="margin-top: 10px;">${formattedText}</p>`;
            
            // 버튼 추가
            const loadImageButton = document.createElement('button');
            loadImageButton.innerText = '응원법 이미지 보기';
            loadImageButton.classList.add('text-container');
            loadImageButton.style.display = 'block';
            loadImageButton.style.margin = '0 auto';
            loadImageButton.style.marginTop = '20px';
            loadImageButton.style.padding = '10px';
            loadImageButton.style.backgroundColor = 'rgb(214, 214, 214)';
            loadImageButton.style.color = 'black';
            loadImageButton.style.border = 'none';
            loadImageButton.style.borderRadius = '5px';
            loadImageButton.style.textAlign = 'center';
            loadImageButton.style.textDecoration = 'none';
            loadImageButton.style.fontSize = '16px';
            loadImageButton.style.cursor = 'pointer';
            loadImageButton.style.fontFamily = 'GmarketSansBold';

            // 클릭 이벤트리스너
            loadImageButton.addEventListener('click', function() {
                toggleImageContainer();
            });

            textContent.appendChild(loadImageButton);
        },
        error: function () {
            console.error(`Error loading text from ${filePath}`);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const tabsContainer = document.getElementById('tabs-container');
    const imageContainer = document.getElementById('image-container');
    const mobileMenuContainer = document.getElementById('mobile-menu-container');

    const backgroundVideo = document.getElementById('background-video');
    const tabNames = ["Generation", "Rising", "Colorful", "Cherry Talk", "Touch", "Girl's Capitalism", "Invincible", "Just Do It", "TEST ONLY 1", "TEST ONLY 2"];
    const imageSources = ["generation.png", "rising.png", "colorful.png", "cherry-talk.png", "touch.png", "girls-capitalism.png", "invincible.png", "just-do-it.png", "1.png", "2.png"];

    // Video load or not
    const shouldLoadVideo = !isMobile(); // 모바일이 아닐 경우에만 영상 로드

    // Background Video
    if (shouldLoadVideo) {
        backgroundVideo.innerHTML = '<source src="https://triplespics.s3.ap-northeast-2.amazonaws.com/1.mp4" type="video/mp4">';
    } else {
        backgroundVideo.style.display = 'none'; // 모바일이면 영상 숨김
    }

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
    showImage(imageSources[0]);

    // Function to change the displayed image
    function showImage(imageSrc) {
        // Clear existing images
        imageContainer.innerHTML = '';

        // Create an image element and set the source
        const image = document.createElement('img');
        image.src = "https://triplespics.s3.ap-northeast-2.amazonaws.com/" + imageSrc;

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
        myParameter = "txts/" + textSources[index];
        videoid = videoidlist[index];
        imageContainer.style.display = 'none';
        console.log(myParameter);

        // Load and display text from a file
        loadTextFromFile(myParameter);
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
        return window.innerWidth <= 768; 
    }

    // Disable video scroll for mobile
    if (isMobile()) {
        window.addEventListener('scroll', function () {
            const scrollY = window.scrollY;
            const videoHeight = backgroundVideo.offsetHeight;
            const screenHeight = window.innerHeight;

            // Pause video when the bottom of the video is above the screen
            if (scrollY > videoHeight - screenHeight) {
                backgroundVideo.pause();
            } else {
                backgroundVideo.play();
            }
        });
    }

});
