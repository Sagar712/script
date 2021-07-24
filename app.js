
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(
        registration => {
            console.log("SW registered");
            console.log(registration);
        }
    ).catch(error => {
        console.log("SW failed");
    })
}


let chngeicn=0;
const overlay = document.querySelector(".ovelay2");
let isMenuOpened = false;

let saveTitle="";

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



function overlayhandle(){
    console.log("overlay clicked");
    changeicon();
}


function reset(){
    document.getElementById("keyy2").value="";
    document.getElementById("encryted").innerHTML="";
    console.log("Reset clicked");
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

function decrypt(){
    let key = document.getElementById("keyy").value;
    let msg = document.getElementById("keyy2").value;
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

		console.log("Decrypted: "+encypted);
        document.getElementById("encryted").innerText=encypted;
        document.getElementById("crypted").innerHTML="Decrypted Message:";
    
}


let celldata = document.getElementById("allcell");

function addval(){

    let names = [];
    let quants = [];
    let prices = [];
	console.log("clicked");
	let str=`
    <tr>
    	<th>Sr</th>
	    <th>Name</th>
	    <th>Quatity</th>
	    <th>Prices </th>
	    <th>Remv</th>
    </tr>`;
	let name = document.getElementById("name").value;
	let quant = document.getElementById("quant").value;
	let price = document.getElementById("price").value;
	
	

    if(localStorage.getItem("ListTableData") == null){
        const masterdb = {
            items : {
                
            }
        }
        localStorage.setItem("ListTableData", JSON.stringify(masterdb));
    }
    
    let masterDb = JSON.parse(localStorage.getItem("ListTableData"));
    let j =1;
    let i=0;
    
    
    while(masterDb.items[j]!=null){
        j++;
    }

    masterDb.items[j] = {
        name:name,
        quant:quant,
        price:price
    }
    j=1;
    while(masterDb.items[j]!=null){
        names[i] = masterDb.items[j].name;
	    quants[i] = masterDb.items[j].quant;
	    prices[i++] = masterDb.items[j].price;
        j++;
    }
    console.log(masterDb);
    console.log(j);
    localStorage.setItem("ListTableData", JSON.stringify(masterDb));
    

    let newDb = JSON.parse(localStorage.getItem("ListTableData"));
	
	for(let k=1; k<j; k++){
		str += `<tr><td>${k}</td><td>${newDb.items[k].name}</td>
        <td>${newDb.items[k].quant}</td><td>${newDb.items[k].price}</td>
        <td><button onclick = "handler(this.id)"class="clos" id="${k}">X</button></td></tr>`;
	}
	celldata.innerHTML = totalcalc(str, names, quants, prices);
    resetval();
}

function handler(id){

    let names = [];
    let quants = [];
    let prices = [];
	let str=`
    <tr>
    	<th>Sr</th>
	    <th>Name</th>
	    <th>Quatity</th>
	    <th>Prices </th>
	    <th>Remv</th>
    </tr>`;
	
    let masterDb = JSON.parse(localStorage.getItem("ListTableData"));
    let j =1;
    let i=0;
    let cp = 1;

    let copyDb = {
        items : {
            
        }
    }

    while(masterDb.items[j]!=null){
        if(j == id){
            j++;
            continue;
        }
        names[i] = masterDb.items[j].name;
	    quants[i] = masterDb.items[j].quant;
	    prices[i++] = masterDb.items[j].price;
        copyDb.items[cp++] = masterDb.items[j];
        j++;
    }
    localStorage.setItem("ListTableData", JSON.stringify(copyDb));
    

    let newDb = JSON.parse(localStorage.getItem("ListTableData"));
    console.log(newDb);
	j=j-1;
	for(let k=1; k<j; k++){
		str += `<tr><td>${k}</td><td>${newDb.items[k].name}</td>
        <td>${newDb.items[k].quant}</td><td>${newDb.items[k].price}</td>
        <td><button onclick = "handler(this.id)"class="clos" id="${k}">X</button></td></tr>`;
	}
    celldata.innerHTML = totalcalc(str, names, quants, prices);
    resetval();
}

function deleteList() {
    if(confirm("You are about to delete complete list\n Are you sure?")){
        localStorage.removeItem("ListTableData");
    }
    else{
        alert("Deletion aborted !");
    }
    listRendrer();
}

function resetval(){
	document.getElementById("name").value="";
	document.getElementById("quant").value="";
	document.getElementById("price").value="";
}

function totalcalc(str, names, quants, prices){
	let total=0;
	let j;
	for(j=0; j<names.length; j++){

        if(prices[j]=="" && quants[j]==""){
            total+=0;
        }
		else if(quants[j]==""){
			total += parseInt(prices[j]) ;
		}	
		else if(prices[j]=="")
			total += parseInt(quants[j]);
		
            
		else
		total += quants[j]*prices[j];
	}
	str += `<tr><td>#</td><td></td><td colspan ="2"><b>Total: ${total}</b></td><td>~</td></tr>`;
	

	return str;

}

function copyElementText(idd) {
    var text = document.getElementById("encryted").innerText;
    var elem = document.createElement("textarea");
    document.getElementById("dbvalue").value = text;
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    let tooltip = document.getElementById(idd);
    tooltip.animate([{
        visibility: 'visible',
        opacity: '1'
    }, 
  {
      visibility: 'hidden',
      opacity: '0'
  }],
  {
      duration:1000
  });
    
}

function inputData(){
	
    let titleIs = document.getElementById("title").value;
    let keyIs = document.getElementById("key").value;
    let descriptionIs = document.getElementById("description2").value;
    let encrypted = encrypt(keyIs, descriptionIs);
    let statusIs = "Unique Key";
    
    if(keyIs.match("7121996") !== null || keyIs == ""){
        statusIs = "Default key";
    }
    
    if(localStorage.getItem("ScriptAppData")!=null){
       
        let obj = JSON.parse(localStorage.getItem("ScriptAppData"));
        let i =1;
        while(obj.tasks[i]!=null){
            i++;
        }
        obj.tasks[i]={
            title: titleIs,
            status: statusIs,
            description: encrypted
        }

        let db = JSON.stringify(obj);
        localStorage.setItem("ScriptAppData", db);
        
    }
    else{
        let masterDb = {
            tasks:{
                1:{
                    title: titleIs,
                    status: statusIs,
                    description: encrypted
                }
            }
        }

        let db = JSON.stringify(masterDb);
        localStorage.setItem("ScriptAppData", db);
        
    }
    document.getElementById("title").textContent = "";
    document.getElementById("key").textContent = "";
    document.getElementById("description2").textContent = "";
    togglePopup('popupTask');
    renderer("ScriptAppData", ".AllTasks");

}

function handleClick(){
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    console.log("clicked");
    popup.classList.toggle("active");
    overlay.classList.toggle("active");
    putVals();
}

function handleEdit(){
    let inputval = document.getElementById("keyy2").value;
    let targetval = document.getElementById("keyy3");
    let output = document.getElementById("encryted").innerText;
    if(isMenuOpened && output!="")
        targetval.value = output;
    else
        targetval.value = inputval;
    document.getElementById("inpuEdit").style.visibility="visible";

}


function togglePopup(classOfPopup) {

    let popup = document.querySelector(`.${classOfPopup}`);
    let overlay = document.querySelector(".overlay");

    popup.classList.toggle("active");
    overlay.classList.toggle("active");
}


function indexAllocTask(index) {
    localStorage.setItem("indexof", index.toString());
    
    location.href = "./output.html";
}

function renderer(key, classId) {
    if(localStorage.getItem(key)!=null){
        let obj = JSON.parse(localStorage.getItem(key));
        let i =1;
        let str = "";
        let clasTitle =  document.querySelector(classId);
        while(obj.tasks[i]!=null){
            let status1 = obj.tasks[i].status;
            let current_status;
            let color;
            let newDiv;
            if(status1 == "Default key"){
                current_status = 'fas fa-lock-open';
                color = 'yellow';
            }
                
            else{
                current_status = 'fas fa-lock';
                color = 'rgb(59, 255, 124)';
            }

            
                newDiv= `<div class='sample'>
                            <div class="status">
                                <i style="border: 2px solid ${color};" id="statusIcon" class="${current_status}" onclick="completeTask(${i})"></i>
                            </div>
                            <div class="contentContainer" onclick="indexAllocTask(${i})">
                                <h2>${obj.tasks[i].title}</h2>
                            </div>
                        </div>`;
            let temp = newDiv;
            temp = temp+str;
            str = temp;
            i++;
            

        }
        if(str!="")
            clasTitle.innerHTML = str;
    }
}

renderer("ScriptAppData", ".AllTasks");
