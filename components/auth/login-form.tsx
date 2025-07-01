'use client';

import type React from 'react';

import { useState } from 'react';
import { Eye, EyeOff, Smartphone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { mobile, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='space-y-8'>
      {/* Logo and Title Section */}
      <div className='text-center space-y-4'>
        <div className='flex items-center justify-center'>
          <div className='w-16 h-16 bg-primary rounded-xl flex items-center justify-center'>
            <span className='text-2xl font-bold text-primary-foreground'>
              L
            </span>
          </div>
        </div>

        <div className='space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight'>Welcome Back</h1>
          <p className='text-muted-foreground'>
            Sign in to your account to continue
          </p>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Mobile Number Field */}
        <div className='space-y-2'>
          <Label htmlFor='mobile' className='text-sm font-medium'>
            Mobile Number
          </Label>
          <div className='relative'>
            <Smartphone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
              id='mobile'
              type='tel'
              placeholder='Enter your mobile number'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className='pl-10'
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className='space-y-2'>
          <Label htmlFor='password' className='text-sm font-medium'>
            Password
          </Label>
          <div className='relative'>
            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='pl-10 pr-10'
              required
            />
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className='h-4 w-4 text-muted-foreground' />
              ) : (
                <Eye className='h-4 w-4 text-muted-foreground' />
              )}
            </Button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className='flex justify-end'>
          <Button
            type='button'
            variant='link'
            className='px-0 text-sm text-primary hover:underline'
          >
            Forgot Password?
          </Button>
        </div>

        {/* Login Button */}
        <Button type='submit' className='w-full' size='lg'>
          Sign In
        </Button>
      </form>

      {/* Additional Options */}
      <div className='text-center text-sm text-muted-foreground'>
        {"Don't have an account? "}
        <Button variant='link' className='px-0 text-primary hover:underline'>
          Sign up here
        </Button>
      </div>
    </div>
  );
}
