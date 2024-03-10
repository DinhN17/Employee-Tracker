const Prompt = require('./lib/ui/prompt');
const Employee = require('./lib/models/employee');
const Role = require('./lib/models/role');
const Department = require('./lib/models/department');

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

const addEmployeeNameInputQuestions = [
    "What is the employee's first name?",
    "What is the employee's last name?"
];

const addEmployeeNameChoiceQuestions = [
    {
        question: "What is the employee's role?",
        choices: []
    }
    // {
    //     question: "What is the employee's manager?",
    //     choices: []
    // }
];

const addRoleInputQuestions = [
    "What is the name of the role?",
    "What is the salary of the role?"
];

const addRoleChoiceQuestions = [
    {
        question: "What is the department of the role?",
        choices: []
    }
]

const addDepartmentQuestion = [
    "What is the name of the department?"
]

const init = async () => {
    
    var menu = new Prompt();
    var roles = new Role();
    var departments = new Department();
    var employees = new Employee();

    var isFinished = false;

    
    // loop for main menu
    while (!isFinished) {
        // reset questions
        menu.resetQuestions();
        // setup prompt for main menu
        menu.setMultipleChoiceQuestions(mainMenu);

        var answers = await menu.show();
        
        // console.log(answers);
        switch (answers.choice0) {
            case "Add Employee":
                menu.resetQuestions();
                // setup prompt for adding employee
                menu.setInputQuestions(addEmployeeNameInputQuestions);
                // console.log(await roles.getRoles());

                addEmployeeNameChoiceQuestions[0].choices = await roles.getRoles();
                console.log(addEmployeeNameChoiceQuestions);
                // addEmployeeNameChoiceQuestions[1].choices = employees.getManagers();
                menu.setMultipleChoiceQuestions(addEmployeeNameChoiceQuestions);

                // console.log(menu.questions);

                // show prompt for adding employee
                answers = await menu.show();
                console.log(answers);
                // .then((answers) => {
                //     console.log(answers);
                // })

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
                menu.setInputQuestions(addRoleInputQuestions);

                addRoleChoiceQuestions[0].choices = await departments.getDepartments();
                menu.setMultipleChoiceQuestions(addRoleChoiceQuestions);

                // show prompt for adding role
                answers = await menu.show();
                console.log(answers);
                break;
            case "View All Departments":
                break;
            case "Add Department":
                menu.resetQuestions();
                // setup prompt for adding department
                menu.setInputQuestions(addDepartmentQuestion);

                // show prompt for adding department
                answers = await menu.show();
                // console.log(answers);
                break;
            case "View All Employees":
                break;
            default:
                isFinished = true;
                break;
        };
    };

};

init();