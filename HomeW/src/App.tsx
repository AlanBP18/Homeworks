import { useState } from 'react';
import './App.css';
import BinaryTree from './BinaryTree';
import { arbol as initialData } from './data.js';
import { inorden } from './order/InOrder';
import { preorden } from './order/PreOrder';
import { postorden } from './order/PostOrder';

export const App = () => {
  const [tree, setTree] = useState(initialData);
  const [traversalResult, setTraversalResult] = useState('');
  const [currentOrder, setCurrentOrder] = useState('');

  const handleTraversal = (type) => {
    let result = [];
    if (type === 'pre') {
      result = preorden(tree);
      setCurrentOrder('Pre-Orden');
    } else if (type === 'in') {
      result = inorden(tree);
      setCurrentOrder('In-Orden');
    } else if (type === 'post') {
      result = postorden(tree);
      setCurrentOrder('Post-Orden');
    }
    setTraversalResult(result.join(' → '));
  };

  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-5 fw-bold text-black">Algoritmos de Árboles</h1>
      </header>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-0" style={{ height: '500px' }}>
              <BinaryTree tree={tree} setTree={setTree} />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Ordenes </h5>
              <div className="d-grid gap-2 mb-4">
                <button className="btn btn-outline-primary" onClick={() => handleTraversal('pre')}>Pre-Orden</button>
                <button className="btn btn-outline-success" onClick={() => handleTraversal('in')}>In-Orden</button>
                <button className="btn btn-outline-info" onClick={() => handleTraversal('post')}>Post-Orden</button>
              </div>

              <div className="mt-4">
                <label className="form-label fw-bold">Resultado {currentOrder && `(${currentOrder})`}</label>
                <textarea
                  readOnly
                  value={traversalResult}
                  placeholder="El resultado aparecerá aquí..."
                  className="form-control bg-light"
                  rows={4}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
