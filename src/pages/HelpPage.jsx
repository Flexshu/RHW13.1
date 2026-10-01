export default function HelpPage() {
  return (
    <section className="card">
      <h1>Допомога</h1>
      <ol className="steps">
        <li>Натисніть «Увійти» та введіть email і пароль.</li>
        <li>Відкрийте «Мої завдання», щоб побачити свій список.</li>
        <li>Змінюйте статус завдання кнопкою справа.</li>
        <li>Використовуйте фільтри «Усі», «Активні» та «Виконані».</li>
      </ol>
      <p className="muted">
        Навчальні дані: Sincere@april.biz / task123. Зміни статусу не зберігаються
        після оновлення сторінки.
      </p>
    </section>
  );
}
