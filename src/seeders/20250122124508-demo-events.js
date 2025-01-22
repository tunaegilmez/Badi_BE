"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date(); // Şu anki tarih

    // await queryInterface.bulkInsert("Categories", [
    //   { id: 1, name: "Spor", parent_id: null, createdAt: now, updatedAt: now },
    //   {
    //     id: 2,
    //     name: "Kültürel",
    //     parent_id: null,
    //     createdAt: now,
    //     updatedAt: now,
    //   },
    //   {
    //     id: 3,
    //     name: "Eğlence",
    //     parent_id: null,
    //     createdAt: now,
    //     updatedAt: now,
    //   },
    //   {
    //     id: 4,
    //     name: "Teknoloji",
    //     parent_id: null,
    //     createdAt: now,
    //     updatedAt: now,
    //   },
    //   {
    //     id: 5,
    //     name: "Sağlık ve Wellness",
    //     parent_id: null,
    //     createdAt: now,
    //     updatedAt: now,
    //   },
    //   {
    //     id: 6,
    //     name: "Eğitim",
    //     parent_id: null,
    //     createdAt: now,
    //     updatedAt: now,
    //   },
    //   {
    //     id: 7,
    //     name: "Gönüllülük ve Sosyal Sorumluluk",
    //     parent_id: null,
    //     createdAt: now,
    //     updatedAt: now,
    //   },
    //   {
    //     id: 8,
    //     name: "Doğa ve Çevre",
    //     parent_id: null,
    //     createdAt: now,
    //     updatedAt: now,
    //   },
    //   {
    //     id: 9,
    //     name: "İş ve Kariyer",
    //     parent_id: null,
    //     createdAt: now,
    //     updatedAt: now,
    //   },
    //   {
    //     id: 10,
    //     name: "Gezi ve Macera",
    //     parent_id: null,
    //     createdAt: now,
    //     updatedAt: now,
    //   },
    //   {
    //     id: 11,
    //     name: "Aile ve Çocuk Etkinlikleri",
    //     parent_id: null,
    //     createdAt: now,
    //     updatedAt: now,
    //   },
    // ]);

    // Alt kategorileri ekleyelim
    await queryInterface.bulkInsert("Categories", [
      // Spor
      { name: "Futbol", parent_id: 1, createdAt: now, updatedAt: now },
      { name: "Basketbol", parent_id: 1, createdAt: now, updatedAt: now },
      { name: "Tenis", parent_id: 1, createdAt: now, updatedAt: now },
      { name: "Yüzme", parent_id: 1, createdAt: now, updatedAt: now },
      { name: "Koşu", parent_id: 1, createdAt: now, updatedAt: now },
      { name: "Bisiklet", parent_id: 1, createdAt: now, updatedAt: now },
      { name: "Fitness", parent_id: 1, createdAt: now, updatedAt: now },
      { name: "Yoga", parent_id: 1, createdAt: now, updatedAt: now },
      { name: "Kış Sporları", parent_id: 1, createdAt: now, updatedAt: now },
      { name: "Savaş Sanatları", parent_id: 1, createdAt: now, updatedAt: now },
      { name: "Extreme Sporlar", parent_id: 1, createdAt: now, updatedAt: now },

      // Kültürel
      { name: "Tiyatro", parent_id: 2, createdAt: now, updatedAt: now },
      { name: "Müze Ziyareti", parent_id: 2, createdAt: now, updatedAt: now },
      { name: "Konser", parent_id: 2, createdAt: now, updatedAt: now },
      { name: "Sergi", parent_id: 2, createdAt: now, updatedAt: now },
      {
        name: "Edebiyat ve Şiir",
        parent_id: 2,
        createdAt: now,
        updatedAt: now,
      },
      { name: "Opera ve Bale", parent_id: 2, createdAt: now, updatedAt: now },
      { name: "Dans ve Müzik", parent_id: 2, createdAt: now, updatedAt: now },
      { name: "Fotoğrafçılık", parent_id: 2, createdAt: now, updatedAt: now },

      // Eğlence
      { name: "Sinema", parent_id: 3, createdAt: now, updatedAt: now },
      { name: "Festival", parent_id: 3, createdAt: now, updatedAt: now },
      { name: "Oyun ve E-Spor", parent_id: 3, createdAt: now, updatedAt: now },
      { name: "Gece Hayatı", parent_id: 3, createdAt: now, updatedAt: now },
      {
        name: "Stand-up Gösterisi",
        parent_id: 3,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Müzikal ve Broadway",
        parent_id: 3,
        createdAt: now,
        updatedAt: now,
      },
      { name: "Karaoke", parent_id: 3, createdAt: now, updatedAt: now },
      { name: "Masa Oyunları", parent_id: 3, createdAt: now, updatedAt: now },

      // Teknoloji
      {
        name: "Yazılım ve Kodlama",
        parent_id: 4,
        createdAt: now,
        updatedAt: now,
      },
      { name: "Yapay Zeka", parent_id: 4, createdAt: now, updatedAt: now },
      { name: "Robotik", parent_id: 4, createdAt: now, updatedAt: now },
      {
        name: "Elektronik ve Maker",
        parent_id: 4,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Blockchain ve Kripto",
        parent_id: 4,
        createdAt: now,
        updatedAt: now,
      },
      { name: "Siber Güvenlik", parent_id: 4, createdAt: now, updatedAt: now },
      { name: "Veri Bilimi", parent_id: 4, createdAt: now, updatedAt: now },

      // Sağlık ve Wellness
      { name: "Meditasyon", parent_id: 5, createdAt: now, updatedAt: now },
      {
        name: "Sağlıklı Beslenme",
        parent_id: 5,
        createdAt: now,
        updatedAt: now,
      },
      { name: "Pilates", parent_id: 5, createdAt: now, updatedAt: now },
      { name: "Mental Sağlık", parent_id: 5, createdAt: now, updatedAt: now },
      {
        name: "Detoks Programları",
        parent_id: 5,
        createdAt: now,
        updatedAt: now,
      },

      // Eğitim
      { name: "Dil Kursları", parent_id: 6, createdAt: now, updatedAt: now },
      {
        name: "Matematik ve Bilim",
        parent_id: 6,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Kariyer ve Girişimcilik",
        parent_id: 6,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Tasarım ve Sanat",
        parent_id: 6,
        createdAt: now,
        updatedAt: now,
      },
      { name: "Kişisel Gelişim", parent_id: 6, createdAt: now, updatedAt: now },
      { name: "Astronomi", parent_id: 6, createdAt: now, updatedAt: now },
      { name: "Psikoloji", parent_id: 6, createdAt: now, updatedAt: now },

      // Gönüllülük ve Sosyal Sorumluluk
      { name: "Hayvan Hakları", parent_id: 7, createdAt: now, updatedAt: now },
      { name: "Çocuk Destek", parent_id: 7, createdAt: now, updatedAt: now },
      { name: "Engelli Destek", parent_id: 7, createdAt: now, updatedAt: now },
      {
        name: "Topluluk Hizmetleri",
        parent_id: 7,
        createdAt: now,
        updatedAt: now,
      },
      { name: "Afet Yardımı", parent_id: 7, createdAt: now, updatedAt: now },

      // Doğa ve Çevre
      {
        name: "Doğa Yürüyüşleri",
        parent_id: 8,
        createdAt: now,
        updatedAt: now,
      },
      { name: "Kampçılık", parent_id: 8, createdAt: now, updatedAt: now },
      { name: "Ekolojik Tarım", parent_id: 8, createdAt: now, updatedAt: now },
      {
        name: "Geri Dönüşüm Projeleri",
        parent_id: 8,
        createdAt: now,
        updatedAt: now,
      },
      { name: "Ekoturizm", parent_id: 8, createdAt: now, updatedAt: now },

      // İş ve Kariyer
      { name: "Girişimcilik", parent_id: 9, createdAt: now, updatedAt: now },
      { name: "Networking", parent_id: 9, createdAt: now, updatedAt: now },
      {
        name: "İş Mülakatı Hazırlığı",
        parent_id: 9,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Freelance ve Uzaktan Çalışma",
        parent_id: 9,
        createdAt: now,
        updatedAt: now,
      },

      // Gezi ve Macera
      {
        name: "Yurt İçi Turlar",
        parent_id: 10,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Yurt Dışı Turlar",
        parent_id: 10,
        createdAt: now,
        updatedAt: now,
      },
      { name: "Backpacking", parent_id: 10, createdAt: now, updatedAt: now },
      { name: "Volkan Turları", parent_id: 10, createdAt: now, updatedAt: now },

      // Aile ve Çocuk
      {
        name: "Anne-Baba Eğitimi",
        parent_id: 11,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Çocuk Atölyeleri",
        parent_id: 11,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Montessori Eğitimleri",
        parent_id: 11,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Ebeveyn-Çocuk Kampı",
        parent_id: 11,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
