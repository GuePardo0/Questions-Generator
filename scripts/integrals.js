let translateTexts = document.getElementsByClassName("translate_text");
let translateTextsMisc = document.getElementsByClassName("translate_text_misc");
const english = ["Welcome to Integrals!"];
const englishMisc = [];
const portuguese = ["Bem-vindo a Integrais!"];
const portugueseMisc = [];
let languageIntegrals = english;
let miscLanguageIntegrals = englishMisc;

changeLanguageIntegrals(localStorage.getItem("language"));

// change language
function changeLanguageIntegrals(languageName) {
    if(languageName == "english") {
        languageIntegrals = english;
        miscLanguageIntegrals = englishMisc;
        localStorage.setItem("language", "english");
    }
    if(languageName == "portuguese") {
        languageIntegrals = portuguese;
        miscLanguageIntegrals = portugueseMisc;
        localStorage.setItem("language", "portuguese");
    }
    for(let index = 0; index < languageIntegrals.length; index++) {
        translateTexts[index].innerHTML = languageIntegrals[index];
    }
    for(let index = 0; index < miscLanguageIntegrals.length; index++) {
        if(translateTextsMisc[index].dataset.translate_text_fixed_misc == "placeholder") {
            translateTextsMisc[index].placeholder = miscLanguageIntegrals[index];
        }
    }
}
function changeLanguageIntegralsEvent(event) {
    changeLanguageIntegrals(this.dataset.language);
}

for(let index = 0; index < languages.length; index++) {
    languages[index].addEventListener("click", changeLanguageIntegralsEvent, false);
}
