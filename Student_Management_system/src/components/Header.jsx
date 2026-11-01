export default function Header({ name, themeColor }) {
  return (
    <header className="top" style={{ borderTopColor: themeColor }}>
      <h1 style={{ color: themeColor }}>{name}</h1>
      <p>CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY</p>
    </header>
  );
}
