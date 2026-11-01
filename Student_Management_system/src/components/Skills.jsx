export default function Skills({ skillList }) {
  return (
    <section className="card">
      <h2>Programmes & capabilities</h2>
      <ul className="skill-list">
        {skillList.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}
