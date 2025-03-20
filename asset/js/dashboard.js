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
        

        
        
        
        
            
           
        const dayselect = document.getElementById("daySelect");
        for (let i = 1; i <= 31; i++) {
            let option = document.createElement("option");
            option.text = i.toString().padStart(2, "0"); // Định dạng 01, 02, ..., 31
            dayselect.appendChild(option);
        }
            


        const monthSelect = document.getElementById("monthSelect");
        for (let i = 1; i <= 12; i++) {
            let option = document.createElement("option");
            option.text = i.toString().padStart(2, "0");
            monthSelect.appendChild(option);
        }

        const yearSelect = document.getElementById("yearSelect");
        const currentYear = new Date().getFullYear();
        for (let i = 2025; i <= currentYear + 10; i++) {
            let option = document.createElement("option");
            option.text = i;
            yearSelect.appendChild(option);
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
        
        

       
        



        




    





     


        



        
       
        
        

        

        


      
     
