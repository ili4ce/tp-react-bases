import { useState, useEffect } from 'react'
import Entete from './components/Entete.jsx'
import Carte from './components/Carte.jsx'
import Horloge from './components/Horloge.jsx'
import FormulaireAjout from './components/FormulaireAjout.jsx'
import Filtres from './components/Filtres.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Statistiques from './components/Statistiques.jsx'
import Pied from './components/Pied.jsx'

function App() {
  const [taches, setTaches] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [filtre, setFiltre] = useState('toutes')

  // Chargement des tâches depuis le fichier JSON (Étape 5)
  useEffect(() => {
    let annule = false

    fetch('/taches.json')
      .then((reponse) => {
        if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`)
        return reponse.json()
      })
      .then((donnees) => {
        if (!annule) setTaches(donnees)
      })
      .catch((err) => {
        if (!annule) setErreur(err.message)
      })
      .finally(() => {
        if (!annule) setChargement(false)
      })

    return () => {
      annule = true
    }
  }, [])

  // Synchroniser le titre de l'onglet avec le nombre de tâches restantes (Étape 5)
  const tachesRestantes = taches.filter((t) => !t.terminee).length

  useEffect(() => {
    document.title = `(${tachesRestantes}) Mes tâches`
  }, [tachesRestantes])

  function ajouterTache(titre) {
    const nouvelleTache = {
      id: Date.now(),
      titre,
      terminee: false,
    }
    setTaches([...taches, nouvelleTache])
  }

  function basculerTache(id) {
    setTaches(
      taches.map((tache) =>
        tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
      )
    )
  }

  function supprimerTache(id) {
    setTaches(taches.filter((tache) => tache.id !== id))
  }

  // État dérivé : filtrer les tâches selon le filtre actif (Étape 4)
  const tachesVisibles = taches.filter((tache) => {
    if (filtre === 'actives') return !tache.terminee
    if (filtre === 'terminees') return tache.terminee
    return true
  })

  return (
    <div className="app">
      <Entete titre="Mes tâches" sousTitre="Mon premier projet React" />

      <Carte titre="Heure actuelle">
        <Horloge />
      </Carte>

      <Carte titre="Nouvelle tâche">
        <FormulaireAjout onAjouter={ajouterTache} />
      </Carte>

      <Carte titre="Ma liste">
        <Filtres filtre={filtre} surChangerFiltre={setFiltre} />
        {chargement && <p className="vide">Chargement des tâches…</p>}
        {erreur && <p className="erreur">{erreur}</p>}
        {!chargement && !erreur && (
          <ListeTaches
            taches={tachesVisibles}
            onBasculer={basculerTache}
            onSupprimer={supprimerTache}
          />
        )}
      </Carte>

      <Carte titre="Statistiques">
        <Statistiques taches={taches} />
      </Carte>

      <Pied auteur="iliace bella" />
    </div>
  )
}

export default App