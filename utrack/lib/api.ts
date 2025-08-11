export async function getUsers() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        next: { revalidate: 60 }, 
    });
    if (!res.ok) {
        throw new Error(`Ошибка загрузки пользователей: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();

    if (!Array.isArray(data)) {
        throw new Error("Некорректный формат данных от сервера");
    }
    return data;
}  