import React, { useState } from 'react';

interface User {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: { name: string };
}

interface AddUserButtonProps {
    onAddUser: (user: User) => void;
}

export default function AddUserButton({ onAddUser }: AddUserButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState<User>({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        company: { name: '' },
    });

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'company') {
            setForm(prev => ({
                ...prev,
                company: { name: value }
            }));
        } else {
            setForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddUser(form);
        setForm({
            name: '',
            username: '',
            email: '',
            phone: '',
            website: '',
            company: { name: '' },
        });
        closeModal();
    };

    return (
    <>
        <button
            onClick={openModal}
            className="px-2 py-2 border border-violet-400  bg-violet-200 text-black rounded hover:bg-violet-100 transition-colors"
        > Добавить пользователя
        </button>

        {isOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow max-w-md w-full space-y-4"
            >
                <h2 className="text-xl font-bold mb-4 flex justify-center">Добавить пользователя</h2>
                {['name', 'username', 'email', 'phone', 'website'].map(
                (field) => {
                    let inputType = 'text';
                    if (field === 'email') inputType = 'email';
                    else if (field === 'phone') inputType = 'tel';
                    return (
                        <input
                            key={field}
                            type={inputType}
                            name={field}
                            value={form[field as keyof User] as string}
                            onChange={handleChange}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            className="border rounded px-3 py-2 w-full"
                            required
                        />
                    );
                    })}
                <input
                    name="company"
                    value={form.company.name}
                    onChange={handleChange}
                    placeholder="Company"
                    className="border rounded px-3 py-2 w-full"
                    required
                />
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 border border-violet-400  bg-violet-200 text-black rounded-lg hover:bg-violet-100 transition-colors"
                    > Отмена
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-lime-400 bg-lime-100 text-black rounded-lg hover:bg-lime-100 transition-colors"
                    > Добавить
                    </button>
                </div>
            </form>
            </div>
        )}
    </>
    );
}
