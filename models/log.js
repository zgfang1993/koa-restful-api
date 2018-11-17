/**
 * 日志表
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("log", {
   id: {type: DataTypes.BIGINT(20), primaryKey: true, allowNull: false, autoIncrement: true },
   uid: {type: DataTypes.BIGINT(60), primaryKey: true, allowNull: false},
   description: { type: DataTypes.TEXT(),  comment: "日志描述" },
},{
  timestamps: true, // createdAt updatedAt
  tableName: 'logs'
})
}