import { useState, useEffect } from 'react';
import './History.css'; // <--- IMPORTUJEMY PLIK CSS

const History = () => {
    const [history, setHistory] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editNote, setEditNote] = useState("");

    // 1. READ: Pobierz dane przy starcie
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await fetch('http://localhost:8000/history');
            const data = await res.json();
            setHistory(data.reverse());
        } catch (err) {
            console.error("Błąd pobierania historii:", err);
        }
    };

    // 2. DELETE: Usuń wpis
    const handleDelete = async (id) => {
        if(!window.confirm("Czy na pewno usunąć ten wpis?")) return;
        
        try {
            await fetch(`http://localhost:8000/history/${id}`, { method: 'DELETE' });
            fetchHistory(); // Odśwież listę po usunięciu
        } catch (err) {
            console.error("Błąd usuwania:", err);
        }
    };

    // 3. UPDATE: Rozpocznij edycję
    const startEdit = (item) => {
        setEditId(item.id);
        setEditNote(item.note);
    };

    // 3. UPDATE: Zapisz edycję
    const saveEdit = async (id) => {
        try {
            await fetch(`http://localhost:8000/history/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ note: editNote })
            });
            setEditId(null);
            fetchHistory(); // Odśwież listę po zapisie
        } catch (err) {
            console.error("Błąd edycji:", err);
        }
    };

    return (
        <div className="history-container">
            <h1 className="history-title">Historia Diagnoz</h1>
            
            {history.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '20px' }}>
                    Brak zapisanych diagnoz.
                </p>
            ) : (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>Zdiagnozowana Choroba</th>
                            <th style={{ width: '40%' }}>Notatka Pacjenta</th>
                            <th style={{ width: '30%' }}>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr key={item.id}>
                                <td><strong>{item.disease}</strong></td>
                                <td>
                                    {editId === item.id ? (
                                        <input 
                                            className="edit-input"
                                            value={editNote} 
                                            onChange={(e) => setEditNote(e.target.value)}
                                            placeholder="Wpisz notatkę..." 
                                        />
                                    ) : (
                                        item.note ? item.note : <span className="no-note">Brak notatki</span>
                                    )}
                                </td>
                                <td>
                                    {editId === item.id ? (
                                        <button className="action-btn btn-save" onClick={() => saveEdit(item.id)}>
                                            Zapisz
                                        </button>
                                    ) : (
                                        <button className="action-btn btn-edit" onClick={() => startEdit(item)}>
                                            Edytuj
                                        </button>
                                    )}
                                    <button className="action-btn btn-delete" onClick={() => handleDelete(item.id)}>
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default History;