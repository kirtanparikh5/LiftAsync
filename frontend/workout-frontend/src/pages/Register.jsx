import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../api/axios';
import Input from '../components/Input';
import Button from '../components/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'
const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  password2 : z.string().min(6),
  height: z.coerce.number().positive(),
  weight: z.coerce.number().positive(),
  age: z.coerce.number().int().min(12).max(100),
  profile_picture: z.any().optional(),
});

export default function Register() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => {
      if (k === 'profile_picture' && v?.[0]) fd.append(k, v[0]);
      else fd.append(k, v);
    });

    try {
  await api.post('/api/users/register/', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  alert('Registered! Please log in.');
  nav('/login');
} catch (e) {
  if (e.response && e.response.data) {
    const errors = e.response.data;
    const formattedErrors = Object.entries(errors)
      .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
      .join('\n');

    alert('Registration failed:\n' + formattedErrors);
  } else {
    alert('Registration failed: ' + e.message);
  }
}

  }
  const {isAuthed} = useAuth();
  if(isAuthed){
    return <>
    <Navigate to={'/'}/>
    </>
  }

  return (
    <div className='flex flex-col w-[100vw] justify-center align-middle h-[100vh]'>
        <div className="mx-auto max-w-md p-6">
        <h1 className="mb-6 text-2xl font-semibold">Create your account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Username" error={errors.username?.message} {...register('username')} />
            <Input label="Email" error={errors.email?.message} {...register('email')} />
            <Input label="Password" type="password" error={errors.password?.message} {...register('password')} />
            <Input label="Password 2" type="password" error={errors.password?.message} {...register('password2')} />
            <div className="grid grid-cols-3 gap-3"></div>
            <div className="grid grid-cols-3 gap-3">
            <Input label="Height (cm)" error={errors.height?.message} {...register('height')} />
            <Input label="Weight (kg)" error={errors.weight?.message} {...register('weight')} />
            <Input label="Age" error={errors.age?.message} {...register('age')} />
            </div>
            <label className="block">
            <div className="mb-1 text-sm">Profile Picture</div>
            <input type="file" accept="image/*" {...register('profile_picture')} />
            </label>
            <Button disabled={isSubmitting} className="w-full text-indigo-500">Register</Button>
        </form>
        <p className="mt-4 text-sm">
            Already have an account? <Link to="/login">Log in</Link>
        </p>
        </div>
    </div>
  );
}
