import { courseworkGroups } from "../data/portfolio";
import "./coursework.css";

export default function Coursework() {
  return <section className="coursework-block" id="coursework" aria-labelledby="coursework-title">
    <div className="eyebrow">PENN STATE · ACADEMIC FOUNDATIONS</div>
    <h3 id="coursework-title">Relevant coursework</h3>
    <p className="coursework-intro">Computer science, mathematics, and the systems behind the software. Current and planned classes are labeled below.</p>
    <div className="coursework-grid">{courseworkGroups.map(group =>
      <section className="coursework-group" key={group.id} aria-labelledby={`coursework-${group.id}`}>
        <h4 id={`coursework-${group.id}`}>{group.title}</h4>
        <ul className="coursework-list">{group.courses.map(course =>
          <li key={course.code}><span className="course-code">{course.code}</span><span className="course-name">{course.title}</span>{course.status && <span className="course-status">{course.status}</span>}</li>,
        )}</ul>
      </section>,
    )}</div>
  </section>;
}
