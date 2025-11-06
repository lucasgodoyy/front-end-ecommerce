import React, { useState } from 'react';
import { ProdutoLista, ProdutoCadastro, } from '../product/ProductDetails';
import { MarcaCadastroBox } from '../brands/BrandForm';
import styles from './AdminDashboard.module.css';

function AdminDashboard() {
  // Abas principais
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'brands' | null>(null);

  // Sub-abas de produtos
  const [activeProductTab, setActiveProductTab] = useState<'create' | 'list' | null>(null);


  const [hoveredTab, setHoveredTab] = useState<string | null>(null);


  return (
    <div style={{ padding: '20px' }}>
      <h1>Painel Administrativo</h1>

      {/* Menu de abas principais */}
      <div className={styles.tabsContainer}>

        <button
          className={`${styles.tabButton}${activeTab === 'products' ? ` ${styles.active}` : ''}`}
          onClick={() => setActiveTab('products')}>
          Products
        </button>


        <button
          className={`${styles.tabButton}${activeTab === 'orders' ? ` ${styles.active}` : ''}`}
          onClick={() => setActiveTab('orders')}>
          Orders
        </button>



        <button
          className={`${styles.tabButton}${activeTab === 'brands' ? ` ${styles.active}` : ''}`}
          onClick={() => setActiveTab('brands')}>
          Brands
        </button>

      </div>

      {/* Conteúdo das abas */}
      {activeTab === 'orders' && (
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
              onClick={() => setActiveProductTab('create')}
              style={{
                backgroundColor: activeProductTab === 'create' ? '#007bff' : '#e0e0e0',
                color: activeProductTab === 'create' ? '#fff' : '#000',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >Cadastrar
            </button>


            <button
              onClick={() => setActiveProductTab('list')}
              style={{
                backgroundColor: activeProductTab === 'list' ? '#007bff' : '#e0e0e0',
                color: activeProductTab === 'list' ? '#fff' : '#000',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >Listar
            </button>
          </div>

          {/* Conteúdo das sub-abas */}
          {activeProductTab === 'create' && <ProdutoCadastro />}
          {activeProductTab === 'list' && <ProdutoLista />}
        </div>
      )}




      {activeTab === 'orders' && <p>Aqui vai a lista de pedidos</p>}

      {activeTab === 'brands' && (
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
