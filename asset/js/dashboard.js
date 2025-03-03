document.addEventListener("DOMContentLoaded", function () {
    console.log("Dashboard.js Loaded!");

    let applicationForm = document.querySelector("#new-app form");
    let applicationTable = document.querySelector("#your-app table");
    let deletedTable = document.querySelector("#deleted-tasks table");

    // 🕒 Cập nhật ngày giờ real-time
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

    // 🎨 Hiệu ứng highlight menu đã chọn
    let menuItems = document.querySelectorAll(".sidebar__menu a");
    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            let sectionId = this.getAttribute("data-section");

            if (sectionId) {
                document.querySelectorAll(".section").forEach(section => section.classList.remove("active"));
                document.getElementById(sectionId).classList.add("active");
                localStorage.setItem("activeSection", sectionId);

                menuItems.forEach(i => i.classList.remove("active-menu"));
                this.classList.add("active-menu");
            }
        });
    });

    // Khôi phục menu đã chọn khi tải lại
    let savedSection = localStorage.getItem("activeSection");
    if (savedSection) {
        document.querySelectorAll(".section").forEach(section => section.classList.remove("active"));
        document.getElementById(savedSection).classList.add("active");

        menuItems.forEach(item => item.classList.remove("active-menu"));
        document.querySelector(`[data-section="${savedSection}"]`).classList.add("active-menu");
    }

    // 📝 Lưu danh sách ứng dụng & task bị xóa vào localStorage
    function saveApplications() {
        let applications = [];
        let deletedTasks = [];

        document.querySelectorAll("#your-app table tr").forEach((row, index) => {
            if (index !== 0) {
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

        document.querySelectorAll("#deleted-tasks table tr").forEach((row, index) => {
            if (index !== 0) {
                let cells = row.getElementsByTagName("td");
                deletedTasks.push({
                    subject: cells[0].textContent,
                    reason: cells[1].textContent,
                    amount: cells[2].textContent,
                    type: cells[3].textContent,
                    status: cells[4].textContent
                });
            }
        });

        localStorage.setItem("applications", JSON.stringify(applications));
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
    }

    // 🏗 Tải danh sách ứng dụng khi trang load
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
        updateDisapprovedCount();
    }

    // 📌 Cập nhật số lượng task "Pending"
    function updatePendingCount() {
        let count = 0;
        document.querySelectorAll("#your-app table tr").forEach((row, index) => {
            if (index !== 0 && row.cells[4].textContent.trim() === "Pending") {
                count++;
            }
        });
        document.getElementById("pending-task-count").textContent = count;
    }

    // 📌 Cập nhật số lượng "Applications Disapproved"
    function updateDisapprovedCount() {
        let count = 0;
        document.querySelectorAll("#your-app table tr").forEach((row, index) => {
            if (index !== 0 && row.cells[4].textContent.trim() === "Rejected") {
                count++;
            }
        });
        document.getElementById("disapproved-count").textContent = count;
        localStorage.setItem("disapprovedCount", count);
    }

    // 📌 Thêm sự kiện xử lý khi duyệt, từ chối, xóa ứng dụng
    function addEventListenersToRow(row) {
        row.querySelector(".approve-btn").addEventListener("click", function () {
            row.cells[4].textContent = "Approved";
            saveApplications();
            updatePendingCount();
            updateDisapprovedCount();
        });

        row.querySelector(".reject-btn").addEventListener("click", function () {
            row.cells[4].textContent = "Rejected";
            saveApplications();
            updatePendingCount();
            updateDisapprovedCount();
        });

        row.querySelector(".delete-btn").addEventListener("click", function () {
            row.remove();
            saveApplications();
            updatePendingCount();
            updateDisapprovedCount();
        });
    }

    // 📌 Xử lý tạo ứng dụng mới khi nhấn "Create"
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
            
     // 📌 Kiểm tra tiêu đề trùng
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
            alert("Tao thanh cong")


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
    });

    loadApplications();
});
