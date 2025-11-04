import React, { useEffect, useState } from 'react';
import { listarProdutos, cadastrarProduto } from '../../service/produtoService';

// Interface Produto
export interface Produto { 
  tipoUnidade: string;          
  nome: string;                 
  descricao: string;            
  peso: number;                 
  largura: number;              
  altura: number;               
  profundidade: number;         
  valorVenda: number;           
  quantidadeEstoque: number;    

  // Relacionamentos obrigatórios
  empresa: { id: number };            
  categoriaProduto: { id: number };   
  marcaProduto: { id: number };       

  // Campos opcionais
  id?: number;
  status?: string;
  ativo?: boolean;
  quantidadeAlertaEstoque?: number;
  linkVideoYouTube?: string;
  alertaQuantidadeEstoque?: boolean;
  quantidadeClique?: number;
}

// Componente de Lista de Produtos
 function ProdutoLista() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await listarProdutos();
        setProdutos(data);
      } catch (err: unknown) {
        setError('Erro ao carregar produtos');
        console.error("Erro ao buscar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Lista de Produtos</h3>
      {produtos.length === 0 && <p>Nenhum produto cadastrado.</p>}
      <ul style={{ color: '#000' }}>
        {produtos.map((produto) => (
           <li key={produto.id}>
            <strong>{produto.id}</strong> - {produto.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente de Cadastro de Produto
 function ProdutoCadastro() {
  const empresaId = Number(localStorage.getItem('empresa')) || 0;

  const [produto, setProduto] = useState<Produto>({
    tipoUnidade: '',
    nome: '',
    descricao: '',
    peso: 0,
    largura: 0,
    altura: 0,
    profundidade: 0,
    valorVenda: 0,
    quantidadeEstoque: 0,
    empresa: { id: empresaId },
    categoriaProduto: { id: 0 },
    marcaProduto: { id: 0 },
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numberFields = ['peso', 'largura', 'altura', 'profundidade', 'valorVenda', 'quantidadeEstoque'];

    if (name === 'categoriaProduto' || name === 'marcaProduto') {
      setProduto(prev => ({ ...prev, [name]: { id: Number(value) } }));
    } else if (numberFields.includes(name)) {
      setProduto(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setProduto(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await cadastrarProduto(produto);
      setMessage(`Produto cadastrado com sucesso! ID: ${response.id}`);
    } catch (err) {
      setMessage('Erro ao cadastrar produto.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', background: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h3>Cadastrar Produto</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
        <input type="text" name="nome" placeholder="Nome do produto" value={produto.nome} onChange={handleChange} required />
        <input type="text" name="tipoUnidade" placeholder="Tipo de Unidade" value={produto.tipoUnidade} onChange={handleChange} required />
        <input type="text" name="descricao" placeholder="Descrição" value={produto.descricao} onChange={handleChange} required />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          <input type="number" name="peso" placeholder="Peso" value={produto.peso || ''} onChange={handleChange} required />
          <input type="number" name="largura" placeholder="Largura" value={produto.largura || ''} onChange={handleChange} required />
          <input type="number" name="altura" placeholder="Altura" value={produto.altura || ''} onChange={handleChange} required />
          <input type="number" name="profundidade" placeholder="Profundidade" value={produto.profundidade || ''} onChange={handleChange} required />
          <input type="number" name="valorVenda" placeholder="Valor de Venda" value={produto.valorVenda || ''} onChange={handleChange} required />
          <input type="number" name="quantidadeEstoque" placeholder="Estoque" value={produto.quantidadeEstoque || ''} onChange={handleChange} required />
        </div>

        <input type="number" name="categoriaProduto" placeholder="ID da Categoria" value={produto.categoriaProduto.id || ''} onChange={handleChange} required />
        <input type="number" name="marcaProduto" placeholder="ID da Marca" value={produto.marcaProduto.id || ''} onChange={handleChange} required />

        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cadastrar</button>
      </form>
      {message && <p style={{ marginTop: '12px', color: message.includes('sucesso') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}

export { ProdutoLista, ProdutoCadastro };
