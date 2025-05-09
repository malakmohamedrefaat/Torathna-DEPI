let invalidEmail = false;
let invalidCode = false;
let invalidPassword = false;

const TEXT_FIELD_ERROR_STYLE = "border: 2px solid #a0522d; box-shadow: 0 0 5px 1px rgba(160, 82, 45, 0.3);";
const ERROR_MESSAGE_STYLE = "color: #a0522d; font-size: 0.8rem; font-weight: bold; padding: 0.25rem 0; text-align: right;";

const form = document.getElementById("form");
const email = document.getElementById("email");
const emailCont = document.getElementById("emailCont");
const codeBtn = document.getElementById("sendCode");
const password = document.getElementById("password");
const passwordCont = document.getElementById("passwordCont");
const code = document.getElementById("code");
const codeCont = document.getElementById("codeCont");

// Generated code storage
let generatedCode = 0;

// Shake Text Field (RTL compatible)
function shake(el) {
    let shakes = 0;
    const shakeInterval = setInterval(() => {
        el.style.transform = `translateX(${shakes % 2 === 0 ? -5 : 5}px)`;
        shakes++;
        if (shakes >= 6) {
            clearInterval(shakeInterval);
            el.style.transform = 'translateX(0)';
        }
    }, 50);
}

// Add error message (RTL compatible)
function addInvalidMessage(cont, msg, flag) {
    if (flag) return;
    
    // Remove existing error if any
    const existingError = cont.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const err = document.createElement('p');
    err.className = 'error-message';
    err.textContent = msg;
    err.style = ERROR_MESSAGE_STYLE;
    cont.appendChild(err);
}

// Form submission handler
form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Reset flags and clear previous errors
    invalidEmail = false;
    invalidCode = false;
    invalidPassword = false;
    clearErrorMessages();
    
    // Validate email
    if (!email.value || !isValidEmail(email.value)) {
        addInvalidMessage(emailCont, 'البريد الإلكتروني غير صالح', invalidEmail);
        email.style = TEXT_FIELD_ERROR_STYLE;
        shake(email);
        invalidEmail = true;
    }
    
    // Validate code
    if (!code.value || !/^\d{6}$/.test(code.value)) {
        addInvalidMessage(codeCont, 'رمز التحقق يجب أن يكون 6 أرقام', invalidCode);
        code.style = TEXT_FIELD_ERROR_STYLE;
        shake(code);
        invalidCode = true;
    }
    
    // Validate password
    if (!password.value || !isValidPassword(password.value)) {
        addInvalidMessage(passwordCont, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل', invalidPassword);
        password.style = TEXT_FIELD_ERROR_STYLE;
        shake(password);
        invalidPassword = true;
    }
    
    // If any invalid, stop submission
    if (invalidEmail || invalidCode || invalidPassword) {
        return;
    }
    
    // Check if code matches (simulated)
    if (code.value == generatedCode) {
        // Simulate password reset - in a real app you would call your backend
        alert('تم تغيير كلمة المرور بنجاح');
        window.location.href = "../../../templates/accounts/login.html";
    } else {
        addInvalidMessage(codeCont, 'رمز التحقق غير صحيح', invalidCode);
        code.style = TEXT_FIELD_ERROR_STYLE;
        shake(code);
        invalidCode = true;
    }
});

// Clear all error messages
function clearErrorMessages() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
    
    [email, code, password].forEach(field => {
        field.style = "";
    });
}

// Input validation helpers
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
    return password.length >= 8;
}

// Input event listeners to clear errors
email.addEventListener('input', function() {
    if (invalidEmail) {
        emailCont.querySelector('.error-message')?.remove();
        email.style = "";
        invalidEmail = false;
    }
});

code.addEventListener('input', function() {
    if (invalidCode) {
        codeCont.querySelector('.error-message')?.remove();
        code.style = "";
        invalidCode = false;
    }
});

password.addEventListener('input', function() {
    if (invalidPassword) {
        passwordCont.querySelector('.error-message')?.remove();
        password.style = "";
        invalidPassword = false;
    }
});

// Send code button handler
codeBtn.addEventListener('click', function() {
    // Validate email first
    if (!email.value || !isValidEmail(email.value)) {
        addInvalidMessage(emailCont, 'الرجاء إدخال بريد إلكتروني صحيح أولاً', invalidEmail);
        email.style = TEXT_FIELD_ERROR_STYLE;
        shake(email);
        invalidEmail = true;
        return;
    }
    
    // Generate 6-digit code
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    generatedCode = 100000 + (arr[0] % 900000);
    
    console.log(`تم إرسال الرمز ${generatedCode} إلى ${email.value}`);
    
    // Disable button for 60 seconds
    codeBtn.disabled = true;
    let remain = 60;
    codeBtn.textContent = `انتظر ${remain} ثانية...`;
    
    const timer = setInterval(() => {
        remain -= 1;
        codeBtn.textContent = `انتظر ${remain} ثانية...`;
        
        if (remain <= 0) {
            clearInterval(timer);
            codeBtn.disabled = false;
            codeBtn.textContent = "إرسال الرمز";
        }
    }, 1000);
});
