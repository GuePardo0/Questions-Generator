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
let popups = document.getElementById("popups");
let optionsButton = document.getElementById("optionsbutton");
let optionsPopup = document.getElementById("optionspopup");
let languageButton = document.getElementById("languagebutton");
let languagePopup = document.getElementById("languagepopup");
let popupCloser = document.getElementById("popupcloser");
let tabs = document.getElementsByClassName("tab");
let fields = document.getElementsByClassName("field");
let subFields = document.getElementsByClassName("subfield");
let subjects = document.getElementsByClassName("subject");
let languages = document.getElementsByClassName("languagechangebutton");
let texts = document.getElementsByClassName("text");
let miscTexts = document.getElementsByClassName("misctext");
const english = ["Welcome to Questions Generator!", "In here you can generate questions about various fields of study to test your skills.", "Language"];
const miscEnglish = ["Search..."];
const portuguese = ["Bem-vindo ao Gerador de Questões!", "Aqui você pode gerar questões sobre diversas áreas do conhecimento para testar suas habilidades.", "Idioma"];
const miscPortuguese = ["Pesquisar..."];
let language = english;
let miscLanguage = miscEnglish;

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
        searchresults.innerHTML += `<div class="searchresult"><a href="${result.dataset.url}">${capitalizeFirstLetter(result.dataset.subject)}</a></div>`
    }
}

// remember stuff that were done in other tabs
if(localStorage.getItem("sidebarIsOpen") == "true") {
    sidebar.classList.add("sidebarisopen");
    sidebarOpener.classList.add("sidebarisopen");
    sidebarOpenerArrow.style.transform = "rotate(90deg)";
    
    if(window.innerWidth <= 768) {
        sidebarCloserMobile.style.display = "block";
    }
    else {
        mainBody.classList.add("sidebarisopen");
        popups.classList.add("sidebarisopen");
    }
}
for(let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
    let field = fields[fieldIndex];
    let arrow = document.getElementById(field.dataset.field+"_arrow");
    let fieldSubfields = getFieldSubfields(field);

    if(localStorage.getItem(`field${field.dataset.field}IsOpen`) == "true") {
        for(let index = 0; index < fieldSubfields.length; index++) {
            fieldSubfields[index].style.display = "flex";
        }
        arrow.style.transform = "rotate(0deg)";
    }
}
changeLanguage(localStorage.getItem("language"));

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
function getFieldSubfields(parentField) {
    let fieldSubfields = [];
    for(let index = 0; index < subjects.length; index++) {
        if(subjects[index].dataset.parentfield == parentField.dataset.field) {
            fieldSubfields.push(subjects[index]);
        }
    }
    for(let index = 0; index < subFields.length; index++) {
        if(subFields[index].dataset.parentfield == parentField.dataset.field) {
            fieldSubfields.push(subFields[index]);
        }
    }
    return fieldSubfields;
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
            suggestionsBox.innerHTML += `<div class="suggestion"><a class="suggestion-link" href="${suggestion.dataset.url}">${capitalizeFirstLetter(suggestion.dataset.subject)}</a></div>`;
        }
        if(suggestions.length == 0) {
            suggestionsBox.innerHTML += `<div class="suggestion"><a class="suggestion-link" style="cursor: default">Page not found</a></div>`;
        }
        suggestions = document.getElementsByClassName("suggestion");
        searchbar.style = notRoundedBorder;
        searchbarCloser.style.display = "flex";
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
    searchbarCloser.style.display = "none";
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
    sidebar.style.transition = "left 0.4s";
    sidebarOpener.classList.toggle("sidebarisopen");
    sidebarOpener.style.transition = "left 0.4s";

    if(localStorage.getItem("sidebarIsOpen") == "true") {
        sidebarOpenerArrow.style.transform = "rotate(-90deg)";
        if(window.innerWidth <= 768) {
            sidebarCloserMobile.style.display = "none";
        }
        else {
            mainBody.classList.toggle("sidebarisopen");
            mainBody.style.animationName = "close";
            popups.classList.toggle("sidebarisopen");
            popups.style.animationName = "closepopup";
            setTimeout(() => {
                popups.style.animationName = "";
            }, 400);
        }
    }
    else {
        sidebarOpenerArrow.style.transform = "rotate(90deg)";
        if(window.innerWidth <= 768) {
            sidebarCloserMobile.style.display = "block";
        }
        else {
            mainBody.classList.toggle("sidebarisopen");
            mainBody.style.animationName = "open";
            popups.classList.toggle("sidebarisopen");
            popups.style.animationName = "openpopup";
            setTimeout(() => {
                popups.style.animationName = "";
            }, 400);
        }
    }

    localStorage.setItem("sidebarIsOpen", sidebar.classList.contains("sidebarisopen"));
}

// open and close fields function
function openCloseFields(event) {
    if(this != window) {
        let field = this;
        let fieldSubfields = getFieldSubfields(field);
        let arrow = document.getElementById(field.dataset.field+"_arrow");

        if(localStorage.getItem(`field${field.dataset.field}IsOpen`) == "true") {
            for(let index = 0; index < fieldSubfields.length; index++) {
                fieldSubfields[index].style.display = "none";
            }
            arrow.style.transform = "rotate(-90deg)";
            localStorage.setItem(`field${field.dataset.field}IsOpen`, false);
        }
        else {
            for(let index = 0; index < fieldSubfields.length; index++) {
                fieldSubfields[index].style.display = "flex";
            }
            arrow.style.transform = "rotate(0deg)";
            localStorage.setItem(`field${field.dataset.field}IsOpen`, true);
        }
    }
}

// body buttons
function openOptions(event) {
    popups.style.display = "flex";
    optionsPopup.style.display = "flex";
    popupCloser.style.display = "flex";
}
function openLanguage(event) {
    popups.style.display = "flex";
    languagePopup.style.display = "flex";
    popupCloser.style.display = "flex";
}
function closePopup(event) {
    popups.style.display = "none";
    optionsPopup.style.display = "none";
    languagePopup.style.display = "none";
    popupCloser.style.display = "none";
}

// change language
function changeLanguage(languageName) {
    if(languageName == "english") {
        language = english;
        miscLanguage = miscEnglish;
        localStorage.setItem("language", "english");
    }
    if(languageName == "portuguese") {
        language = portuguese;
        miscLanguage = miscPortuguese;
        localStorage.setItem("language", "portuguese");
    }
    for(let index = 0; index < languages.length; index++) {
        for(let j = 0; j < texts.length; j++) {
            if(texts[j].dataset.textindex == `${index}`) {
                texts[j].innerHTML = language[index];
                break;
            }
        }
    }
    for(let index = 0; index < languages.length; index++) {
        for(let j = 0; j < miscTexts.length; j++) {
            if(miscTexts[j].dataset.textindex == `${index}`) {
                if(miscTexts[j].dataset.misctext == "placeholder") {
                    miscTexts[j].placeholder = miscLanguage[index];
                }
                break;
            }
        }
    }
}
function changeLanguageEvent(event) {
    changeLanguage(this.dataset.language);
}

searchbarInputField.addEventListener("keyup", showSuggestions, false)
for(let index = 0; index < fields.length; index++) {
    fields[index].addEventListener("click", openCloseFields, false);
}
for(let index = 0; index < languages.length; index++) {
    languages[index].addEventListener("click", changeLanguageEvent, false);
}
optionsButton.addEventListener("click", openOptions, false);
languageButton.addEventListener("click", openLanguage, false);
popupCloser.addEventListener("click", closePopup, false);