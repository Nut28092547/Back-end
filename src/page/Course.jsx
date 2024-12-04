import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const CourseCard = (props) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Course Image */}
      <div className="mb-4">
        <img
          src={props.picture || "default-image-url.jpg"}
          alt="course"
          className="w-32 h-32 object-cover rounded-full shadow-md"
        />
      </div>
      {/* Course Title */}
      <h2 className="text-xl font-bold text-blue-700 mb-2">{props.title}</h2>
      {/* Course Detail */}
      <p className="text-gray-600 mb-4">{props.detail}</p>
      {/* Link to Detail */}
      <NavLink
        to={"/course/" + props.id}
        className="px-6 py-2 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition duration-300"
      >
        เนื้อหาในหลักสูตร
      </NavLink>
    </div>
  );
};

const Course = () => {
  const [data, setData] = useState([]);

  const callApi = async () => {
    try {
      const res = await axios.get("https://api.codingthailand.com/api/course");
      const data_format = res.data.data; // Assuming res.data.data is an array of courses
      setData(data_format);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="p-8 bg-blue-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        คอร์สการสอน
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Course;
