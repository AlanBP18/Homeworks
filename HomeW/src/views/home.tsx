import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { useAuth } from "../AuthContext";
import { useCollection } from "../hooks/useCollection";
import { defaultTree } from "../Tree/treeData";
import type { FileStructure } from "../Tree/FileStructure";
import TreeGraph from "../Tree/TreeGraph";

const Home = () => {
    const { user, loading } = useAuth();
    const { logout } = useFirebaseAuth();
    const {
        error: firestoreError,
        getById,
        setById,
    } = useCollection<FileStructure>("trees");
    const [tree, setTree] = useState<FileStructure | null>(null);
    const [treeLoading, setTreeLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);
    const [treeError, setTreeError] = useState<string | null>(null);
    const displayTreeError = treeError ?? firestoreError;

    const generateNodeId = () => `node-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

    const addNodeToTree = (current: FileStructure, parentId: string): FileStructure => {
        if (current.id === parentId) {
            const newNode: FileStructure = {
                id: generateNodeId(),
                name: "Nuevo nodo",
                type: "file",
                createdBy: user?.email ?? "usuario",
                parentId: current.id,
                children: null,
            };

            return {
                ...current,
                children: current.children ? [...current.children, newNode] : [newNode],
            };
        }

        return {
            ...current,
            children: current.children ? current.children.map((child) => addNodeToTree(child, parentId)) : null,
        };
    };

    const handleAddNode = (parentId: string) => {
        if (!tree) return;
        const updatedTree = addNodeToTree(tree, parentId);
        setTree(updatedTree);
        setSaveMessage("Se añadió un nodo. Presiona guardar para persistir los cambios.");
    };

    useEffect(() => {
        async function load() {
            try {
                const loadedTree = await getById("misCarpetas");
                setTree(loadedTree ?? defaultTree);
            } catch (error: any) {
                setTreeError("El árbol no cargó desde Firestore.");
            } finally {
                setTreeLoading(false);
            }
        }

        load();
    }, [getById]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100 pb-5 position-relative overflow-hidden">
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4 position-relative" style={{ zIndex: 10 }}>
                <div className="container">
                    <span className="navbar-brand fw-bold text-dark">
                        <i className="bi bi-grid-1x2-fill me-2"></i> Mi Dashboard
                    </span>
                    <div className="d-flex align-items-center">
                        <span className="text-dark me-3 d-none d-md-block">
                            Hola, <strong>{user?.email}</strong>
                        </span>
                        <button onClick={logout} className="btn btn-outline-danger btn-sm fw-bold">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container position-relative" style={{ zIndex: 10 }}>
                <div className="row g-4">
                    <div className="col-lg-5">
                        <div className="bg-white rounded-3 shadow-sm p-4 min-vh-50 d-flex flex-column justify-content-center">
                            <h2 className="text-muted mb-4">Bienvenido a la página principal</h2>
                            <p className="text-secondary">
                                Aquí puedes visualizar el árbol de datos de la aplicación y guardar los cambios en Firestore.
                            </p>
                            <div className="mt-4">
                                <span className="badge bg-primary me-2">Usuario</span>
                                <span>{user?.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="bg-white rounded-3 shadow-sm p-4 min-vh-50">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div>
                                    <h3 className="mb-1">Árbol de datos</h3>
                                    <p className="text-secondary mb-0">Renderizado gráfico desde Firestore</p>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={async () => {
                                            if (!tree) return;
                                            setSaveLoading(true);
                                            setSaveMessage(null);
                                            try {
                                                const saved = await setById("misCarpetas", tree);
                                                if (saved) {
                                                    setSaveMessage("Árbol guardado en la nube correctamente.");
                                                } else {
                                                    setSaveMessage("Error al guardar el árbol en Firestore.");
                                                }
                                            } catch (error: any) {
                                                setSaveMessage("Error al guardar el árbol en Firestore.");
                                            } finally {
                                                setSaveLoading(false);
                                            }
                                        }}
                                        disabled={treeLoading || saveLoading || !tree}
                                    >
                                        {saveLoading ? 'Guardando...' : 'Guardar árbol'}
                                    </button>
                                    {treeLoading && <div className="spinner-border text-primary" role="status" />}
                                </div>
                            </div>
                            {displayTreeError && (
                                <div className="alert alert-warning" role="alert">
                                    {displayTreeError}
                                </div>
                            )}
                            {saveMessage && (
                                <div className="alert alert-info" role="alert">
                                    {saveMessage}
                                </div>
                            )}
                            {tree ? (
                                <TreeGraph tree={tree} onAddNode={handleAddNode} />
                            ) : (
                                <div className="text-center text-secondary py-5">
                                    {treeLoading ? 'Cargando árbol...' : 'No se encontró el árbol.'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
