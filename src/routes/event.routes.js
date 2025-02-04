const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  updateParticipationStatus,
  getParticipants,
} = require("../controllers/event.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const { generalLimiter, strictLimiter } = require("../middlewares/rateLimit");

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

/**
 * @swagger
 * /events/{id}/join:
 *   post:
 *     summary: Etkinliğe katılım talebi gönder
 *     description: Kullanıcı, belirtilen etkinliğe katılım talebi gönderir. Aynı etkinliğe birden fazla kez başvuramaz.
 *     tags:
 *       - Event Participation
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Katılım talebi gönderilecek etkinliğin ID'si.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       201:
 *         description: Katılım talebi başarıyla gönderildi.
 *       400:
 *         description: Kullanıcı zaten bu etkinliğe başvurmuş.
 *       500:
 *         description: Sunucu hatası.
 */

/**
 * @swagger
 * /events/{id}/update-status:
 *   patch:
 *     summary: Katılım talebinin durumunu güncelle
 *     description: Etkinlik sahibi, katılım taleplerini kabul veya reddedebilir.
 *     tags:
 *       - Event Participation
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Katılım talebi güncellenecek etkinliğin ID'si.
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
 *               participationId:
 *                 type: integer
 *                 example: 10
 *               status:
 *                 type: string
 *                 enum: ["accepted", "rejected"]
 *                 example: "accepted"
 *     responses:
 *       200:
 *         description: Katılım talebi başarıyla güncellendi.
 *       400:
 *         description: Geçersiz durum.
 *       404:
 *         description: Katılım talebi bulunamadı.
 *       500:
 *         description: Sunucu hatası.
 */

/**
 * @swagger
 * /events/{id}/participants:
 *   get:
 *     summary: Etkinliğe kabul edilen katılımcıları listele
 *     description: Belirtilen etkinliğe kabul edilen kullanıcıları getirir.
 *     tags:
 *       - Event Participation
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Katılımcıları listelenecek etkinliğin ID'si.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Etkinliğe katılan kullanıcılar başarıyla listelendi.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 5
 *                   name:
 *                     type: string
 *                     example: "Ali"
 *                   status:
 *                     type: string
 *                     example: "accepted"
 *       500:
 *         description: Sunucu hatası.
 */

router.get("/", generalLimiter, getEvents);
router.get("/:id", generalLimiter, getEventById);
router.post("/", authMiddleware, strictLimiter, createEvent);
router.put("/:id", authMiddleware, strictLimiter, updateEvent);
router.delete("/:id", authMiddleware, strictLimiter, deleteEvent);

// ✅ Katılım Talebi Gönder
router.post("/:id/join", authMiddleware, strictLimiter, joinEvent);

// ✅ Katılım Durumunu Güncelle (Etkinlik Sahibi Kullanır)
router.patch(
  "/:id/update-status",
  authMiddleware,
  strictLimiter,
  updateParticipationStatus
);

// ✅ Etkinlik Katılımcılarını Listele
router.get(
  "/:id/participants",
  authMiddleware,
  generalLimiter,
  getParticipants
);

module.exports = router;
