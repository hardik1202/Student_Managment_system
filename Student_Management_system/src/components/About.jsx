export default function About({ college }) {
  return (
    <section className="card">
      <h2>About this system</h2>
      <p>
        This Student Management System is built for {college}. Faculty can
        register students, keep course records, and review profiles from a
        single React interface connected to a Node and MongoDB backend.
      </p>
    </section>
  );
}
