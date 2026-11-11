const OPTIONS_FILTRES = [
  { valeur: 'toutes', libelle: 'Toutes' },
  { valeur: 'actives', libelle: 'À faire' },
  { valeur: 'terminees', libelle: 'Terminées' },
]

function Filtres({ filtre, surChangerFiltre }) {
  return (
    <div className="filtres">
      {OPTIONS_FILTRES.map((option) => (
        <button
          key={option.valeur}
          className={filtre === option.valeur ? 'actif' : ''}
          onClick={() => surChangerFiltre(option.valeur)}
        >
          {option.libelle}
        </button>
      ))}
    </div>
  )
}

export default Filtres