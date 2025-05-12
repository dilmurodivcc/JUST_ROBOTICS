import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const courses = [
  "Робототехника",
  "Живопись для взрослых",
  "Живопись для детей",
  "Шахмат",
  "Английский",
];

export const useSignupForm = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    if (!name.trim()) {
      toast.error("Имя обязательно");
      return false;
    }
    if (name.length < 2) {
      toast.error("Имя должно быть не менее 2 символов");
      return false;
    }

    if (!secondName.trim()) {
      toast.error("Фамилия обязательна");
      return false;
    }
    if (secondName.length < 2) {
      toast.error("Фамилия должна быть не менее 2 символов");
      return false;
    }

    if (!phone.trim()) {
      toast.error("Телефон обязателен");
      return false;
    }
    
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      toast.error("Телефон должен содержать минимум 12 цифр");
      return false;
    }

    if (!age) {
      toast.error("Дата рождения обязательна");
      return false;
    }
    
    const birthDate = new Date(age);
    const today = new Date();
    let ageInYears = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      ageInYears--;
    }
    
    if (ageInYears < 4 || ageInYears > 100) {
      toast.error("Возраст должен быть от 4 до 100 лет");
      return false;
    }

    if (!course) {
      toast.error("Выберите курс");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const data = {
      Name: name,
      SecondName: secondName,
      Phone: phone,
      Age: age,
      Course: course,
    };
    
    try {
      await axios.post(
        "https://api.sheetbest.com/sheets/df460581-ae28-4cf9-9686-4816f9c0e8f7",
        data
      );
      
      toast.success("Форма успешно отправлена!");
      
      // Reset form
      setName("");
      setSecondName("");
      setPhone("+998");
      setAge("");
      setCourse("");
    } catch (err) {
      console.log(err);
      toast.error("Произошла ошибка при отправке формы. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
    isSubmitting
  };
}; 