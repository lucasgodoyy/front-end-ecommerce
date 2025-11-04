import React, { useState } from 'react';
import { ProdutoLista, ProdutoCadastro, } from '../produto/produto';
import { MarcaCadastroBox } from '../brands/registerBrandBox';

function AdminDashboard() {
  // Abas principais
  const [activeTab, setActiveTab] = useState<'produtos' | 'pedidos' | 'marcas' | null>(null);

  // Sub-abas de produtos
  const [activeProductTab, setActiveProductTab] = useState<'cadastrar' | 'listar' | null>(null);

  const [hoveredTab, setHoveredTab] = useState<string | null>(null);


  return (
    <div style={{ padding: '20px' }}>
      <h1>Painel Administrativo</h1>

      {/* Menu de abas principais */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', position: 'relative' }}>
        <button onClick={() => setActiveTab('produtos')}>Produtos</button>


        {/* Botão Pedidos */}
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setHoveredTab('pedidos')}
          onMouseLeave={() => setHoveredTab('null')}
        >
          <button onClick={() => setActiveTab('pedidos')}>Pedidos</button>
          {hoveredTab === 'pedidos' && (
            <div
              style={{
                position: 'absolute',
                top: '40px',
                left: 0,
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                zIndex: 10,
              }}
            >
              <p style={{ margin: 0 }}>Opção 1 Pedidos</p>
              <p style={{ margin: 0 }}>Opção 2 Pedidos</p>
            </div>
          )}
        </div>



        {/* Botão "Marcas" com hover */}

        <button onClick={() => setActiveTab('marcas')}>Marcas</button>




      </div>

      {/* Conteúdo das abas */}
      {activeTab === 'produtos' && (
        <div
          style={{
            position: 'relative',
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            maxWidth: '800px',
          }}
        >
          {/* Sub-abas flutuantes */}
          <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveProductTab('cadastrar')}
              style={{
                backgroundColor: activeProductTab === 'cadastrar' ? '#007bff' : '#e0e0e0',
                color: activeProductTab === 'cadastrar' ? '#fff' : '#000',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >Cadastrar
            </button>


            <button
              onClick={() => setActiveProductTab('listar')}
              style={{
                backgroundColor: activeProductTab === 'listar' ? '#007bff' : '#e0e0e0',
                color: activeProductTab === 'listar' ? '#fff' : '#000',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >Listar
            </button>
          </div>

          {/* Conteúdo das sub-abas */}
          {activeProductTab === 'cadastrar' && <ProdutoCadastro />}
          {activeProductTab === 'listar' && <ProdutoLista />}
        </div>
      )}




      {activeTab === 'pedidos' && <p>Aqui vai a lista de pedidos</p>}

      {activeTab === 'marcas' && (
        <div
          style={{
            position: 'relative',
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            maxWidth: '800px',
          }}
        >
          <MarcaCadastroBox />
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
