pages = [];

async function injectNavbar(path, target) {
    try {
        const res = await fetch(path);
        const html = await res.text();
        target.innerHTML = html;
        setupMenuButton();
        setup();
    } catch (err) {
        console.error(`Failed to inject the navbar code into ${target} with error ${err}`);
    }
}

function setupMenuButton() {
    const navBtn = document.getElementById("navbar-btn");
    const navBtnImg = document.getElementById("navbar-btn-img");
    navBtn.addEventListener('click', function(e) {
        const navCont = document.getElementById("navbar-cont");
        if (window.getComputedStyle(navCont).getPropertyValue('display') == 'none') {
            navCont.style.display = 'flex';
            navBtnImg.setAttribute('src', '../../static/images/cross.jpg');
        } else {
            navCont.style.display = 'none';
            navBtnImg.setAttribute('src', '../../static/images/hamburger.jpg');
        }
    });
}

function setup() {
    const navList = document.querySelectorAll('.navbar-item');
    pages = new Array(navList.length).fill(false);
    currentPath = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    if (!currentPath) {pages[0] = true;}
    navList.forEach((item, index) => {
        if (!item.hasAttribute('data-index')) {
            item.setAttribute('data-index', index);
        }
        const link = item.querySelector('.navbar-link');
        if (link) {
            const linkPath = link.getAttribute('href');
            if (linkPath == currentPath) {
                pages[index] = true;
                item.classList.add("navbar-active");
            }
        }
        item.addEventListener('click', function(e) {
            handleClick(this);
        });
        if (pages[index]) {
            item.classList.add("navbar-active");
        }
    });
}

function handleClick(item) {
    let idx = parseInt(item.getAttribute('data-index'));
    if (pages[idx] == false) {
        pages.forEach((_, i) => {
            pages[i] = false;
            document.querySelector(`.navbar-item[data-index="${i}"]`).classList.remove('navbar-active');
        })
        item.classList.add('navbar-active');
    }
}

const placeholder = document.getElementById("navbarPlace");
injectNavbar("../../../templates/includes/navbar.html", placeholder);
