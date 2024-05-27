/*

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const roleSchema = new Schema({
    name: {
        type: String
        unique: true
    },
    permissions: {
        type: String
    },
});

const validate = (role) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        permissions: Joi.string().required(),
    });
    return schema.validate(role);
};

module.exports = {role, validate}

*/

const roles = require('../config/roles.json');

class Role {
  constructor() {
    this.roles = roles.roles;
  }

  getRoleByName(name) {
    return this.roles.find((role) => role.name === name);
  }

  getRoles() {
    return this.roles;
  }
}

module.exports = Role;