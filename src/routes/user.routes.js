const express = require("express");
const {
  createUser,
  getAllUsers,
  editUser,
  deleteUser,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Tüm kullanıcıları getir
 *     description: Kullanıcı listesini döndürür.
 *     tags:
 *       - User
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
 *                   email:
 *                     type: string
 *                   username:
 *                     type: string
 *                   profileImage:
 *                     type: string
 *                     nullable: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Yeni bir kullanıcı oluştur
 *     description: Kullanıcı oluşturmak için gerekli bilgileri alır ve yeni bir kullanıcı ekler.
 *     tags:
 *       - User
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
 *               email:
 *                 type: string
 *                 example: "ahmet@example.com"
 *               username:
 *                 type: string
 *                 example: "ahmety"
 *               password:
 *                 type: string
 *                 example: "güçlüşifre"
 *               profileImage:
 *                 type: string
 *                 example: "https://example.com/profile.jpg"
 *                 nullable: true
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
 *                 email:
 *                   type: string
 *                   example: "ahmet@example.com"
 *                 username:
 *                   type: string
 *                   example: "ahmety"
 *       400:
 *         description: Geçersiz giriş verisi.
 */
router.post("/", createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Belirtilen ID'ye sahip kullanıcıyı güncelle
 *     description: Kullanıcı ID'sine göre kullanıcı bilgilerini günceller.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Güncellenecek kullanıcının ID'si
 *         example: 1
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
 *               email:
 *                 type: string
 *                 example: "ahmetyeni@example.com"
 *               username:
 *                 type: string
 *                 example: "ahmetyeni"
 *               password:
 *                 type: string
 *                 example: "yenişifre123"
 *               profileImage:
 *                 type: string
 *                 example: "https://example.com/new-profile.jpg"
 *                 nullable: true
 *               age:
 *                 type: string
 *                 example: "30"
 *               gender:
 *                 type: string
 *                 enum: ["male", "female", "-"]
 *                 example: "male"
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla güncellendi.
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
 *                 email:
 *                   type: string
 *                   example: "ahmetyeni@example.com"
 *                 username:
 *                   type: string
 *                   example: "ahmetyeni"
 *                 profileImage:
 *                   type: string
 *                   example: "https://example.com/new-profile.jpg"
 *                 age:
 *                   type: string
 *                   example: "30"
 *                 gender:
 *                   type: string
 *                   enum: ["male", "female", "-"]
 *                   example: "male"
 *       400:
 *         description: Geçersiz giriş verisi.
 *       404:
 *         description: Kullanıcı bulunamadı.
 */
router.put("/:id", authMiddleware, editUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Belirtilen ID'ye sahip kullanıcıyı sil
 *     description: Kullanıcı ID'sine göre silinir.
 *     tags:
 *       - User
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
