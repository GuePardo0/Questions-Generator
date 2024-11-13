let translateTexts = document.getElementsByClassName("translate_text");
let translateTextsMisc = document.getElementsByClassName("translate_text_misc");
const english = ["Welcome to dDerivatives!"];
const englishMisc = [];
const portuguese = ["Bem-vindo a Derivadas!"];
const portugueseMisc = [];
let languageDerivatives = english;
let miscLanguageDerivatives = englishMisc;

changeLanguagedDerivatives(localStorage.getItem("language"));

// change language
function changeLanguagedDerivatives(languageName) {
    if(languageName == "english") {
        languageDerivatives = english;
        miscLanguageDerivatives = englishMisc;
        localStorage.setItem("language", "english");
    }
    if(languageName == "portuguese") {
        languageDerivatives = portuguese;
        miscLanguageDerivatives = portugueseMisc;
        localStorage.setItem("language", "portuguese");
    }
    for(let index = 0; index < languageDerivatives.length; index++) {
        translateTexts[index].innerHTML = languageDerivatives[index];
    }
    for(let index = 0; index < miscLanguageDerivatives.length; index++) {
        if(translateTextsMisc[index].dataset.translate_text_fixed_misc == "placeholder") {
            translateTextsMisc[index].placeholder = miscLanguageDerivatives[index];
        }
    }
}
function changeLanguagedDerivativesEvent(event) {
    changeLanguagedDerivatives(this.dataset.language);
}

for(let index = 0; index < languages.length; index++) {
    languages[index].addEventListener("click", changeLanguagedDerivativesEvent, false);
}
