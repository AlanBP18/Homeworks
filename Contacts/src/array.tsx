import { useState } from "react";

const ContactList = () => {
  const [usuarios, setUsuarios] = useState<[string, number | string][]>([["Juan", 134515]]);
  const [nombre, setNombre] = useState("");
  const [tel, setTel] = useState("");

  const agregarUsuario = () => {
    if (nombre.trim() === "" || tel.trim() === "") return;
    const nuevoPar: [string, string] = [nombre, tel];
    setUsuarios([...usuarios, nuevoPar]);
    setNombre("");
    setTel("");
  };

  return (
    <div style={{ padding: '20px', width: '70vh' }}>
      <p>Agregar contacto</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <textarea
          name="Nombre"
          style={{ borderRadius: "20px", padding: '10px 20px', width: '100%', height: '40px', resize: 'none' }}
          id="Name"
          placeholder='Escribe el nombre del nuevo contacto:'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        ></textarea>
        <textarea
          name="Numero"
          id="Number"
          placeholder='Escribe el numero de telefono del nuevo contacto:'
          style={{ borderRadius: "20px", padding: '10px 20px', width: '100%', height: '40px', resize: 'none' }}
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        ></textarea>
        <button className='txt' onClick={agregarUsuario} style={{ cursor: 'pointer', padding: '10px', borderRadius: '20px' }}>
          Agregar a la lista
        </button>
      </div>

      <h2>Lista de Contactos</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {usuarios.map((usuario, index) => (
          <li key={index} style={{ background: '#f0f0f0', margin: '5px 0', padding: '10px', borderRadius: '10px', color: '#333' }}>
            <strong>{usuario[0]}</strong>: {usuario[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
