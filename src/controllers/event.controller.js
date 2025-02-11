const Event = require("../models/event.model");
const User = require("../models/user.model");
const EventParticipation = require("../models/eventParticipation.model");

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      eventDate,
      locationTitle,
      location,
      minAge,
      maxAge,
      genderPreference,
      maxParticipants,
    } = req.body;

    const userId = req.user.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    if (minAge < 0 || maxAge < 0 || minAge > maxAge) {
      return res.status(400).json({ message: "Geçersiz yaş aralığı" });
    }

    const validGenders = ["male", "female", "any"];
    if (!validGenders.includes(genderPreference)) {
      return res.status(400).json({ message: "Geçersiz cinsiyet tercihi" });
    }

    if (maxParticipants <= 0) {
      return res
        .status(400)
        .json({ message: "Maksimum kişi sayısı 1 veya daha büyük olmalıdır" });
    }

    const event = await Event.create({
      title,
      description,
      eventDate,
      createdBy: userId,
      locationTitle,
      location,
      minAge,
      maxAge,
      genderPreference,
      maxParticipants,
      currentParticipants: 0,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: { model: User, attributes: ["username", "profileImage"] },
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id, {
      include: { model: User, attributes: ["username", "profileImage"] },
    });

    if (!event) {
      return res.status(404).json({ message: "Etkinlik bulunamadı" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, eventDate, locationTitle, location } = req.body;
    const userId = req.user.userId;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Etkinlik bulunamadı" });
    }

    if (event.createdBy !== userId) {
      return res
        .status(403)
        .json({ message: "Bu etkinliği güncelleme yetkiniz yok" });
    }

    await event.update({
      title,
      description,
      eventDate,
      locationTitle,
      location,
    });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Etkinlik bulunamadı" });
    }

    if (event.createdBy !== userId) {
      return res
        .status(403)
        .json({ message: "Bu etkinliği silme yetkiniz yok" });
    }

    await event.destroy();
    res.status(200).json({ message: "Etkinlik silindi" });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error });
  }
};

exports.joinEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const userId = req.user.userId;
  const userAge = req.user.age;
  const userGender = req.user.gender;

  try {
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Etkinlik bulunamadı." });
    }

    if (!userAge || !userGender) {
      return res
        .status(403)
        .json({ message: "Profilinizi tamamlamanız lazım." });
    }

    if (userAge < event.minAge || userAge > event.maxAge) {
      return res
        .status(403)
        .json({ message: "Yaş aralığına uygun değilsiniz." });
    }

    if (
      event.genderPreference !== "any" &&
      userGender !== event.genderPreference
    ) {
      return res
        .status(403)
        .json({ message: "Bu etkinlik için uygun cinsiyette değilsiniz." });
    }

    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(403).json({
        message: "Bu etkinlik için maksimum katılımcı sayısına ulaşıldı.",
      });
    }

    const existingRequest = await EventParticipation.findOne({
      where: { userId, eventId },
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Bu etkinliğe zaten katılım talebi gönderdiniz." });
    }

    const participation = await EventParticipation.create({ userId, eventId });

    await event.update({ currentParticipants: event.currentParticipants + 1 });

    res.status(201).json({
      message: "Katılım talebi başarıyla gönderildi.",
      participation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Talep gönderme hatası.", error: error.message });
  }
};

exports.updateParticipationStatus = async (req, res) => {
  const { id: eventId } = req.params;
  const { participationId, status } = req.body;
  const userId = req.user.userId;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Geçersiz durum güncellemesi." });
  }

  try {
    const participation = await EventParticipation.findByPk(participationId);
    if (!participation) {
      return res.status(404).json({ message: "Katılım talebi bulunamadı." });
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Etkinlik bulunamadı." });
    }

    if (participation.status === "pending" && status === "accepted") {
      await event.update({
        currentParticipants: event.currentParticipants + 1,
      });
    }

    if (participation.status === "accepted" && status === "rejected") {
      await event.update({
        currentParticipants: event.currentParticipants - 1,
      });
    }

    await participation.update({ status });

    res.status(200).json({
      message: `Talep ${status} olarak güncellendi.`,
      participation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Durum güncelleme hatası.",
      error: error.message,
    });
  }
};

exports.getParticipants = async (req, res) => {
  const { id: eventId } = req.params;

  try {
    const participants = await EventParticipation.findAll({
      where: { eventId, status: "accepted" },
      include: ["User"],
    });

    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({
      message: "Katılımcı listesi getirilemedi.",
      error: error.message,
    });
  }
};
