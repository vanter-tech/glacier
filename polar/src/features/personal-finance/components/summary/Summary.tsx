import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useSummary } from "../../../../hooks/useSummary.ts";
import { useAccounts } from "../../../../hooks/useAccounts.ts"; // Import the accounts hook
import { formatCurrency } from "../../../../shared/currency/formatCurrency.ts";
import Modal from "../../../../shared/modal/Modal.tsx";
import { queries } from "../../../../wailsjs/go/models";
import AccountForm from "./components/account-form/AccountForm.tsx";
import AccountDetails from "./components/account-details/AccountDetails.tsx";

interface SummaryProps {
    startDate: string;
    endDate: string;
}

export default function Summary({ startDate, endDate }: SummaryProps) {
    const { t } = useTranslation();

    const { balance, spent, isLoading, error, refetch } = useSummary(startDate, endDate);

    const { accounts, saveAccount, deleteAccount } = useAccounts();

    const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<queries.Account | null>(null);

    const handleSaveAccount = async (data: { name: string; accType: string; bank: string; balance: number }) => {
        const success = await saveAccount(data);
        if (success) {
            setIsAddAccountOpen(false);
            await refetch();
        }
    };

    const handleDeleteAccount = async (id: number) => {
        if (window.confirm(t('UTIL.CONFIRM_DELETE'))) {
            const success = await deleteAccount(id);
            if (success) {
                setSelectedAccount(null);
                await refetch();
            }
        }
    };

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center text-smoky/70 dark:text-gh-muted animate-pulse font-medium">
                {t('LOADING.METRICS')}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 flex flex-col items-start gap-2">
                <p className="font-bold">{t('ERROR.LOADING_SUMMARY')}</p>
                <p className="text-sm">{error}</p>
                <button
                    onClick={refetch}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-sm transition-colors">
                    {t('UTIL.RETRY')}
                </button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-smoky dark:text-gh-text">
                    {t('PERSONAL.SUMMARY_DASHBOARD')}
                </h3>
                <button
                    onClick={refetch}
                    className="px-4 py-2 text-sm border border-smoky/20 dark:border-gh-border rounded-md hover:bg-smoky/5 dark:hover:bg-gh-surface transition-colors dark:text-gh-text"
                >
                    {t('UTIL.REFRESH_DATA')}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gh-surface rounded-xl border border-smoky/10 dark:border-gh-border p-6 shadow-sm flex flex-col gap-2 transition-transform hover:-translate-y-1 duration-300">
                    <span className="text-sm text-smoky/70 dark:text-gh-muted uppercase tracking-wider font-semibold">
                        {t('PERSONAL.TOTAL_BALANCE')}
                    </span>
                    <span className="text-4xl font-bold text-smoky dark:text-gh-text">
                        {formatCurrency(balance)}
                    </span>
                </div>

                <div className="bg-white dark:bg-gh-surface rounded-xl border border-smoky/10 dark:border-gh-border p-6 shadow-sm flex flex-col gap-2 transition-transform hover:-translate-y-1 duration-300">
                    <span className="text-sm text-smoky/70 dark:text-gh-muted uppercase tracking-wider font-semibold">
                        {t('PERSONAL.TOTAL_SPENT')}
                    </span>
                    <span className="text-4xl font-bold text-smoky dark:text-gh-text">
                        {formatCurrency(spent)}
                    </span>
                </div>
            </div>

            <div className="flex-1 bg-white dark:bg-gh-surface rounded-xl border border-smoky/10 dark:border-gh-border shadow-sm flex flex-col overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 border-b border-smoky/10 dark:border-gh-border bg-smoky/5 dark:bg-gh-bg">
                    <h4 className="font-semibold text-smoky dark:text-gh-text">{t('PERSONAL.MY_ACCOUNTS')}</h4>
                    <button
                        onClick={() => setIsAddAccountOpen(true)}
                        className="text-sm bg-sunglow dark:bg-gh-accent text-smoky dark:text-gh-bg font-bold px-3 py-1.5 rounded hover:opacity-90 transition-opacity"
                    >
                        + {t('PERSONAL.ADD_ACCOUNT')}
                    </button>
                </div>

                <div className="flex-1 overflow-auto">
                    {accounts.length > 0 ? (
                        <ul className="divide-y divide-smoky/10 dark:divide-gh-border">
                            {accounts.map((account) => (
                                <li
                                    key={account.id}
                                    onClick={() => setSelectedAccount(account)}
                                    className="flex justify-between items-center p-4 hover:bg-smoky/5 dark:hover:bg-gh-bg/50 transition-colors cursor-pointer"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium text-smoky dark:text-gh-text">
                                            {account.name}
                                        </span>
                                        <span className="text-xs text-smoky/50 dark:text-gh-muted uppercase tracking-wider">
                                            {account.type} {account.bank ? `• ${account.bank}` : ''}
                                        </span>
                                    </div>
                                    <div className="font-bold text-smoky dark:text-gh-text">
                                        {formatCurrency(account.balance_cents / 100)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-12 flex flex-col items-center justify-center text-smoky/50 dark:text-gh-muted">
                            <span className="text-3xl mb-3">🏦</span>
                            <p>No accounts configured yet.</p>
                            <p className="text-sm">Add your first wallet or bank account to see your total balance.</p>
                        </div>
                    )}
                </div>
            </div>

            {isAddAccountOpen && (
                <Modal
                    title="Add New Account"
                    onClose={() => setIsAddAccountOpen(false)}
                    body={<AccountForm onCancel={() => setIsAddAccountOpen(false)} onSave={handleSaveAccount} />}
                />
            )}

            {selectedAccount && (
                <Modal
                    title="Account Details"
                    onClose={() => setSelectedAccount(null)}
                    body={<AccountDetails account={selectedAccount} onDelete={handleDeleteAccount} />}
                />
            )}
        </div>
    );
}