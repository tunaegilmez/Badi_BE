const express = require("express");
const {
  getAllFaculty,
  getFacultyById,
} = require("../controllers/faculty.controller");

const router = express.Router();

/**
 * @swagger
 * /faculty:
 *   get:
 *     summary: Tüm üniversiteleri getir
 *     description: Üniversite listesini döndürür.
 *     responses:
 *       200:
 *         description: Başarılı istek
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   FACULTY_NAME:
 *                     type: string
 */
router.get("/", getAllFaculty);
router.get("/:ID", getFacultyById);

module.exports = router;
