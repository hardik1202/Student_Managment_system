import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";

const programmes = [
  "Information Technology",
  "Computer Engineering",
  "Computer Science & Engineering",
  "Artificial Intelligence & Machine Learning",
  "Student records CRUD",
  "JWT protected staff login",
];

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <div className="eyebrow">CHARUSAT · FACULTY OF TECHNOLOGY</div>
          <h1>Student records, made clear.</h1>
          <p className="lead">A focused workspace for faculty teams to organize student profiles, courses, and academic notes.</p>
        </div>
        <div className="hero-mark">SMS<span>01</span></div>
      </section>
      <Header name="Student Management System" themeColor="#1d6b5c" />
      <About college="CHARUSAT Faculty of Technology and Engineering" />
      <Skills skillList={programmes} />
      <Footer email="office.fte@charusat.ac.in" year={2026} />
    </div>
  );
}
