


// Time 
function updateTime() {
    const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const now = new Date();
    const day = days[now.getDay()];
    const date = now.toLocaleDateString("vi-VN", { month: "long", day: "numeric" });
    const time = now.toLocaleTimeString("vi-VN");

    document.getElementById("current-day").textContent = `${day}, ${date}`;
    document.getElementById("current-time").textContent = time;
}

updateTime();
setInterval(updateTime, 1000);



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




    

function loadPage(page) {
    var content = document.getElementById("content");

    // Dữ liệu giả lập thay cho việc load từ file khác
    var pages = {
        "home": "<h2>Home Page</h2><p>Welcome to the Home Page.</p>",
        "newApplications": "<h2>New Applications</h2><p>Submit a new application here.</p>",
        "yourApplications": "<h2>Your Applications</h2><p>View your submitted applications.</p>",
        "newDraft": "<h2>New Draft</h2><p>Create a new draft application.</p>",
        "yourDrafts": "<h2>Your Drafts</h2><p>View and manage your drafts.</p>",
        "taskList": "<h2>Your Task List</h2><p>View tasks assigned to you.</p>",
        "quickTask": "<h2>Quick Task Response</h2><p>Respond to urgent tasks quickly.</p>",
        "history": "<h2>History</h2><p>Review past applications and approvals.</p>",
        "applications": "<h2>Applications</h2><p>Manage all application records.</p>",
        "options": "<h2>Options</h2><p>Modify system settings and preferences.</p>",
        "changePassword": "<h2>Change Password</h2><p>Update your account password.</p>",
    };

    // Cập nhật nội dung của phần hiển thị
    content.innerHTML = pages[page] || "<h2>Page Not Found</h2>";
}

function logout() {
    localStorage.removeItem("loggedIn"); // Xóa trạng thái đăng nhập
    window.location.href = "index.html"; // Chuyển hướng về trang login
}
