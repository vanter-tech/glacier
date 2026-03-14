import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useReceipts} from '../../../../hooks/useReceipts';
import Modal from '../../../../shared/modal/Modal';
import ReceiptForm from "./components/receipt-form/ReceiptForm.tsx";
import ReceiptDetails from "./components/receipt-details/ReceiptDetails.tsx";

export default function Receipts() {
    const {t} = useTranslation();
    const {
        receipts, paginatedReceipts, selectedReceipt, deleteReceipt, setSelectedReceipt,
        currentPage, nextPage, prevPage, saveReceipt, viewReceipt, pageSize
    } = useReceipts();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const handleViewReceipt = async (id: number) => {
        await viewReceipt(id);
        setIsDetailModalOpen(true);
    };

    const handleSave = async (data: { amount: number; date: string; description: string }) => {
        const success = await saveReceipt(data);
        if (success) setIsModalOpen(false);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm(t('UTIL.CONFIRM_DELETE'))) {
            const success = await deleteReceipt(id);
            if (success) {
                setIsDetailModalOpen(false);
                setSelectedReceipt(null);
            }
        }
    };

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-smoky dark:text-gh-text">{t('PERSONAL.RECEIPTS_LEDGER')}</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-sunglow dark:bg-gh-accent text-smoky dark:text-gh-bg font-bold px-4 py-2 rounded-md hover:bg-sunglow/80 transition-colors shadow-sm hover:-translate-y-0.5"
                >
                    + {t('PERSONAL.ADD_RECEIPT')}
                </button>
            </div>

            <div className="flex-1 bg-white dark:bg-gh-surface rounded-xl border border-smoky/10 dark:border-gh-border overflow-hidden flex flex-col shadow-sm">
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-smoky/5 dark:bg-gh-bg sticky top-0 border-b border-smoky/10 dark:border-gh-border text-smoky/70 dark:text-gh-muted text-sm font-semibold">
                        <tr>
                            <th className="py-3 px-6">{t('PERSONAL.TABLE_ID')}</th>
                            <th className="py-3 px-6">{t('PERSONAL.TABLE_DATE')}</th>
                            <th className="py-3 px-6">{t('PERSONAL.TABLE_AMOUNT')}</th>
                            <th className="py-3 px-6">{t('PERSONAL.TABLE_DESCRIPTION')}</th>
                        </tr>
                        </thead>
                        <tbody className="text-smoky dark:text-gh-text text-sm">
                        {paginatedReceipts.length > 0 ? (
                            paginatedReceipts.map((receipt) => (
                                <tr
                                    key={receipt.id}
                                    onClick={() => handleViewReceipt(receipt.id)}
                                    className="border-b border-smoky/10 dark:border-gh-border last:border-0 cursor-pointer hover:bg-smoky/5 dark:hover:bg-gh-bg/50 transition-colors"
                                >
                                    <td className="py-3 px-6">{receipt.id}</td>
                                    <td className="py-3 px-6">{receipt.date}</td>
                                    <td className="py-3 px-6 font-medium">${(receipt.amount_cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    <td className="py-3 px-6 truncate max-w-[200px]">{receipt.description?.String}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-12 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-smoky/5 dark:bg-gh-bg flex items-center justify-center mb-4 text-2xl">
                                            📊
                                        </div>
                                        <p className="text-lg font-medium dark:text-gh-text mb-1">{t('PERSONAL.NO_RECEIPTS_TITLE')}</p>
                                        <p className="text-sm text-smoky/70 dark:text-gh-muted">{t('PERSONAL.NO_RECEIPTS_DESC')}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-3 border-t border-smoky/10 dark:border-gh-border bg-smoky/5 dark:bg-gh-bg flex justify-between items-center text-sm text-smoky/70 dark:text-gh-muted">
                    <span>Page {currentPage}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded border border-smoky/20 dark:border-gh-border hover:bg-smoky/10 disabled:opacity-50 transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentPage * pageSize >= receipts.length}
                            className="px-3 py-1 rounded border border-smoky/20 dark:border-gh-border hover:bg-smoky/10 disabled:opacity-50 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal
                    title={t('PERSONAL.NEW_RECEIPT')}
                    onClose={() => setIsModalOpen(false)}
                    body={<ReceiptForm onCancel={() => setIsModalOpen(false)} onSave={handleSave}/>}
                />
            )}

            {isDetailModalOpen && (
                <Modal
                    title="Receipt Details"
                    onClose={() => {
                        setIsDetailModalOpen(false);
                        setSelectedReceipt(null);
                    }}
                    body={<ReceiptDetails receipt={selectedReceipt} onDelete={handleDelete}/>}
                />
            )}
        </div>
    );
}