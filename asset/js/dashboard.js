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

        closeAllSubMenus()
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

      

        function showSection(sectionId) {
            const sections = document.querySelectorAll('.main__box');
            sections.forEach(section => section.classList.remove('active'));
           
            const currentSection = document.getElementById(sectionId);
            if (currentSection) {
                currentSection.classList.add('active');
                currentSection.style.display = 'block'; 
            } else {
                console.error("Section not found:", sectionId);
            }
        }
            document.getElementById('home').addEventListener('click', (e) => {
                e.preventDefault();
                showSection('main-home');
            });
    
            document.getElementById('new-app').addEventListener('click', (e) => {
                e.preventDefault();
                showSection('main-new-app');
            });
    
            // document.getElementById('your-app').addEventListener('click', (e) => {
            //     e.preventDefault();
            //     showSection('main-your-app');
            // });
    
    
            function showSubMenu(subMenuId) {
                const subMenus = document.querySelectorAll('.sub-menu');
                subMenus.forEach(subMenu => subMenu.classList.remove('active'));
               

    
                const currentSubMenu = document.getElementById(subMenuId);
                if (currentSubMenu) {
                    currentSubMenu.classList.add('active');
                } else {
                    console.error("Sub Menu not found:", subMenuId);
                }
            }

            const menuItems = {
                'administrator': 'administrator-dashboard',
                'accounting': 'accounting-dashboard',
                'human': 'human-resource-dashboard',
                'operation': 'operation-dashboard'
            };
            
            // Lặp qua từng menu item và thêm sự kiện click
            Object.keys(menuItems).forEach(menuId => {
                document.getElementById(menuId).addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Hiển thị "New Application"
                    showSection('main-new-app');
            
                    // Ẩn tất cả các bảng dashboard
                    document.querySelectorAll('.application__body').forEach(dashboard => {
                        dashboard.classList.remove('active');
                        dashboard.style.display = 'none';
                    });
            
                    // Hiển thị đúng dashboard được chọn
                    const selectedDashboard = document.getElementById(menuItems[menuId]);
                    if (selectedDashboard) {
                        selectedDashboard.classList.add('active');
                        selectedDashboard.style.display = 'block';
                    } else {
                        console.error("Không tìm thấy phần:", menuItems[menuId]);
                    }
                });
            });
            

            
           
            // document.getElementById('administrator').addEventListener('click', (e) => {
            //     e.preventDefault();
            //     showSection('main-new-app'); // Hiển thị giao diện "New Application"
                
            //     // Hiển thị tab Administrator Dashboard
            //     const allDashboards = document.querySelectorAll('.application__body');
            //     allDashboards.forEach(dashboard => dashboard.classList.remove('active'));
            
            //     const adminDashboard = document.getElementById('administrator-dashboard');
            //     if (adminDashboard) {
            //         adminDashboard.classList.add('active');
            //         adminDashboard.style.display = 'block';
            //     } else {
            //         console.error("Không tìm thấy phần Administrator Dashboard");
            //     }
            // });

            // document.getElementById('accounting').addEventListener('click', (e) => {
            //     e.preventDefault();
            //     showSection('main-new-app'); // Hiển thị giao diện "New Application"
                
            //     // Hiển thị tab Administrator Dashboard
            //     const allDashboards = document.querySelectorAll('.application__body');
            //     allDashboards.forEach(dashboard => dashboard.classList.remove('active'));
            
            //     const accountingDashboard = document.getElementById('accounting-dashboard');
            //     if (accountingDashboard) {
            //         accountingDashboard.classList.add('active');
            //         accountingDashboard.style.display = 'block';
            //     } else {
            //         console.error("Không tìm thấy phần accounting-dashboard");
            //     }
            // });
            
            // document.getElementById('human').addEventListener('click', (e) => {
            //     e.preventDefault();
            //     showSection('main-new-app'); // Hiển thị giao diện "New Application"
                
            //     // Hiển thị tab Administrator Dashboard
            //     const allDashboards = document.querySelectorAll('.application__body');
            //     allDashboards.forEach(dashboard => dashboard.classList.remove('active'));
            
            //     const humanDashboard = document.getElementById('human-resource-dashboard');
            //     if (humanDashboard) {
            //         humanDashboard.classList.add('active');
            //         humanDashboard.style.display = 'block';
            //     } else {
            //         console.error("Không tìm thấy phần accounting-dashboard");
            //     }
            // });

            // document.getElementById('operation').addEventListener('click', (e) => {
            //     e.preventDefault();
            //     showSection('main-new-app'); // Hiển thị giao diện "New Application"
                
            //     // Hiển thị tab Administrator Dashboard
            //     const allDashboards = document.querySelectorAll('.application__body');
            //     allDashboards.forEach(dashboard => dashboard.classList.remove('active'));
            
            //     const operationDashboard = document.getElementById('operation-dashboard');
            //     if (operationDashboard) {
            //         operationDashboard.classList.add('active');
            //         operationDashboard.style.display = 'block';
            //     } else {
            //         console.error("Không tìm thấy phần accounting-dashboard");
            //     }
            // });
            




            // document.getElementById('administrator').addEventListener('click', (e) => {
            //     e.preventDefault();
            //     showSection('administrator-dashboard'); // Hiển thị tab Administrator
            // });
            
            
            // document.getElementById('accounting').addEventListener('click', (e) => {
            //     e.preventDefault();
            //     showSection('accounting-dashboard');
            // });
            // document.getElementById('human').addEventListener('click', (e) => {
            //     e.preventDefault();
            //     showSection('human-resource-dashboard');
            // });
            // document.getElementById('operation').addEventListener('click', (e) => {
            //     e.preventDefault();
            //     showSection('operation-dashboard');
            // });
            
            
            
           


          









        // const currentDay = document.getElementById('current-day');
        // console.log(currentDay);
        // const date = new Date().toLocaleDateString('en-us',
        //     {   weekday: 'long', 
        //         year: 'numeric', 
        //         month: 'long', 
        //         day: 'numeric', 
        //     });
        // console.log(date);
        // currentDay.textContent = date;

        // const currentTime = document.getElementById('current-time');
        // console.log(currentTime);
        // const time = new Date().toLocaleTimeString('en-us',
        //     {   hour:"2-digit",
        //         second:"2-digit",
        //         minute:"2-digit",
        //     });
        // console.log(currentTime);
        // currentTime.textContent = time;

        // function updateTime() {
        //     const time = new Date().toLocaleTimeString('en-us',
        //         {   hour:"2-digit",
        //             second:"2-digit",
        //             minute:"2-digit",
        //         });
        //     console.log(time);
        //     currentTime.textContent = time;
        // }
        // updateTime();
        // setInterval(updateTime, 1000);
        
        

       
        



        




    





     


        



        
       
        
        

        

        


      
     
