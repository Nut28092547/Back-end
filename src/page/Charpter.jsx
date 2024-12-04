import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Charpter = () => {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const callApi = async () => {
    try {
      const res = await axios.get(
        `https://api.codingthailand.com/api/course/${id}`
      );
      setData(res.data.data); // Save data to state
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="p-4">
      <h1 className="border-4 border-blue-300 text-3xl font-bold text-center mb-6 text-blue-600 bg-blue-100 rounded-lg shadow-md py-2">
        Chapter Videos
      </h1>
      {loading ? (
        <div className="text-center text-blue-500 text-xl">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((c) => (
            <ChapterCouse
              key={c.id}
              title={c.ch_title}
              url={c.ch_url}
              view={c.ch_view}
              timetotal={c.ch_timetotal}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ChapterCouse = (props) => {
  return (
    <div className="bg-blue-50 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl p-5 flex flex-col items-center">
      <h2 className="text-xl font-medium text-blue-700 mb-4 text-center">
        {props.title}
      </h2>
      <iframe
        src={`https://www.youtube.com/embed/${props.url}`}
        frameBorder={0}
        allowFullScreen
        className="w-full aspect-video rounded-lg mb-4"
      ></iframe>
      <div className="text-blue-600 text-sm">
        <p>
          <span className="font-bold">Views:</span> {props.view}
        </p>
        <p>
          <span className="font-bold">Duration:</span> {props.timetotal}
        </p>
      </div>
    </div>
  );
};

export default Charpter;
