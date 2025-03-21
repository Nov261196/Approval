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
        sidebar.classList.toggle('open')


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
        

        
        
            
           
        // const dayselect = document.getElementById("daySelect");
        // for (let i = 1; i <= 31; i++) {
        //     let option = document.createElement("option");
        //     option.text = i.toString().padStart(2, "0"); 
        //     dayselect.appendChild(option);
        // }
            


        // const monthSelect = document.getElementById("monthSelect");
        // for (let i = 1; i <= 12; i++) {
        //     let option = document.createElement("option");
        //     option.text = i.toString().padStart(2, "0");
        //     monthSelect.appendChild(option);
        // }

        // const yearSelect = document.getElementById("yearSelect");
        // const currentYear = new Date().getFullYear();
        // for (let i = 2025; i <= currentYear + 10; i++) {
        //     let option = document.createElement("option");
        //     option.text = i;
        //     yearSelect.appendChild(option);
        // }
            

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

        const currentTime = document.getElementById('current-time');
        console.log(currentTime);
        const time = new Date().toLocaleTimeString('en-us',
            {   hour:"2-digit",
                second:"2-digit",
                minute:"2-digit",
            });
        console.log(currentTime);
        currentTime.textContent = time;

        function updateTime() {
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
        
        

        // document.addEventListener("DOMContentLoaded", function () {
        //     const daySelect = document.getElementById("daySelect");
        //     const monthSelect = document.getElementById("monthSelect");
        //     const yearSelect = document.getElementById("yearSelect");
        
        //     function populateDays(month, year) {
        //         daySelect.innerHTML = ""; 
        //         let daysInMonth = new Date(year, month, 0).getDate(); 
        
        //         for (let i = 1; i <= daysInMonth; i++) {
        //             let option = document.createElement("option");
        //             option.value = i;
        //             option.textContent = i;
        //             daySelect.appendChild(option);
        //         }
        //     }
        
        //     function populateMonths() {
        //         monthSelect.innerHTML = "";
        //         for (let i = 1; i <= 12; i++) {
        //             let option = document.createElement("option");
        //             option.value = i;
        //             option.textContent = i;
        //             monthSelect.appendChild(option);
        //         }
        //     }
        
        //     function populateYears() {
        //         yearSelect.innerHTML = "";
        //         let currentYear = new Date().getFullYear();
        //         for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        //             let option = document.createElement("option");
        //             option.value = i;
        //             option.textContent = i;
        //             yearSelect.appendChild(option);
        //         }
        //     }
        
        //     function updateDays() {
        //         populateDays(monthSelect.value, yearSelect.value);
        //     }
        
        //     populateMonths();
        //     populateYears();
        
        //     let today = new Date();
        //     yearSelect.value = today.getFullYear();
        //     monthSelect.value = today.getMonth() + 1;
        //     populateDays(today.getMonth() + 1, today.getFullYear());
        //     daySelect.value = today.getDate();
        
        //     monthSelect.addEventListener("change", updateDays);
        //     yearSelect.addEventListener("change", updateDays);
        // });
        

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
            let appNumber = `AP.${currentYear}${currentMonth}.${String(applications.length + 1).padStart(4, "0")}`;
        
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
                let row = document.createElement("tr");
        
                let statusColor = app.status === "Approved" ? "green" :
                                  app.status === "Rejected" ? "red" : "orange";
        
                row.innerHTML = `
                    <td>${app.appNo}</td>
                    <td>${app.subject}</td>
                    <td>${app.transferDate}</td>
                    <td>${app.status}</td>
                    <td><button class="yourdraft__table--icon"><i class="fa-solid fa-file"></i></button></td>
                    <td><button class="yourdraft__table--icon"><i class="fa-solid fa-copy"></i></button></td>
                    <td><button class="yourdraft__table--icon"><i class="fa-solid fa-print"></i></button></td>
                    <td><button class="yourdraft__table--icon" onclick="deleteApplication(${index})"><i class="fa-solid fa-trash"></i></button></td>
                `;
                tableBody.appendChild(row);
            });
        }
        

        
     


        
        
        window.deleteApplication = function (index) {
            let applications = JSON.parse(localStorage.getItem("yourApplications")) || [];
            applications.splice(index, 1);
            localStorage.setItem("yourApplications", JSON.stringify(applications));
        
            updateYourApplicationsTable();
        };
        
        

        
        
        

        

        window.editApplication = function (index) {
            let applications = JSON.parse(localStorage.getItem("yourApplications")) || [];
            let newSubject = prompt("Nhập Subject mới:", applications[index].subject);
        
            if (newSubject && newSubject.trim() !== "") {
                applications[index].subject = newSubject.trim();
                localStorage.setItem("yourApplications", JSON.stringify(applications));
        
                // Hiển thị thông báo thành công
                showNotification(`Đã cập nhật Subject thành: ${newSubject}`, "success");
        
                updateYourApplicationsTable();
            }
        };

        
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



        document.addEventListener("DOMContentLoaded", function () {
            updateYourApplicationsTable(); // ✅ Hiển thị dữ liệu ngay khi mở trang
        });






























        