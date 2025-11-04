import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/lojaki/login', {
                login: email,
                senha: password
            });
            localStorage.setItem('token', res.data.Authorization);
            router.push('/admin'); // redireciona para painel
        } catch {
            setError('Login falhou!');
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
