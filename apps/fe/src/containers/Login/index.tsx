import React, { useState } from 'react';
import { Block, Button, FormControl, Header, SLink, Text, TextField } from './styles';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <FormControl onSubmit={handleSubmit}>
      <TextField
        type="email"
        id="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Sign in'}
      </Button>
      {error && <p>{error}</p>}
      <Block>
        <Text>
          Don't have an account? <SLink href="/register">Sign up</SLink>
        </Text>
      </Block>
    </FormControl>
  );
}
