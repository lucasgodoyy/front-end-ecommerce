import axios from 'axios';

import type { Produto } from '../components/product/ProductDetails';


const API_URL = 'http://localhost:8080/lojaki';

export async function listarProdutos() {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/produtos`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // Escreve os produtos no console
    console.log("Produtos recebidos:", response.data);

    return response.data;


}


export async function cadastrarProduto(produto: Produto) {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post(`${API_URL}/salvarProdutos`, produto, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log("Produto cadastrado:", response.data);
        return response.data;

    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error("Erro ao cadastrar produto:", err.response?.data || err.message);
        } else {
            console.error("Erro inesperado:", err);
        }
        throw err;
    }
}


