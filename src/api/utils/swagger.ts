import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CRUD de Usuários, Planos e Assinaturas",
            version: "1.0.0",
        },
    },
    apis: ["./src/api/routes/*.routes.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs() {}
