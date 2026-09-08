import { useState, useEffect } from "react";
import api from "../api/axios";

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    date: "",
    muscle_group: "",
    exercises: "",
    notes: "",
  });

  // fetch workouts on load
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await api.get("/api/workouts/");
      setWorkouts(res.data);
    } catch (err) {
      console.error("Error fetching workouts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // split exercises by comma → make it array
    const exercisesArray = form.exercises
      .split(",")
      .map((ex) => ex.trim())
      .filter((ex) => ex !== "");

    try {
      await api.post("/api/workouts/", {
        date: form.date,
        muscle_group: form.muscle_group,
        exercises: exercisesArray,
        notes: form.notes,
      });
      setForm({ date: "", muscle_group: "", exercises: "", notes: "" });
      fetchWorkouts(); // refresh list
    } catch (err) {
      console.error("Error adding workout:", err);
    }
  };

  return (
    <div className="flex justify-center align-middle w-[100vw] h-[100vh]">
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 w-[30vw]">Workouts</h1>

      {/* Workout Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 mb-6"
      >
        <h2 className="text-xl font-semibold mb-3">Add New Workout</h2>
        <div className="grid gap-3">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="muscle_group"
            placeholder="Muscle group (e.g. Chest, Back)"
            value={form.muscle_group}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="exercises"
            placeholder="Exercises (comma separated)"
            value={form.exercises}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Workout
          </button>
        </div>
      </form>

      {/* Workout List */}
      {loading ? (
        <p>Loading workouts...</p>
      ) : workouts.length === 0 ? (
        <p>No workouts yet.</p>
      ) : (
        <ul className="space-y-4">
          {workouts.map((w) => (
            <li
              key={w.id}
              className="border rounded-lg p-4 shadow-sm bg-gray-50"
            >
              <h3 className="font-bold">{w.muscle_group}</h3>
              <p className="text-sm text-gray-600">{w.date}</p>
              <ul className="list-disc ml-5 mt-2">
                {w.exercises.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
              {w.notes && <p className="mt-2 italic">{w.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}
