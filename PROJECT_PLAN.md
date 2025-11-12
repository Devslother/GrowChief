# Grow - Project Development Plan

## Обзор проекта

Разработка веб-платформы Grow на базе React, Next.js 14+ и TailwindCSS с интеграцией HubSpot форм для различных типов контента.

## Технологический стек

### Основные технологии

- **React 19** - UI библиотека
- **Next.js 16** - React фреймворк (App Router с Turbopack)
- **TypeScript** - Типизация
- **TailwindCSS 4** - CSS фреймворк (новая версия)
- **HubSpot API** - Интеграция форм

### Дополнительные инструменты

- **React Hook Form** - Управление формами
- **Zod** - Валидация схем
- **Framer Motion** - Анимации
- **Next/Image** - Оптимизация изображений
- **Axios** - HTTP запросы
- **TanStack Query** - Управление состоянием сервера
- **@tailwindcss/postcss** - PostCSS плагин для TailwindCSS 4

## Структура проекта

```
Grow/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Главный layout
│   │   ├── page.tsx                   # Главная страница
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── content/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx           # Динамический контент
│   │   │   ├── videos/
│   │   │   │   └── page.tsx
│   │   │   └── resources/
│   │   │       └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── hubspot/
│   │   │       └── route.ts           # API для HubSpot
│   │   └── styles/
│   │       └── globals.css
│   ├── components/
│   │   ├── ui/                        # Базовые UI компоненты
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Modal.tsx
│   │   ├── forms/                     # Формы HubSpot
│   │   │   ├── VideoLeadForm.tsx     # Форма для видео контента
│   │   │   ├── ResourceDownloadForm.tsx  # Форма для важных ресурсов
│   │   │   ├── ContactForm.tsx       # Форма контакта
│   │   │   └── NewsletterForm.tsx    # Форма без скачиваний
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── content/
│   │   │   ├── VideoPlayer.tsx
│   │   │   ├── ResourceCard.tsx
│   │   │   └── ContentGrid.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── Features.tsx
│   │       └── Testimonials.tsx
│   ├── lib/
│   │   ├── hubspot.ts                # HubSpot API клиент
│   │   ├── utils.ts                  # Утилиты
│   │   └── validations.ts            # Схемы валидации
│   ├── hooks/
│   │   ├── useHubSpot.ts
│   │   └── useContent.ts
│   └── types/
│       ├── content.ts                # Типы контента
│       ├── forms.ts                  # Типы форм
│       └── hubspot.ts                # Типы HubSpot
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── config/
│   └── hubspot.ts                # Конфигурация HubSpot
├── tsconfig.json
├── next.config.ts
└── package.json

```

## Этапы разработки

### Этап 1: Инициализация проекта (1-2 часа)

1. ✅ Создать Next.js проект с TypeScript
2. ✅ Настроить TailwindCSS
3. ✅ Установить необходимые зависимости
4. ✅ Настроить структуру папок
5. ✅ Настроить базовую конфигурацию

### Этап 2: Дизайн система и UI компоненты (4-6 часов)

1. Анализ Figma дизайна
2. Создание базовых UI компонентов:
   - Button
   - Input, Textarea, Select
   - Card, Modal, Dialog
   - Badge, Label
3. Настройка Tailwind конфига под дизайн
4. Создание кастомных цветов, типографики
5. Создание layout компонентов (Header, Footer)

### Этап 3: HubSpot интеграция (3-4 часа)

1. Настройка HubSpot API ключей
2. Создание типизированных форм:
   - Видео форма (lead capture без download)
   - Ресурс форма (прямой редирект на файл)
   - Контакт форма (CRM интеграция)
   - Блог/статья форма (без файлов)
3. Валидация форм с Zod
4. Обработка отправки данных

### Этап 4: Контент страницы (6-8 часов)

1. Главная страница (Hero, Features, Testimonials)
2. Страница "О нас"
3. Контент страницы с динамическим рендерингом:
   - Видео контент
   - Ресурсы с download
   - Статьи/блоги
4. Страница категорий контента
5. Individual страницы (blog post, video, resource)

### Этап 5: Контент-менеджмент (4-5 часов)

1. Система управления контентом
2. Динамические роуты для контента
3. SEO оптимизация (metadata, sitemap)
4. Оптимизация изображений
5. Структурированные данные (Schema.org)

### Этап 6: Функциональность и интерактивность (3-4 часа)

1. Поиск контента
2. Фильтрация и сортировка
3. Пагинация
4. Анимации и переходы
5. Адаптивность (mobile-first)

### Этап 7: Оптимизация и тестирование (2-3 часа)

1. Performance оптимизация
2. Lighthouse аудит
3. Тестирование форм
4. Кросс-браузерное тестирование
5. Исправление багов

### Этап 8: Деплой (1-2 часа)

1. Подготовка к продакшену
2. Настройка environment переменных
3. Деплой на Vercel/Netlify
4. Настройка домена
5. Мониторинг и аналитика

## HubSpot Forms типы (по памяти)

### 1. Video Lead Form

- **Назначение**: Видео контент
- **Особенности**: Lead capture БЕЗ скачивания файлов
- **Поля**: Name, Email (базовые)

### 2. Resource Download Form

- **Назначение**: Важные ресурсы
- **Особенности**: Прямой редирект на файл после заполнения
- **Поля**: Name, Email, Company

### 3. Contact Form

- **Назначение**: Контактные страницы
- **Особенности**: Простая CRM интеграция
- **Поля**: Name, Email, Phone, Message

### 4. Newsletter/Content Form

- **Назначение**: Статьи, блоги без файлов
- **Особенности**: Подписка на контент
- **Поля**: Name, Email

## Ключевые особенности

### Performance

- Server-side rendering (SSR)
- Static generation где возможно
- Image optimization
- Code splitting
- Lazy loading

### UX/UI

- Responsive дизайн
- Плавные анимации
- Accessibility (WCAG 2.1)
- Loading states
- Error handling

### SEO

- Semantic HTML
- Meta tags
- Open Graph
- Structured data
- Sitemap.xml
- robots.txt

### Security

- Environment variables
- CSRF protection
- Input validation
- Rate limiting (API)

## Зависимости для установки

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.2.0",
    "tailwindcss": "^3.3.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "framer-motion": "^10.16.0",
    "axios": "^1.6.0",
    "@tanstack/react-query": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

## Переменные окружения

```env
# HubSpot
HUBSPOT_API_KEY=your_api_key
HUBSPOT_PORTAL_ID=your_portal_id

# Environment
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Приоритеты разработки

1. **P0 (Critical)**: Базовая структура, главная страница, базовые формы HubSpot
2. **P1 (High)**: Контент страницы, навигация, адаптивность
3. **P2 (Medium)**: Поиск, фильтры, анимации
4. **P3 (Low)**: Дополнительные фичи, аналитика

## Оценка времени

- **Минимальный MVP**: 15-20 часов
- **Полная версия**: 25-30 часов
- **С рефакторингом**: 35-40 часов

## Следующие шаги

1. Согласовать план с дизайном
2. Начать с Этапа 1: Инициализация
3. Регулярно проверять соответствие с Figma
4. Тестировать HubSpot формы на каждом этапе

---

**Дата создания**: {{ current_date }}
**Версия плана**: 1.0
