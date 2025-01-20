const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Yeni bir kullanıcı kaydet
 *     description: Kullanıcı adı, soyadı, e-posta, kullanıcı adı ve şifre ile yeni bir kullanıcı kaydeder.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Kullanıcının adı
 *                 example: John
 *               surname:
 *                 type: string
 *                 description: Kullanıcının soyadı
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: Kullanıcının e-posta adresi
 *                 example: john.doe@example.com
 *               username:
 *                 type: string
 *                 description: Kullanıcının kullanıcı adı
 *                 example: johndoe123
 *               password:
 *                 type: string
 *                 description: Kullanıcının şifresi
 *                 example: secret123
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Kullanıcı zaten mevcut
 *       500:
 *         description: Sunucu hatası
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Kullanıcı girişi yap
 *     description: Kullanıcı e-posta ve şifre ile giriş yaparak bir JWT token alır.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Kullanıcının e-posta adresi
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Kullanıcının şifresi
 *                 example: secret123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Başarılı giriş, JWT token döner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Geçersiz kimlik bilgileri
 *       500:
 *         description: Sunucu hatası
 */
router.post("/login", login);

module.exports = router;
