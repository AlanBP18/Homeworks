import { useState } from 'react';

interface Props {
    inicial: number;
}

function Contador({ inicial }: Props) {
  const [contador, setContador] = useState(inicial);

  return (
    <>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>
          Sumar
      </button>
            <button onClick={() => setContador(contador - 1)}>
          Restar
      </button>
      <button onClick={() => setContador(inicial)}>
          Restart
      </button>
    </>
  );
}

export default Contador;