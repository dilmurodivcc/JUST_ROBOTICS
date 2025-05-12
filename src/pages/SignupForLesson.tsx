import "../scss/pages/SignupForLesson.scss";
import robot from "../assets/images/robot.png";
import { useSignupForm, courses } from "../hooks/useSignupForm";
import { NumericFormat } from "react-number-format";
import { Toaster } from "sonner";

const SignupForLesson = () => {
  const {
    dropdownOpen,
    setDropdownOpen,
    name,
    setName,
    secondName,
    setSecondName,
    phone,
    setPhone,
    age,
    setAge,
    course,
    setCourse,
    handleSubmit,
    isSubmitting,
  } = useSignupForm();

  return (
    <form className="signup-lesson-bg" onSubmit={handleSubmit}>
      <Toaster position="top-right" expand={false} richColors closeButton />

      <h1 className="signup-lesson-title">Приглашаем на первый урок!</h1>
      <div className="signup-lesson-content">
        <div className="signup-lesson-form">
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
            <NumericFormat
              name="phone"
              value={phone}
              onValueChange={(values) => setPhone(values.value)}
              placeholder="+998 99 888 77 77"
              className="phone-input"
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
        </div>
        <img src={robot} alt="robot" />
      </div>
      <div className="form-actions">
        <button type="button" className="back-btn">
          НАЗАД
        </button>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "ОТПРАВКА..." : "ЗАПИСАТЬСЯ"}
        </button>
      </div>

      <div className="yellow-corner top-right" />
      <div className="yellow-corner bottom-left" />
    </form>
  );
};

export default SignupForLesson;
