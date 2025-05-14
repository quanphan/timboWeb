import { useEffect, useState } from 'react';
import { getUsers, updateUser } from '../services/userService';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                console.error('Failed to load users', err);
            }
        };
        fetchUsers();
    }, []);

    const startEdit = (user) => {
        setEditing(user._id);
        setForm({
            name: user.name || '',
            phone: user.phone || '',
            type: user.type || '',
            isAdmin: user.admin == '1' || false,
        });
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const saveEdit = async () => {
        try {
            await updateUser(editing, form);
            alert('User updated');
            setEditing(null);
            const updated = await getUsers();
            setUsers(updated);
        } catch (err) {
            console.error('Update failed', err);
            alert('Failed to update');
        }
    };

    return (
        <div >
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>
            <table className="min-w-full text-sm text-left text-gray-700">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2">Phone</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Admin</th>
                    <th className="p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => (
                    <tr key={u._id} className="border-t">
                        <td className="p-2">{u.email}</td>
                        <td className="p-2">
                            {editing === u._id ? (
                                <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
                            ) : (
                                u.name
                            )}
                        </td>
                        <td className="p-2">
                            {editing === u._id ? (
                                <input value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                            ) : (
                                u.phone || '-'
                            )}
                        </td>
                        <td className="p-2">
                            {editing === u._id ? (
                                <input value={form.type} onChange={(e) => handleChange('type', e.target.value)} />
                            ) : (
                                u.type || '-'
                            )}
                        </td>
                        <td className="p-2">
                            {editing === u._id ? (
                                <input
                                    type="checkbox"
                                    checked={form.isAdmin}
                                    onChange={(e) => handleChange('isAdmin', e.target.checked)}
                                />
                            ) : u.admin ? '✅' : ''}
                        </td>
                        <td className="p-2">
                            {editing === u._id ? (
                                <>
                                    <button onClick={saveEdit} className="text-green-600 mr-2">Save</button>
                                    <button onClick={() => setEditing(null)} className="text-gray-600">Cancel</button>
                                </>
                            ) : (
                                <button onClick={() => startEdit(u)} className="text-blue-600">Edit</button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
