let translateTexts = document.getElementsByClassName("translate_text");
let translateTextsMisc = document.getElementsByClassName("translate_text_misc");
const english = ["Welcome to Sets!"];
const englishMisc = [];
const portuguese = ["Bem-vindo a Conjuntos!"];
const portugueseMisc = [];
let languageSets = english;
let miscLanguageSets = englishMisc;

changeLanguageSets(localStorage.getItem("language"));

// change language
function changeLanguageSets(languageName) {
    if(languageName == "english") {
        languageSets = english;
        miscLanguageSets = englishMisc;
        localStorage.setItem("language", "english");
    }
    if(languageName == "portuguese") {
        languageSets = portuguese;
        miscLanguageSets = portugueseMisc;
        localStorage.setItem("language", "portuguese");
    }
    for(let index = 0; index < languageSets.length; index++) {
        translateTexts[index].innerHTML = languageSets[index];
    }
    for(let index = 0; index < miscLanguageSets.length; index++) {
        if(translateTextsMisc[index].dataset.translate_text_fixed_misc == "placeholder") {
            translateTextsMisc[index].placeholder = miscLanguageSets[index];
        }
    }
}
function changeLanguageSetsEvent(event) {
    changeLanguageSets(this.dataset.language);
}

for(let index = 0; index < languages.length; index++) {
    languages[index].addEventListener("click", changeLanguageSetsEvent, false);
}
