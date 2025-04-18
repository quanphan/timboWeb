export async function getProtectedData() {
    const token = localStorage.getItem("token");
    const res = await fetch("https://your-api.up.railway.app/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
}
