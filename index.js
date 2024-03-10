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

var addEmployeeNameChoiceQuestions = [
    {
        question: "What is the employee's role?",
        choices: []
    },
    {
        question: "What is the employee's manager?",
        choices: ["None"]
    }
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
    var role = new Role();
    var department = new Department();
    var employee = new Employee();

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

                addEmployeeNameChoiceQuestions[0].choices = await role.getRoles();
                // console.log(addEmployeeNameChoiceQuestions);
                const managerList = await employee.getManagers();
                console.log(managerList);
                addEmployeeNameChoiceQuestions[1].choices = addEmployeeNameChoiceQuestions[1].choices.concat(managerList);
                console.log(addEmployeeNameChoiceQuestions);
                menu.setMultipleChoiceQuestions(addEmployeeNameChoiceQuestions);

                // console.log(menu.questions);

                // show prompt for adding employee
                answers = await menu.show();
                console.log(answers);
                let roleId = await role.getId("title", answers.choice0);
                if (answers.choice1 === "None") {
                    employee.addEmployee(answers.input0, answers.input1, roleId, null);                    
                } else {
                    // get manager id
                    let managerName = answers.choice1.split(" ");
                    let managerId = await employee.getId(managerName[0], managerName[1]);
                    employee.addEmployee(answers.input0, answers.input1, roleId, managerId);                    
                }
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

                addRoleChoiceQuestions[0].choices = await department.getDepartments();
                menu.setMultipleChoiceQuestions(addRoleChoiceQuestions);

                // show prompt for adding role
                answers = await menu.show();
                // console.log(answers);
                let departmentId = await department.getId("name", answers.choice0);
                // console.log(departmentId);
                role.addRole(answers.input0, answers.input1, departmentId);
                break;
            case "View All Departments":
                break;
            case "Add Department":
                menu.resetQuestions();
                
                // setup prompt for adding department
                menu.setInputQuestions(addDepartmentQuestion);

                // show prompt for adding department
                answers = await menu.show();
                department.addDepartment(answers.input0);
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