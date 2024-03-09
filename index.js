const Prompt = require('./lib/ui/prompt');

function init() {
    
    const menu = new Prompt();
    
    menu.setMultipleChoiceQuestions([
        {
            question: "What would you like to do?",
            choices: [
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "View All Employees",
                "Quit"
            ]
        }
    ]);

    menu.show().then((answers) => {
        console.log(answers);
        switch (answers) {
            case "Add Employee":
                break;
            case "Update Employee Role":
                break;
            case "View All Roles":
                break;
            case "Add Role":
                break;
            case "View All Departments":
                break;
            case "Add Department":
                break;
            case "View All Employees":
                break;
            default:
                break;
        }
    })

};

init();