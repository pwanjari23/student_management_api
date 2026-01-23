const Students = require("./students");
// const IdentityCard = require("./identityCard");
// const Department = require("./department");
const { courses } = require("./courses");
const { studentCourses } = require("./studentCourses");

// One-to-one
// Students.hasOne(IdentityCard, { foreignKey: "StudentId" });
// IdentityCard.belongsTo(Students, { foreignKey: "StudentId" });

// One-to-many
// Department.hasMany(Students, { foreignKey: "DepartmentId" });
// Students.belongsTo(Department, { foreignKey: "DepartmentId" });

// many-to-many
Students.belongsToMany(courses, {through:studentCourses});
courses.belongsToMany(Students,{through:studentCourses});

module.exports = {
  Students,
//   IdentityCard,
//   Department,
  courses,
  studentCourses
};
