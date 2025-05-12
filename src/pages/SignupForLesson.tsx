import { useState } from "react";
import "../scss/pages/SignupForLesson.scss";
import robot from "../assets/images/robot.png";
import axios from "axios";

const courses = [
  "Робототехника",
  "Живопись для взрослых",
  "Живопись для детей",
  "Шахмат",
  "Английский",
];

const SignupForLesson = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      Name: name,
      SecondName: secondName,
      Phone: phone,
      Age: age,
      Course: course,
    };
    axios
      .post(
        "https://api.sheetbest.com/sheets/df460581-ae28-4cf9-9686-4816f9c0e8f7",
        data
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setName("");
    setSecondName("");
    setPhone("");
    setAge("");
    setCourse("");
  };

  return (
    <div className="signup-lesson-bg">
      <h1 className="signup-lesson-title">Приглашаем на первый урок!</h1>
      <div className="signup-lesson-content">
        <form className="signup-lesson-form">
          <div className="form-group">
            <label>Имя</label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Patrik"
            />
          </div>

          <div className="form-group">
            <label>Фамилия</label>
            <input
              name="secondName"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
              placeholder="Handsom"
            />
          </div>

          <div className="form-group">
            <label>Телефон</label>
            <input
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 99-888-77-77"
              type="tel"
            />
          </div>

          <div className="form-row">
            <div className="form-group age-group">
              <label>Дата рождения</label>
              <input
                name="age"
                type="date"
                value={age || ""}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="form-group course-group">
              <label style={{ visibility: "hidden" }}>Курс</label>
              <div
                className={`custom-dropdown ${dropdownOpen ? "open" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="dropdown-selected">
                  {course || "Выберите курс"}
                  <span className="dropdown-arrow">
                    {dropdownOpen ? "▲" : "▼"}
                  </span>
                </div>
                {dropdownOpen && (
                  <div className="dropdown-list">
                    {courses.map((c) => (
                      <div
                        key={c}
                        className="dropdown-item"
                        onClick={() => setCourse(c)}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
        <img src={robot} alt="robot" />
      </div>
      <div className="form-actions">
        <button type="button" className="back-btn">
          НАЗАД
        </button>
        <button type="button" className="submit-btn" onClick={handleSubmit}>
          ЗАПИСАТЬСЯ
        </button>
      </div>

      <div className="yellow-corner top-right" />
      <div className="yellow-corner bottom-left" />
    </div>
  );
};

export default SignupForLesson;
