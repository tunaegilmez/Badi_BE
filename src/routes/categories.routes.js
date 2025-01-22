const express = require("express");
const {
  getAllCategories,
  getCategoryById,
} = require("../controllers/categories.controller");

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Tüm kategorileri getir
 *     description: Kategori listesini döndürür.
 *     tags:
 *       - Categories
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
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get("/", getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Belirtilen ID'ye sahip kategoriyi getir
 *     description: Kategori ID'sine göre getirilir.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: İstenilen kategorinin ID'si
 *         example: 1
 *     responses:
 *       200:
 *         description: Kategori başarıyla getirildi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kategori başarıyla getirildi."
 *       404:
 *         description: Kategori bulunamadı.
 */
router.get("/:id", getCategoryById);

module.exports = router;
