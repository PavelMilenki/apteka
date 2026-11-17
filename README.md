# Каталог Apteka.by

Фронтенд тестового задания: страница каталога на Next.js с фильтрами по характеристикам, сортировкой и пагинацией.

- **Демо:** [https://apteka-cyan.vercel.app](https://apteka-cyan.vercel.app)
- **Репозиторий:** [https://github.com/PavelMilenki/apteka](https://github.com/PavelMilenki/apteka)

## Стек

- Next.js (App Router) + TypeScript
- Tailwind CSS
- nuqs для состояния в URL

## Запуск

```bash
npm i
npm run dev
```

Приложение откроется на [http://localhost:3000](http://localhost:3000).

Данные по умолчанию берутся с `https://front-test-beryl.vercel.app/api/products`.

Чтобы указать другой адрес API, скопируйте `.env.example` в `.env.local`:

```bash
API_URL=https://front-test-beryl.vercel.app/api/products
```

## Функции

- Сортировка: по релевантности (порядок API), сначала дешевые, сначала дорогие
- Фильтры по характеристикам товара с бэкенда (без фильтра по цене)
- Активные фильтры в виде чипов
- Пагинация: 12 товаров на странице, 4 в ряд
- Состояние фильтров, сортировки, вида и страницы в URL

Дополнительно к ТЗ (по макету apteka.by):

- Переключение сетка / список
- Избранное и кнопка «В корзину» (локально, без отдельных страниц)
