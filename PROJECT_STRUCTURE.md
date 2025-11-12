# 📁 Структура проекта GrowChief

```
grow/
│
├── 📄 package.json              # Зависимости и скрипты проекта
├── 📄 package-lock.json         # Фиксированные версии зависимостей
├── 📄 tsconfig.json             # Конфигурация TypeScript
├── 📄 next.config.ts            # Конфигурация Next.js
├── 📄 next-env.d.ts             # Типы Next.js
├── 📄 eslint.config.mjs         # Конфигурация ESLint
├── 📄 postcss.config.mjs        # Конфигурация PostCSS
├── 📄 README.md                 # Документация проекта
├── 📄 PROJECT_PLAN.md           # План проекта
│
├── 📂 config/                   # Конфигурационные файлы
│   └── hubspot.ts              # Конфигурация HubSpot
│
├── 📂 public/                   # Статические файлы
│   ├── 📂 icons/               # Иконки
│   │   ├── burger.svg
│   │   ├── close.svg
│   │   └── growlogo.svg
│   ├── 📂 images/              # Изображения
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
└── 📂 src/                      # Исходный код
    │
    ├── 📂 app/                  # Next.js App Router
    │   ├── layout.tsx          # Корневой layout
    │   ├── page.tsx             # Главная страница
    │   ├── favicon.ico          # Иконка сайта
    │   └── 📂 styles/           # Глобальные стили
    │       ├── globals.css      # Глобальные стили + Tailwind @theme
    │       ├── button.css       # Стили для кнопок
    │       └── input.css        # Стили для инпутов
    │
    ├── 📂 components/           # React компоненты
    │   ├── 📂 content/         # Контентные компоненты
    │   │   └── (пусто)
    │   │
    │   ├── 📂 forms/           # Компоненты форм
    │   │   └── (пусто)
    │   │
    │   ├── 📂 layout/          # Layout компоненты
    │   │   └── Header.tsx     # Хедер сайта
    │   │
    │   ├── 📂 sections/        # Секции страниц
    │   │   └── (пусто)
    │   │
    │   └── 📂 ui/              # UI компоненты
    │       ├── Button.tsx      # Кнопка
    │       ├── CustomLink.tsx  # Кастомная ссылка
    │       └── Input.tsx       # Инпут
    │
    ├── 📂 hooks/                # React хуки
    │   └── (пусто)
    │
    ├── 📂 lib/                  # Утилиты и библиотеки
    │   └── utils.ts            # Вспомогательные функции
    │
    └── 📂 types/                # TypeScript типы
        └── (пусто)
```

## 🏗️ Архитектура проекта

### **Технологический стек:**

- ⚛️ **Next.js 16.0.0** (App Router)
- ⚛️ **React 19.2.0**
- 📘 **TypeScript 5**
- 🎨 **Tailwind CSS 4** (с CSS-first конфигурацией)
- 🔧 **PostCSS** с Autoprefixer
- ✅ **ESLint** для линтинга

### **Структура по назначению:**

#### **🎯 App Router (`src/app/`)**

Современный роутинг Next.js с server components:

- `layout.tsx` - корневой layout с шрифтами и метаданными
- `page.tsx` - главная страница
- `styles/` - глобальные стили с Tailwind @theme конфигурацией

#### **🧩 Components (`src/components/`)**

Модульная структура компонентов:

- `ui/` - базовые UI компоненты (Button, Input, CustomLink)
- `layout/` - компоненты макета (Header)
- `forms/` - компоненты форм (готово для HubSpot форм)
- `content/` - контентные компоненты
- `sections/` - секции страниц

#### **🔧 Утилиты (`src/lib/`, `src/hooks/`, `src/types/`)**

- `lib/utils.ts` - вспомогательные функции
- `hooks/` - кастомные React хуки
- `types/` - TypeScript типы и интерфейсы

#### **⚙️ Конфигурация (`config/`, корень)**

- `config/hubspot.ts` - настройки HubSpot интеграции
- Конфигурационные файлы для Next.js, TypeScript, ESLint, PostCSS

#### **📦 Статические ресурсы (`public/`)**

- Иконки и изображения
- SVG файлы для UI

---

**📌 Примечания:**

- Проект использует **Tailwind CSS v4** с CSS-first подходом (нет `tailwind.config.ts`)
- Конфигурация цветов и темы находится в `globals.css` через директиву `@theme`
- Структура готова для добавления HubSpot форм в `src/components/forms/`
- Пустые директории (`content/`, `forms/`, `sections/`, `hooks/`, `types/`) готовы для будущего функционала
