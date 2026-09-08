import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Welcome {user ? user.username : "to LiftAsync"} 💪
        </h2>
        <p className="text-gray-600 max-w-lg mb-6">
          Track your workouts, monitor progress, and achieve your fitness goals with ease.  
        </p>
        <div className="flex gap-4">
          <Link to="/workouts">
            <Button className="bg-indigo-600 text-white">Start Workout</Button>
          </Link>
          <Link to="/dashboard">
            <Button className="bg-gray-100 text-indigo-600">View Progress</Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-gray-100 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} FitTrack. Stay strong 💪
      </footer>
    </div>
  );
}
