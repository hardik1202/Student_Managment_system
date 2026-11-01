import { useEffect, useState } from "react";
import {
  createStudent,
  deleteStudent,
  generateDescription,
  getStudents,
  updateStudent,
} from "../api";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import Toast from "../components/Toast";

const emptyForm = {
  name: "",
  course: "",
  year: "1st",
  description: "",
  priority: "medium",
};

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(""), 2200);
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    getStudents()
      .then((data) => {
        if (active) setStudents(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const askAi = async () => {
    if (!form.name) return;
    setAiLoading(true);
    try {
      const data = await generateDescription(form);
      if (data.description) {
        setForm((prev) => ({ ...prev, description: data.description }));
        showToast(data.fallback ? "Used a local fallback description" : "AI suggestion ready — review it");
      } else {
        showToast(data.error || "AI is unavailable");
      }
    } catch (err) {
      showToast(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const save = async () => {
    if (!form.name || !form.course) return;
    setSaving(true);
    try {
      if (editingId) {
        const updated = await updateStudent(editingId, form);
        setStudents((list) => list.map((s) => (s._id === editingId ? updated : s)));
        showToast("Student updated");
      } else {
        const created = await createStudent(form);
        setStudents((list) => [created, ...list]);
        showToast("Student added");
      }
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      showToast(err.message);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (student) => {
    setEditingId(student._id);
    setForm({
      name: student.name,
      course: student.course,
      year: student.year,
      description: student.description || "",
      priority: student.priority || "medium",
    });
  };

  const remove = async (student) => {
    if (!window.confirm(`Delete ${student.name}?`)) return;
    try {
      await deleteStudent(student._id);
      setStudents((list) => list.filter((s) => s._id !== student._id));
      showToast("Student deleted");
    } catch (err) {
      showToast(err.message);
    }
  };

  if (loading) return <Spinner label="Loading students..." />;
  if (error) {
    return (
      <div className="page">
        <ErrorMessage message={error} onRetry={load} />
      </div>
    );
  }

  const visible = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  const highPriority = students.filter((s) => s.priority === "high").length;
  const courses = new Set(students.map((s) => s.course)).size;

  return (
    <div className="page">
      <header className="dashboard-heading">
        <div>
          <div className="eyebrow">ACADEMIC OPERATIONS</div>
          <h1>Student directory</h1>
          <p className="lead">Review, update, and keep every profile ready for reference.</p>
        </div>
        <span className="status-pill">● Live database</span>
      </header>
      <div className="stat-grid">
        <div className="stat-card"><span>Total students</span><strong>{students.length}</strong><small>Active records</small></div>
        <div className="stat-card"><span>Courses covered</span><strong>{courses}</strong><small>Across the directory</small></div>
        <div className="stat-card"><span>High priority</span><strong>{highPriority}</strong><small>Needs attention</small></div>
      </div>

      <section className="card editor-card">
        <div className="section-heading"><div><div className="eyebrow">{editingId ? "UPDATE RECORD" : "NEW RECORD"}</div><h2>{editingId ? "Edit student details" : "Add a student"}</h2></div></div>
        <div className="add">
          <input name="name" placeholder="Student name" value={form.name} onChange={handleChange} />
          <input name="course" placeholder="Course" value={form.course} onChange={handleChange} />
          <select name="year" value={form.year} onChange={handleChange}><option>1st</option><option>2nd</option><option>3rd</option><option>4th</option></select>
          <select name="priority" value={form.priority} onChange={handleChange}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
          <button type="button" onClick={save} disabled={saving}>{editingId ? "Save changes" : "Add student"}</button>
        </div>

        <textarea name="description" placeholder="Profile description" value={form.description} onChange={handleChange} rows={3} />
        <div className="row"><button type="button" className="ghost" onClick={askAi} disabled={aiLoading || !form.name}>{aiLoading ? "Generating..." : "Generate description"}</button><p className="disclaimer">AI text is a suggestion only. Review before saving.</p></div>
      </section>

      <section className="card directory-card">
        <div className="section-heading"><div><div className="eyebrow">DIRECTORY</div><h2>All students</h2></div><input className="search" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {visible.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td>{s.year}</td>
              <td className="actions">
                <button type="button" className="ghost" onClick={() => startEdit(s)}>
                  Edit
                </button>
                <button type="button" className="del" onClick={() => remove(s)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {visible.length === 0 && (
            <tr>
              <td colSpan="4" className="empty">
                No students found. Add one above.
              </td>
            </tr>
          )}
        </tbody>
        </table>
      </section>
      <Toast text={toast} />
    </div>
  );
}
