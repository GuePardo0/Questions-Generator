let suggestionsBox = document.getElementById("searchbarsuggestions");
let searchbar = document.getElementById("searchbar");
let searchbarInputField = document.getElementById("searchbarinputfield");
searchbarInputField.value = "";
let searchbarCloser = document.getElementById("searchbarcloser");
let sidebar = document.getElementById("sidebar");
let sidebarOpener = document.getElementById("sidebaropener");
let sidebarOpenerArrow = document.getElementById("sidebaropenerarrow");
let sidebarCloserMobile = document.getElementById("sidebarcloser_mobile");
let mainBody = document.getElementById("main-body");
let tabs = document.getElementsByClassName("tab");
let fields = document.getElementsByClassName("field");
let subjects = document.getElementsByClassName("subject");

// get the path
let mainFolder = "";
let fullpath = window.location.pathname;
let depth = Array.from(fullpath.slice(fullpath.indexOf("QuestionsGenerator")).matchAll("/")).length - 1;
for(index = 0; index < depth; index++) {
    mainFolder += "../";
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
    sidebar.classList.add("sidebarisopen");
    sidebarOpener.classList.add("sidebarisopen");
    mainBody.classList.add("sidebarisopen")
    sidebarOpenerArrow.style = "transform: rotate(90deg);";
    
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
        arrow.style = "transform: rotate(0deg);";
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



// search bar functions
function getSuggestions(inputValue) {
    let suggestions = [];
    if(inputValue.length != 0) {
        let numberOfSuggestions = 0;
        let suggestionsStr = [];
        for(let index = 0; index < subjects.length; index++) { // find results with matching start
            if(numberOfSuggestions == 5) {
                break;
            }
            if(subjects[index].dataset.subject.includes(inputValue) && subjects[index].dataset.subject.startsWith(inputValue)) {
                suggestions.push(subjects[index]);
                suggestionsStr.push(subjects[index].innerText.toLowerCase());
                numberOfSuggestions++;
            }
        }
        for(let index = 0; index < subjects.length; index++) { // other results
            if(numberOfSuggestions == 5) {
                break;
            }
            if(subjects[index].dataset.subject.includes(inputValue) && !(suggestionsStr.includes(subjects[index].dataset.subject))) {
                suggestions.push(subjects[index]);
                numberOfSuggestions++;
            }
        }
    }
    return suggestions;
}
let roundedBorder = "border-bottom-left-radius: 21.6px; border-bottom-right-radius: 21.6px;";
let notRoundedBorder = "border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;";
function showSuggestions(event) {
    inputValue = searchbarInputField.value.toLowerCase();
    let suggestions = getSuggestions(inputValue);
    if(inputValue.length == 0) {
        clearSuggestions();
        return;
    }
    else {
        let numberOfSuggestions = 0;
        suggestionsBox.innerHTML = "";
        for(let index = 0; index < suggestions.length; index++) {
            suggestionsBox.innerHTML += `<div class="suggestion"><a class="suggestion-link" href="${mainFolder}subjects/${suggestions[index].dataset.field}/${suggestions[index].dataset.tab}.html">${capitalizeFirstLetter(suggestions[index].dataset.subject)}</a></div>`;
        }
        if(suggestions.length == 0) {
            suggestionsBox.innerHTML += `<div class="suggestion"><a class="suggestion-link" style="cursor: default">Page not found</a></div>`;
        }
        suggestions = document.getElementsByClassName("suggestion");
        searchbar.style = notRoundedBorder;
        searchbarCloser.style = "display: flex;";
        suggestions[suggestions.length-1].style = roundedBorder
        document.getElementsByClassName("suggestion-link")[suggestions.length-1].style = roundedBorder;
        if(event.key == "Enter") {
            search();
        }
    }
}
function clearSuggestions() {
    suggestionsBox.innerHTML = "";
    searchbar.style = roundedBorder;
    searchbarCloser.style = "display: none;";
    searchbarInputField.value = "";
}
function search() {
    let inputValue = searchbarInputField.value;
    let suggestions = getSuggestions(inputValue);
    if(inputValue != "") {
        window.open("miscpages/searchresults.html", "_self");
    }
}

// open and close sidebar function
function openCloseSidebar() {
    sidebar.classList.toggle("sidebarisopen");
    sidebar.style = "transition: left 0.4s;";
    sidebarOpener.classList.toggle("sidebarisopen");
    sidebarOpener.style = "transition: left 0.4s;";
    mainBody.classList.toggle("sidebarisopen");

    if(localStorage.getItem("sidebarIsOpen") == "true") {
        sidebarOpenerArrow.style = "transform: rotate(-90deg);";
        mainBody.style = "animation-name: close";
        if(window.innerWidth <= 720) {
            sidebarCloserMobile.style.display = "none";
        }
    }
    else {
        sidebarOpenerArrow.style = "transform: rotate(90deg);";
        mainBody.style = "animation-name: open";
        if(window.innerWidth <= 720) {
            sidebarCloserMobile.style.display = "block";
        }
    }

    localStorage.setItem("sidebarIsOpen", sidebar.classList.contains("sidebarisopen"));
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
        arrow.style = "transform: rotate(-90deg);";
        localStorage.setItem(`field${field.dataset.field}IsOpen`, false);
    }
    else {
        for(let index = 0; index < fieldSubjects.length; index++) {
            fieldSubjects[index].style.display = "flex";
        }
        arrow.style = "transform: rotate(0deg);";
        localStorage.setItem(`field${field.dataset.field}IsOpen`, true);
    }
}

searchbarInputField.addEventListener("keyup", showSuggestions, false)