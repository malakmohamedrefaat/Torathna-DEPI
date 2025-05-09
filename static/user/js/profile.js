document.addEventListener('DOMContentLoaded', function () {
    const profileData = {
        personal: {
            username: localStorage.getItem('username') || 'اسم المستخدم',
            firstname: localStorage.getItem('firstname') || 'الاسم',
            lastname: localStorage.getItem('lastname') || 'اسم الاب',
            email: localStorage.getItem('email') || 'mm@gmail.com',
            phone: localStorage.getItem('phone') || 'مثال:....0115',
            datebirth: localStorage.getItem('datebirth') || 'مثال : 1/5/2005',
        },
        location: {
            country: localStorage.getItem('country') || 'مصر',
            city: localStorage.getItem('city') || 'القاهره',
            address: localStorage.getItem('address') || '4 شارع شريف'
        }
    };

    // Update Profile Display
    function updateProfileDisplay() {
        const displayName = `${profileData.personal.firstname} ${profileData.personal.lastname}`;
        document.getElementById('display-name').textContent = displayName;

        const displayUserName = profileData.personal.username;
        document.getElementById('userName').textContent = displayUserName;

        for (const field in profileData.personal) {
            const element = document.getElementById(field);
            if (element) {
                element.textContent = profileData.personal[field];
            }
        }

        for (const field in profileData.location) {
            const element = document.getElementById(field);
            if (element) {
                element.textContent = profileData.location[field];
            }
        }
    }

    updateProfileDisplay();

    // Modal functionality
    const personalModal = document.getElementById('personalModal');
    const locationModal = document.getElementById('locationModal');
    const editPersonalBtn = document.getElementById('editPersonal');
    const editLocationBtn = document.getElementById('editLocationInfo');
    const closeButtons = document.getElementsByClassName('close');
    const cancelButtons = document.getElementsByClassName('cancel-btn');

    editPersonalBtn.addEventListener('click', function () {
        document.getElementById('editFirstname').value = profileData.personal.firstname;
        document.getElementById('editLastname').value = profileData.personal.lastname;
        document.getElementById('editEmail').value = profileData.personal.email;
        document.getElementById('editPhone').value = profileData.personal.phone;
        document.getElementById('editDatebirth').value = profileData.personal.datebirth;

        personalModal.style.display = 'block';
    });

    editLocationBtn.addEventListener('click', function () {
        document.getElementById('editCountry').value = profileData.location.country;
        document.getElementById('editCity').value = profileData.location.city;
        document.getElementById('editAddress').value = profileData.location.address;

        locationModal.style.display = 'block';
    });

    Array.from(closeButtons).forEach(button => {
        button.addEventListener('click', function () {
            personalModal.style.display = 'none';
            locationModal.style.display = 'none';
        });
    });

    Array.from(cancelButtons).forEach(button => {
        button.addEventListener('click', function () {
            personalModal.style.display = 'none';
            locationModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function (event) {
        if (event.target === personalModal) personalModal.style.display = 'none';
        if (event.target === locationModal) locationModal.style.display = 'none';
    });

    // Save Personal Info
    document.getElementById('personalForm').addEventListener('submit', function (e) {
        e.preventDefault();

        profileData.personal.firstname = document.getElementById('editFirstname').value;
        profileData.personal.lastname = document.getElementById('editLastname').value;
        profileData.personal.email = document.getElementById('editEmail').value;
        profileData.personal.phone = document.getElementById('editPhone').value;
        profileData.personal.datebirth = document.getElementById('editDatebirth').value;

        for (const field in profileData.personal) {
            localStorage.setItem(field, profileData.personal[field]);
        }

        updateProfileDisplay();
        personalModal.style.display = 'none';
    });

    // Save Location Info
    document.getElementById('locationForm').addEventListener('submit', function (e) {
        e.preventDefault();

        profileData.location.country = document.getElementById('editCountry').value;
        profileData.location.city = document.getElementById('editCity').value;
        profileData.location.address = document.getElementById('editAddress').value;

        for (const field in profileData.location) {
            localStorage.setItem(field, profileData.location[field]);
        }

        updateProfileDisplay();
        locationModal.style.display = 'none';
    });

    // ====== Image Upload Functionality ======
    const editBtn = document.getElementById('editProfileBtn');
    const imgmodel = document.getElementById('imgmodel');
    const chooseBtn = document.getElementById('chooseImageBtn');
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const saveBtn = document.getElementById('saveImageBtn');
    const cancelBtn = document.getElementById('cancelUpload');
    const profileAvatar = document.getElementById('profileAvatar');

    editBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        imgmodel.style.display = 'flex';
    });

    chooseBtn.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (event) {
                imagePreview.src = event.target.result;
                imagePreview.style.display = 'block';
                saveBtn.disabled = false;
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    saveBtn.addEventListener('click', function () {
        profileAvatar.src = imagePreview.src;
        localStorage.setItem('profileAvatar', imagePreview.src);
        closeImageModal();
    });

    cancelBtn.addEventListener('click', closeImageModal);

    imgmodel.addEventListener('click', function (e) {
        if (e.target === imgmodel) {
            closeImageModal();
        }
    });

    function closeImageModal() {
        imgmodel.style.display = 'none';
        imagePreview.style.display = 'none';
        fileInput.value = '';
        saveBtn.disabled = true;
    }

    const savedAvatar = localStorage.getItem('profileAvatar');
    if (savedAvatar) {
        profileAvatar.src = savedAvatar;
    }

    
    // localStorage.clear();
});

