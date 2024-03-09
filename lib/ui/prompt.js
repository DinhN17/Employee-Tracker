const inquirer = require('inquirer');

class Prompt {
    constructor() {
        this.questions = [];
    }

    // Multiple choice questions is an array of objects which is {question, choices}
    setMultipleChoiceQuestions(questions) {
        for (let index = 0; index < questions.length; index++) {
            const element = questions[index];
            this.questions.push(
                {
                    type: "list",
                    name: `choice${index}`,
                    message: element.question,
                    choices: element.choices
                }
            );
        }
    }

    // Input questions is an array of questions which is a string
    setInputQuestions(questions) {
        for (let index = 0; index < questions.length; index++) {
            const element = questions[index];
            this.questions.push(
                {
                    type: "input",
                    name: `input${index}`,
                    message: element
                }
            );
        }
    }

    resetQuestions() {
        this.questions = [];
    }
    show() {
        return inquirer.prompt(this.questions);
    }
}

module.exports = Prompt;