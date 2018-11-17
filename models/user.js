/**
 * 用户表
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("user", {
    id: { type: DataTypes.BIGINT(20), primaryKey: true, allowNull: false, autoIncrement: true },
    username: { type: DataTypes.STRING(60), unique: true,allowNull: false, comment: "用户名" },
    gender: { type: DataTypes.TINYINT(), allowNull: false, comment: "性别 1男 2女" },
    password: {type: DataTypes.STRING(60), allowNull: false, comment: "密码"},
    email: {type: DataTypes.STRING(60), allowNull: true, comment: "邮箱"},
    phone: {type: DataTypes.STRING(20), allowNull: true, comment: "电话"},
    avatar: {type: DataTypes.STRING(60), allowNull: true, comment: "头像"},
    status: { type: DataTypes.TINYINT(), allowNull: false, defaultValue:1, comment: "状态0不可用 1可用 2禁用" },
    description: {type: DataTypes.TEXT(), allowNull: true, comment: "描述"},
},{
  timestamps: true, // createdAt updatedAt
  tableName: 'users'
})
}