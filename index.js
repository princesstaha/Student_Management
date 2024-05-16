// import inquirer from "inquirer";
// // define the student class
// class Student{
//     static counter =10000;
//     id: number;
//     name: string;
//     courses:string[];
//     balance :number;
//     constructor(name:string){
//         this.id = Student.counter++;
//         this.name = name;
//         this. courses =[];
//         this.balance= 100;
//     }
//     // method to enroll a student in a course
//     enroll_course(course: string){
//         this.courses.push(course);
// }
//     // Method to view a student balance
//     view_balance(){
//         console.log(`Balance for ${this.name} : ${this.balance}`);
//     }
// // Mwthod to pay fess
//     pay_fees(amount :number){
//         this.balance -= amount;
//         console.log(`$${amount} Fess paid successfully for ${this.name}`);
//     }
// // Method to display student status
// show_status(){
//     console.log (`ID: ${this.id}`);
//     console.log (`Name: ${this.name}`);
//     console.log (`Courses :${this.courses}`);
//     console.log (`Balance ${this.balance}`);
// }
// }
// // Defining the student manager class to manage a students
// class Student_manager{
//     students : Student[];
//     constructor(){
//         this.students= [];
//     }
//     // Method to add a new student
//     add_student(name: string){
//         let student = new Student(name);
//         this.students.push(student);
//         console.log(`Student : ${name} added successfuly. Student ID: ${student.id}`);
//     }
//     enroll_student(student_id:number,course:string){
//         let student = this.find_student(student_id);
//         if(student){
//             student.enroll_course(course);
//             console.log(`${student.name} enrolled in ${course} successfully`);
//         }
//     }
//     view_student_balance(student_id:number){
// let student = this.find_student(student_id);
// if(student){
// student.view_balance();
// }
// else{
//     console.log("student not found. please enter a correct student ID")
// }
//     }
// pay_student_fees(student_id :number, amount:number){
//     let student= this.find_student(student_id);
//     if(student){
//  student.pay_fees(amount);
//     }
//     else{
//         console.log("Student not Found. Please enter a correct student ID");
//     }
// }
// show_student_status(student_id : number){
// let student = this.find_student(student_id);
// if(student){
//     student.show_status();
// }
// }
//     find_student(student_id:number){
//         return this.students.find(std => std.id === student_id);
//     }
// }
// async function main() {
//     console.log("Wellcome to_ Student Management System");
//     console.log("=".repeat(40));
//     let student_manager = new Student_manager();
//  while(true){
//     let choice = await inquirer.prompt([
//         {
//          name : "choice",
//          type: " list",
//          message: " Select an option",
//          choices: [
//             "add Student",
//             "enroll Student",
//             "View Student Balance",
//             "Pay Fees",
//              "Show Status",
//             "Exit"
//          ]
//         }
//     ]);
//  switch (choice.choice){
// case "add Student":
// let name_input = await inquirer.prompt([
//     {
//         name : " name",
//         type : " input",
//         message:"Enter a Student Name",
//     }
// ]);
// student_manager.add_student(name_input.name);
// break;
// case "enroll Student":
// let course_input = await inquirer.prompt([
//     {
//         name:"student id",
//         type: " number",
//         message: " Enter a Student ID",
//     },
//     {
//         name: "course",
//         type: "input",
//         message: "Enter a Course Name",
//     }
// ]);
// student_manager.enroll_student(course_input.student_id, course_input.course);
// break;
// case "View Student Balance":
//     let balance_input = await inquirer.prompt([
//         {
//             name : "studenr_id",
//             type: "number",
//             message:" Enter a Student ID",
//         }
//     ]);
//     student_manager.view_student_balance(balance_input.student_id);
//     break;
//     case "Pay Fees":
//     let fees_input = await inquirer.prompt([
//         {
//             name : "student_id",
//             type : "number",
//             message: "enter you student ID",
//         },
//         {
//             name:" amont",
//             type:"number",
//             message: " enter the  amount  to pay"
//         }
//     ]);
//         student_manager.pay_student_fees(fees_input.student_id,fees_input.amount);
//         break;
//         case "Show Status":
//             let status_input = await inquirer.prompt([
//                 {
//                     name: "student id",
//                     type: "number",
//                     message:" Enter a student ID",
//                 }
//             ]);
//             student_manager.show_student_status(status_input.student_id);
//             break;
//             case "Exit":
//                 console.log("Exiting....");
//                 process.exit();
// }
//    }
// }
// main();
import inquirer from 'inquirer';
// Constants
const INITIAL_BALANCE = 100;
const STUDENT_ID_PREFIX = 'STUDENT_';
class Student {
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = INITIAL_BALANCE;
    }
    enrollCourse(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: ${this.balance} `);
    }
    payFees(amount) {
        if (amount <= 0) {
            throw new Error('Invalid fee amount');
        }
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name} `);
    }
    showStatus() {
        console.log(`ID: ${this.id} `);
        console.log(`Name: ${this.name} `);
        console.log(`Courses: ${this.courses} `);
        console.log(`Balance: ${this.balance} `);
    }
    static counter = 10000;
}
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    addStudent(name) {
        const student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id} `);
    }
    findStudent(studentId) {
        return this.students.find((student) => student.id === studentId);
    }
    enrollStudent(studentId, course) {
        const student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(`${student.name} enrolled in ${course} successfully `);
        }
        else {
            console.log('Student not found. Please enter a correct student ID');
        }
    }
    viewStudentBalance(studentId) {
        const student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log('Student not found. Please enter a correct student ID');
        }
    }
    payStudentFees(studentId, amount) {
        const student = this.findStudent(studentId);
        if (student) {
            try {
                student.payFees(amount);
            }
            catch (error) {
                console.log(`Error paying fees: ${error.message}`);
            }
        }
        else {
            console.log('Student not found. Please enter a correct student ID');
        }
    }
    showStudentStatus(studentId) {
        const student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        }
        else {
            console.log('Student not found. Please enter a correct student ID');
        }
    }
}
async function main() {
    console.log('Welcome to Student Management System');
    console.log('='.repeat(40));
    const studentManager = new StudentManager();
    while (true) {
        const choice = await inquirer.prompt([
            {
                name: 'choice',
                type: 'list',
                message: 'Select an option',
                choices: [
                    'Add Student',
                    'Enroll Student',
                    'View Student Balance',
                    'Pay Fees',
                    'Show Status',
                    'Exit',
                ],
            },
        ]);
        switch (choice.choice) {
            case 'Add Student':
                const nameInput = await inquirer.prompt([
                    {
                        name: 'name',
                        type: 'input',
                        message: 'Enter a student name',
                    },
                ]);
                studentManager.addStudent(nameInput.name);
                break;
            case 'Enroll Student':
                const courseInput = await inquirer.prompt([
                    {
                        name: 'studentId',
                        type: 'number',
                        message: 'Enter a student ID',
                    },
                    {
                        name: 'course',
                        type: 'input',
                        message: 'Enter a course name',
                    },
                ]);
                studentManager.enrollStudent(courseInput.studentId, courseInput.course);
                break;
            case 'View Student Balance':
                const studentIdInput = await inquirer.prompt([
                    {
                        name: 'studentId',
                        type: 'number',
                        message: 'Enter a student ID',
                    },
                ]);
                studentManager.viewStudentBalance(studentIdInput.studentId);
                break;
            case 'Pay Fees':
                const amountInput = await inquirer.prompt([
                    {
                        name: 'studentId',
                        type: 'number',
                        message: 'Enter a student ID',
                    },
                    {
                        name: 'amount',
                        type: 'number',
                        message: 'Enter an amount',
                    },
                ]);
                studentManager.payStudentFees(amountInput.studentId, amountInput.amount);
                break;
            case 'Show Status':
                const statusIdInput = await inquirer.prompt([
                    {
                        name: 'studentId',
                        type: 'number',
                        message: 'Enter a student ID',
                    },
                ]);
                studentManager.showStudentStatus(statusIdInput.studentId);
                break;
            case 'Exit':
                process.exit();
        }
    }
}
main();
