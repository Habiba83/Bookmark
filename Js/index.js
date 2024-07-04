var SiteName = document.getElementById("SiteName"); 
var SiteURL = document.getElementById("SiteURL");
var SiteList = [];

if(localStorage.getItem("container") !== null){
    SiteList = JSON.parse(localStorage.getItem("container"));
    displayData();
}

function addSiteinfo(){
    var errors = validateInput();
    if (errors.length > 0) {
        showModal(errors);
        return;
    }
    
    var site = {
        name: SiteName.value,
        url: SiteURL.value
    };
    SiteList.push(site);
    localStorage.setItem("container", JSON.stringify(SiteList));
    displayData();
    clearForm();
}

function validateInput() {
    var errors = [];
    var namePattern = /.{3,}/;
    var urlPattern = /^(http|https):\/\/[^ "]+$/;

    if (!namePattern.test(SiteName.value)) {
        errors.push("Site name must contain at least 3 characters");
    }
    if (!urlPattern.test(SiteURL.value)) {
        errors.push("Site URL must be a valid one");
    }
    return errors;
}

function clearForm(){
    SiteName.value = null;
    SiteURL.value = null;
}

function displayData(){
    var container = "";
    for(var i = 0; i < SiteList.length; i++){
        container +=
        `<tr>
            <td>${i + 1}</td>
            <td>${SiteList[i].name}</td>
            <td><button class="cbutton rounded-1" onclick="window.open('${SiteList[i].url}', '_blank')">
            <i class="fa-solid fa-eye"></i>
            Visit
            </button></td>
            <td><button class="dbutton rounded-1" onclick="deletesite(${i})">
            <i class="fa-solid fa-trash"></i>
            Delete
            </button></td>
        </tr>`;
    }
    document.getElementById("tablebody").innerHTML = container;
}

function deletesite(index){
    SiteList.splice(index,1);
    localStorage.setItem("container", JSON.stringify(SiteList));
    displayData();
}

function showModal(errors) {
    var modal = document.getElementById("errorModal");
    var errorList = document.getElementById("errorList");
    errorList.innerHTML = "";

    errors.forEach(function(error) {
        var li = document.createElement("li");
        li.textContent = error;
        errorList.appendChild(li);
    });

    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("errorModal");
    modal.style.display = "none";
}

