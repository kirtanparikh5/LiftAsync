// src/pages/WorkoutEdit.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function WorkoutEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [exercises, setExercises] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch workout details
  useEffect(() => {
    api
      .get(`/api/workouts/${id}/`)
      .then((res) => {
        setDate(res.data.date);
        setMuscleGroup(res.data.muscle_group);
        setExercises(res.data.exercises || []);
        setNotes(res.data.notes || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleExerciseChange = (index, value) => {
    const updated = [...exercises];
    updated[index] = value;
    setExercises(updated);
  };

  const addExercise = () => {
    setExercises([...exercises, ""]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`/api/workouts/${id}/`, {
        date,
        muscle_group: muscleGroup,
        exercises,
        notes,
      })
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex justify-center align-middle w-[100vw] h-[100vh]">
    <div className="p-6 max-w-2xl mx-auto w-[30vw]">
      <h1 className="text-2xl font-bold mb-4">Edit Workout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Muscle Group</label>
          <input
            type="text"
            value={muscleGroup}
            onChange={(e) => setMuscleGroup(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Exercises</label>
          {exercises.map((exercise, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={exercise}
                onChange={(e) => handleExerciseChange(index, e.target.value)}
                className="border p-2 rounded flex-1"
              />
              <button
                type="button"
                onClick={() => removeExercise(index)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addExercise}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            ➕ Add Exercise
          </button>
        </div>

        <div>
          <label className="block font-medium">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
    </div>
  );
}
