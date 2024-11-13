let questionBox = document.getElementById("question_box");
let generateButton = document.getElementById("generate_button");
let translateTexts = document.getElementsByClassName("translate_text");
let translateTextsMisc = document.getElementsByClassName("translate_text_misc");
const english = ["Welcome to Addition!", "Click the button bellow to generate a question."];
const englishQuestions = ["Add:", "Calculate the answer to the following expression:"];
const englishMisc = [];
const portuguese = ["Bem-vindo a Adição!", "Clique no botão abaixo para gerar uma questão."];
const portugueseQuestions = ["Some:", "Calcule a resposta da seguinte expressão:"];
const portugueseMisc = [];
let languageAddition = english;
let languageQuestions = englishQuestions;
let miscLanguageAddition = englishMisc;

// remember stuff that were done before
changeLanguageAddition(localStorage.getItem("language"));

// main functions
function generateGoodNumbers(questionIndex) {
    let goodNumbers = []
    if(questionIndex == 0) {
        goodNumbers.push(getRandomInt(1, 5));
        goodNumbers.push(getRandomInt(1, 5));
    }
    if(questionIndex == 1) {
        goodNumbers.push(0);
        goodNumbers.push(0);
        while(true) {
            goodNumbers[0]=(getRandomInt(0, 9));
            goodNumbers[1]=(getRandomInt(0, 9));
            if(goodNumbers[0] + goodNumbers[1] != 0) {
                break;
            }
        }
    }
    if(questionIndex == 2) {
        goodNumbers.push(0);
        goodNumbers.push(0);
        while(true) {
            goodNumbers[0]=(getRandomInt(0, 999));
            goodNumbers[1]=(getRandomInt(0, 999));
            if(goodNumbers[0] + goodNumbers[1] != 0) {
                break;
            }
        }
    }
    return goodNumbers
}
function generateQuestions(questionIndex) {
    let goodNumbers = generateGoodNumbers(questionIndex);
    let question = "";
    if(questionIndex == 0) {
        question = `<p>${languageQuestions[0]}</p><p style="text-align: right;">${goodNumbers[0]}<br>+${goodNumbers[1]}</p>`;
    }
    if(questionIndex == 1) {
        question = `<p>${languageQuestions[1]}</p><p>${goodNumbers[0]}+${goodNumbers[1]}</p>`;
    }
    if(questionIndex == 2) {
        question = `<p>${languageQuestions[1]}</p><p>${goodNumbers[0]}+${goodNumbers[1]}</p>`;
    }
    questionBox.innerHTML = question;
}
function generateQuestionsEvent(event) {
    let questionIndex = getRandomInt(0, 2);
    console.log()
    generateQuestions(questionIndex);
}

// change language
function changeLanguageAddition(languageName) {
    if(languageName == "english") {
        languageAddition = english;
        languageQuestions = englishQuestions;
        miscLanguageAddition = englishMisc;
        localStorage.setItem("language", "english");
    }
    if(languageName == "portuguese") {
        languageAddition = portuguese;
        languageQuestions = portugueseQuestions;
        miscLanguageAddition = portugueseMisc;
        localStorage.setItem("language", "portuguese");
    }
    for(let index = 0; index < languageAddition.length; index++) {
        translateTexts[index].innerHTML = languageAddition[index];
    }
    for(let index = 0; index < miscLanguageAddition.length; index++) {
        if(translateTextsMisc[index].dataset.translate_text_fixed_misc == "placeholder") {
            translateTextsMisc[index].placeholder = miscLanguageAddition[index];
        }
    }
}
function changeLanguageAdditionEvent(event) {
    changeLanguageAddition(this.dataset.language);
}

for(let index = 0; index < languages.length; index++) {
    languages[index].addEventListener("click", changeLanguageAdditionEvent, false);
}

generateButton.addEventListener("click", generateQuestionsEvent, false);