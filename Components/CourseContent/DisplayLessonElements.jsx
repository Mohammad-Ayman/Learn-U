import React, { useState } from "react";
import LessonElement from "./LessonElement";

const DisplayLessonElements = () => {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      time: "15 min",
      title:
        "Introduction to React Hooks and State Management in React 17 and 18 (2021) - Tutorial for Beginners",
      completed: false,
    },
    {
      id: 2,
      time: "30 min",
      title: "State and Props",
      completed: true,
    },
    // Add more lessons as needed
  ]);

  const toggleComplete = (id) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === id ? { ...lesson, completed: !lesson.completed } : lesson
      )
    );
  };

  return (
    <ul>
      {lessons.map((lesson) => (
        <LessonElement
          key={lesson.id}
          title={lesson.title}
          time={lesson.time}
          completed={lesson.completed}
          onToggleComplete={() => toggleComplete(lesson.id)}
        />
      ))}
    </ul>
  );
};

export default DisplayLessonElements;
