import { useState, useMemo } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import Graph from './Graph';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

interface Person {
  type: 'Person';
  id: string;
  name: string;
  age: number;
}

interface City {
  type: 'City';
  id: string;
  name: string;
}

type Entity = Person | City;

function App() {
  const [selectedCity, setSelectedCity] = useState<string>('New York');


  const { graph, entities, d3Data } = useMemo(() => {
    const graphInstance = new Graph<string>();

    const entityMap: Record<string, Entity> = {
      'Alice': { type: 'Person', id: 'Alice', name: 'Alice', age: 28 },
      'Bob': { type: 'Person', id: 'Bob', name: 'Bob', age: 34 },
      'Charlie': { type: 'Person', id: 'Charlie', name: 'Charlie', age: 22 },
      'Diana': { type: 'Person', id: 'Diana', name: 'Diana', age: 29 },
      'Eve': { type: 'Person', id: 'Eve', name: 'Eve', age: 41 },
      'New York': { type: 'City', id: 'New York', name: 'New York' },
      'Los Angeles': { type: 'City', id: 'Los Angeles', name: 'Los Angeles' },
      'Chicago': { type: 'City', id: 'Chicago', name: 'Chicago' }
    };

    Object.keys(entityMap).forEach(key => graphInstance.addNode(key));

    graphInstance.addEdge('Alice', 'Bob');
    graphInstance.addEdge('Alice', 'Charlie');
    graphInstance.addEdge('Bob', 'Diana');

    graphInstance.addEdge('Alice', 'New York');
    graphInstance.addEdge('Bob', 'New York');
    graphInstance.addEdge('Charlie', 'Los Angeles');
    graphInstance.addEdge('Diana', 'Los Angeles');
    graphInstance.addEdge('Eve', 'Chicago');

    const nodes = Object.values(entityMap).map(e => ({
      id: e.id,
      color: e.type === 'City' ? '#ff4757' : '#1e90ff',
      symbolType: e.type === 'City' ? 'star' : 'circle',
      size: e.type === 'City' ? 600 : 400,
      labelProperty: 'name'
    }));

    const links: { source: string, target: string }[] = [];
    const seen = new Set<string>();

    const adjList = graphInstance.getAdjacencyList();
    for (const [node, edges] of Object.entries(adjList)) {
      for (const edge of edges) {
        const linkId1 = `${node}-${edge}`;
        const linkId2 = `${edge}-${node}`;
        if (!seen.has(linkId1) && !seen.has(linkId2)) {
          links.push({ source: node, target: edge });
          seen.add(linkId1);
        }
      }
    }

    return {
      graph: graphInstance,
      entities: entityMap,
      d3Data: { nodes, links }
    };
  }, []);

  const getPeopleInCity = (cityId: string) => {
    const adjList = graph.getAdjacencyList();
    const connectedNodes = adjList[cityId] || [];
    return connectedNodes
      .map(nodeId => entities[nodeId])
      .filter(entity => entity.type === 'Person') as Person[];
  };

  const cities = Object.values(entities).filter(e => e.type === 'City') as City[];
  const peopleInSelectedCity = getPeopleInCity(selectedCity);

  const d3Config = {
    nodeHighlightBehavior: true,
    directed: false,
    node: {
      color: 'lightgreen',
      size: 400,
      highlightStrokeColor: 'blue',
      fontSize: 14,
      highlightFontSize: 16,
    },
    link: {
      highlightColor: 'lightblue',
      color: '#d3d3d3',
      strokeWidth: 2,
    },
    height: 500,
    width: 800,
    d3: {
      gravity: -300,
      linkLength: 150,
      alphaTarget: 0.05
    },
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-dark">Personas y sus ciudades</h1>

      <div className="row g-4">
        <div className="col-lg-4 col-md-5">
          <div className="card shadow-sm h-100 bg-light rounded-4 border-0">
            <div className="card-body p-4">
              <h2 className="card-title h4 mb-4 text-secondary">Ciudades</h2>

              <div className="mb-4">
                <label htmlFor="city-select" className="form-label fw-bold text-dark">Selecciona una ciudad:</label>
                <select
                  id="city-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="form-select border-secondary shadow-none"
                >
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>

              <ul className="list-group list-group-flush bg-transparent">
                {peopleInSelectedCity.length > 0 ? (
                  peopleInSelectedCity.map(person => (
                    <li key={person.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-bottom px-0 py-3 text-dark">
                      <span className="fw-medium">{person.name}</span>
                      <span className="text-secondary small">Edad: {person.age}</span>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item bg-transparent text-muted fst-italic px-0 py-3">No hay personas en esta ciudad</li>
                )}
              </ul>

              <div className="mt-5 pt-3">
                <p className="text-muted small mb-1">* Las estrellas rojas son ciudades</p>
                <p className="text-muted small mb-0">* Los círculos azules son personas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-md-7" style={{ minWidth: '500px' }}>
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden h-100 bg-white">
            <div className="card-body p-0" style={{ height: '500px', width: '100%', overflow: 'auto' }}>
              <D3Graph
                id="friends-cities-graph"
                data={d3Data}
                config={d3Config}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
