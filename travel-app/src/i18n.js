import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      title: "Discover Mauritius",
      subtitle: "Your dream vacation starts here 🌴",
      button: "Book Now",
      services: "Our Services",
      contact: "Contact Us"
    }
  },

  fr: {
    translation: {
      title: "Découvrez Maurice",
      subtitle: "Vos vacances de rêve commencent ici 🌴",
      button: "Réserver",
      services: "Nos Services",
      contact: "Contactez-nous"
    }
  },

  mfe: {
    translation: {
      title: "Dekouver Moris",
      subtitle: "To vakans rev koumanse isi 🌴",
      button: "Rezerv",
      services: "Nou Servis",
      contact: "Kontak Nou"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;