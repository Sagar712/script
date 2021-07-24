

function swipeleft1(){
    document.getElementById("content1").style.transform="translateX(0%)";
    document.getElementById("content2").style.transform="translateX(100%)";
    document.getElementById("content3").style.transform="translateX(200%)";
    document.querySelectorAll("#icon1")[0].style.color="rgb(65, 47, 0)";
    document.querySelectorAll("#icon1")[1].style.color="rgb(65, 47, 0)";
    document.querySelectorAll("#icon2")[0].style.color="rgb(148, 108, 0)";
    document.querySelectorAll("#icon2")[1].style.color="rgb(148, 108, 0)";
    document.getElementById("icon3").style.color="rgb(148, 108, 0)";
    document.getElementById("allcont").scrollTop=0;
}

function swipeleft2(){
    document.getElementById("content1").style.transform="translateX(-100%)";
    document.getElementById("content2").style.transform="translateX(0%)";
    document.getElementById("content3").style.transform="translateX(100%)";
    document.querySelectorAll("#icon2")[0].style.color="rgb(65, 47, 0)";
    document.querySelectorAll("#icon2")[1].style.color="rgb(65, 47, 0)";
    document.querySelectorAll("#icon1")[0].style.color="rgb(148, 108, 0)";
    document.querySelectorAll("#icon1")[1].style.color="rgb(148, 108, 0)";
    document.getElementById("icon3").style.color="rgb(148, 108, 0)";
    document.getElementById("allcont").scrollTop=0;
}

function swipeleft3(){
    document.getElementById("content1").style.transform="translateX(-200%)";
    document.getElementById("content2").style.transform="translateX(-100%)";
    document.getElementById("content3").style.transform="translateX(0%)";
    document.getElementById("icon3").style.color="rgb(65, 47, 0)";
    document.querySelectorAll("#icon2")[0].style.color="rgb(148, 108, 0)";
    document.querySelectorAll("#icon2")[1].style.color="rgb(148, 108, 0)";
    document.querySelectorAll("#icon1")[0].style.color="rgb(148, 108, 0)";
    document.querySelectorAll("#icon1")[1].style.color="rgb(148, 108, 0)";
    document.getElementById("allcont").scrollTop=0;
}

let chngeicn=0;

function changeicon(){
    chngeicn++;
    const drop = document.querySelector(".dropdown");
    if(chngeicn%2!=0){
        document.getElementById("changeiconq").className="fas fa-times";
        drop.classList.toggle("active");
        overlay.classList.toggle("active");
        document.querySelector(".seeting").classList.toggle("active");
    }
        
    else{
        document.getElementById("changeiconq").className="fas fa-bars";
        drop.classList.toggle("active");
        overlay.classList.toggle("active");
        document.querySelector(".seeting").classList.toggle("active");
    }
        
}


let key = document.getElementById("key").value;
let currentIndex = localStorage.getItem("indexof");
let allItems = JSON.parse(localStorage.getItem("ScriptAppData"));
document.getElementById("scriptTitle").innerHTML = allItems.tasks[parseInt(currentIndex)].title;
document.getElementById("msgdecrypt").innerText = allItems.tasks[parseInt(currentIndex)].description;
if(allItems.tasks[parseInt(currentIndex)].status == "Default key"){
    let decrypteMsg = decrypt(key, allItems.tasks[parseInt(currentIndex)].description);
    document.getElementById("msgdecrypt").innerText = decrypteMsg;
}


function fetchDecryption() {
    let key = document.getElementById("key").value;
    let obj = allItems.tasks[parseInt(currentIndex)];
    let decrypteMsg = decrypt(key, obj.description);
    document.getElementById("msgdecrypt").innerText = decrypteMsg;

}


function indexAllocTask(index) {
    location.href = "./output.html";
    sessionStorage.setItem("indexof", index.toString);
}

function copyElementText() {
    var text = document.getElementById("msgdecrypt").innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    alert("Copied !!")
}

function edtElement() {
    
    let messg = document.getElementById("msgdecrypt");

    document.querySelector(".decryptedMsg").innerHTML 
    = '<textarea  id="description" rows="5" placeholder=" Task Description...."></textarea>';

    document.querySelector(".addbutnn").innerHTML = "<button onclick = 'saveItem()'>Save</button>"
    
    let messg2 = messg.innerHTML.replaceAll("<br>", "\n");
    
    document.querySelector("#description").textContent = messg2;
}

function saveItem() {
    let key = document.getElementById("key").value;
    let msg = document.getElementById("description").value;
    
    let newDes = encrypt(key, msg);
    console.log(newDes);
    allItems.tasks[currentIndex].description = newDes;
    console.log(allItems);
    localStorage.setItem("ScriptAppData", JSON.stringify(allItems));
    document.querySelector(".addbutnn").innerHTML = "";
    document.querySelector(".decryptedMsg").innerHTML = '<p id="msgdecrypt"></p>';
    fetchDecryption();
}

function delElement() {
    let indexOfTask = currentIndex;
    let i=1;
    let completeDb = allItems;
    let updateTasksOfComplted = {
        tasks:{
                
        }
    }
    let k=1;
    while(completeDb.tasks[i]!=null){
        
        if(i === parseInt(indexOfTask)){
            i++;
            continue;
        }
        updateTasksOfComplted.tasks[k++] = completeDb.tasks[i];

        i++;
    }
    console.log(updateTasksOfComplted);
    localStorage.setItem("ScriptAppData", JSON.stringify(updateTasksOfComplted));
    location.href = "."
}

function encrypt(key, msg){
    
    if(key=="")
        key="7121996";

    let encypted="";
	let looper=0, len = key.length;
    let conv;
    let exchange=0;
    let firstspace = true;
    let series = [" ","!","'","#","$","%","&","\"","(",")","*","+",",","-",".","/",
        "0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@",
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
        "[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u",
        "v","w","x","y","z","{","|","}","~"];

    for(let i=0; i<msg.length; i++){
        let j=parseInt(key.charAt(looper));
        for(let k=0; k<series.length; k++){
            if(series[k]===msg.charAt(i)){
                exchange=k;
                break;
            }
        }
        if(msg.charAt(i)=="\n"){
            encypted = encypted.concat("\n");
            continue;
        }
                
        conv = series[(exchange+j)%95];
        if(conv ==" "){
            conv="©";
        }
        encypted = encypted.concat(conv);
        looper = (looper+1)%len;
    }
    
    return encypted;
    
}

function decrypt(key, msg){
    
    if(key=="")
    key = "7121996";
		let encypted="";
		let j =0, looper=0, len = key.length;
        let exchange=0;
        let series = [" ","!","'","#","$","%","&","\"","(",")","*","+",",","-",".","/",
        "0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@",
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
        "[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u",
        "v","w","x","y","z","{","|","}","~"];

		for(let i=0; i<msg.length; i++) {
			j= parseInt(key.charAt(looper));
            let temp = msg.charAt(i)
            if(temp=="©")
                temp = " ";
            
			for(let k=0; k<series.length; k++) {
				if(series[k] === temp) {
					exchange = k;
					break;
				}
			}
            let conv;
            if(msg.charAt(i)=="\n"){
                encypted = encypted.concat("\n");
                continue;
            }
			if(exchange-j<0) {
				conv = series[95+(exchange-j)];
			}
			else
				conv = series[exchange-j];
            
			
			encypted = encypted.concat(conv);
			looper = (looper+1)%len;
		}

		return encypted;
    
}