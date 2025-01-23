const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Tüm etkinlikleri getir
 *     description: Sistemdeki tüm etkinlikleri listeler.
 *     tags:
 *       - Event
 *     responses:
 *       200:
 *         description: Etkinlikler başarıyla getirildi.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Vue.js Workshop"
 *                   description:
 *                     type: string
 *                     example: "Vue.js ile ilgili bir etkinlik."
 *                   eventDate:
 *                     type: string
 *                     example: "2025-05-10"
 *                   locationTitle:
 *                     type: string
 *                     example: "İstanbul"
 *                   location:
 *                     type: string
 *                     example: "ümraniye"
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Belirtilen etkinliği getir
 *     description: Parametre olarak verilen ID'ye sahip etkinliği getirir.
 *     tags:
 *       - Event
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Etkinliğin benzersiz ID'si
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Etkinlik başarıyla getirildi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Vue.js Workshop"
 *                 description:
 *                   type: string
 *                   example: "Vue.js ile ilgili bir etkinlik."
 *                 eventDate:
 *                   type: string
 *                   example: "2025-05-10"
 *                 locationTitle:
 *                   type: string
 *                   example: "İstanbul"
 *                 location:
 *                   type: string
 *                   example: "ümraniye"
 *       404:
 *         description: Etkinlik bulunamadı
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Yeni etkinlik oluştur
 *     description: Yeni bir etkinlik oluşturur. Yalnızca giriş yapmış kullanıcılar oluşturabilir.
 *     tags:
 *       - Event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Vue.js Workshop"
 *               description:
 *                 type: string
 *                 example: "Vue.js ile ilgili etkinlik."
 *               eventDate:
 *                 type: string
 *                 example: "2025-05-10"
 *               locationTitle:
 *                 type: string
 *                 example: "İstanbul"
 *               location:
 *                 type: string
 *                 example: "ümraniye"
 *     responses:
 *       201:
 *         description: Etkinlik başarıyla oluşturuldu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Vue.js Workshop"
 *                 description:
 *                   type: string
 *                   example: "Vue.js ile ilgili etkinlik."
 *                 eventDate:
 *                   type: string
 *                   example: "2025-05-10"
 *                 locationTitle:
 *                   type: string
 *                   example: "İstanbul"
 *                 location:
 *                   type: string
 *                   example: "ümraniye"
 *       400:
 *         description: Geçersiz giriş verisi.
 */

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Etkinliği güncelle
 *     description: Etkinliği günceller. Sadece etkinliği oluşturan kullanıcı bu işlemi yapabilir.
 *     tags:
 *       - Event
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Etkinliğin benzersiz ID'si
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Vue.js Workshop"
 *               description:
 *                 type: string
 *                 example: "Yeni güncellenmiş Vue.js etkinliği."
 *               eventDate:
 *                 type: string
 *                 example: "2025-06-15"
 *               locationTitle:
 *                 type: string
 *                 example: "Ankara"
 *               location:
 *                 type: string
 *                 example: "çinçin"
 *     responses:
 *       200:
 *         description: Etkinlik başarıyla güncellendi.
 *       403:
 *         description: Yetkisiz erişim, sadece etkinliği oluşturan kullanıcı güncelleyebilir.
 *       404:
 *         description: Etkinlik bulunamadı
 */

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Etkinliği sil
 *     description: Etkinliği siler. Sadece etkinliği oluşturan kullanıcı bu işlemi yapabilir.
 *     tags:
 *       - Event
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Etkinliğin benzersiz ID'si
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Etkinlik başarıyla silindi.
 *       403:
 *         description: Yetkisiz erişim, sadece etkinliği oluşturan kullanıcı silebilir.
 *       404:
 *         description: Etkinlik bulunamadı
 */

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
