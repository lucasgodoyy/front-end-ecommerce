import React, { useState, useRef } from 'react';
import styles from './AdminNavbar.module.css';
import SubMenu from './SubMenu';

export type TabType = 'products' | 'orders' | 'brands';

interface AdminNavbarProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ activeTab, setActiveTab }) => {

    const [isProductsHovered, setIsProductsHovered] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);


    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsProductsHovered(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsProductsHovered(false);
        }, 1000); // 3 segundos
    };


    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>Admin Panel</div>

            <div className={styles.links}
            >
                <div className={styles.menuItem}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <button
                        className={activeTab === 'products' ? styles.active : ''}
                        onClick={() => setActiveTab('products')}
                    >
                        Products
                    </button>

                    {isProductsHovered && (
                        <SubMenu
                            options={['Adicionar Produto', 'Cadastrar Produto', 'Gerenciar Produtos']}
                            isVisible={isProductsHovered}
                        />
                    )}
                </div>




                <button
                    className={activeTab === 'orders' ? styles.active : ''}
                    onClick={() => setActiveTab('orders')}
                >
                    Orders
                </button>
                <button
                    className={activeTab === 'brands' ? styles.active : ''}
                    onClick={() => setActiveTab('brands')}
                >
                    Brands
                </button>
            </div>
            <div className={styles.profile}>
                <span>Admin</span>
                <button>Logout</button>
            </div>
        </aside>
    );
};

export default AdminNavbar;
