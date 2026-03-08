import {useTranslation} from "react-i18next";
import {useSummary} from "../../../../hooks/useSummary.ts";
import {formatCurrency} from "../../../../shared/currency/formatCurrency.ts";

interface SummaryProps {
    startDate: string;
    endDate: string;
}

export default function Summary({ startDate, endDate }: SummaryProps) {
    const {t} = useTranslation();
    const {balance, spent, isLoading, error, refetch} = useSummary(startDate, endDate);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center text-smoky/70 dark:text-gh-muted animate-pulse font-medium">
                Loading metrics...
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
        )
    }

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-smoky dark:text-gh-text">
                    {t('PERSONAL.SUMMARY_DASHBOARD')}
                </h3>
                <button
                    onClick={refetch}
                    className="px-4 py-2 text-sm border border-smoky/20 dark:border-gh-border rounded-md hover:bg-smoky/5 dark:hover:bg-bg-gh-surface transition-colors dark:text-gh-text"
                >
                    {t('UTIL.REFRESH_DATA')}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            <div className="flex-1 bg-white dark:bg-gh-surface rounded-xl border border-smoky/10 dark:border-gh-border p-6 shadow-sm flex items-center justify-center">
                <p className="text-smoky/50 dark:text-gh-muted text-sm font-medium">Placeholder</p>
            </div>
        </div>
    )
}
