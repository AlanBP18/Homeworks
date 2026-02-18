import React from 'react';
import ReactDOM from 'react-dom/client';
import HelloWorld from './HelloWorld';
import PrintMessage from './PrintMessage';
import Contador from './Contador';
import Arrays from './Arrays';
import Arreglos from './Arreglos';



ReactDOM.createRoot(document.getElementById('root')!)
.render(
    <React.StrictMode>
        < HelloWorld  />
        < PrintMessage message="Como te va?" repilou={12}  />
        < PrintMessage message="Soy un mensaje!!!" repilou={23} />
        < Contador inicial= {20000000} />
        < Arrays />
        <Arreglos />
    </React.StrictMode>
)
