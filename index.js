const Prompt = require('./lib/ui/prompt');

const mainMenu = [
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
];

const addEmployeeNameQuestions = [
    "What is the employee's first name?",
    "What is the employee's last name?"
]

const addRoleQuestions = [
    "What is the name of the role?",
    "What is the salary of the role?"
];

const addDepartmentQuestion = [
    "What is the name of the department?"
]

const init = async () => {
    
    var menu = new Prompt();
    var isFinished = false;

    
    // loop for main menu
    while (!isFinished) {
        // reset questions
        menu.resetQuestions();
        // setup prompt for main menu
        menu.setMultipleChoiceQuestions(mainMenu);

        await menu.show()
        .then( async (answers) => {
            console.log(answers);
            switch (answers.choice0) {
                case "Add Employee":
                    menu.resetQuestions();
                    // setup prompt for adding employee
                    menu.setInputQuestions(addEmployeeNameQuestions);
                    console.log(menu.questions);

                    // show prompt for adding employee
                    await menu.show()
                    .then((answers) => {
                        console.log(answers);
                    })

                    break;
                case "Update Employee Role":
                    menu.resetQuestions();
                    // setup prompt for updating role

                    break;
                case "View All Roles":
                    
                    break;
                case "Add Role":
                    menu.resetQuestions();
                    // setup prompt for adding role
                    menu.setInputQuestions(addRoleQuestions);

                    // show prompt for adding role
                    await menu.show()
                    .then((answers) => {
                        console.log(answers);
                    })
                    break;
                case "View All Departments":
                    break;
                case "Add Department":
                    menu.resetQuestions();
                    // setup prompt for adding department
                    menu.setInputQuestions(addDepartmentQuestion);

                    // show prompt for adding department
                    await menu.show()
                    .then((answers) => {
                        console.log(answers);
                    })
                    break;
                case "View All Employees":
                    break;
                default:
                    isFinished = true;
                    break;
            }
        });
    };

};

init();