let sidebar = document.getElementById("sidebar");
let sidebarOpener = document.getElementById("sidebaropener");
let sidebarOpenerArrow = document.getElementById("sidebaropenerarrow");
let sidebarCloserMobile = document.getElementById("sidebarcloser_mobile");
let suggestionsBox = document.getElementById("searchbarsuggestions");
let searchbar = document.getElementById("searchbar");
let tabs = document.getElementsByClassName("tab");
let fields = document.getElementsByClassName("field");
let subjects = document.getElementsByClassName("subject");

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

// remember stuff that were done in other tabs
if(localStorage.getItem("sidebarIsOpen") == "true") {
    sidebar.classList.add('open');
    sidebarOpener.classList.add('open');
    sidebarOpenerArrow.src = mainFolder + "assets/leftarrow.png";
    
    if(window.innerWidth <= 720) {
        sidebarCloserMobile.style.display = "block";
    }
}
for(let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
    let field = fields[fieldIndex];
    let arrow = document.getElementById(field.dataset.field+"_arrow");
    let fieldSubjects = getFieldSubjects(field);

    if(localStorage.getItem(`field${field.dataset.field}IsOpen`) == "true") {
        for(let index = 0; index < fieldSubjects.length; index++) {
            fieldSubjects[index].style.display = "flex";
        }
        arrow.src = mainFolder + "assets/downarrow.png";
    }
}

// highlight the current tab
for(let index = 0; index < tabs.length; index++) {
    if(tabs[index].dataset.tab == currentTab) {
        tabs[index].style.backgroundColor = "var(--primary-very-light)";
    }
}

// usefull functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function getFieldSubjects(field) {
    let fieldSubjects = [];
    for(let index = 0; index < subjects.length; index++) {
        if(subjects[index].dataset.field == field.dataset.field) {
            fieldSubjects.push(subjects[index]);
        }
    }
    return fieldSubjects;
}



// search bar function
function showSuggestions(str) {
    str = str.toLowerCase();
    if(str.length == 0) {
        suggestionsBox.innerHTML = "";
        searchbar.style = "border-bottom-left-radius: 21.6px; border-bottom-right-radius: 21.6px;"
        return;
    }
    else {
        let numberOfSuggestions = 0;
        suggestionsBox.innerHTML = "";
        for(let index = 0; index < subjects.length; index++) {
            if(subjects[index].dataset.subject.includes(str)) {
                suggestionsBox.innerHTML += `<div class="suggestion"><a class="suggestion-link" href="${mainFolder}subjects/${subjects[index].dataset.field}/${subjects[index].dataset.tab}.html">${capitalizeFirstLetter(subjects[index].dataset.subject)}</a></div>`;
                numberOfSuggestions++;
            }
        }
        if(numberOfSuggestions == 0) {
            suggestionsBox.innerHTML += `<div class="suggestion"><a style="cursor: default">Page not found</a></div>`;
        }
        let suggestions = document.getElementsByClassName("suggestion");
        searchbar.style = "border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;"
        suggestions[suggestions.length-1].style = "border-bottom-left-radius: 21.6px; border-bottom-right-radius: 21.6px;"
        document.getElementsByClassName("suggestion-link")[numberOfSuggestions-1].style = "border-bottom-left-radius: 21.6px; border-bottom-right-radius: 21.6px;";
    }
}

// open and close sidebar function
function openCloseSidebar() {
    sidebar.classList.toggle("open");
    sidebar.style.transition = "left 0.4s";
    sidebarOpener.classList.toggle("open");
    sidebarOpener.style.transition = "left 0.4s";
    localStorage.setItem("sidebarIsOpen", sidebar.classList.contains("open"));

    if(localStorage.getItem("sidebarIsOpen") == "true") {
        sidebarOpenerArrow.src = mainFolder + "assets/rightarrow.png";
        if(window.innerWidth <= 720) {
            sidebarCloserMobile.style.display = "none";
        }
    }
    else {
        sidebarOpenerArrow.src = mainFolder + "assets/leftarrow.png";
        if(window.innerWidth <= 720) {
            sidebarCloserMobile.style.display = "block";
        }
    }
}

// open and close fields function
function openCloseFields(fieldIndex) {
    let field = fields[fieldIndex];
    let fieldSubjects = getFieldSubjects(field);
    let arrow = document.getElementById(field.dataset.field+"_arrow");

    if(localStorage.getItem(`field${field.dataset.field}IsOpen`) == "true") {
        for(let index = 0; index < fieldSubjects.length; index++) {
            fieldSubjects[index].style.display = "none";
        }
        arrow.src = mainFolder + "assets/rightarrow.png";
        localStorage.setItem(`field${field.dataset.field}IsOpen`, false);
    }
    else {
        for(let index = 0; index < fieldSubjects.length; index++) {
            fieldSubjects[index].style.display = "flex";
        }
        arrow.src = mainFolder + "assets/downarrow.png";
        localStorage.setItem(`field${field.dataset.field}IsOpen`, true);
    }
}