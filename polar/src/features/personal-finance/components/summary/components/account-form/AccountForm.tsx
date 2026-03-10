import {useState} from 'react';
import {useTranslation} from 'react-i18next';

interface AccountFormProps {
    onCancel: () => void;
    onSave: (data: { name: string; accType: string; bank: string; balance: number }) => void;
}

export default function AccountForm({onCancel, onSave}: AccountFormProps) {
    const {t} = useTranslation();

    const [name, setName] = useState<string>('');
    const [accType, setAccType] = useState<string>('cash');
    const [bank, setBank] = useState<string>('');
    const [balance, setBalance] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !bank || !balance || isNaN(parseFloat(balance))) {
            setError('Please fill all required fields correctly.');
            return;
        }

        onSave({
            name,
            accType,
            bank,
            balance: parseFloat(balance)
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
                <div className="p-3 rounded bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium dark:text-gh-muted">Account Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Main Wallet"
                    className="bg-transparent border border-smoky/20 dark:border-gh-border p-2 rounded focus:border-sunglow dark:focus:border-gh-accent outline-none dark:text-gh-text"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium dark:text-gh-muted">Type</label>
                <select
                    value={accType}
                    onChange={(e) => setAccType(e.target.value)}
                    className="bg-transparent border border-smoky/20 dark:border-gh-border p-2 rounded focus:border-sunglow dark:focus:border-gh-accent outline-none dark:text-gh-text dark:bg-gh-bg"
                >
                    <option value="cash">Cash</option>
                    <option value="bank">Bank Account</option>
                    <option value="credit">Credit Card</option>
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium dark:text-gh-muted">Bank Institution</label>
                <input
                    type="text"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    placeholder="e.g. BAC Credomatic"
                    className="bg-transparent border border-smoky/20 dark:border-gh-border p-2 rounded focus:border-sunglow dark:focus:border-gh-accent outline-none dark:text-gh-text"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium dark:text-gh-muted">Initial Balance</label>
                <input
                    type="number"
                    step="0.01"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="0.00"
                    className="bg-transparent border border-smoky/20 dark:border-gh-border p-2 rounded focus:border-sunglow dark:focus:border-gh-accent outline-none dark:text-gh-text"
                    required
                />
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-smoky/70 dark:text-gh-muted hover:text-smoky dark:hover:text-gh-text transition-colors"
                >
                    {t('UTIL.CANCEL')}
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-sunglow dark:bg-gh-accent text-smoky dark:text-gh-bg font-bold rounded shadow-md hover:opacity-90 transition-opacity"
                >
                    {t('UTIL.SAVE')}
                </button>
            </div>
        </form>
    );
}