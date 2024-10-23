let suggestionsBox = document.getElementById("searchbarsuggestions");
let searchbar = document.getElementById("searchbar");
let searchbarInputField = document.getElementById("searchbarinputfield");
let searchbarCloser = document.getElementById("searchbarcloser");
let sidebar = document.getElementById("sidebar");
let sidebarOpener = document.getElementById("sidebaropener");
let sidebarOpenerArrow = document.getElementById("sidebaropenerarrow");
let sidebarCloserMobile = document.getElementById("sidebarcloser_mobile");
let mainBody = document.getElementById("main-body");
let searchinput = document.getElementById("searchinput");
let searchresults = document.getElementById("searchresults");
let tabs = document.getElementsByClassName("tab");
let fields = document.getElementsByClassName("field");
let subjects = document.getElementsByClassName("subject");

// get the path
let mainFolder = "";
let fullpath = window.location.pathname;
let depth = Array.from(fullpath.slice(fullpath.indexOf("Questions-Generator")).matchAll("/")).length - 1;
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

// set search results
if(currentTab == "searchresults") {
    searchresults.innerHTML = "";
    searchinput.innerHTML += localStorage.getItem("searchInput");
    for(let index = 0; index < localStorage.getItem("searchResultsLength"); index++) {
        let result = subjects[localStorage.getItem(`searchResult${index}`)]
        searchresults.innerHTML += `<div class="searchresult"><a href="${mainFolder}subjects/${result.dataset.field}/${result.dataset.tab}.html">${capitalizeFirstLetter(result.dataset.subject)}</a></div>`
    }
}

// remember stuff that were done in other tabs
if(localStorage.getItem("sidebarIsOpen") == "true") {
    sidebar.classList.add("sidebarisopen");
    sidebarOpener.classList.add("sidebarisopen");
    sidebarOpenerArrow.style = "transform: rotate(90deg);";
    
    if(window.innerWidth <= 768) {
        sidebarCloserMobile.style.display = "block";
    }
    else {
        mainBody.classList.add("sidebarisopen");
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
    let suggestionsStr = [];
    let suggestionsIndex = [];
    if(inputValue.length != 0) {
        let numberOfSuggestions = 0;
        for(let index = 0; index < subjects.length; index++) { // find results with matching start
            if(numberOfSuggestions == 5) {
                break;
            }
            if(subjects[index].dataset.subject.includes(inputValue) && subjects[index].dataset.subject.startsWith(inputValue)) {
                suggestions.push(subjects[index]);
                suggestionsStr.push(subjects[index].dataset.subject.toLowerCase());
                suggestionsIndex.push(index);
                numberOfSuggestions++;
            }
        }
        for(let index = 0; index < subjects.length; index++) { // other results
            if(numberOfSuggestions == 5) {
                break;
            }
            if(subjects[index].dataset.subject.includes(inputValue) && !(suggestionsStr.includes(subjects[index].dataset.subject))) {
                suggestions.push(subjects[index]);
                suggestionsIndex.push(index);
                numberOfSuggestions++;
            }
        }
    }
    return [suggestions, suggestionsIndex];
}
let roundedBorder = "border-bottom-left-radius: 21.6px; border-bottom-right-radius: 21.6px;";
let notRoundedBorder = "border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;";
function showSuggestions(event) {
    inputValue = searchbarInputField.value.toLowerCase();
    let suggestions = getSuggestions(inputValue)[0];
    if(inputValue.length == 0) {
        clearSuggestions();
        return;
    }
    else {
        let numberOfSuggestions = 0;
        suggestionsBox.innerHTML = "";
        for(let index = 0; index < suggestions.length; index++) {
            let suggestion = suggestions[index];
            suggestionsBox.innerHTML += `<div class="suggestion"><a class="suggestion-link" href="${mainFolder}subjects/${suggestion.dataset.field}/${suggestion.dataset.tab}.html">${capitalizeFirstLetter(suggestion.dataset.subject)}</a></div>`;
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
    let suggestionsIndex = getSuggestions(inputValue)[1];
    if(inputValue != "") {
        for(let index = 0; index < suggestionsIndex.length; index++) {
            localStorage.setItem(`searchResult${index}`, suggestionsIndex[index]);
        }
        localStorage.setItem("searchResultsLength", suggestionsIndex.length);
        localStorage.setItem("searchInput", inputValue)
        window.open(mainFolder + "miscpages/searchresults.html", "_self");
    }
}

// open and close sidebar function
function openCloseSidebar() {
    sidebar.classList.toggle("sidebarisopen");
    sidebar.style = "transition: left 0.4s;";
    sidebarOpener.classList.toggle("sidebarisopen");
    sidebarOpener.style = "transition: left 0.4s;";

    if(localStorage.getItem("sidebarIsOpen") == "true") {
        sidebarOpenerArrow.style = "transform: rotate(-90deg);";
        if(window.innerWidth <= 768) {
            sidebarCloserMobile.style.display = "none";
        }
        else {
            mainBody.classList.toggle("sidebarisopen");
            mainBody.style = "animation-name: close";
        }
    }
    else {
        sidebarOpenerArrow.style = "transform: rotate(90deg);";
        if(window.innerWidth <= 768) {
            sidebarCloserMobile.style.display = "block";
        }
        else {
            mainBody.classList.toggle("sidebarisopen");
            mainBody.style = "animation-name: open";
        }
    }

    localStorage.setItem("sidebarIsOpen", sidebar.classList.contains("sidebarisopen"));
}

// open and close fields function
function openCloseFields(event) {
    let field = this;
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
for(let index = 0; index < fields.length; index++) {
    fields[index].addEventListener("click", openCloseFields, false)
}