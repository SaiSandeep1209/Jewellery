import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { site } from '../../config/site'

export default function AdminLogin() {
  const { login } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const [serverError, setServerError] = useState('')

  const onSubmit = async ({ email, password }) => {
    setServerError('')
    try {
      await login(email, password)
    } catch (err) {
      setServerError(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="container-x flex min-h-screen items-center justify-center pt-24 pb-16">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 shadow-soft">
        <h1 className="font-serif text-3xl text-ink">{site.name} Admin</h1>
        <p className="mt-1 text-sm text-stone">Sign in to manage the store catalogue.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" type="email" className="field" placeholder="admin@aurelia.test"
              {...register('email', { required: 'Email is required' })} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input id="password" type="password" className="field" placeholder="••••••••"
              {...register('password', { required: 'Password is required' })} />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          {serverError && <p className="text-sm text-red-600">{serverError}</p>}

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-stone">
          Demo credentials — {`admin@aurelia.test`} / {`admin123`}
        </p>
      </div>
    </div>
  )
}
