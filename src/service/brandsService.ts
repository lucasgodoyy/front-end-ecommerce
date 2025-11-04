import axios from 'axios';

import type { Brand } from '../components/brands/brands';


const API_URL = 'http://localhost:8080/lojaki';


export async function registerBrand(brand: Brand) {

    const token = localStorage.getItem('token');

    try {
        const response = await axios.post(`${API_URL}/salvarMarca`, brand, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log("Marca cadastrado:", response.data);
        return response.data;

    } catch (err: unknown) {

        if (axios.isAxiosError(err)) {
            return err.response?.data || 'Erro ao cadastrar'

        } else {
            return 'Erro inesperado'
        }


    }



}



export async function getAllBrands(pagina = 0) {

    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`${API_URL}/listaMarcaByPagina/${pagina}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log("Marcas encontradas:", response.data);
        return response.data;

    } catch (err: unknown) {

        if (axios.isAxiosError(err)) {
            return err.response?.data || 'Erro ao buscar marcas'

        } else {
            return 'Erro inesperado'
        }


    }



}



export async function deleteBrand(id: number) {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${API_URL}/deleteMarcaPorId/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || 'Erro ao excluir marca';
        } else {
            return 'Erro inesperado';
        }
    }
}



export async function updateBrand(marca: Brand) {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(`${API_URL}/marca/${marca.id}`, marca, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || 'Erro ao atualizar marca';
        } else {
            return 'Erro inesperado';
        }
    }
}




