
// themes changes
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 15 },  
        "size": { "value": 3 },      
        "color": { "value": "#ffffff" },  // Màu hạt (Trắng)
        "move": { "speed": 2 },
        "opacity": { 
            "value": 0.3,  // 🔥 Độ trong suốt (0.0 = hoàn toàn trong suốt, 1.0 = không trong suốt)
            "random": true // Ngẫu nhiên độ trong suốt
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.2,  // 🎨 Độ trong suốt của đường nối
            "width": 1
        },
        "move": { "speed": 2 }
    }
});
//end themes changes



// Login
document.addEventListener("DOMContentLoaded", function () {
    // Kiểm tra nếu người dùng đã chọn "Remember Me"
    if (localStorage.getItem("rememberMe") === "true") {
        document.getElementById("username").value = localStorage.getItem("savedUsername") || "";
        document.getElementById("password").value = localStorage.getItem("savedPassword") || "";
        document.getElementById("rememberMe").checked = true;
    }
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let rememberMe = document.getElementById("rememberMe").checked;

    if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("savedUsername", username);
        localStorage.setItem("savedPassword", password);
    } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedUsername");
        localStorage.removeItem("savedPassword");
    }

    console.log("Logging in with:", username);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    window.location.href = "second.html"; // Điều hướng sau khi đăng nhập thành công
});


// Hidden pw
document.getElementById("togglePassword").addEventListener("click", function () {
    let passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        this.classList.replace("fa-eye-slash", "fa-eye");
    } else {
        passwordField.type = "password";
        this.classList.replace("fa-eye", "fa-eye-slash");
    }
});






