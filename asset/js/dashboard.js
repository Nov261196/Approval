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

       


    //     const currentDay = document.getElementById('current-day');
    //     console.log(currentDay);
    //     const date = new Date().toLocaleDateString('en-us',
    //         {   weekday: 'long', 
    //             year: 'numeric', 
    //             month: 'long', 
    //             day: 'numeric', 
    //         });
    //     console.log(date);
    //     currentDay.textContent = date;

    //     const currentTime = document.getElementById('current-time');
    //     console.log(currentTime);
    //     const time = new Date().toLocaleTimeString('en-us',
    //         {   hour:"2-digit",
    //             second:"2-digit",
    //             minute:"2-digit",
    //         });
    //     console.log(currentTime);
    //     currentTime.textContent = time;

    //     function updateTime() {
    //         const time = new Date().toLocaleTimeString('en-us',
    //             {   hour:"2-digit",
    //                 second:"2-digit",
    //                 minute:"2-digit",
    //             });
    //         console.log(time);
    //         currentTime.textContent = time;
    //     }
    //     updateTime();
    //     setInterval(updateTime, 1000);
        
        

       
    //     function showSection(sectionId) {
    //     const sections = document.querySelectorAll('.box__body--main');
    //     sections.forEach(section => section.classList.remove('active'));

    //     const currentSection = document.getElementById(sectionId);
    //         if (currentSection) {
    //             currentSection.classList.add('active');
    //         } else {
    //             console.error("Section not found:", sectionId);
    //         }
    //     }
    //     document.getElementById('home').addEventListener('click', (e) => {
    //         e.preventDefault();
    //         showSection('main-home');
    //     });

    //     document.getElementById('new-app').addEventListener('click', (e) => {
    //         e.preventDefault();
    //         showSection('main-new-app');
    //     });

    //     document.getElementById('your-app').addEventListener('click', (e) => {
    //         e.preventDefault();
    //         showSection('main-your-app');
    //     });


    //     function showSubMenu(subMenuId) {
    //         const subMenus = document.querySelectorAll('.box__body--sub-content');
    //         subMenus.forEach(subMenu => subMenu.classList.remove('active'));

    //         const currentSubMenu = document.getElementById(subMenuId);
    //         if (currentSubMenu) {
    //             currentSubMenu.classList.add('active');
    //         } else {
    //             console.error("Sub Menu not found:", subMenuId);
    //         }
    //     }
        
    //     document.getElementById('administrator').addEventListener('click', (e) => {
    //         e.preventDefault();
    //         showSubMenu('administrator-dashboard');
    //     });
        
    //     document.getElementById('accounting').addEventListener('click', (e) => {
    //         e.preventDefault();
    //         showSubMenu('accounting-dashboard');
    //     });
    //     document.getElementById('human').addEventListener('click', (e) => {
    //         e.preventDefault();
    //         showSubMenu('human-resource-dashboard');
    //     });
    //     document.getElementById('operation').addEventListener('click', (e) => {
    //         e.preventDefault();
    //         showSubMenu('operation-dashboard');
    //     });
       

        
    //     document.getElementById('administrator').addEventListener('click', function (e) {
    //     e.preventDefault();
    //         toggleSubMenu('administrator-dashboard');
            
    //     });

       

    //     const menuItems = document.querySelectorAll('.box__menu a');
    //     menuItems.forEach(item => {
    //         item.addEventListener('click', function () {
    //             document.getElementById('administrator-dashboard').style.display = 'none';
                
    //         });
    //     });


    

    // document.getElementById('administrator').addEventListener('click', function (e) {
    //     e.preventDefault();
    //     toggleSubMenu('administrator-dashboard');
    // });

    // document.getElementById('accounting').addEventListener('click', function (e) {
    //     e.preventDefault();
    //     toggleSubMenu('accounting-dashboard');
    // });

    // document.getElementById('human').addEventListener('click', function (e) {
    //     e.preventDefault();
    //     toggleSubMenu('human-resource-dashboard');
    // });

    // document.getElementById('operation').addEventListener('click', function (e) {
    //     e.preventDefault();
    //     toggleSubMenu('operation-dashboard');
    // });

    // document.querySelectorAll('.box__menu a').forEach(item => {
    //     item.addEventListener('click', function () {
    //         hideAllDashboards();
    //     });
    // });



        




    





     


        



        
       
        
        

        

        


      
     
