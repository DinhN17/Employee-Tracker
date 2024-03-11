const Prompt = require('./lib/ui/prompt');
const Employee = require('./lib/models/employee');
const Role = require('./lib/models/role');
const Department = require('./lib/models/department');

const asTable = require ('as-table').configure ({ delimiter: '  ' });

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

async function handleUpdateEmployeeRole() {
    const menu = new Prompt();
    const employee = new Employee();
    const role = new Role();

    // setup prompt for update employee role
    const updateEmployeeRoleQuestions = [
        {
            question: "Which employee would you like to update the role?",
            choices: []
        },
        {
            question: "What is the new role?",
            choices: []
        }
    ];
    updateEmployeeRoleQuestions[0].choices = await employee.getEmployees();
    updateEmployeeRoleQuestions[1].choices = await role.getRoles();
    menu.setMultipleChoiceQuestions(updateEmployeeRoleQuestions);
    
    // show prompt
    answers = await menu.show();
    
    // update employee role to db
    let employeeName = answers.choice0.split(" ");
    // console.log(employeeName);
    let employeeId = await employee.getId(employeeName[0], employeeName[1]);
    let updateRoleId = await role.getId("title", answers.choice1);
    employee.updateEmployeeRole(employeeId, updateRoleId);
}
async function handleAddEmployee() {
    const menu = new Prompt();
    const employee = new Employee();
    const role = new Role();
    
    // setup prompt for adding employee
    const addEmployeeNameInputQuestions = [
        "What is the employee's first name?",
        "What is the employee's last name?"
    ];
    
    const addEmployeeNameChoiceQuestions = [
        {
            question: "What is the employee's role?",
            choices: []
        },
        {
            question: "What is the employee's manager?",
            choices: ["None"]
        }
    ];
    menu.setInputQuestions(addEmployeeNameInputQuestions);

    addEmployeeNameChoiceQuestions[0].choices = await role.getRoles();

    const managerList = await employee.getManagers();
    addEmployeeNameChoiceQuestions[1].choices = addEmployeeNameChoiceQuestions[1].choices.concat(managerList);
    menu.setMultipleChoiceQuestions(addEmployeeNameChoiceQuestions);

    // show prompt for adding employee
    answers = await menu.show();
    let roleId = await role.getId("title", answers.choice0);
    if (answers.choice1 === "None") {
        employee.addEmployee(answers.input0, answers.input1, roleId, null);                    
    } else {
        // get manager id
        let managerName = answers.choice1.split(" ");
        let managerId = await employee.getId(managerName[0], managerName[1]);
        employee.addEmployee(answers.input0, answers.input1, roleId, managerId);                    
    };
}
async function handleAddRole() {
    const role = new Role();
    const department = new Department();
    const menu = new Prompt();
    
    // setup prompt for adding role
    const addRoleInputQuestions = [
        "What is the name of the role?",
        "What is the salary of the role?"
    ];
    
    const addRoleChoiceQuestions = [
        {
            question: "What is the department of the role?",
            choices: []
        }
    ];
    menu.setInputQuestions(addRoleInputQuestions);
    addRoleChoiceQuestions[0].choices = await department.getDepartments();
    menu.setMultipleChoiceQuestions(addRoleChoiceQuestions);

    // show prompt for adding role
    answers = await menu.show();
    // console.log(answers);
    let departmentId = await department.getId("name", answers.choice0);
    // console.log(departmentId);
    role.addRole(answers.input0, answers.input1, departmentId);
}
async function handleAddDepartment() {
    const department = new Department();
    const menu = new Prompt();
    // menu.resetQuestions();
                
    // setup prompt for adding department
    const addDepartmentQuestion = [
        "What is the name of the department?"
    ];
    menu.setInputQuestions(addDepartmentQuestion);

    // show prompt for adding department
    answers = await menu.show();
    department.addDepartment(answers.input0);
}
async function handleViewAllEmployees() {
    const employee = new Employee();
    console.log(asTable(await employee.viewAll()));
}
async function handleViewAllRoles() {
    const role = new Role();
    console.log(asTable(await role.viewAll()));
}
async function handleViewAllDepartments() {
    const department = new Department();
    console.log(asTable(await department.viewAll()));
}

const init = async () => {
    
    const menu = new Prompt();
    // var role = new Role();
    // var department = new Department();
    // var employee = new Employee();

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
                await handleAddEmployee();
                break;
            case "Update Employee Role":
                await handleUpdateEmployeeRole();
                break;
            case "View All Roles":
                await handleViewAllRoles();
                break;
            case "Add Role":
                await handleAddRole();
                break;
            case "View All Departments":
                await handleViewAllDepartments();
                break;
            case "Add Department":
                await handleAddDepartment();
                break;
            case "View All Employees":
                await handleViewAllEmployees();
                break;
            default:
                isFinished = true;
                break;
        };
    };

};

init();