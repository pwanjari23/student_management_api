const Students = require("./students");
const IdentityCard = require("./identityCard");
const Department = require("./department"); 

// One-to-one
Students.hasOne(IdentityCard, { foreignKey: "StudentId" });
IdentityCard.belongsTo(Students, { foreignKey: "StudentId" });

// One-to-many
Department.hasMany(Students, { foreignKey: "DepartmentId" });
Students.belongsTo(Department, { foreignKey: "DepartmentId" });

module.exports = {
  Students,
  IdentityCard,
  Department
};
   