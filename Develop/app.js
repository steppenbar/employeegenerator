const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "main.html");
const render = require("./lib/htmlRenderer");
const util = require("util");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const writeFileAsync = util.promisify(fs.writeFile);

const teamMembers = [];
const idArray = [];

function getTeamMembers() {
    // Prompt user for questions
    function getManager() {
        return inquirer.prompt([{
                // Prompt for manager name
                type: 'input',
                name: 'managerName',
                message: 'Enter the manager name'
            }, 
            {
                 // Prompt for manager id
                type: 'input',
                name: 'managerId',
                message: 'Enter manager Id'
            },
            {
                // Prompt for manager email
                type: 'input',
                name: 'managerEmail',
                message: 'Enter manager email'
            },
            {
                // Prompt for office number
                type: 'input',
                name: 'officeNumber',
                message: 'Enter office number'
            }
        ]).then(function (answers) {
            console.log("answers", answers);
            const manager = new Manager(
                this.managerName,
                this.managerId,
                this.managerEmail,
                this.officeNumber);
            teamMembers.push(answers.managerName);
            idArray.push(answers.managerId);
            console.log('Team Members: ' + teamMembers);
            console.log('Team Member ID: ' + idArray);
            //createTeam();
            promptNewMember();
        })
    }
    
    function promptNewMember() {
        return inquirer.prompt([{
            // Prompt for new team member
            type: 'confirm',
            name: 'choice',
            message: 'Would you like to enter a new team member?',
            default: true,
        }]).then(function (answers) {
            console.log(answers);
            //Only ask this info if the ans is YES 
            if (answers.choice) {
                //Prompt for TEAM  INFO
                promptNewMemberInfo();
            } else {
                //IF no exit the application 
                console.log('Good Bye!');
                process.exit();
            }
        })
      }
      
      function promptNewMemberInfo() {
        return inquirer.prompt([{
            // Prompt for role
            type: "checkbox",
            message: "What is the user role?",
            name: "role",
            choices: [
                "Engineer",
                "Intern",
            ],
 }]).then(function (userChoice) {
            // console.log(userChoice); 
            if (userChoice.role == "Engineer") {
                //CAll ADD ENGINEER CODE 
                inquirer.prompt([{
                        // Captures the Engineer name
                        type: 'input',
                        name: 'engineerName',
                        message: 'Enter the engineer name'
                    },
                    {
                        // Capture engineer id
                        type: 'input',
                        name: 'engineerId',
                        message: 'Enter engineer Id'
                     },
                    {
                        // Capture engineer email
                        type: 'input',
                        name: 'engineerEmail',
                        message: 'Enter engineer email'
                    },
                    {
                        // Capture github username
                        type: 'input',
                        name: 'github',
                        message: 'Enter github username'
                     }
                ]).then(function (engineerInfo) {
                    // console.log("engineerInfo", engineerInfo);
                    const engineer = new Engineer (
                        this.engineerName,
                        this.engineerId,
                        this.engineerEmail,
                        this.gitHub);
                    teamMembers.push(engineerInfo.engineerName);
                    idArray.push(engineerInfo.engineerId);
                    console.log('Engineer info: ' + teamMembers);
                    console.log('Engineer ID: ' + idArray);
                    promptNewMember();
                })
            } else {
                if (userChoice.role == 'Intern') {
                    
                    inquirer.prompt([{
                            // Capture Intern info
                            type: 'input',
                            name: 'internName',
                            message: 'Enter the intern name'
                         },
                        {
                            // Prompt for intern id
                            type: 'input',
                            name: 'internId',
                            message: 'Enter intern Id'
                         },
                        {
                            // Prompt for intern email
                            type: 'input',
                            name: 'internEmail',
                            message: 'Enter intern email'
                        },
                        {
                            // Prompt for intern school
                            type: 'input',
                            name: 'school',
                            message: 'Enter school'
                        }
                    ]).then(function (internInfo) {
                        console.log("internInfo", internInfo);
                        const intern = new Intern (
                            this.internName,
                            this.internId,
                            this.internEmail,
                            this.school);
                            teamMembers.push(internInfo.internName);
                            idArray.push(internInfo.internId);
                            console.log('Team Members: ' + teamMembers);
                            console.log('Team Member ID: ' + idArray);
                        promptNewMember();
                    })
                }
            }
        })
    }
    // Prompt for team manager
    getManager();
}
// Call function to prompt for team information
getTeamMembers();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```