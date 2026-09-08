import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
  const nav = useNavigate();
  const { login,isAuthed } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    try {
      await login(values.username, values.password);
      nav('/');
    } catch {
      alert('Invalid credentials');
    }
  };

  if(isAuthed) {
    return <>
    <Navigate to={'/'}/>
    </>
  }

  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Log in
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Username"
            error={errors.username?.message}
            {...register('username', { required: 'Username is required' })}
          />
          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register('password', { required: 'Password is required' })}
          />
          <Button disabled={isSubmitting} className="w-full text-green-600">
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          No account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline dark:text-blue-400">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
