import React, { useState, useEffect } from 'react';
import { DoublyLinkedList, DoublyPAG } from '../listHistoryDouble';

const MOCK_PAGES = [
    { url: 'https://google.com', title: 'Google Search' },
    { url: 'https://github.com', title: 'GitHub' },
    { url: 'https://vitejs.dev', title: 'Vite Next Gen Tooling' },
    { url: 'https://www.youtube.com/watch?v=TBxpAhpQqYk', title: 'Tutorial de React Hooks' },

];

export const BrowserHistory: React.FC = () => {
    const [history] = useState(() => {
        const list = new DoublyLinkedList<typeof MOCK_PAGES[0]>();
        MOCK_PAGES.forEach(page => list.append(page));
        return list;
    });

    const [currentPAG, setCurrentPAG] = useState<DoublyPAG<typeof MOCK_PAGES[0]> | null>(null);

    useEffect(() => {
        if (history.tail) {
            setCurrentPAG(history.tail);
        }
    }, [history]);

    const handleBack = () => {
        if (currentPAG && currentPAG.prev) {
            setCurrentPAG(currentPAG.prev);
        }
    };

    const handleForward = () => {
        if (currentPAG && currentPAG.next) {
            setCurrentPAG(currentPAG.next);
        }
    };

    return (
        <div className="browser-container">
            <p><strong>HIstorial de paginas visitadas</strong> "(midulive es muy bueno)"</p>

            <div className="browser-window">
                <div className="browser-header">
                    <div className="nav-buttons">
                        <button
                            onClick={handleBack}
                            disabled={!currentPAG?.prev}
                            className="nav-btn"
                        >
                            ⬅ Back
                        </button>
                        <button
                            onClick={handleForward}
                            disabled={!currentPAG?.next}
                            className="nav-btn"
                        >
                            Forward ➡
                        </button>
                    </div>
                    <div className="address-bar">
                        {currentPAG?.value.url || 'pending...'}
                    </div>
                </div>
                <div className="browser-content">
                    {currentPAG ? (
                        <div className="page-view">
                            <h1>{currentPAG.value.title}</h1>
                            <p>url: </p>
                            <p>{currentPAG.value.url}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            {/* Hasta aqui la ventana de navegador de ejemplo que póne la informacion actual
             */}
            <div className="history-list">
                <h3>Tu historial de paginas visitadas</h3>
                <ul>
                    {history.getArray().map((page, idx) => (
                        <li key={idx} className={currentPAG?.value.url === page.url ? 'active' : ''}>
                            {page.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
