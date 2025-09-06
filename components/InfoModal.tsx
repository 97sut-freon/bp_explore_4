
import React from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 md:p-8 relative transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Dialog schließen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="info-modal-title" className="text-2xl font-bold text-gray-800 mb-6">
          Kurzanleitung: betterplace.org Explorer
        </h2>

        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Hauptfunktionen</h3>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><span className="font-semibold">Suche nach ID:</span> Direkte Suche nach der ID von Projekten, Organisationen oder Spendenaktionen.</li>
              <li><span className="font-semibold">Suche nach Kontakt:</span> Findet alle Entitäten, die einem bestimmten Ansprechpartner zugeordnet sind (z.B. "Max Mustermann", "Mustermann", "M. Mustermann").</li>
              <li><span className="font-semibold">Suche nach Organisation:</span> Eine flexible Suche, die auch bei ungenauen Namen oder Tippfehlern Organisationen findet und deren Projekte direkt mit anzeigt.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">Wichtiger Hinweis: Gespeicherte Daten</h3>
            <p>
              Dieses Tool speichert alle Projektdaten lokal in deinem Browser, um schnelle Suchen zu ermöglichen. 
              <span className="font-bold">Bitte lösche nicht die "Website-Daten" oder den "Cache" für diese Seite in den Browser-Einstellungen.</span>
              Andernfalls gehen die synchronisierten Daten verloren und müssen beim nächsten Besuch komplett neu geladen werden, was einige Minuten dauern kann.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Hinweis zum Status "Donations Prohibited"</h3>
            <p>
              Wenn ein Projekt diesen Status hat, aber <span className="font-semibold">nicht</span> als "Closed" markiert ist, deutet dies meistens auf einen 
              <span className="font-bold"> abgelaufenen Freistellungsbescheid</span> der Trägerorganisation hin. Es kann in selteneren Fällen auch bedeuten, dass das Projekt aus anderen Gründen gesperrt wurde.
            </p>
          </div>
        </div>

        <div className="mt-8 text-right">
          <button
            onClick={onClose}
            className="bg-brand-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
