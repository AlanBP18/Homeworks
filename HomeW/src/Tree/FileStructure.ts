export interface FileStructure {
  id: string;
  name: string;
  type: 'folder' | 'file';
  createdBy: string;
  children: FileStructure[] | null;
  parentId: string | null;
}

export type FileSystemNode = FileStructure;