// Enhanced Validation Functions
const validations = {
    firstName: (value) => {
        if (!value) return 'الاسم الأول مطلوب';
        if (value.length < 3) return 'الاسم الأول يجب أن يكون 3 أحرف على الأقل';
        if (!/^[\u0600-\u06FF\s]+$/.test(value)) return 'يجب أن يحتوي الاسم على أحرف عربية فقط';
        return null;
    },
    lastName: (value) => {
        if (!value) return 'الاسم الأخير مطلوب';
        if (value.length < 3) return 'الاسم الأخير يجب أن يكون 3 أحرف على الأقل';
        if (!/^[\u0600-\u06FF\s]+$/.test(value)) return 'يجب أن يحتوي الاسم على أحرف عربية فقط';
        return null;
    },
    username: (value) => {
        if (!value) return 'اسم المستخدم مطلوب';
        if (value.length < 4) return 'اسم المستخدم يجب أن يكون 4 أحرف على الأقل';
        if (!/^[\u0600-\u06FF\s0-9]+$/.test(value)) return 'يجب أن يحتوي الاسم على أحرف عربية فقط';
       
        return null;
    },
    email: (value) => {
        if (!value) return 'البريد الإلكتروني مطلوب';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'البريد الإلكتروني غير صالح';
        return null;
    },
    phone: (value) => {
        if (!value) return 'رقم الهاتف مطلوب';
        if (!/^[0-9]{11}$/.test(value)) return 'يجب أن يتكون رقم الهاتف من 11 رقمًا';
        return null;
    },
    password: (value) => {
        if (!value) return 'كلمة المرور مطلوبة';
        if (value.length < 8) return 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';

        return null;
    },
    confirmPassword: (value, password) => {
        if (!value) return 'يرجى تأكيد كلمة المرور';
        if (value !== password) return 'كلمات المرور غير متطابقة';
        return null;
    },
    birthDate: (value) => {
        if (!value) return 'تاريخ الميلاد مطلوب';
        
    },
    accountType: (value) => {
        if (!value) return 'نوع الحساب مطلوب';
        return null;
    }
};

// DOM Elements
const form = document.querySelector('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confirmPassword');
const birthDate = document.getElementById('birthDate');
const accountTypeRadios = document.querySelectorAll('input[name="accountType"]');

// Constants
const TEXT_FIELD_ERROR_STYLE = "border: 1px solid red; box-shadow: 0 0 5px rgba(255,0,0,0.2);";
const ERROR_MESSAGE_STYLE = "color: red; font-size: 0.8rem; margin-top: 5px;";

// Utility Functions
function showError(inputElement, message) {
    // Remove any existing error message
    removeError(inputElement);
    
    // Create error message element
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style = ERROR_MESSAGE_STYLE;
    
    // Insert after the input element
    inputElement.insertAdjacentElement('afterend', errorElement);
    
    // Style the input
    inputElement.style = TEXT_FIELD_ERROR_STYLE;
    
    // Shake animation
    shake(inputElement);
}

function removeError(inputElement) {
    // Remove error message if exists
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    
    // Reset input style
    inputElement.style = "";
}

function shake(element) {
    let shakes = 0;
    const shakeInterval = setInterval(() => {
        element.style.transform = `translateX(${shakes % 2 === 0 ? -2 : 2}px)`;
        shakes++;
        if (shakes >= 6) {
            clearInterval(shakeInterval);
            element.style.transform = 'translateX(0)';
        }
    }, 50);
}

function getSelectedUserType() {
    const selected = document.querySelector('input[name="accountType"]:checked');
    return selected ? selected.value : null;
}

// Form Submission Handler
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get all values
    const formData = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        username: username.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        password: password.value,
        confirmPassword: confirmPass.value,
        birthDate: birthDate.value,
        accountType: getSelectedUserType()
    };
    
    // Validate all fields
    let isValid = true;
    const errors = {};
    
    // Validate each field
    for (const [field, value] of Object.entries(formData)) {
        let error = null;
        
        if (field === 'confirmPassword') {
            error = validations.confirmPassword(value, formData.password);
        } else {
            error = validations[field](value);
        }
        
        if (error) {
            errors[field] = error;
            isValid = false;
        }
    }
    
    // Display errors or submit
    if (!isValid) {
        // Clear all previous errors
        clearAllErrors();
        
        // Show new errors
        if (errors.firstName) showError(firstName, errors.firstName);
        if (errors.lastName) showError(lastName, errors.lastName);
        if (errors.username) showError(username, errors.username);
        if (errors.email) showError(email, errors.email);
        if (errors.phone) showError(phone, errors.phone);
        if (errors.password) showError(password, errors.password);
        if (errors.confirmPassword) showError(confirmPass, errors.confirmPassword);
        if (errors.birthDate) showError(birthDate, errors.birthDate);
        if (errors.accountType) {
            const errorElement = document.createElement('p');
            errorElement.className = 'error-message';
            errorElement.textContent = errors.accountType;
            errorElement.style = ERROR_MESSAGE_STYLE;
            accountTypeRadios[0].closest('.form-group').appendChild(errorElement);
        }
    } else {
        // Save user data to localStorage (simulating server-side storage)
        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            birthDate: formData.birthDate,
            accountType: formData.accountType
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Redirect to profile page
        window.location.href = "../../templates/User/profile_page.html";
    }
});

function clearAllErrors() {
    // Clear input errors
    const inputs = [firstName, lastName, username, email, phone, password, confirmPass, birthDate];
    inputs.forEach(input => removeError(input));
    
    // Clear account type error
    const accountTypeGroup = accountTypeRadios[0].closest('.form-group');
    const accountTypeError = accountTypeGroup.querySelector('.error-message');
    if (accountTypeError) {
        accountTypeError.remove();
    }
}

// Real-time validation for fields
firstName.addEventListener('input', () => {
    const error = validations.firstName(firstName.value.trim());
    if (error) {
        showError(firstName, error);
    } else {
        removeError(firstName);
    }
});

lastName.addEventListener('input', () => {
    const error = validations.lastName(lastName.value.trim());
    if (error) {
        showError(lastName, error);
    } else {
        removeError(lastName);
    }
});

username.addEventListener('input', () => {
    const error = validations.username(username.value.trim());
    if (error) {
        showError(username, error);
    } else {
        removeError(username);
    }
});

email.addEventListener('input', () => {
    const error = validations.email(email.value.trim());
    if (error) {
        showError(email, error);
    } else {
        removeError(email);
    }
});

phone.addEventListener('input', () => {
    const error = validations.phone(phone.value.trim());
    if (error) {
        showError(phone, error);
    } else {
        removeError(phone);
    }
});

password.addEventListener('input', () => {
    const error = validations.password(password.value);
    if (error) {
        showError(password, error);
    } else {
        removeError(password);
    }
});

confirmPass.addEventListener('input', () => {
    const error = validations.confirmPassword(confirmPass.value, password.value);
    if (error) {
        showError(confirmPass, error);
    } else {
        removeError(confirmPass);
    }
});

birthDate.addEventListener('change', () => {
    const error = validations.birthDate(birthDate.value);
    if (error) {
        showError(birthDate, error);
    } else {
        removeError(birthDate);
    }
});

accountTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        const accountTypeGroup = radio.closest('.form-group');
        const accountTypeError = accountTypeGroup.querySelector('.error-message');
        if (accountTypeError) {
            accountTypeError.remove();
        }
    });
});
