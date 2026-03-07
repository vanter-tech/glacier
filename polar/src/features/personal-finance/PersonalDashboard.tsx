import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {useTheme} from "../../core/useTheme.ts";
import Receipts from "./components/receipts/Receipts.tsx";

const Summary = () => <div>Summary Component</div>;
const DuePayments = () => <div>Due Payments Component</div>;
const CashFlow = () => <div>Cash Flow Component</div>;

interface PersonalDashboardProps {
    onSwitchProfile: () => void;
}

type Tab = 'summary' | 'receipts' | 'due-payments' | 'cash-flow';

export default function PersonalDashboard({ onSwitchProfile }: PersonalDashboardProps) {
    const { t } = useTranslation();
    const { isDarkMode, toggleTheme } = useTheme();

    const [activeTab, setActiveTab] = useState<Tab>('summary');

    const getButtonClass = (tab: Tab) => {
        const base = "text-left px-4 py-2 rounded-md transition-colors ";
        const active = "bg-sunglow text-smoky dark:bg-gh-surface dark:text-gh-accent ";
        const inactive = "hover:bg-sunglow/50 dark:hover:bg-gh-surface ";
        return base + (activeTab === tab ? active : inactive);
    };

    return (
        <div className="relative flex h-screen w-full bg-isabelline text-smoky dark:bg-gh-bg dark:text-gh-text overflow-hidden transition-colors duration-500">

            <div className="group absolute left-0 top-0 h-full w-1/12 hover:w-64 z-50">
                <aside className="h-full w-64 bg-isabelline dark:bg-gh-bg border-r border-smoky/10 dark:border-gh-border flex flex-col shadow-2xl -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out">

                    <div className="p-6 font-bold text-xl tracking-tight whitespace-nowrap">
                        Glacier
                    </div>

                    <nav className="flex flex-col gap-2 px-4 mt-4 whitespace-nowrap">
                        <button onClick={() => setActiveTab('summary')} className={getButtonClass('summary')}>
                            {t('PERSONAL.TAB_SUMMARY')}
                        </button>
                        <button onClick={() => setActiveTab('receipts')} className={getButtonClass('receipts')}>
                            {t('PERSONAL.TAB_RECEIPTS')}
                        </button>
                        <button onClick={() => setActiveTab('due-payments')} className={getButtonClass('due-payments')}>
                            {t('PERSONAL.TAB_DUE_PAYMENTS')}
                        </button>
                        <button onClick={() => setActiveTab('cash-flow')} className={getButtonClass('cash-flow')}>
                            {t('PERSONAL.TAB_CASH_FLOW')}
                        </button>
                    </nav>

                    <div className="mt-auto px-4 mb-6 whitespace-nowrap">
                        <button
                            onClick={onSwitchProfile}
                            className="w-full text-left px-4 py-2 rounded-md border border-smoky/20 dark:border-gh-border hover:bg-smoky/5 dark:hover:bg-gh-surface transition-colors text-smoky dark:text-gh-text text-sm"
                        >
                            &larr; {t('UTIL.SWITCH_PROFILE')}
                        </button>
                    </div>
                </aside>
            </div>

            <main className="flex-1 flex flex-col w-full h-full">
                <header className="h-16 border-b border-smoky/10 dark:border-gh-border flex items-center justify-between px-8">

                    <h2 className="text-lg font-semibold capitalize">
                        {t(`PERSONAL.TAB_${activeTab.toUpperCase().replace('-', '_')}`)}
                    </h2>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="px-3 py-1 rounded-md border border-smoky/20 dark:border-gh-border hover:bg-smoky/5 dark:hover:bg-gh-surface transition-colors text-sm"
                        >
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>

                        <div className="flex items-center gap-2">
                            <input type="date"
                                   className="bg-transparent border border-smoky/20 dark:border-gh-border dark:text-gh-text dark:[color-scheme:dark] rounded px-2 py-1 text-sm outline-none focus:border-sunglow dark:focus:border-gh-accent" />
                            <span className="dark:text-gh-muted">-</span>
                            <input type="date"
                                   className="bg-transparent border border-smoky/20 dark:border-gh-border dark:text-gh-text dark:[color-scheme:dark] rounded px-2 py-1 text-sm outline-none focus:border-sunglow dark:focus:border-gh-accent" />
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-8 overflow-y-auto">
                    {activeTab === 'summary' && <Summary />}
                    {activeTab === 'receipts' && <Receipts />}
                    {activeTab === 'due-payments' && <DuePayments />}
                    {activeTab === 'cash-flow' && <CashFlow />}
                </div>
            </main>
        </div>
    );
}