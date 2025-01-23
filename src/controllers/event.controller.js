const Event = require("../models/event.model");
const User = require("../models/user.model");

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      eventDate,
      createdBy,
      locationTitle,
      location,
    } = req.body;

    const userId = req.user.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const event = await Event.create({
      title,
      description,
      eventDate,
      createdBy: userId,
      locationTitle,
      location,
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
