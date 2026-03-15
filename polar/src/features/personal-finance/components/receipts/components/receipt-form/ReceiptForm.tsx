import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ReceiptFormProps {
    onCancel: () => void;
    onSave: (data: { amount: number; date: string; description: string }) => void;
}

export default function ReceiptForm({ onCancel, onSave }: ReceiptFormProps) {
    const { t } = useTranslation();

    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [description, setDescription] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedDate = new Date(date);
        const today = new Date();

        if (selectedDate > today) {
            setError(t('ERRORS.FUTURE_DATE'));
            return;
        }

        if (!amount || isNaN(parseFloat(amount))) {
            setError(t('ERRORS.INVALID_AMOUNT'));
            return;
        }

        onSave({
            amount: parseFloat(amount),
            date,
            description
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
                <label className="text-sm font-medium dark:text-gh-muted">{t('PERSONAL.TABLE_AMOUNT')}</label>
                <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="bg-transparent border border-smoky/20 dark:border-gh-border p-2 rounded focus:border-sunglow dark:focus:border-gh-accent outline-none dark:text-gh-text"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium dark:text-gh-muted">{t('PERSONAL.TABLE_DATE')}</label>
                <input
                    type="date"
                    value={date}
                    max={new Date().toISOString().split('T')[0]} // Native browser enforcement
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent border border-smoky/20 dark:border-gh-border p-2 rounded dark:text-gh-text dark:[color-scheme:dark]"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium dark:text-gh-muted">{t('PERSONAL.TABLE_DESCRIPTION')}</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-transparent border border-smoky/20 dark:border-gh-border p-2 rounded h-24 dark:text-gh-text"
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