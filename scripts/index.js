let translateTexts = document.getElementsByClassName("translate_text");
let translateTextsMisc = document.getElementsByClassName("translate_text_misc");
const english = ["Welcome to Questions Generator!", "In here you can generate questions about various fields of study to test your skills."];
const englishMisc = [];
const portuguese = ["Bem-vindo ao Gerador de Questões!", "Aqui você pode gerar questões sobre diversas áreas do conhecimento para testar suas habilidades."];
const portugueseMisc = [];
let languageIndex = english;
let miscLanguageIndex = englishMisc;

changeLanguageIndex(localStorage.getItem("language"));

// change language
function changeLanguageIndex(languageName) {
    if(languageName == "english") {
        languageIndex = english;
        miscLanguageIndex = englishMisc;
        localStorage.setItem("language", "english");
    }
    if(languageName == "portuguese") {
        languageIndex = portuguese;
        miscLanguageIndex = portugueseMisc;
        localStorage.setItem("language", "portuguese");
    }
    for(let index = 0; index < languageIndex.length; index++) {
        translateTexts[index].innerHTML = languageIndex[index];
    }
    for(let index = 0; index < miscLanguageIndex.length; index++) {
        if(translateTextsMisc[index].dataset.translate_text_fixed_misc == "placeholder") {
            translateTextsMisc[index].placeholder = miscLanguageIndex[index];
        }
    }
}
function changeLanguageIndexEvent(event) {
    changeLanguageIndex(this.dataset.language);
}

for(let index = 0; index < languages.length; index++) {
    languages[index].addEventListener("click", changeLanguageIndexEvent, false);
}
