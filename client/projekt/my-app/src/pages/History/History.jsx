import { useState, useEffect } from 'react';
import './History.css';
import { useAuth } from '../../context/AuthContext';

const History = () => {
    const [history, setHistory] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editNote, setEditNote] = useState("");
    const { token } = useAuth();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await fetch('http://localhost:8000/history', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            setHistory(data);
        } catch (err) {
            console.error("Error fetching history:", err);
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure you want to delete this entry?")) return;
        try {
            await fetch(`http://localhost:8000/history/${id}`, { 
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchHistory();
        } catch (err) {
            console.error("Deletion error:", err);
        }
    };

    const startEdit = (item) => {
        setEditId(item.id);
        setEditNote(item.note);
    };

    const saveEdit = async (id) => {
        try {
            await fetch(`http://localhost:8000/history/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ note: editNote })
            });
            setEditId(null);
            fetchHistory();
        } catch (err) {
            console.error("Edition error:", err);
        }
    };

    const toggleConfirmed = async (item) => {
        try {
            await fetch(`http://localhost:8000/history/${item.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ confirmed: !item.confirmed })
            });
            fetchHistory();
        } catch (err) {
            console.error("Confirmation error:", err);
        }
    };

    return (
        <div className="history-container">
            <h1 className="history-title">Diagnose history</h1>
            
            {history.length === 0 ? (
                <p className="no-history-message">No saved diagnoses.</p>
            ) : (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>DISEASE</th>
                            <th className="text-center">DATE</th>
                            <th className="text-center">CONFIRMED</th>
                            <th>PATIENT NOTES</th>
                            <th className="text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr key={item.id}>
                                <td className="fw-bold">{item.disease}</td>
                                <td className="text-center date-cell">{item.date || "-"}</td>
                                <td className="text-center">
                                    <input 
                                        type="checkbox" 
                                        className="confirm-checkbox"
                                        checked={item.confirmed || false} 
                                        onChange={() => toggleConfirmed(item)}
                                    />
                                </td>
                                <td>
                                    {editId === item.id ? (
                                        <input 
                                            className="edit-input"
                                            value={editNote} 
                                            onChange={(e) => setEditNote(e.target.value)}
                                            placeholder="Add note..." 
                                            autoFocus
                                        />
                                    ) : (
                                        <span className="note-text">{item.note || "Add note..."}</span>
                                    )}
                                </td>
                                <td className="action-cell">
                                    {editId === item.id ? (
                                        <button className="action-btn btn-save" onClick={() => saveEdit(item.id)}>
                                            Save
                                        </button>
                                    ) : (
                                        <button className="action-btn btn-edit" onClick={() => startEdit(item)}>
                                            Edit
                                        </button>
                                    )}
                                    <button className="action-btn btn-delete" onClick={() => handleDelete(item.id)}>
                                        Delete
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
