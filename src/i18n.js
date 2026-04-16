import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// هنا نضع القواميس للغات الثلاث
const resources = {
  tr: {
    translation: {
      "back_btn": "⬅ Geri Dön",
      "quran_title": "📖 Kur'an-ı Kerim Takibi",
      "loading": "Yükleniyor...",
      "reset":"Sıfırla",
      "mark_all":"Hepsini Ezberledim"

    }
  },
  ar: {
    translation: {
      "back_btn": "⬅ العودة",
      "quran_title": "📖 تتبع حفظ القرآن",
      "loading": "جاري التحميل...",
      "reset":"حذف الكل",
      "mark_all":"حفظت الكل"
    }
  },
  en: {
    translation: {
      "back_btn": "⬅ Go Back",
      "quran_title": "📖 Quran Tracker",
      "loading": "Loading...",
      "reset":"Reset",
      "mark_all":"Mark All"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    // اللغة الافتراضية: نجلبها من الذاكرة أو نضع التركية كأساس
    lng: localStorage.getItem('appLang') || 'tr', 
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false // React يقوم بحماية الكود تلقائياً
    }
  });

export default i18n;