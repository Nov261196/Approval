        const logoutBtn = document.getElementById('logout-btn');
        console.log(logoutBtn);
        logoutBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });


        const usernameDisplay = document.getElementById('username-display');
        console.log(usernameDisplay);
        const username = localStorage.getItem('username');
        console.log(username);
        usernameDisplay.textContent = username;
        
       


        const toggleButton = document.getElementById('toggle-btn')
        const sidebar = document.getElementById('sidebar')

        function toggleSidebar(){
        sidebar.classList.toggle('close')
        toggleButton.classList.toggle('rotate')


        closeAllSubMenus();
        if (sidebar.classList.contains('close')) {
            // sidebar.style.opacity = "0.5";
        } else {
            // sidebar.style.opacity = "1"; 
        }
    }

        function toggleSubMenu(button){

        if(!button.nextElementSibling.classList.contains('show')){
            closeAllSubMenus()
        }

        button.nextElementSibling.classList.toggle('show')
        button.classList.toggle('rotate')

        if(sidebar.classList.contains('close')){
            sidebar.classList.toggle('close')
            toggleButton.classList.toggle('rotate')
        }
        }

        function closeAllSubMenus(){
        Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
            ul.classList.remove('show')
            ul.previousElementSibling.classList.remove('rotate')
        })
        }

      
        function showTab(tabId) {
            document.querySelectorAll('.main__box').forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        }
        
           
    

        const currentDay = document.getElementById('current-day');
        console.log(currentDay);
        const date = new Date().toLocaleDateString('en-us',
            {   weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
            });
        console.log(date);
        currentDay.textContent = date;

        function updateTime() {
           const currentTime = document.getElementById('current-time');
            const time = new Date().toLocaleTimeString('en-us',
                {   hour:"2-digit",
                    second:"2-digit",
                    minute:"2-digit",
                });
            console.log(time);
            currentTime.textContent = time;
        }
        updateTime();
        setInterval(updateTime, 1000);
        
        
        // Han che ky tu la 
        document.addEventListener("DOMContentLoaded", function () {
            // Lấy tất cả input và textarea trong bảng
            let tableInputs = document.querySelectorAll(".assets__table input, .assets__table textarea");
        
            tableInputs.forEach(input => {
                input.addEventListener("input", function () {
                    this.value = this.value.replace(/[^a-zA-Z0-9\s().\/]/g, ""); // Chỉ cho phép chữ cái, số và khoảng trắng
                });
            });
        });
        

       
        

        window.saveApplication = function () {
            let subject = document.getElementById("subjectInput").value.trim();
            let day = document.getElementById("daySelect").value;
            let month = document.getElementById("monthSelect").value;
            let year = document.getElementById("yearSelect").value;
            let isValid = true; // ✅ Biến kiểm tra xem có lỗi hay không
        
            // ⛔ Nếu Subject trống, hiển thị cảnh báo và dừng lại
            if (!subject) {
                alert("Vui lòng nhập Subject trước khi tiếp tục!");
                isValid = false; // ❌ Không hợp lệ
            }
        
            // ⛔ Nếu chưa chọn Ngày/Tháng/Năm, hiển thị cảnh báo và dừng lại
            if (!day || !month || !year) {
                alert("Vui lòng chọn đầy đủ Ngày, Tháng, Năm di chuyển!");
                isValid = false; // ❌ Không hợp lệ
            }

        
            // Nếu có lỗi, DỪNG LẠI NGAY (KHÔNG lưu vào localStorage, KHÔNG reset form)
            if (!isValid) return;
        
            let transferDate = `${day}/${month}/${year}`;
            let applications = JSON.parse(localStorage.getItem("yourApplications")) || [];
        
            let now = new Date();
            let currentYear = now.getFullYear();
            let currentMonth = String(now.getMonth() + 1).padStart(2, "0");
            let appNumber = `AP.${currentYear}.${currentMonth}.${String(applications.length + 1).padStart(4, "0")}`;
        
            applications.push({
                appNo: appNumber,
                subject: subject,
                transferDate: transferDate,
                date: now.toLocaleDateString(),
                status: "Pending"
            });
        
            localStorage.setItem("yourApplications", JSON.stringify(applications));
        
            // ✅ CHỈ gọi clearForm() khi không có lỗi
            clearForm();
            showNotification(`Đã thêm ứng dụng: ${subject}`, "success");
        
            showTab("main-yours-draft");
            updateYourApplicationsTable();
        };
        
        function clearForm() {
            const form = document.querySelector("#main-create");
            if (!form) return;
        
            const inputs = form.querySelectorAll("input");
            const textareas = form.querySelectorAll("textarea");
            const selects = form.querySelectorAll("select");
        
            inputs.forEach(input => {
                if (input.type === "text" || input.type === "number" || input.type === "date") {
                    input.value = "";
                } else if (input.type === "checkbox" || input.type === "radio") {
                    input.checked = false;
                }
            });
        
            textareas.forEach(textarea => {
                textarea.value = "";
            });
        
            selects.forEach(select => {
                select.selectedIndex = 0;
            });
        
            console.log("✅ Form đã được reset!");
        }
        
        function updateYourApplicationsTable() {
            let applications = JSON.parse(localStorage.getItem("yourApplications")) || [];
            let tableBody = document.getElementById("yourApplicationsTable");
        
            tableBody.innerHTML = "";
        
            applications.forEach((app, index) => {
                let statusColor = app.status === "Approved" ? "green" :
                                  app.status === "Rejected" ? "red" :
                                  "orange"; // Pending là cam
        
                let approveButton = `
                    <td>
                        <button class="yourdraft__table--icon" onclick="approveApplication(${index})">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    </td>
                `;
        
                let rejectButton = `
                    <td>
                        <button class="yourdraft__table--icon" onclick="rejectApplication(${index})">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </td>
                `;
        
                // Nếu trạng thái là Pending, vô hiệu hóa nút Reset
                let resetButton = `
                    <td>
                        <button class="yourdraft__table--icon ${app.status === "Pending" ? "disabled" : ""}" 
                                onclick="${app.status === "Pending" ? "return false;" : `resetToPending(${index})`}">
                            <i class="fa-solid fa-undo"></i>
                        </button>
                    </td>
                `;
        
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${app.appNo}</td>
                    <td>${app.subject}</td>
                    <td>${app.transferDate}</td>
                    <td style="color: ${statusColor}; font-weight: bold;">${app.status}</td>
                    ${approveButton}
                    ${rejectButton}
                    ${resetButton}
                    <td><button class="yourdraft__table--icon"><i class="fa-solid fa-file"></i></button></td>
                    <td><button class="yourdraft__table--icon"><i class="fa-solid fa-copy"></i></button></td>
                    <td><button class="yourdraft__table--icon"><i class="fa-solid fa-print"></i></button></td>
                    <td>
                        <button class="yourdraft__table--icon" onclick="deleteApplication(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        document.addEventListener("DOMContentLoaded", function () {
            let today = new Date();
            let day = today.getDate().toString().padStart(2, "0");
            let month = (today.getMonth() + 1).toString().padStart(2, "0");
            let year = today.getFullYear();
        
            document.getElementById("daySelect").value = day;
            document.getElementById("monthSelect").value = month;
            document.getElementById("yearSelect").value = year;

            updateYourApplicationsTable(); // ✅ Hiển thị dữ liệu ngay khi mở trang
        });

       

        window.deleteApplication = function (index) {
            let applications = JSON.parse(localStorage.getItem("yourApplications")) || [];
            let deletedApp = applications[index].subject;
        
            applications.splice(index, 1);
            localStorage.setItem("yourApplications", JSON.stringify(applications));
        
            // Hiển thị thông báo cảnh báo
            
            showNotification(`Đã xóa ứng dụng: ${deletedApp}`, "error");
        
            updateYourApplicationsTable();
        };

       

        function showNotification(message, type = "success") {
            let notification = document.getElementById("notification");
        
            notification.innerText = message;
            notification.className = `notification show ${type}`;
        
            // Ẩn thông báo sau 3 giây
            setTimeout(() => {
                notification.classList.remove("show");
            }, 3000);
        }


        

        window.approveApplication = function (index) {
            let applications = JSON.parse(localStorage.getItem("yourApplications")) || [];
        
            applications[index].status = "Approved"; // ✅ Chuyển thành "Approved"
            localStorage.setItem("yourApplications", JSON.stringify(applications));
        
            showNotification(`✅ Đã duyệt : ${applications[index].subject}`, "success");
            updateYourApplicationsTable();
        };
        
        window.rejectApplication = function (index) {
            let applications = JSON.parse(localStorage.getItem("yourApplications")) || [];
        
            applications[index].status = "Rejected"; // ❌ Chuyển thành "Rejected"
            localStorage.setItem("yourApplications", JSON.stringify(applications));
        
            showNotification(`❌ Đã từ chối : ${applications[index].subject}`, "error");
            updateYourApplicationsTable();
        };

        window.resetToPending = function (index) {
            let applications = JSON.parse(localStorage.getItem("yourApplications")) || [];
        
            applications[index].status = "Pending"; // 🔄 Quay lại trạng thái Pending
            localStorage.setItem("yourApplications", JSON.stringify(applications));
        
            showNotification(`🔄 Đã quay lại: ${applications[index].subject}`, "info");
            updateYourApplicationsTable();
        };

        


        
        
        







        function toggleMobileMenu() {
            document.getElementById('mobile-menu').classList.toggle('show');
        }
        document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
























        