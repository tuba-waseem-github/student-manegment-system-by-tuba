import inquirer from "inquirer";
class student {
    id;
    name;
    courseEnrolled;
    feesAmount;
    constructor(id, name, courseEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.courseEnrolled = courseEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseID = 10000;
let studentId = "";
let continuEnrolled = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option:\n",
        choices: ["Enroll a student", "Show student status"]
    });
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Enter tour name",
        });
        let trimedStudentName = studentName.ans.toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimedStudentName) === false) {
            if (trimedStudentName !== "") {
                baseID++;
                studentId = "STID" + baseID;
                console.log("\n\tyour acount has been created");
                console.log(`welcome, ${trimedStudentName}!`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "please select a course",
                    choices: ["IT", "English", "Cooking",]
                });
                let courseFees = 0;
                switch (course.ans) {
                    case "IT":
                        courseFees = 5000;
                        break;
                    case "English":
                        courseFees = 500;
                        break;
                    case "Cooking":
                        courseFees = 200;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this course",
                });
                if (courseConfirm.ans === true) {
                    let Student = new student(studentId, trimedStudentName, [course.ans], courseFees);
                    students.push(Student);
                    console.log("you have enrolled this course");
                }
            }
            else {
                console.log("Invalid name");
            }
        }
        else {
            console.log("this name is already exsist");
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "please select name",
                choices: studentNameCheck
            });
            let foundStudent = students.find(student => student.name === selectedStudent.ans);
            console.log("student information");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log("record is empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "do you want to confirm?",
    });
    if (userConfirm.ans === false) {
        continuEnrolled = false;
    }
} while (continuEnrolled);
