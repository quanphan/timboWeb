import { useEffect, useState } from 'react';
import { getMessageList, deleteMessage } from '../services/apiService';
import { toast } from 'react-hot-toast';

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const limit = 5;

    const fetchMessages = async () => {
        try {
            const data = await getMessageList(page, limit);
            const sortedMessages = data.data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setMessages(sortedMessages);
            setTotal(data.total);
        } catch (error) {
            console.error('Failed to fetch messages:', error.message);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this message?');
        if (confirmDelete) {
            try {
                await deleteMessage(id);
                toast.success('Deleted successfully!');
                fetchMessages();
            } catch (error) {
                toast.error('Failed to delete message: ' + error.message);
            }
        }
    };

    const filteredMessages = messages.filter((msg) => {
        const term = searchTerm.toLowerCase();
        return (
            msg.name.toLowerCase().includes(term) ||
            msg.email.toLowerCase().includes(term) ||
            (msg.subject && msg.subject.toLowerCase().includes(term))
        );
    });

    return (
        <div>
            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, email, subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 uppercase">
                    <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4 hidden md:table-cell">Phone</th>
                        <th className="py-3 px-4 hidden md:table-cell">Subject</th>
                        <th className="py-3 px-4">Created At</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMessages.length > 0 ? (
                        filteredMessages.map((msg) => (
                            <tr key={msg.id} className="border-b">
                                <td className="py-2 px-4">{msg.name}</td>
                                <td className="py-2 px-4">{msg.email}</td>
                                <td className="py-2 px-4 hidden md:table-cell">{msg.phone}</td>
                                <td className="py-2 px-4 hidden md:table-cell">{msg.subject}</td>
                                <td className="py-2 px-4">
                                    {new Date(msg.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-3 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-6 text-gray-500">
                                No messages found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="bg-orange-400 hover:bg-orange-500 text-white text-sm py-2 px-4 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="text-gray-700 text-sm">Page {page} of {totalPages}</span>

                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="bg-orange-400 hover:bg-orange-500 text-white text-sm py-2 px-4 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
