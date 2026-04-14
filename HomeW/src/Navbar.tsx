import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { arbolGatos } from './treeData';
import { Nodo } from './Node';
import './Navbar.css';

const NavItem = ({ nodo, level = 0 }: { nodo: Nodo<string>; level?: number }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = nodo.hijos && nodo.hijos.length > 0;

  const path = `/${nodo.valor.toLowerCase().replace(/\s+/g, '-')}`;

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <li className={`nav-item ${hasChildren ? 'has-children' : ''}`}>
      <div className="nav-link-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
        <NavLink
          to={path}
          className={({ isActive }) => `nav-link-container ${isActive ? 'active' : ''}`}
          style={{ flexGrow: 1 }}
        >
          <span className="nav-label">{nodo.valor}</span>
        </NavLink>

        {hasChildren && (
          <span
            className={`caret ${isOpen ? 'open' : ''}`}
            onClick={toggleExpand}
            style={{ padding: '12px', cursor: 'pointer' }}
          >
            ▼
          </span>
        )}
      </div>

      {hasChildren && (
        <ul className={`nav-dropdown ${isOpen ? 'open' : ''}`}>
          {nodo.hijos.map((hijo, i) => (
            <NavItem key={i} nodo={hijo} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">{arbolGatos.valor}</div>
      <ul className="nav-list">
        {arbolGatos.hijos.map((hijo, i) => (
          <NavItem key={i} nodo={hijo} />
        ))}
      </ul>
    </nav>
  );
};
