import React, { useState, useMemo } from 'react';
import Tree from 'react-d3-tree';
import './BinaryTree.css';

const BinaryTree = ({ tree, setTree }) => {
    const translateToD3 = (node) => {
        if (!node) return null;
        const children = [];
        if (node.izquierda) children.push(translateToD3(node.izquierda));
        if (node.derecha) children.push(translateToD3(node.derecha));

        return {
            name: `${node.valor}`,
            children: children.length > 0 ? children : undefined,
            attributes: {
                originalNode: node
            }
        };
    };

    const d3Data = useMemo(() => translateToD3(tree), [tree]);

    const insertNode = (originalNode, side) => {
        if (!originalNode[side]) {
            originalNode[side] = {
                valor: Math.floor(Math.random() * 100),
                izquierda: null,
                derecha: null
            };
            setTree({ ...tree });
        }
    };


    const renderNodeWithCustomEvents = ({ nodeDatum }) => (
        <g>
            <circle r="20" fill="#0d6efd" stroke="#fff" strokeWidth="2" />
            <text fill="#212529" x="25" dy="5" className="node-text">
                {nodeDatum.name}
            </text>
        </g>
    );

    return (
        <div className="tree-container" style={{ width: '100%', height: '600px' }}>
            <Tree
                data={d3Data}
                orientation="vertical"
                pathFunc="step"
                translate={{ x: 300, y: 50 }}
                renderCustomNodeElement={renderNodeWithCustomEvents}
                nodeSize={{ x: 150, y: 150 }}
                separation={{ siblings: 1.5, nonSiblings: 2 }}
                enableLegacyTransitions={true}
            />
        </div>
    );
};

export default BinaryTree;

