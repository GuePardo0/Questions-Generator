let translateTexts = document.getElementsByClassName("translate_text");
let translateTextsMisc = document.getElementsByClassName("translate_text_misc");
const english = ["Welcome to Conics!"];
const englishMisc = [];
const portuguese = ["Bem-vindo a Cônicas!"];
const portugueseMisc = [];
let languageConics = english;
let miscLanguageConics = englishMisc;

changeLanguageConics(localStorage.getItem("language"));

// change language
function changeLanguageConics(languageName) {
    if(languageName == "english") {
        languageConics = english;
        miscLanguageConics = englishMisc;
        localStorage.setItem("language", "english");
    }
    if(languageName == "portuguese") {
        languageConics = portuguese;
        miscLanguageConics = portugueseMisc;
        localStorage.setItem("language", "portuguese");
    }
    for(let index = 0; index < languageConics.length; index++) {
        translateTexts[index].innerHTML = languageConics[index];
    }
    for(let index = 0; index < miscLanguageConics.length; index++) {
        if(translateTextsMisc[index].dataset.translate_text_fixed_misc == "placeholder") {
            translateTextsMisc[index].placeholder = miscLanguageConics[index];
        }
    }
}
function changeLanguageConicsEvent(event) {
    changeLanguageConics(this.dataset.language);
}

for(let index = 0; index < languages.length; index++) {
    languages[index].addEventListener("click", changeLanguageConicsEvent, false);
}
