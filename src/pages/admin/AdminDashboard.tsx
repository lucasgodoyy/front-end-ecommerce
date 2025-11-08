import React, { useState } from 'react';
import AdminNavbar, { TabType } from '../../components/admin/AdminNavbar';
import styles from './AdminDashboard.module.css';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('products');

  return (
    <div className={styles.adminDashboard}>
      <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.content}>
        <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        <p>Conteúdo da aba {activeTab}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
