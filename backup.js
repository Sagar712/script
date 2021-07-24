
function addTask() {
    location.href = '.';
}


const AppUrl = 'https://secret-script.herokuapp.com/script/';
let spinner = document.querySelector(".loadingOverlay");

let num1 = 0;
function popupmenu() {
    let rotater = document.querySelector(".menubtn-bar");
    let cross = document.querySelector(".bar");
    let menu = document.querySelector(".menuitems");
    let overlay = document.querySelector(".nextoverlay");
    let icon = document.getElementById('changeclas');

    cross.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    rotater.classList.toggle("active");
    if(num1==0){
        icon.className='fas fa-times';
        num1=1;
    }
    else if(num1==1){
        icon.className='fas fa-ellipsis-v';
        num1=0;
    }
    
}

function Openwindow(divname) {
    let win = document.querySelector(`.${divname}`);
    let overlay = document.querySelector(`.overlayforclose`);
    win.classList.toggle("active");
    overlay.classList.toggle("active");
}

function uploadBackUp() {
    if(localStorage.getItem("ScriptAppData")==null){
        const masterDb = {
            tasks:{
                
            }
        }

        let db = JSON.stringify(masterDb);
        localStorage.setItem("ScriptAppData", db);
    }
    if(localStorage.getItem("ListTableData")==null){
        const masterdb = {
            items : {
                
            }
        }

        let db = JSON.stringify(masterdb);
        localStorage.setItem("ListTableData", db);
    }

    let originalDb = localStorage.getItem("ListTableData");
    let completeDb = localStorage.getItem("ScriptAppData");
    spinner.classList.add("active");

    

    let name = originalDb;
    let email1 =  document.getElementById("uname").value;
    let pass = completeDb;
    
    const data = {
        username: name,
        email: email1,
        password: pass
    };

    console.log(data);

    if(email1!=""){
        fetch(AppUrl,{method:'post', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})
        .then(res => {
            return res.json();
        })
        .then(response => {
        
            console.log(response);
            if(response.msg == "user alreay exists!!"){
                fetch(AppUrl+email1,{method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})
                .then(res => {
                    return res.json();
                })
                .then(response => {
                    alert(response.msg);
                    console.log(response);
                })
            }
            else{
                alert(response.msg);
                console.log(response);
            }
            spinner.classList.remove("active");
        });
    }
    else{
        spinner.classList.remove("active");
        alert("username can't be NULL !");
    }
        

    Openwindow('setuname')
}

function downBackUp() {

    let email1 =  document.getElementById("uname2").value;
    spinner.classList.add("active");
    let downloadedOriginal;
    let downloadedCompleted;

    if(email1!=""){
        
        fetch(AppUrl+email1)
    .then(res => {
        return res.json();
    })
    .then(response => {
        
        downloadedOriginal = JSON.parse(response.username);
        downloadedCompleted = JSON.parse(response.password);
        
        if(localStorage.getItem("ScriptAppData")==null){
            const masterDb = {
                tasks:{
                    
                }
            }
    
            let db = JSON.stringify(masterDb);
            localStorage.setItem("ScriptAppData", db);
        }
        if(localStorage.getItem("ListTableData")==null){
            const masterdb = {
                items : {
                    
                }
            }
    
            let db = JSON.stringify(masterdb);
            localStorage.setItem("ListTableData", db);
        }
        let originalDb = JSON.parse(localStorage.getItem("ListTableData"));
        let completeDb = JSON.parse(localStorage.getItem("ScriptAppData"));
        console.log(originalDb);
        let j=1;
        while(originalDb.items[j]!=null){
            j++;
        }
        
        let i=1;
        while(downloadedOriginal.items[i]!=null){
            originalDb.items[j++] = downloadedOriginal.items[i];
            i++;    
        }
        
        localStorage.setItem("ListTableData", JSON.stringify(originalDb));

        j=1;
        while(completeDb.tasks[j]!=null){
            j++;
        }
        console.log("j: "+j);
        i=1;
        while(downloadedCompleted.tasks[i]!=null){
            completeDb.tasks[j++] = downloadedCompleted.tasks[i];
            i++;
        }
        console.log(completeDb);
        localStorage.setItem("ScriptAppData", JSON.stringify(completeDb));
        spinner.classList.remove("active");
    });
    
    }
    
    else{
        spinner.classList.remove("active");
        alert("username can't be NULL !");
    }
    
        
    
        Openwindow('getuname');
    
}
