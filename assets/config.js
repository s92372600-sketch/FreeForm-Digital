/* FREEFORM DIGITAL — единая точка изменения тарифов, контактов и срочности */
window.CALC_CONFIG = Object.freeze({
  studio:'FREEFORM DIGITAL', phone:'+7 771 145 5075', phoneDigits:'77711455075', pagePrice:3500, includedPages:3,
  tariffs:{
    start:{label:'START',price:25000,term:'3–5 дней',hint:'Чёткий первый запуск',desc:'Стильный лендинг или небольшой сайт, который объясняет главное.',features:['От 1 до 3 страниц','Адаптивный дизайн','Авторская композиция','Базовые анимации','SEO-база','Форма заявки через WhatsApp']},
    business:{label:'BUSINESS',price:45000,term:'7–10 дней',hint:'Выбор для бизнеса',desc:'Полноценный сайт, который рассказывает об услугах и приводит заявки.',features:['Индивидуальная подача','Проработка до 5 страниц','Блоки услуг и преимуществ','Галерея работ','Удобная навигация','Адаптив и SEO-база']},
    premium:{label:'PREMIUM',price:75000,term:'14–21 день',hint:'Максимум впечатления',desc:'Дизайн с характером, точная типографика и продуманные интерактивные секции.',features:['Индивидуальная дизайн-система','Проработка до 8 страниц','Сложные интерактивные блоки','Авторские переходы','Приоритет визуальных деталей','Адаптив и оптимизация']},
    custom:{label:'CUSTOM',price:100000,term:'после брифа',hint:'За пределами шаблона',desc:'Нестандартные сценарии, индивидуальные механики и глубокая проработка.',features:['Исследование задачи','Индивидуальная структура','Нестандартный интерфейс','Проектирование логики','Поэтапная реализация','Объём по техзаданию']}
  },
  options:[
    {id:'catalog',label:'Каталог товаров',price:15000,description:'Раздел с товарами, фотографиями, ценами и категориями.'},{id:'booking',label:'Бронирование',price:22000,description:'Выбор даты и отправка заявки на бронь.'},
    {id:'forms',label:'Формы и заявки',price:5000,description:'Формы для обратной связи и сбора заявок.'},{id:'language',label:'Дополнительный язык',price:12000,description:'Переключение сайта на дополнительный язык.'},
    {id:'seo',label:'SEO-настройка',price:10000,description:'Настройка заголовков, описаний и индексации.'},{id:'animations',label:'Анимации PRO',price:16000,description:'Более сложные анимации и переходы между блоками.'},
    {id:'3d',label:'Интерактивный 3D',price:35000,description:'Вращаемые 3D-объекты, реагирующие на действия.'},{id:'cms',label:'CMS',price:25000,description:'Панель управления для изменения контента.'},
    {id:'analytics',label:'Аналитика',price:7000,description:'Подключение статистики посещений и событий.'},{id:'search',label:'Поиск и фильтры',price:12000,description:'Быстрый поиск по каталогу с фильтрацией.'},
    {id:'account',label:'Личный кабинет',price:45000,description:'Регистрация, вход и персональные страницы.'},{id:'content',label:'Наполнение контентом',price:9000,description:'Добавление ваших текстов, фото и материалов.'},
    {id:'support',label:'Поддержка 1 месяц',price:10000,description:'Исправления и консультации после запуска в течение месяца.'},{id:'whatsapp',label:'Интеграция WhatsApp',price:4000,description:'Кнопки связи и готовые сообщения в WhatsApp.'},
    {id:'ecommerce',label:'Интернет-магазин с корзиной',price:35000,description:'Корзина и оформление заказа без оплаты по умолчанию.'},
    {id:'payment',label:'Подключение онлайн-оплаты',price:24000,description:'Интеграция платёжного провайдера по согласованию.'},
    {id:'crm',label:'Интеграция CRM',price:28000,description:'Передача заявок в систему работы с клиентами.'},
    {id:'telegram',label:'Telegram-уведомления',price:6500,description:'Уведомления о новых заявках в Telegram.'},
    {id:'map',label:'Карта и точки продаж',price:5500,description:'Карта с адресами и контактами филиалов.'},
    {id:'reviews',label:'Блок отзывов с управлением',price:9000,description:'Страница отзывов с возможностью их редактирования.'},
    {id:'blog',label:'Новости и блог',price:11500,description:'Раздел публикаций, статей и обновлений.'},
    {id:'faq',label:'Интерактивный FAQ',price:4000,description:'Раскрывающиеся ответы на частые вопросы.'},
    {id:'quiz',label:'Квиз для сбора заявок',price:10000,description:'Пошаговый опрос для подбора услуги и заявки.'},
    {id:'chat',label:'Онлайн-чат',price:9500,description:'Виджет переписки с посетителем сайта.'},
    {id:'wishlist',label:'Избранное',price:11500,description:'Сохранение понравившихся товаров или объектов.'},
    {id:'compare',label:'Сравнение товаров',price:14000,description:'Таблица сравнения характеристик товаров.'},
    {id:'calendar',label:'Календарь событий',price:16000,description:'Календарь мероприятий с карточками событий.'},
    {id:'bookingadvanced',label:'Бронирование с расписанием',price:18000,description:'Бронь с доступными временными слотами.'},
    {id:'accessibility',label:'Улучшенная доступность',price:12000,description:'Улучшение навигации с клавиатуры и читаемости.'},
    {id:'speed',label:'Расширенная оптимизация',price:12000,description:'Сжатие изображений и ускорение загрузки страниц.'},
    {id:'multiregion',label:'Несколько городов / регионов',price:16000,description:'Разделы под разные города с уникальными данными.'},
    {id:'email',label:'Email-рассылки и подписка',price:11000,description:'Форма подписки и подключение рассылочного сервиса.'},
    {id:'copywriting',label:'Копирайтинг для страниц',price:14000,description:'Написание текстов для ключевых страниц сайта.'},
    {id:'pwa',label:'Установка сайта как приложения',price:21000,description:'Возможность установить сайт на экран смартфона.'},
    {id:'security',label:'Дополнительная защита форм',price:7500,description:'Дополнительная валидация и защита от спама.'},
    {id:'interactive',label:'Нестандартная интерактивная секция',price:14500,description:'Уникальный интерактивный блок под вашу идею.'},
    {id:'video',label:'Видеообложка с оптимизацией',price:12000,description:'Оптимизированный видеоролик в первом экране.'},
    {id:'branding',label:'Мини-фирменный стиль',price:22000,description:'Базовые цвета, шрифты и элементы визуального стиля.'}
  ],
  urgency:[{id:'normal',label:'Без срочности',rate:0},{id:'fast',label:'Срочно',rate:.3},{id:'very',label:'Очень срочно',rate:.6},{id:'express',label:'Экспресс: сегодня-завтра',rate:1}],
  projects:[
    {id:'haven',name:'HAVEN',category:'digital',kind:'Платформа аренды жилья',subtitle:'Destination-driven hospitality',description:'Лёгкий цифровой опыт для поиска необычных квартир и домов по всему миру.',image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',fallback:'assets/media/haven.svg',demo:'demos/haven/index.html',pages:13,stack:'UX / UI · Marketplace · Многостраничность',challenge:'Создать спокойный и атмосферный интерфейс, в котором выбор жилья ощущается путешествием.',solution:'Большие визуальные поверхности, лаконичная навигация, направления, карточки объектов и демонстрационные сценарии бронирования.',shots:['Главная и направления','Каталог объектов','Избранное и сравнение','Карточка жилья','Путешествия и журнал']},
    {id:'moko',name:'MOKO COFFEE',category:'brand',kind:'Сайт кофейни',subtitle:'An editorial coffee experience',description:'Тёплый editorial-дизайн, крупные фото и живой характер кофейни.',image:'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=85',fallback:'assets/media/moko.webp',demo:'demos/MOKO_PREMIUM/index.html',pages:10,stack:'Branding · UI · Editorial',challenge:'Передать атмосферу кофейни через экран, сохранив удобное изучение меню и страниц.',solution:'Локальная фотоподборка, контрастная типографика, выразительные карточки и насыщенная многостраничная структура.',shots:['Главная с фото','Меню и каталог','История бренда','Кофейный журнал','Контакты']},
    {id:'apex',name:'APEX AUTO',category:'motion',kind:'Автомобильный проект',subtitle:'Designed for movement',description:'Скорость, геометрия и выразительная подача автомобильного бренда.',image:'https://images.unsplash.com/photo-1508974491678-7ec251d629fd?auto=format&fit=crop&w=1400&q=85',fallback:'assets/media/apex.svg',demo:'demos/apex-auto/index.html',pages:6,stack:'Creative Dev · Motion · Automotive',challenge:'Превратить технологичную тематику в динамичный, но читаемый цифровой интерфейс.',solution:'Контрастная сетка, энергичные переходы, крупные заголовки и выразительные интерактивные элементы.',shots:['Главная','Услуги','Проекты','Процесс','Контакты']},
    {id:'blade',name:'BLADE & CROWN',category:'brand',kind:'Премиальный барбершоп',subtitle:'Crafted with character',description:'Темный люкс, бронзовые детали и характер сильного бренда.',image:'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=85',fallback:'assets/media/blade.svg',demo:'demos/blade-crown/index.html',pages:6,stack:'Branding · Experience · Web',challenge:'Создать сильный визуальный язык барбершопа без ощущения шаблонного сайта.',solution:'Сдержанная палитра, выразительная типографика, детальные страницы услуг, мастеров и галереи.',shots:['Главная','Услуги','Мастера','Галерея','Контакты']}
  ]
});
