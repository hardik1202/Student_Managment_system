export default function Footer({ email, year }) {
  return (
    <footer className="site-footer">
      <p>Contact: {email}</p>
      <p>© {year} Faculty of Technology and Engineering, CHARUSAT</p>
    </footer>
  );
}
