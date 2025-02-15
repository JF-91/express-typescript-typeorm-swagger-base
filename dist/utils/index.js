"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomId = exports.formatDate = void 0;
const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
};
exports.formatDate = formatDate;
const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
};
exports.generateRandomId = generateRandomId;
