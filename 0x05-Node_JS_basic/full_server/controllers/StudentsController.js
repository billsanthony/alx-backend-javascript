import { readDatabase } from '../utils/utils';

class StudentsController {
  static getAllStudents(request, response) {
    try {
      const database = readDatabase();
      response.status(200).send('This is the list of our students');

      Object.keys(database).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).forEach((field) => {
        const studentsInField = database[field];
        const sortedStudents = studentsInField.sort();
        const numberOfStudents = sortedStudents.length;
        const studentList = sortedStudents.join(', ');

        response.write(`\nNumber of students in ${field}: ${numberOfStudents}. List: ${studentList}`);
      });

      response.end();
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const database = readDatabase();
      const studentsInMajor = database[major];
      const sortedStudents = studentsInMajor.sort();
      const studentList = sortedStudents.join(', ');

      response.status(200).send(`List: ${studentList}`);
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
