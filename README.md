# Lazy Bunny – Фронтенд для платформи перегляду фільмів

## Опис проекту

Lazy Bunny – це інтерактивний веб-сайт для пошуку та перегляду інформації про фільми. Проект був розроблений у рамках вивчення клієнт-серверної архітектури як частина дипломної роботи. Цей репозиторій містить фронтенд-додаток, створений з використанням React.

Додаток дозволяє користувачам реєструватися та авторизуватися, вести список переглянутих фільмів, ставити оцінки, коментувати, а також використовувати сторінку адміністратора та редагувати сторінки фільмів та базу даних.

## Функціонал

- Авторизація та реєстрація
- Профіль користувача
- Каталог фільмів
- Написання коментарів
- Адміністрація фільмів
- Адаптивна верстка

## Технології та стек

- Мова: TypeScript
- Фреймворк: React
- Роутінг: React Router
- Стан: React Context
- Форма: useForm Hook
- Стилі: CSS
- Запити: Fetch
- Аутентификація: JWT

## Figma

[Посилання на Figma](https://www.figma.com/design/lSgKi45c1FHlTY2ZmJVZKe/Untitled?node-id=0-1&node-type=canvas&t=aKdqfdVHJvUOAvpC-0)

## Запуск проекту

1. Клонування репозиторію `git clone`
2. Встановлення залежностей ``npm install``
3. Запуск проекту ```npm run start```

## Структура проекту

 ```mermaid

    graph TD;
    root[Проект] --> public[public/]
    root --> src[src/]
    root --> env[.env]
    root --> gitignore[.gitignore]
    root --> readme[README.md]
    root --> packageLock[package-lock.json]
    root --> package[package.json]
    root --> tsconfig[tsconfig.json]
    src --> context
    src --> hooks
    src --> pages
    src --> shared
    src --> index.tsx
    public[public/] --> img[img/]
    img[img/] --> index.html
    
```

[Посилання на FigJam-схему](https://www.figma.com/board/54Dk4yuXwkKUK6LWMj9ubF/LazyBunny-FrontEnd-Scheme?node-id=0-1&t=BauMz8cwub6znSef-1)

## Команда розробки

- Єгор Гончаров - [GitHub](https://github.com/YehorHoncharov)
- Семен Гераймович - [GitHub](https://github.com/arman455)
- Богдан Рубанов - [GitHub](https://github.com/BohdanRubanov)
- Мирослава Теліус - [GitHub](https://github.com/AsolaRim)