"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
try {
    var prisma = new client_1.PrismaClient();
    await prisma.$connect();
    console.log("Success");
}
catch (e) {
    console.log("--- ERROR MESSAGE ---");
    console.log(e.message);
    console.log("--- End ERROR ---");
}
