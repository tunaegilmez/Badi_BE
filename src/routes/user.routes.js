const express = require("express");
const {
  createUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Tüm kullanıcıları getir
 *     description: Kullanıcı listesini döndürür.
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
 *                   surname:
 *                     type: string
 *                   password:
 *                     type: string
 *
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Yeni bir kullanıcı oluştur
 *     description: Kullanıcı oluşturmak için gerekli bilgileri alır ve yeni bir kullanıcı ekler.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ahmet"
 *               surname:
 *                 type: string
 *                 example: "Yılmaz"
 *               password:
 *                 type: string
 *                 example: "güçlüşifre"
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Ahmet"
 *                 surname:
 *                   type: string
 *                   example: "Yılmaz"
 *       400:
 *         description: Geçersiz giriş verisi.
 */
router.post("/", createUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Belirtilen ID'ye sahip kullanıcıyı sil
 *     description: Kullanıcı ID'sine göre silinir.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Silinecek kullanıcının ID'si
 *         example: 1
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla silindi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kullanıcı başarıyla silindi."
 *       404:
 *         description: Kullanıcı bulunamadı.
 */
router.delete("/:id", deleteUser);

module.exports = router;
