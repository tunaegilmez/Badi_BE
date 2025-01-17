const express = require("express");
const {
  getAllUniversity,
  getUniversityById,
} = require("../controllers/university.controller");

const router = express.Router();

/**
 * @swagger
 * /university:
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
 *                   UNIVERSITY_NAME:
 *                     type: string
 */
router.get("/", getAllUniversity);

/**
 * @swagger
 * /university/{id}:
 *   get:
 *     summary: Belirtilen ID'ye sahip üniversiteyi getir
 *     description: Üniversite ID'sine göre tek bir üniversite döndürür.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Getirilecek üniversitenin ID'si
 *         example: 1
 *     responses:
 *       200:
 *         description: Başarılı istek
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID:
 *                   type: integer
 *                   example: 1
 *                 UNIVERSITY_NAME:
 *                   type: string
 *                   example: "Boğaziçi Üniversitesi"
 *       404:
 *         description: Üniversite bulunamadı.
 */
router.get("/:ID", getUniversityById);

module.exports = router;
