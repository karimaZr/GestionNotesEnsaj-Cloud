import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
const Chart = ({ studentId, aspect, title }) => {
  const [data, setNotesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make the API call to fetch notes for the specific student
                const response = await axios.get(`http://localhost:3000/note/etudiants/${studentId}/note`);
                setNotesData(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchData(); // Call the function to fetch data

    }, [studentId]);
  // Function to extract the year from timestamp
  const extractYear = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    return date.getFullYear(); // Get the year from the date object
  };

  // Function to calculate the average of notes for each year
  const calculateAverage = () => {
    const notesByYear = {};

    // Group notes by year and calculate the total and count
    data.forEach((note) => {
      const year = extractYear(note.timeStamp._seconds);
      if (!notesByYear[year]) {
        notesByYear[year] = { total: 0, count: 0 };
      }
      notesByYear[year].total += note.note;
      notesByYear[year].count++;
    });

    // Calculate the average for each year
    const averages = [];
    for (const year in notesByYear) {
      const average = notesByYear[year].total / notesByYear[year].count;
      averages.push({ name: year, Average: average });
    }
    return averages;
  };

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          data={calculateAverage()}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <XAxis dataKey="name" stroke="gray" />
          <YAxis stroke="gray" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Average"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
