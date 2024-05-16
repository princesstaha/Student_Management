
import inquirer from 'inquirer';

// Constants
const INITIAL_BALANCE = 100;
const STUDENT_ID_PREFIX = 'STUDENT_';

class Student {
  id: number;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name;
    this.courses = [];
    this.balance = INITIAL_BALANCE;
  }

  enrollCourse(course: string) {
    this.courses.push(course);
  }

  viewBalance() {
    console.log(`Balance for ${this.name}: ${this.balance} `);
  }

  payFees(amount: number) {
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
  students: Student[];

  constructor() {
    this.students = [];
  }

  addStudent(name: string) {
    const student = new Student(name);
    this.students.push(student);
    console.log(`Student: ${name} added successfully. Student ID: ${student.id} `);
  }

  findStudent(studentId: number) {
    return this.students.find((student) => student.id === studentId);
  }

  enrollStudent(studentId: number, course: string) {
    const student = this.findStudent(studentId);
    if (student) {
      student.enrollCourse(course);
      console.log(`${student.name} enrolled in ${course} successfully `);
    } else {
      console.log('Student not found. Please enter a correct student ID');
    }
  }

  viewStudentBalance(studentId: number) {
    const student = this.findStudent(studentId);
    if (student) {
      student.viewBalance();
    } else {
      console.log('Student not found. Please enter a correct student ID');
    }
  }

  payStudentFees(studentId: number, amount: number) {
    const student = this.findStudent(studentId);
    if (student) {
      try {
        student.payFees(amount);
      } catch (error:any) {
        console.log(`Error paying fees: ${error.message}`);
      }
    } else {
      console.log('Student not found. Please enter a correct student ID');
    }
  }

  showStudentStatus(studentId: number) {
    const student = this.findStudent(studentId);
    if (student) {
      student.showStatus();
    } else {
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