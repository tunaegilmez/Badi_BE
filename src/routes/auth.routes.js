const express = require("express");
const {
  register,
  login,
  forgetPass,
  resetPass,
} = require("../controllers/auth.controller");
const { authLimiter } = require("../middlewares/rateLimit");

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
router.post("/login", authLimiter, login);

/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     summary: Şifre sıfırlama kodu gönder
 *     description: Kullanıcının e-posta adresine 6 haneli bir şifre sıfırlama kodu gönderir.
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
 *                 example: user@example.com
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Şifre sıfırlama kodu e-posta olarak gönderildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reset code sent to your email."
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.post("/forget-password", forgetPass);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Şifreyi sıfırla
 *     description: Kullanıcı doğru kodu girdikten sonra yeni bir şifre belirler.
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
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 description: Kullanıcının e-posta ile aldığı 6 haneli doğrulama kodu
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 description: Kullanıcının yeni şifresi
 *                 example: "newStrongPass123"
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *     responses:
 *       200:
 *         description: Şifre başarıyla sıfırlandı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password successfully reset."
 *       400:
 *         description: Geçersiz veya süresi dolmuş doğrulama kodu
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.post("/reset-password", resetPass);

module.exports = router;
