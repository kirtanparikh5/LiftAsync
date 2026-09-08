// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = () => {
    api
      .get("/api/workouts/")
      .then((res) => {
        setWorkouts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;
    try {
      await api.delete(`/api/workouts/${id}/`);
      setWorkouts(workouts.filter((w) => w.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/workouts/${id}/edit`); // navigate to edit page
  };

  if (loading) return <p className="p-4">Loading...</p>;

  const totalWorkouts = workouts.length;
  const lastWorkout = totalWorkouts > 0 ? workouts[workouts.length - 1] : null;
  const muscleGroups = [...new Set(workouts.map((w) => w.muscle_group))];

  return (
    <div className="p-6 space-y-6 h-[100vh] w-[100vw]">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 rounded-xl">
          <p className="text-xl font-semibold">{totalWorkouts}</p>
          <p className="text-gray-600">Total Workouts</p>
        </div>
        <div className="p-4 bg-green-100 rounded-xl">
          <p className="text-xl font-semibold">
            {lastWorkout ? lastWorkout.date : "—"}
          </p>
          <p className="text-gray-600">Last Workout</p>
        </div>
        <div className="p-4 bg-purple-100 rounded-xl">
          <p className="text-xl font-semibold">{muscleGroups.length}</p>
          <p className="text-gray-600">Muscle Groups Trained</p>
        </div>
      </div>

      {/* Recent Workouts */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Workouts</h2>
        {workouts.length === 0 ? (
          <p>No workouts yet. Start adding!</p>
        ) : (
          <ul className="space-y-3">
            {workouts
              .slice(-5) // last 5
              .reverse()
              .map((w) => (
                <li
                  key={w.id}
                  className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{w.muscle_group}</p>
                    <p className="text-sm text-gray-500">{w.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-700">{w.exercises.length} exercises</p>
                    <button
                      onClick={() => handleEdit(w.id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(w.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>

      <Link
        to="/workouts"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        ➕ Add Workout
      </Link>
    </div>
  );
}
