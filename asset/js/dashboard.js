document.addEventListener("DOMContentLoaded", function () {
    console.log("Dashboard.js Loaded!");

    // 🕒 Cập nhật ngày giờ
    function updateTime() {
        const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
        const now = new Date();
        const day = days[now.getDay()];
        const date = now.toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric" });

        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;
        minutes = minutes.toString().padStart(2, "0");
        seconds = seconds.toString().padStart(2, "0");

        const time = `${hours}:${minutes}:${seconds} ${ampm}`;

        document.getElementById("current-day").textContent = `${day}, ${date}`;
        document.getElementById("current-time").textContent = time;
    }

    updateTime();
    setInterval(updateTime, 1000);

    // 🛠 Lưu trạng thái menu đã chọn
    let menuItems = document.querySelectorAll(".sidebar__menu a");
    let sections = document.querySelectorAll(".section");

    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            let sectionId = this.getAttribute("data-section");

            if (sectionId) {
                sections.forEach(section => section.classList.remove("active"));
                let targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add("active");
                    localStorage.setItem("activeSection", sectionId);
                }
            }
        });
    });

    // Khôi phục menu đã chọn khi tải lại
    let savedSection = localStorage.getItem("activeSection");
    if (savedSection) {
        sections.forEach(section => section.classList.remove("active"));
        let targetSection = document.getElementById(savedSection);
        if (targetSection) {
            targetSection.classList.add("active");
        }
    }

    // 🔑 Ghi nhớ người dùng đăng nhập
    let username = localStorage.getItem("username");
    let usernameDisplay = document.getElementById("username-display");

    if (username) {
        usernameDisplay.textContent = username;
    } else {
        window.location.href = "login.html"; // Chuyển hướng nếu chưa đăng nhập
    }

    // 🏷 Xử lý đăng xuất
    let logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            console.log("Logging out...");
            localStorage.removeItem("username");
            window.location.href = "index.html";
        });
    }

    // 📝 Quản lý danh sách ứng dụng
    let applicationForm = document.querySelector("#new-app form");
    let applicationTable = document.querySelector("#your-app table");

    function saveApplications() {
        let applications = [];
        document.querySelectorAll("#your-app table tr").forEach((row, index) => {
            if (index !== 0) { // Bỏ qua dòng tiêu đề
                let cells = row.getElementsByTagName("td");
                applications.push({
                    subject: cells[0].textContent,
                    reason: cells[1].textContent,
                    amount: cells[2].textContent,
                    type: cells[3].textContent,
                    status: cells[4].textContent
                });
            }
        });
        localStorage.setItem("applications", JSON.stringify(applications));
    }

    function loadApplications() {
        let storedApps = localStorage.getItem("applications");
        if (storedApps) {
            let applications = JSON.parse(storedApps);
            applications.forEach(app => {
                let newRow = applicationTable.insertRow();
                newRow.innerHTML = `
                    <td>${app.subject}</td>
                    <td>${app.reason}</td>
                    <td>${app.amount}</td>
                    <td>${app.type}</td>
                    <td>${app.status}</td>
                    <td>
                        <button class="approve-btn">Duyệt</button>
                        <button class="reject-btn">Hủy</button>
                        <button class="delete-btn">Xóa</button>
                    </td>
                `;
                addEventListenersToRow(newRow);
            });
        }
        updatePendingCount();
    }

    // 🔄 Hiển thị số lượng task "Pending"
    function updatePendingCount() {
        let count = 0;
        document.querySelectorAll("#your-app table tr").forEach((row, index) => {
            if (index !== 0) { // Bỏ qua tiêu đề bảng
                let statusCell = row.cells[4];
                if (statusCell && statusCell.textContent.trim() === "Pending") {
                    count++;
                }
            }
        });
        let pendingCountElement = document.getElementById("pending-task-count");
        if (pendingCountElement) {
            pendingCountElement.textContent = count;
        }
    }

    function addEventListenersToRow(row) {
        row.querySelector(".approve-btn").addEventListener("click", function () {
            row.cells[4].textContent = "Approved";
            saveApplications();
            updatePendingCount();
        });

        row.querySelector(".reject-btn").addEventListener("click", function () {
            row.cells[4].textContent = "Rejected";
            saveApplications();
            updatePendingCount();
        });

        row.querySelector(".delete-btn").addEventListener("click", function () {
            row.remove();
            saveApplications();
            updatePendingCount();
        });
    }

    applicationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let subject = document.getElementById("appSubject").value.trim();
        let reason = document.getElementById("appReason").value.trim();
        let amount = document.getElementById("appAmount").value.trim();
        let type = document.querySelector("input[name='appType']:checked");

        if (!subject || !reason || !amount || !type) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

          // 🟢 Kiểm tra tiêu đề trùng
        let isDuplicate = false;
        document.querySelectorAll("#your-app table tr td:first-child").forEach(td => {
            if (td.textContent.toLowerCase() === subject.toLowerCase()) {
                isDuplicate = true;
            }
        });

        if (isDuplicate) {
            alert("Tiêu đề đã tồn tại. Vui lòng nhập tiêu đề khác!");
            return;
        }

        let newRow = applicationTable.insertRow();
        newRow.innerHTML = `
            <td>${subject}</td>
            <td>${reason}</td>
            <td>${amount}</td>
            <td>${type.value}</td>
            <td>Pending</td>
            <td>
                <button class="approve-btn">Duyệt</button>
                <button class="reject-btn">Hủy</button>
                <button class="delete-btn">Xóa</button>
            </td>
        `;

        addEventListenersToRow(newRow);

        saveApplications();
        updatePendingCount();
        applicationForm.reset();
        alert("Ứng dụng đã được tạo thành công!");
    });

    // Load dữ liệu khi tải trang
    loadApplications();
});
