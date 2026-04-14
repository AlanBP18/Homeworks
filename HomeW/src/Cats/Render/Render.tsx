import React, { useMemo } from 'react';
import { arbolGatos } from '../../treeData';
import dfs from './DFS';
import bfs from './BFS';

const RenderPage = () => {
    const dfsResult = useMemo(() => dfs(arbolGatos), []);
    const bfsResult = useMemo(() => bfs(arbolGatos), []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Renderizado de Recorridos del Árbol</h1>

            <div style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
                <div style={{ flex: 1, backgroundColor: '#2c3e50', padding: '20px', borderRadius: '10px' }}>
                    <h2>DFS</h2>
                    <ol style={{ lineHeight: '1.8' }}>
                        {dfsResult.map((val, i) => (
                            <li key={`dfs-${i}`}>{val}</li>
                        ))}
                    </ol>
                </div>

                <div style={{ flex: 1, backgroundColor: '#2c3e50', padding: '20px', borderRadius: '10px' }}>
                    <h2>BFS</h2>
                    <ol style={{ lineHeight: '1.8' }}>
                        {bfsResult.map((val, i) => (
                            <li key={`bfs-${i}`}>{val}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default RenderPage;
