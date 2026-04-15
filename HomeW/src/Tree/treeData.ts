import type { FileStructure } from "./FileStructure";

export const defaultTree: FileStructure = {
  id: '1',
  name: 'Mis carpetas',
  type: 'folder',
  createdBy: 'system',
  parentId: null,
  children: [
    {
      id: '2',
      name: 'Documentos',
      type: 'folder',
      createdBy: 'system',
      parentId: '1',
      children: [
        {
          id: '3',
          name: 'Contrato.pdf',
          type: 'file',
          createdBy: 'system',
          parentId: '2',
          children: null,
        },
        {
          id: '4',
          name: 'Resumen.txt',
          type: 'file',
          createdBy: 'system',
          parentId: '2',
          children: null,
        },
        {
          id: '5',
          name: 'Presupuesto.xlsx',
          type: 'file',
          createdBy: 'system',
          parentId: '2',
          children: null,
        },
      ],
    },
    {
      id: '6',
      name: 'Imágenes',
      type: 'folder',
      createdBy: 'system',
      parentId: '1',
      children: [
        {
          id: '7',
          name: 'Portada.jpg',
          type: 'file',
          createdBy: 'system',
          parentId: '6',
          children: null,
        },
        {
          id: '8',
          name: 'Logo.png',
          type: 'file',
          createdBy: 'system',
          parentId: '6',
          children: null,
        },
      ],
    },
  ],
};

export default defaultTree;
