import React from 'react';
import styles from './SubMenu.module.css';

interface SubMenuProps {
    options: string[];
    isVisible: boolean;
    top?: number;
}

const SubMenu: React.FC<SubMenuProps> = ({ options, isVisible, top = 0 }) => {
    if (!isVisible) return null;

    return (
        <div className={styles.submenu} style={{ top }}>
            {options.map((opt, index) => (
                <button key={index}>{opt}</button>
            ))}
        </div>
    );
};

export default SubMenu;
