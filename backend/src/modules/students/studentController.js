const asyncHandler = require("../../utils/asyncHandler");
const studentService = require("./studentService");

const listStudents = asyncHandler(async (req, res) => {
  const students = await studentService.listStudents();
  res.json(students);
});

const createStudent = asyncHandler(async (req, res) => {
  const student = await studentService.createStudent(req.body);
  res.status(201).json(student);
});

const updateStudent = asyncHandler(async (req, res) => {
  const student = await studentService.updateStudent(req.params.studentId, req.body);
  res.json(student);
});

module.exports = {
  listStudents,
  createStudent,
  updateStudent
};
