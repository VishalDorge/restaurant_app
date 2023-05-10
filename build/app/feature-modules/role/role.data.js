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
exports.setRolesId = void 0;
const role_services_1 = __importDefault(require("./role.services"));
const constants_1 = require("../../utility/constants");
const setRolesId = () => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield role_services_1.default.findOne({ name: "admin" });
    const owner = yield role_services_1.default.findOne({ name: "owner" });
    constants_1.Roles.ADMIN = admin === null || admin === void 0 ? void 0 : admin._id;
    constants_1.Roles.OWNER = owner === null || owner === void 0 ? void 0 : owner._id;
});
exports.setRolesId = setRolesId;
