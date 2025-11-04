import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface LoginResponse {
    Authorization: string;
    username: string;
    empresa: string;
}

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<LoginResponse>(
                'http://localhost:8080/lojaki/login',
                { login: email, senha: password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            localStorage.setItem('token', response.data.Authorization);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('empresa', response.data.empresa);

            router.push('/admin'); // redireciona para o painel admin
        } catch (err: unknown) {
            setError('Login falhou!');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '50px auto' }}>
            <input
                type="text"
                placeholder="Login"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            <button type="submit" style={{ width: '100%', padding: '8px' }}>Entrar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}
