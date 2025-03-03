document.addEventListener("DOMContentLoaded", function () {
    console.log("Dashboard.js Loaded!");

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

    let menuItems = document.querySelectorAll(".sidebar__menu a");
    let sections = document.querySelectorAll(".section");

    if (menuItems.length === 0) {
        console.error("Sidebar menu items not found!");
        return;
    }

    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            let sectionId = this.getAttribute("data-section");

            console.log("Clicked:", sectionId);

            if (sectionId) {
                sections.forEach(section => section.classList.remove("active"));
                let targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add("active");
                } else {
                    console.error("Section not found:", sectionId);
                }
            }
        });
    });

    let username = localStorage.getItem("username");
    let usernameDisplay = document.getElementById("username-display");

    if (username) {
        usernameDisplay.textContent = username;
    } else {
        usernameDisplay.textContent = "Guest";
    }

    let logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            console.log("Logging out...");
            localStorage.removeItem("username");
            window.location.href = "index.html";
        });
    } else {
        console.error("Logout button not found!");
    }

    function showAlert(taskName) {
        alert("You selected: " + taskName);
    }

    let applicationForm = document.querySelector("#new-app form");
    let applicationTable = document.querySelector("#your-app table");

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

        let existingSubjects = document.querySelectorAll("#your-app table td:first-child");
        for (let td of existingSubjects) {
            if (td.textContent === subject) {
                alert("Tiêu đề đã tồn tại. Vui lòng nhập tiêu đề khác!");
                return;
            }
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

        newRow.querySelector(".approve-btn").addEventListener("click", function () {
            newRow.cells[4].textContent = "Approved";
        });

        newRow.querySelector(".reject-btn").addEventListener("click", function () {
            newRow.cells[4].textContent = "Rejected";
        });

        newRow.querySelector(".delete-btn").addEventListener("click", function () {
            newRow.remove();
        });

        applicationForm.reset();
        alert("Ứng dụng đã được tạo thành công!");
    });
});
