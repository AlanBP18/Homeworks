import { useMemo } from 'react';
import type { FileStructure } from './FileStructure';
import './TreeGraph.css';

const TreeNode = ({ node, onAdd }: { node: FileStructure; onAdd: (parentId: string) => void }) => {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={`tree-node ${hasChildren ? 'has-children' : ''}`}>
      <div className={`tree-node-box ${node.type}`}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <strong>{node.name}</strong>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onAdd(node.id)}
          >
            +
          </button>
        </div>
        <div className="tree-node-meta">{node.type}</div>
      </div>

      {hasChildren && (
        <div className="tree-children">
          {node.children?.map((child) => (
            <TreeNode key={child.id} node={child} onAdd={onAdd} />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeGraph = ({ tree, onAddNode }: { tree: FileStructure; onAddNode: (parentId: string) => void }) => {
  const memoTree = useMemo(() => tree, [tree]);

  return (
    <div className="tree-graph-wrapper">
      <div className="tree-graph">
        <TreeNode node={memoTree} onAdd={onAddNode} />
      </div>
    </div>
  );
};

export default TreeGraph;
