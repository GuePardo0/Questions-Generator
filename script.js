let sidebar = document.getElementById("sidebar");
let sidebarOpener = document.getElementById("sidebaropener");
let sidebarOpenerArrow = document.getElementById("sidebaropenerarrow");
let sidebarIsOpen = false;
let numberOfFields = 2;
let subdivisionIsOpen = [false, false];

// get the path
let mainFolder = "";
let fullpath = window.location.pathname;
if(fullpath.includes("subject")) {
    mainFolder = "../../";
}
// get the current tab
currentTab = "";
for(let index = 6; index < fullpath.length; index++) {
    if(fullpath[fullpath.length-index] == "/") {
        break;
    }
    currentTab = fullpath[fullpath.length-index] + currentTab;
}
currentTab = capitalizeFirstLetter(currentTab);

// remember stuff that were done in other tabs
if(localStorage.getItem("sidebarIsOpen") == "true") {
    sidebar.classList.add('open');
    sidebarOpener.classList.add('open');
    sidebarIsOpen = true;

    sidebarOpenerArrow.src = mainFolder + "assets/leftarrow.png";
}
for(let fieldIndex = 0; fieldIndex < numberOfFields; fieldIndex++) {
    let field = getFieldByIndex(fieldIndex);
    let subdivisions = document.getElementsByClassName(field);
    let arrow = document.getElementById(field+"_arrow");

    if(localStorage.getItem(`field${fieldIndex}IsOpen`) == "true") {
        for(let index = 0; index < subdivisions.length; index++) {
            subdivisions[index].style.display = "flex";
        }
        arrow.src = mainFolder + "assets/downarrow.png";
        subdivisionIsOpen[fieldIndex] = true;
    }
}

// highlight the current tab
let tabs = document.getElementsByClassName("tab");
for(let index = 0; index < tabs.length; index++) {
    if(tabs[index].innerText == currentTab) {
        tabs[index].style.backgroundColor = "var(--primary-very-light)";
    }
}

// usefull functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFieldByIndex(index) {
    let field = "No field with this index";
    if(index == 0) {
        field = "calculus";
    }
    if(index == 1) {
        field = "analiticgeometry";
    }
    return field;
}



// sidebar function
function openCloseSidebar() {
    sidebar.classList.toggle("open");
    sidebar.style.transition = "left 0.4s";
    sidebarOpener.classList.toggle("open");
    sidebarOpener.style.transition = "left 0.4s";
    localStorage.setItem("sidebarIsOpen", sidebar.classList.contains("open"));

    if(sidebarIsOpen == true) {
        sidebarOpenerArrow.src = mainFolder + "assets/rightarrow.png";
        sidebarIsOpen = false;
    }
    else {
        sidebarOpenerArrow.src = mainFolder + "assets/leftarrow.png";
        sidebarIsOpen = true;
    }
}

// field function
function openCloseFields(fieldIndex) {
    let field = getFieldByIndex(fieldIndex);
    let subdivisions = document.getElementsByClassName(field);
    let arrow = document.getElementById(field+"_arrow");

    if(subdivisionIsOpen[fieldIndex] == true) {
        for(let index = 0; index < subdivisions.length; index++) {
            subdivisions[index].style.display = "none";
        }
        arrow.src = mainFolder + "assets/rightarrow.png";
        subdivisionIsOpen[fieldIndex] = false;
    }
    else {
        for(let index = 0; index < subdivisions.length; index++) {
            subdivisions[index].style.display = "flex";
        }
        arrow.src = mainFolder + "assets/downarrow.png";
        subdivisionIsOpen[fieldIndex] = true;
    }

    localStorage.setItem(`field${fieldIndex}IsOpen`, subdivisions[0].style.display == "flex");
}