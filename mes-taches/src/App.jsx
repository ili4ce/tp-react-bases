import { useState } from 'react'
import Entete from './components/Entete.jsx'
import Carte from './components/Carte.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Pied from './components/Pied.jsx'

const TACHES_INITIALES = [
  { id: 1, titre: 'Installer Node.js et Vite', terminee: true },
  { id: 2, titre: 'Comprendre les composants', terminee: true },
  { id: 3, titre: 'Passer des données avec les props', terminee: false },
  { id: 4, titre: "Gérer l'état avec useState", terminee: false },
]

function App() {
  const [taches, setTaches] = useState(TACHES_INITIALES)

  return (
    <div className="app">
      <Entete 
        titre="Mes tâches" 
        sousTitre="Mon premier projet React" 
      />
      
      <Carte titre="Ma liste">
        <ListeTaches taches={taches} />
      </Carte>

      <Pied auteur="iliace bella" />
    </div>
  )
}

export default App