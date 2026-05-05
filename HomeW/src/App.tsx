import { useState, useMemo, useEffect } from 'react'
import { SmartSearchEngine } from './SmartSearchEngine'
import { products } from './mockData'
import type { Product } from './Trie'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])

  // Memoize the engine so it's only created once
  const engine = useMemo(() => {
    const e = new SmartSearchEngine()
    products.forEach(p => e.insert(p.name, p.popularity))
    return e
  }, [])

  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      return
    }
    // Search for top 3 results matching the prefix
    const res = engine.searchTopK(query.toLowerCase(), 3)
    setResults(res)
  }, [query, engine])

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary">Busqueda super rapida</h1>
            <p className="text-secondary lead">Find the top products instantly with Trie + Heap in 0.0000000001 seconds</p>
          </div>

          <div className="card shadow border-0 rounded-4 overflow-hidden">
            <div className="card-body p-4">
              <div className="input-group input-group-lg mb-2">
                <input
                  type="text"
                  className="form-control rounded-pill px-4"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type to search sneakers..."
                  autoFocus
                />
              </div>

              <div className="list-group list-group-flush mt-4">
                {results.map((product, index) => (
                  <div key={index} className="list-group-item d-flex justify-content-between align-items-center py-3 border-0 rounded-3 mb-2 bg-light hover-shadow transition">
                    <div>
                      <h6 className="mb-0 fw-bold text-capitalize">{product.name}</h6>
                    </div>
                    <span className="badge bg-primary rounded-pill py-2 px-3">
                      {product.popularity}% Popularity
                    </span>
                  </div>
                ))}

                {query.trim() !== '' && results.length === 0 && (
                  <div className="alert alert-light text-center py-4 border-0">
                    <span className="text-muted">No matches found for "<strong>{query}</strong>"</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

