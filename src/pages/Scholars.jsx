import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Scholars() {
  const [isRTL, setIsRTL] = useState(true);
  const navigate = useNavigate();

  // قاعدة البيانات الشاملة لجميع العلماء الـ 7
  const scholarsData = [
    {
      id: 'al_jazari',
      nameAr: 'إسماعيل الجزري', nameTr: 'El-Cezeri',
      titleAr: 'أبو الروبوتات والهندسة', titleTr: 'Robotik ve Mühendisliğin Babası',
      image: 'https://rize.meb.gov.tr/rista/images/edergi/6-7.jpg',
      bioAr: 'مهندس وعالم ومخترع مسلم، يعتبر من أعظم المهندسين في التاريخ.',
      bioTr: 'Müslüman bir mühendis ve mucittir. Tarihin en büyük mühendislerinden biri olarak kabul edilir.',
      color: '#d35400',
      periodAr: '1136م - 1206م', periodTr: '1136 - 1206',
      fullDescAr: 'بديع الزمان أَبو العز بن إسماعيل بن الرزاز الجزري. هو مهندس وعالم ومخترع مسلم عربي، يعتبر من أعظم المهندسين والميكانيكيين في التاريخ. صمم آلات معقدة جداً مثل الساعات المائية والآلات ذاتية الحركة (الروبوتات الأولى).',
      fullDescTr: 'El-Cezeri, İslam’ın Altın Çağı’nda yaşamış sibernetik ve robotik biliminin kurucusu kabul edilen Müslüman bilim insanı ve mühendistir. Su saatleri ve otomatik makineler gibi son derece karmaşık cihazlar tasarlamıştır.',
      achievementsAr: ['اختراع "ساعة الفيل" المائية العظيمة', 'تطوير مضخات مياه ذاتية الحركة', 'تأليف كتاب "الجامع بين العلم والعمل النافع في صناعة الحيل"'],
      achievementsTr: ['Muhteşem "Filli Su Saati"nin icadı', 'Otomatik su pompalarının geliştirilmesi', '"Makine Yapımında Yararlı Bilgiler ve Uygulamalar" adlı eseri'],
      tagsAr: ['فيزياء', 'ميكانيكا', 'روبوتات'],
      tagsTr: ['Fizik', 'Mekanik', 'Robotik'],
      birthCityAr: 'جيزرة (تركيا)',
      birthCityTr: 'Cizre (Türkiye)',
      mapUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=42.15,37.30,42.22,37.35&layer=mapnik&marker=37.32,42.18'
    },
    {
      id: 'ibn_sina',
      nameAr: 'ابن سينا', nameTr: 'İbn-i Sina',
      titleAr: 'أمير الأطباء', titleTr: 'Hekimlerin Prensi',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Avicenna_Portrait_on_Silver_Vase_-_BuAli_Sina_Monument_-_Hamadan.jpg/640px-Avicenna_Portrait_on_Silver_Vase_-_BuAli_Sina_Monument_-_Hamadan.jpg',
      bioAr: 'عالم وطبيب مسلم، كتابه "القانون في الطب" ظل المرجع الرئيسي في العالم.',
      bioTr: 'Müslüman bir bilim adamı ve doktordur. "El-Kanun fi\'t-Tıb" adlı eseri yüzyıllarca ana referans oldu.',
      color: '#2980b9',
      periodAr: '980م - 1037م', periodTr: '980 - 1037',
      fullDescAr: 'أبو علي الحسين بن عبد الله بن الحسن بن علي بن سينا. هو طبيب وفيلسوف وعالم موسوعي مسلم. يُعرف بـ "أمير الأطباء" و"أبو الطب الحديث". أثرت مؤلفاته في الطب والفلسفة على المدارس الأوروبية لعدة قرون.',
      fullDescTr: 'İbn-i Sina, tıp, felsefe ve bilim alanlarında sayısız eser vermiş Müslüman bir hekim ve filozoftur. Batı dünyasında "Avicenna" olarak bilinir ve tıbbın babası olarak kabul edilir.',
      achievementsAr: ['تأليف موسوعة "القانون في الطب"', 'اكتشاف العدوى وانتقال الأمراض', 'مساهمات كبرى في الفلسفة والرياضيات'],
      achievementsTr: ['"El-Kanun fi\'t-Tıb" ansiklopedisini yazması', 'Bulaşıcı hastalıkların ve enfeksiyonun keşfi', 'Felsefe ve matematikte büyük katkılar'],
      tagsAr: ['طب', 'فلسفة', 'رياضيات'],
      tagsTr: ['Tıp', 'Felsefe', 'Matematik'],
      birthCityAr: 'بخارى (أوزبكستان)',
      birthCityTr: 'Buhara (Özbekistan)',
      mapUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=64.3,39.7,64.5,39.9&layer=mapnik&marker=39.77,64.42'
    },
    {
      id: 'al_khwarizmi',
      nameAr: 'الخوارزمي', nameTr: 'Harezmi',
      titleAr: 'مؤسس علم الجبر', titleTr: 'Cebir\'in Kurucusu',
      image: 'https://www.aljazeera.net/wp-content/uploads/2022/07/رياضيات-خوارزمي-2.jpg',
      bioAr: 'عالم رياضيات وفلك. أسس علم الجبر والخوارزميات التي نستخدمها اليوم.',
      bioTr: 'Matematikçi ve astronomdur. Cebir ve Algoritma bilimlerini kurdu.',
      color: '#27ae60',
      periodAr: '780م - 850م', periodTr: '780 - 850',
      fullDescAr: 'محمد بن موسى الخوارزمي، عالم رياضيات وفلك وجغرافيا مسلم. تُنسب إليه تأسيسات علم الجبر كعلم مستقل، كما أن كلمة "خوارزمية" (Algorithm) مشتقة من اسمه لابتكاره طرق حل المسائل الرياضية خطوة بخطوة.',
      fullDescTr: 'Harezmi, cebir biliminin kurucusu olan Müslüman matematikçi, astronom ve coğrafyacıdır. Bilgisayar bilimlerinin temeli olan "Algoritma" kelimesi onun adından türetilmiştir.',
      achievementsAr: ['تأليف كتاب "الجبر والمقابلة"', 'إدخال الأرقام الهندية العربية إلى العالم (بما فيها الصفر)', 'تأسيس علم الخوارزميات (Algorithms)'],
      achievementsTr: ['"Cebir ve Denklem Hesabı" eseri', 'Hint-Arap rakamlarını dünyaya tanıtması', 'Algoritma biliminin temellerini atması'],
      tagsAr: ['رياضيات', 'فلك', 'جغرافيا'],
      tagsTr: ['Matematik', 'Astronomi', 'Coğrafya'],
      birthCityAr: 'خوارزم (أوزبكستان)',
      birthCityTr: 'Harezm (Özbekistan)',
      mapUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=60.2,41.3,60.5,41.5&layer=mapnik&marker=41.38,60.36'
    },
    {
      id: 'ibn_battuta',
      nameAr: 'ابن بطوطة', nameTr: 'İbn Battuta',
      titleAr: 'أمير الرحالة', titleTr: 'Gezginlerin Emiri',
      image: 'https://i.redd.it/jqa08t03srla1.jpg',
      bioAr: 'أعظم رحالة في التاريخ الإسلامي. جاب العالم القديم وسجل مشاهداته.',
      bioTr: 'İslam tarihinin en büyük gezginidir. Eski dünyayı dolaşmış ve gözlemlerini kaydetmiştir.',
      color: '#8e44ad',
      periodAr: '1304م - 1369م', periodTr: '1304 - 1369',
      fullDescAr: 'محمد بن عبد الله بن محمد اللواتي الطنجي المعروف بابن بطوطة. أمضى 29 عاماً من حياته في السفر، قاطعاً أكثر من 120 ألف كيلومتر، وزار أفريقيا، آسيا، وأوروبا.',
      fullDescTr: 'İbn Battuta, Orta Çağ\'ın en büyük gezginidir. 29 yıl boyunca 120.000 km yol kat etmiş; Asya, Afrika ve Avrupa\'yı gezmiştir.',
      achievementsAr: ['تأليف كتاب "رحلة ابن بطوطة"', 'توثيق دقيق لجغرافية العالم القديم', 'أطول مسافة سفر في العصور الوسطى'],
      achievementsTr: ['"Rıhle" (Yolculuk) kitabını yazması', 'Eski dünyanın coğrafyasını belgelemesi', 'Orta Çağ\'ın en uzun seyahati'],
      tagsAr: ['جغرافيا', 'رحلات', 'تاريخ'],
      tagsTr: ['Coğrafya', 'Seyahat', 'Tarih'],
      birthCityAr: 'طنجة (المغرب)',
      birthCityTr: 'Tanca (Fas)',
      mapUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-5.85,35.70,-5.75,35.80&layer=mapnik&marker=35.76,-5.80'
    },
    {
      id: 'ibn_al_haytham',
      nameAr: 'ابن الهيثم', nameTr: 'İbn-i Heysem',
      titleAr: 'أبو البصريات الحديثة', titleTr: 'Modern Optiğin Babası',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Ibn_al-Haytham.png/640px-Ibn_al-Haytham.png',
      bioAr: 'عالم موسوعي، مؤسس علم البصريات الحديث وأول من شرح كيفية الرؤية.',
      bioTr: 'Modern optik biliminin kurucusu ve görme olayını ilk açıklayan polimattır.',
      color: '#c0392b',
      periodAr: '965م - 1040م', periodTr: '965 - 1040',
      fullDescAr: 'أبو علي الحسن بن الحسن بن الهيثم. عالم موسوعي مسلم قدم إسهامات كبرى في الرياضيات والبصريات والفيزياء. أثبت علمياً أن الضوء ينعكس من الأجسام إلى العين وليس العكس كما كان يُعتقد سابقاً، مما أحدث ثورة في علم البصريات.',
      fullDescTr: 'İbn-i Heysem, matematik, astronomi ve fizik alanlarında büyük katkılar sağlamış Müslüman bir bilim insanıdır. Işığın nesnelerden göze yansıdığını kanıtlayarak optik biliminde devrim yaratmıştır.',
      achievementsAr: ['تأليف كتاب "المناظر" (Book of Optics)', 'اختراع "القمرة" (الكاميرا ذات الثقب)', 'إرساء أسس المنهج العلمي التجريبي'],
      achievementsTr: ['"Kitab el-Menazir" (Optik Kitabı) eseri', 'Karanlık oda (Kamera Obscura) icadı', 'Deneysel bilimsel yöntemin temellerini atması'],
      tagsAr: ['فيزياء', 'بصريات', 'رياضيات'],
      tagsTr: ['Fizik', 'Optik', 'Matematik'],
      birthCityAr: 'البصرة (العراق)',
      birthCityTr: 'Basra (Irak)',
      mapUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=47.7,30.4,47.9,30.6&layer=mapnik&marker=30.50,47.83'
    },
    {
      id: 'abbas_ibn_firnas',
      nameAr: 'عباس بن فرناس', nameTr: 'Abbas İbn Firnas',
      titleAr: 'أول طيار في التاريخ', titleTr: 'Tarihteki İlk Havacı',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Ibn_Firnas_statue.jpg/640px-Ibn_Firnas_statue.jpg',
      bioAr: 'عالم ومخترع أندلسي، اشتهر بأول محاولة طيران ناجحة في التاريخ.',
      bioTr: 'Endülüslü bilim insanı ve mucit, tarihteki ilk başarılı uçuş girişimiyle tanınır.',
      color: '#f39c12',
      periodAr: '810م - 887م', periodTr: '810 - 887',
      fullDescAr: 'أبو القاسم عباس بن فرناس. عالم وشاعر وفيلسوف أندلسي. اشتهر بتصميمه أول جناحين للطيران ومحاولته الطيران الشراعي من على تلة في قرطبة. كما كان مبدعاً في هندسة الزجاج والساعات.',
      fullDescTr: 'Abbas İbn Firnas, Endülüslü bir polimat, şair ve filozoftur. Kurtuba\'da yaptığı ilk uçan kanat tasarımı ve uçuş denemesiyle ünlenmiştir. Ayrıca cam ve saat yapımında uzmandı.',
      achievementsAr: ['القيام بأول محاولة طيران شراعي في التاريخ', 'صناعة الزجاج الشفاف من الحجارة', 'اختراع ساعة مائية تُعرف بـ "الميقاتة"'],
      achievementsTr: ['Tarihteki ilk planör uçuşunu gerçekleştirmesi', 'Taşlardan şeffaf cam üretimi', '"Mikat" adında bir su saati icat etmesi'],
      tagsAr: ['طيران', 'هندسة', 'ميكانيكا'],
      tagsTr: ['Havacılık', 'Mühendislik', 'Mekanik'],
      birthCityAr: 'رندة، الأندلس (إسبانيا)',
      birthCityTr: 'Ronda, Endülüs (İspanya)',
      mapUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-5.20,36.70,-5.10,36.80&layer=mapnik&marker=36.74,-5.16'
    },
    {
      id: 'al_zahrawi',
      nameAr: 'الزهراوي', nameTr: 'Zehravi',
      titleAr: 'أبو الجراحة', titleTr: 'Cerrahi\'nin Babası',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Al-Zahrawi.jpg/640px-Al-Zahrawi.jpg',
      bioAr: 'أعظم الجراحين في العصور الوسطى، صمم أدوات جراحية لا تزال تُستخدم اليوم.',
      bioTr: 'Orta Çağ\'ın en büyük cerrahı; bugün hala kullanılan cerrahi aletler tasarlamıştır.',
      color: '#16a085',
      periodAr: '936م - 1013م', periodTr: '936 - 1013',
      fullDescAr: 'أبو القاسم خلف بن عباس الزهراوي. طبيب وجراح أندلسي، يُعتبر مؤسس علم الجراحة الحديث. موسوعته الطبية "التصريف" كانت المرجع الأول في الجراحة للجامعات الأوروبية طوال 500 عام.',
      fullDescTr: 'Ebu\'l-Kasım el-Zehravi, modern cerrahinin kurucusu kabul edilen Endülüslü hekimdir. "El-Tasrif" adlı ansiklopedisi 500 yıl boyunca Avrupa\'da ana tıp referansı olmuştur.',
      achievementsAr: ['تأليف موسوعة "التصريف لمن عجز عن التأليف"', 'اختراع أكثر من 200 أداة جراحية', 'أول من استخدم خيوط أمعاء الحيوانات لخياطة الجروح الداخلية'],
      achievementsTr: ['"El-Tasrif" adlı 30 ciltlik tıp ansiklopedisini yazması', '200\'den fazla cerrahi alet icat etmesi', 'İç yaraları dikmek için hayvan bağırsağı (katgüt) kullanan ilk kişi'],
      tagsAr: ['طب', 'جراحة', 'صيدلة'],
      tagsTr: ['Tıp', 'Cerrahi', 'Eczacılık'],
      birthCityAr: 'مدينة الزهراء، الأندلس (إسبانيا)',
      birthCityTr: 'Medinetü\'z-Zehra, Endülüs (İspanya)',
      mapUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-4.90,37.85,-4.80,37.90&layer=mapnik&marker=37.88,-4.86'
    }
  ];

  // دالة التنقل لإرسال البيانات لصفحة التفاصيل
  const goToDetails = (scholar) => {
    const dataToPass = {
      name: isRTL ? scholar.nameAr : scholar.nameTr,
      title: isRTL ? scholar.titleAr : scholar.titleTr,
      image: scholar.image,
      color: scholar.color,
      period: isRTL ? scholar.periodAr : scholar.periodTr,
      fullDesc: isRTL ? scholar.fullDescAr : scholar.fullDescTr,
      achievements: isRTL ? scholar.achievementsAr : scholar.achievementsTr,
      tags: isRTL ? scholar.tagsAr : scholar.tagsTr,
      birthCity: isRTL ? scholar.birthCityAr : scholar.birthCityTr,
      mapUrl: scholar.mapUrl,
      isRTL: isRTL
    };
    navigate('/scholar-details', { state: dataToPass });
  };

  return (
    <div style={{...styles.container, direction: isRTL ? 'rtl' : 'ltr'}}>
      <header style={styles.header}>
        <h1 style={styles.mainTitle}>{isRTL ? 'موسوعة العلماء المسلمين' : 'Müslüman Bilim İnsanları'}</h1>
        <button onClick={() => setIsRTL(!isRTL)} style={styles.langBtn}>
          {isRTL ? 'Türkçe\'ye Geç' : 'تحويل للعربية'}
        </button>
      </header>

      <div style={styles.grid}>
        {scholarsData.map((scholar) => (
          <div key={scholar.id} style={styles.card}>
            <img src={scholar.image} alt={scholar.nameAr} style={styles.cardImage} />
            <div style={styles.cardBody}>
              <h2 style={{color: scholar.color, fontSize: '22px', margin: '0 0 5px 0'}}>{isRTL ? scholar.nameAr : scholar.nameTr}</h2>
              <p style={styles.cardTitle}>{isRTL ? scholar.titleAr : scholar.titleTr}</p>
              <p style={styles.cardBio}>{isRTL ? scholar.bioAr : scholar.bioTr}</p>
              <button 
                onClick={() => goToDetails(scholar)} 
                style={{...styles.readMore, backgroundColor: scholar.color}}
              >
                {isRTL ? 'اقرأ المزيد' : 'Daha Fazla Oku'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '40px 20px', backgroundColor: '#fdf6e3', minHeight: '100vh', fontFamily: '"Segoe UI", Tahoma, sans-serif' },
  header: { textAlign: 'center', marginBottom: '40px' },
  mainTitle: { fontSize: '40px', color: '#3e2723', marginBottom: '20px', fontWeight: 'bold' },
  langBtn: { padding: '10px 25px', borderRadius: '20px', border: '2px solid #d4af37', backgroundColor: '#fff', color: '#3e2723', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: '0.3s' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' },
  card: { backgroundColor: '#fffcf5', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', transition: '0.3s', border: '1px solid #e0d4b8' },
  cardImage: { width: '100%', height: '220px', objectFit: 'cover' },
  cardBody: { padding: '25px', textAlign: 'center' },
  cardTitle: { fontWeight: 'bold', color: '#8d6e63', marginBottom: '15px', fontSize: '15px' },
  cardBio: { fontSize: '15px', color: '#5c4033', lineHeight: '1.6', marginBottom: '20px', minHeight: '70px' },
  readMore: { width: '100%', padding: '12px', border: 'none', borderRadius: '12px', color: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'transform 0.2s' }
};

export default Scholars;