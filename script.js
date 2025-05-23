var myParameter = "";
const textContent = document.getElementById('text-content');
const videoContainer = document.getElementById('video-container');

const songData = {
    generation: {
        name: "Generation",
        videosource: "AXzeTrC2Vlw"
    },
    rolex: {
        name: "Rolex",
        videosource: "aFf9zpH5ahc"
    },
    rising: {
        name: "Rising",
        videosource: "R_l-UNaXztc"
    },
    colorful: {
        name: "Colorful",
        videosource: "0fWM8sVy6qM"
    },
    new_look: {
        name: "New Look",
        videosource: "u11Lblh4whI"
    },
    cherry_talk: {
        name: "Cherry Talk",
        videosource: "mNgB5dxVfGc"
    },
    touch: {
        name: "Touch+",
        videosource: "V2cVtl9bJyE"
    },
    girls_capitalism: {
        name: "Girl's Capitalism",
        videosource: "RkQC963gtnA"
    },
    invincible: {
        name: "Invincible",
        videosource: "HXJnD0w7kMY"
    },
    just_do_it: {
        name: "Just Do It",
        videosource: "s3IfM-u5hVc?"
    },
    girls_never_die: {
        name: "Girls Never Die",
        videosource: "9nnMo11jPtg"
    },
    inner_dance: {
        name: "Inner Dance",
        videosource: "cd2JwzxL1qw"
    },
    hit_the_floor: {
        name: "Hit the Floor",
        videosource: "0NtDMMj7w4M"
    },
    are_you_alive: {
        name: "깨어 (Are You Alive)",
        videosource: "SC_WQaGXCX4"
    }
}

const songList = Object.keys(songData);

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
function loadTextFromFile(fileName, videosource) {
    const filePath = `${fileName}`;
    console.log('filePath:', filePath);

    let youtubeEmbedCode = ''
    if (window.innerWidth <= 900) {
        youtubeEmbedCode = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videosource}" frameborder="0" allowfullscreen style="border-radius: 15px;"></iframe>`;
    } else {
        youtubeEmbedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videosource}" frameborder="0" allowfullscreen style="border-radius: 15px; margin-top: 30px; margin-bottom: 30px;"></iframe>`;
    }

    // 텍스트 로드 및 동영상 및 버튼 추가
    $.ajax({
        url: filePath,
        dataType: 'text',
        success: function (data) {
            let formattedText = data.replace(/\n/g, '<br>'); 
            formattedText = formattedText.replace(/\[(.*?)\]/g, '<span class="highlighted">$1</span>');
            formattedText = formattedText.replace(/\{(.*?)\}/g, '<span class="del">$1</span>');
            formattedText = formattedText.replace(/\^(.*?)\^/g, '<span class="version">$1</span>');
            videoContainer.innerHTML = youtubeEmbedCode
            textContent.innerHTML = `<p style="margin-top: 10px;">${formattedText}</p>`;
            
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

    // Video load or not
    const shouldLoadVideo = !isMobile(); // 모바일이 아닐 경우에만 영상 로드

    // Background Video
    if (shouldLoadVideo) {
        backgroundVideo.innerHTML = '<source src="images/1.mp4" type="video/mp4">';
    } else {
        backgroundVideo.style.display = 'none'; // 모바일이면 영상 숨김
    }

    // Add tabs dynamically
    // for (let i = 0; i < songList.length; i++) {
    //     const tab = document.createElement('div');
    //     tab.classList.add('desktop-tab');
    //     tab.innerHTML = `<span class="tab-text">${songData[songList[i]].name}</span>`;
    //     tabsContainer.appendChild(tab);

    //     // Event listener for tab click
    //     tab.addEventListener('click', function () {
    //         changeTab(songList[i]);
    //     });
    // }

    // Function to change the displayed image
    function showImage(imageSrc) {
        // Clear existing images
        imageContainer.innerHTML = '';

        // Create anx image element and set the source
        const image = document.createElement('img');
        image.src = "images/" + imageSrc;

        // Append image to the container
        imageContainer.appendChild(image);
    }

    // Function to change the active tab
    function changeTab(song) {
        // Remove active class from all tabs
        document.querySelectorAll('.desktop-tab').forEach(function (tab) {
            tab.classList.remove('active-tab');
        });
        index = songList.indexOf(song)
        // Add active class to the clicked tab
        // tabsContainer.children[index].classList.add('active-tab');

        // Change the displayed image
        showImage(song + ".jpg");
        myParameter = "txts/" + song + ".txt";
        const videoid = songData[song].videosource;
        imageContainer.style.display = 'none';
        console.log(myParameter);

        // Load and display text from a file
        loadTextFromFile(myParameter, videoid);
        const url = new URL(window.location.href);
        url.search = `?song=${song}`
        console.log(url.toString())
        history.pushState({ }, null, url.toString())
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const params = urlParams.get('song')
    if (songList.includes(params)) {
        changeTab(params)
    } else {
        changeTab("girls_never_die")
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
        for (let i = 0; i < songList.length; i++) {
            const mobileTab = document.createElement('div');
            mobileTab.classList.add('mobile-tab');
            mobileTab.innerHTML = `<span class="tab-text">${songData[songList[i]].name}</span>`;

            // Event listener for mobile tab click
            mobileTab.addEventListener('click', function () {
                changeTab(songList[i]);
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
    createMobileMenu();
    // if (isMobile()) {
    // }

    // Function to check if the device is mobile view
    function isMobile() {
        return window.innerWidth <= 900; 
    }

    // window.addEventListener('resize', function() {
    //     // this.document.querySelector('.mobile-menu').remove()
    //     createMobileMenu();
    //     // if (isMobile()) {
    //     // }
    // });

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
