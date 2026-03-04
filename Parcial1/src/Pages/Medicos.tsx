import React, { useState, useEffect } from "react"

const ArrayMedicos =[
    {name: "Doctor Juan Perez"},
    {name: "Doctora Marcela Romar"},
    {name: "Doctor Sharon Lomas"},
    {name: "Doctor Felipe Gutierrez"},
    {name: "Doctor Felipe Mendoza"}
]

export const Medicos: React.FC = () => {
    const [indexEncargado, setIndexEncargado] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndexEncargado((prevIndex) => (prevIndex + 1) % ArrayMedicos.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const medicoAcargo = ArrayMedicos[indexEncargado];

    return (
        <>
            <div className="encargado-section">
                <p>Médico a cargo:</p>
                <h2 className="medico-encargado">{medicoAcargo.name}</h2>
            </div>
            <div className="medicos-container">
                <p> Listado de medicos</p>
                <div className="medicos-grid">
                    {ArrayMedicos.map((medico, index) => (
                        <div 
                            key={index} 
                            className={`medico-card ${index === indexEncargado ? 'active' : ''}`}
                        >
                            <h2 className="medico-name">{medico.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

