const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Badi BE",
      version: "1.0.0",
      description: "Badi api-doc",
    },
    servers: [
      {
        url: "http://localhost:3000", // API'nizin çalıştığı sunucu adresini belirtin
      },
    ],
  },
  apis: ["./src/routes/*.js"], // API tanımlamalarının bulunduğu dosyalar
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use("/badiapi", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
