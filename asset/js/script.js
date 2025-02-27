// themes changes
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 15 },  
        "size": { "value": 3 },      
        "color": { "value": "#ffffff" },  // Màu hạt (Trắng)
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

// Kiểm tra trạng thái đăng nhập khi tải trang Dashboard
if (window.location.pathname.includes("dashboard.html")) {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html"; // Chuyển hướng nếu chưa đăng nhập
    }
}

// Hàm xử lý đăng nhập
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "admin" && password === "123") {
        localStorage.setItem("loggedIn", "true"); // Lưu trạng thái đăng nhập
        window.location.href = "second.html"; // Chuyển hướng sau khi đăng nhập
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
}

// Hàm xử lý đăng xuất
function logout() {
    localStorage.removeItem("loggedIn"); // Xóa trạng thái đăng nhập
    window.location.href = "index.html"; // Chuyển hướng về trang login
}
