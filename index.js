const Prompt = require('./lib/ui/prompt');
const Employee = require('./lib/models/employee');
const Role = require('./lib/models/role');
const Department = require('./lib/models/department');

const asTable = require ('as-table').configure ({ delimiter: '  ' });

const mainMenu = [
    {
        question: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View Employees By Manager",
            "View Employees By Department",
            "Delete Employee",
            "View All Roles",
            "Add Role",
            "Delete Role",
            "View All Departments",
            "Add Department",
            "Delete Department",
            "View Utilized Budget of a department",
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
    let employeeId = await employee.getId(employeeName[0], employeeName[1]);
    let updateRoleId = await role.getId("title", answers.choice1);
    
    // employee.updateEmployeeRole(employeeId, updateRoleId);
    employee.updateById(employeeId, "role_id", updateRoleId);
}

async function handleUpdateEmployeeManager() {
    const menu = new Prompt();
    const employee = new Employee();

    // setup prompt for update employee manager
    const updateEmployeeManagerQuestions = [
        {
            question: "Which employee would you like to update the manager?",
            choices: []
        },
        {
            question: "Who is the new manager?",
            choices: []
        }
    ];
    updateEmployeeManagerQuestions[0].choices = await employee.getEmployees();
    updateEmployeeManagerQuestions[1].choices = await employee.getManagers();
    updateEmployeeManagerQuestions[1].choices.push("None"); // for no manager
    menu.setMultipleChoiceQuestions(updateEmployeeManagerQuestions);

    // show prompt
    let answers = await menu.show();

    // update employee manager to db
    let employeeName = answers.choice0.split(" ");
    let employeeId = await employee.getId(employeeName[0], employeeName[1]);
    var managerId = null;
    if (answers.choice1 === "None") {
        employee.updateById(employeeId, "manager_id", null);
    } else {
        // get manager id
        let managerName = answers.choice1.split(" ");
        managerId = await employee.getId(managerName[0], managerName[1]);
        employee.updateById(employeeId, "manager_id", managerId);
    };  
};
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

async function handleDeleteDepartment() {
    const department = new Department();
    const menu = new Prompt();

    // setup prompt for delete department
    const deleteDepartmentQuestions = [
        {
            question: "Which department would you like to delete?",
            choices: []
        }
    ]
    deleteDepartmentQuestions[0].choices = await department.getDepartments();
    menu.setMultipleChoiceQuestions(deleteDepartmentQuestions);

    // show prompt
    let answers = await menu.show();

    // delete department
    department.delete(answers.choice0);
}

async function handleDeleteRole() {
    const role = new Role();
    const menu = new Prompt();

    // setup prompt for delete role
    const deleteRoleQuestions = [
        {
            question: "Which role would you like to delete?",
            choices: []
        }
    ]
    deleteRoleQuestions[0].choices = await role.getRoles();
    menu.setMultipleChoiceQuestions(deleteRoleQuestions);
    
    // show prompt
    let answers = await menu.show();

    // delete role
    role.delete(answers.choice0);
}

async function handleDeleteEmployee() {
    const employee = new Employee();
    const menu = new Prompt();

    // setup prompt for delete role
    const deleteEmployeeQuestions = [
        {
            question: "Which employee would you like to delete?",
            choices: []
        }
    ]
    deleteEmployeeQuestions[0].choices = await employee.getEmployees();
    menu.setMultipleChoiceQuestions(deleteEmployeeQuestions);
    
    // show prompt
    let answers = await menu.show();

    // delete employee
    let employeeName = answers.choice0.split(" ");
    employee.delete(employeeName[0], employeeName[1]);
}
async function handleViewAllEmployees() {
    const employee = new Employee();
    console.log(asTable(await employee.viewAll()));
}

async function handleViewEmployeesByManager() {
    const employee = new Employee();
    const menu = new Prompt();

    // setup prompt for view all employees by manager
    const viewAllEmployeesByManagerQuestions = [
        {
            question: "Which manager's employees?",
            choices: []
        }
    ];
    viewAllEmployeesByManagerQuestions[0].choices = await employee.getManagers();
    menu.setMultipleChoiceQuestions(viewAllEmployeesByManagerQuestions);

    // show prompt
    let answers = await menu.show();

    // show all employees by manager
    let managerName = answers.choice0.split(" ");
    let managerId = await employee.getId(managerName[0], managerName[1]);
    console.log(asTable(await employee.viewByColumn("emp.manager_id", managerId)));
};
async function handleViewEmployeesByDepartment() {
    const employee = new Employee();
    const department = new Department();
    const menu = new Prompt();

    // setup prompt for view all employees by department
    const viewEmployeesByDepartmentQuestions = [
        {
            question: "Which department's employees?",
            choices: []
        }
    ];
    viewEmployeesByDepartmentQuestions[0].choices = await department.getDepartments();
    menu.setMultipleChoiceQuestions(viewEmployeesByDepartmentQuestions);

    // show prompt
    let answers = await menu.show();

    // show all employees by department
    let departmentId = await department.getId("name", answers.choice0);
    console.log(asTable(await employee.viewByColumn("department.id", departmentId)));
}
async function handleViewAllRoles() {
    const role = new Role();
    console.log(asTable(await role.viewAll()));
}
async function handleViewAllDepartments() {
    const department = new Department();
    console.log(asTable(await department.viewAll()));
}

async function handleViewUtilizedBudget() {
    const department = new Department();
    const menu = new Prompt();

    // setup prompt for view utilized budget
    const utilizedBudgetQuestions = [
        {
            question: "Which department's utilized budget?",
            choices: []
        }
    ]

    utilizedBudgetQuestions[0].choices = await department.getDepartments();
    menu.setMultipleChoiceQuestions(utilizedBudgetQuestions);

    // show prompt
    let answers = await menu.show();

    // show utilized budget
    console.log(asTable(await department.getTotalUtilizedBudget(answers.choice0)));
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
            case "Update Employee Manager":
                await handleUpdateEmployeeManager();
                break;
            case "View Employees By Department":
                await handleViewEmployeesByDepartment();
                break;
            case "Delete Employee":
                await handleDeleteEmployee();
            case "View All Roles":
                await handleViewAllRoles();
                break;
            case "Add Role":
                await handleAddRole();
                break;
            case "Delete Role":
                await handleDeleteRole();
                break;
            case "View All Departments":
                await handleViewAllDepartments();
                break;
            case "Add Department":
                await handleAddDepartment();
                break;
            case "Delete Department":
                await handleDeleteDepartment();
                break;
            case "View All Employees":
                await handleViewAllEmployees();
                break;
            case "View Employees By Manager":
                await handleViewEmployeesByManager();
                break;
            case "View Utilized Budget of a department":
                await handleViewUtilizedBudget();
                break;
            default:
                isFinished = true;
                break;
        };
    };

};

init();