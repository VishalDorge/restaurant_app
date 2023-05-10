"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDb = void 0;
const auth_services_1 = __importDefault(require("../feature-modules/auth/auth.services"));
const role_services_1 = __importDefault(require("../feature-modules/role/role.services"));
const constants_1 = require("./constants");
const populateDb = () => __awaiter(void 0, void 0, void 0, function* () {
    constants_1.rolesData.forEach(role => role_services_1.default.create(role));
    constants_1.adminData.forEach(admin => auth_services_1.default.register(admin));
});
exports.populateDb = populateDb;
