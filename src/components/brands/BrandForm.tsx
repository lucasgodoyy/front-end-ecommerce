import React, { useState } from 'react';
import type { Brand } from './BrandList';
import * as brandService from '../../services/brandsService';

export function MarcaCadastroBox() {
    const [isCadastroOpen, setIsCadastroOpen] = useState(false);
    const [isListaOpen, setIsListaOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [mensagem, setMensagem] = useState<{ tipo: 'erro' | 'sucesso'; texto: string } | null>(null);
    const [marcas, setMarcas] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagina, setPagina] = useState(0);
    const [temMaisPaginas, setTemMaisPaginas] = useState(true);

    const handleSubmit = async () => {
        if (!nome.trim()) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o nome da marca' });
            return;
        }

        const novaMarca: Brand = {
            nomeDesc: nome,
            empresa: { id: 1 },
            status: 'ATIVADO',
        };

        const resultado = await brandService.registerBrand(novaMarca);

        if (typeof resultado === 'string') {
            setMensagem({ tipo: 'erro', texto: resultado });
        } else {
            setMensagem({ tipo: 'sucesso', texto: 'Marca cadastrada com sucesso!' });
            setNome('');
        }
    };

    const carregarMarcas = async (numPagina: number) => {
        setLoading(true);
        try {
            const resultado = await brandService.getAllBrands(numPagina);
            if (Array.isArray(resultado)) {
                setMarcas(resultado);
                setTemMaisPaginas(resultado.length > 0);
                setPagina(numPagina);
            } else {
                setMarcas([]);
            }
        } catch (e) {
            console.error(e);
            setMarcas([]);
        }
        setLoading(false);
    };

    const handleVerMarcas = async () => {
        setIsListaOpen(true);
        await carregarMarcas(0);
    };

    const handleProximaPagina = async () => {
        await carregarMarcas(pagina + 1);
    };

    const handlePaginaAnterior = async () => {
        if (pagina > 0) {
            await carregarMarcas(pagina - 1);
        }
    };

    const handleEditar = (marca: Brand) => {
        console.log('Editar marca:', marca);
    };

    const handleExcluir = async (marca: Brand) => {
        if (!window.confirm(`Deseja realmente excluir a marca "${marca.nomeDesc}"?`))
            return;

        const resultado = await brandService.deleteBrand(marca.id!); // certifique-se que o Brand tem o id
        if (typeof resultado === 'string') {
            alert('Erro: ' + resultado);
        } else {
            alert('Marca excluída com sucesso!');
            await carregarMarcas(pagina); // atualiza a lista
            setMarcas((prev) => [...prev]);
        }
    };

    return (
        <div>
            {/* Botões principais */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <button
                    onClick={() => setIsCadastroOpen(true)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Cadastrar nova marca
                </button>

                <button
                    onClick={handleVerMarcas}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#17a2b8',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Ver todas as marcas
                </button>
            </div>

            {/* Modal de Cadastro */}
            {isCadastroOpen && (
                <>
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#fff',
                            padding: '30px',
                            borderRadius: '10px',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                            width: '400px',
                            zIndex: 1000,
                        }}
                    >
                        <h2>Cadastrar Marca</h2>
                        <input
                            type="text"
                            placeholder="Nome da marca"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                        {mensagem && (
                            <p style={{ color: mensagem.tipo === 'erro' ? 'red' : 'green' }}>{mensagem.texto}</p>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <button
                                onClick={handleSubmit}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#28a745',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                }}
                            >
                                Salvar
                            </button>
                            <button
                                onClick={() => setIsCadastroOpen(false)}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                }}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>

                    <div
                        onClick={() => setIsCadastroOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            height: '100vh',
                            width: '100vw',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            zIndex: 999,
                        }}
                    />
                </>
            )}

            {/* Modal de Lista de Marcas */}
            {isListaOpen && (
                <>
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#fff',
                            padding: '30px',
                            borderRadius: '10px',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                            width: '400px',
                            zIndex: 1000,
                            maxHeight: '70vh',
                            overflowY: 'auto',
                        }}
                    >
                        <h2>Lista de Marcas</h2>
                        {loading ? (
                            <p>Carregando...</p>
                        ) : (
                            <ul>
                                {marcas.length > 0 ? (
                                    marcas.map((m, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                marginBottom: '8px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>{m.nomeDesc}</span>
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <button
                                                    onClick={() => handleEditar(m)}
                                                    style={{
                                                        padding: '2px 6px',
                                                        fontSize: '12px',
                                                        backgroundColor: '#ffc107',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '3px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleExcluir(m)}
                                                    style={{
                                                        padding: '2px 6px',
                                                        fontSize: '12px',
                                                        backgroundColor: '#dc3545',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '3px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p>Nenhuma marca encontrada</p>
                                )}
                            </ul>
                        )}

                        {/* Paginação */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <button
                                onClick={handlePaginaAnterior}
                                disabled={pagina === 0}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: pagina === 0 ? '#ccc' : '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: pagina === 0 ? 'default' : 'pointer',
                                }}
                            >
                                ◀ Anterior
                            </button>

                            <span>Página {pagina + 1}</span>

                            <button
                                onClick={handleProximaPagina}
                                disabled={!temMaisPaginas}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: !temMaisPaginas ? '#ccc' : '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: !temMaisPaginas ? 'default' : 'pointer',
                                }}
                            >
                                Próxima ▶
                            </button>
                        </div>

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button
                                onClick={() => setIsListaOpen(false)}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>

                    <div
                        onClick={() => setIsListaOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            height: '100vh',
                            width: '100vw',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            zIndex: 999,
                        }}
                    />
                </>
            )}
        </div>
    );
}
