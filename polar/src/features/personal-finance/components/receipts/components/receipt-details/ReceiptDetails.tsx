import { useTranslation } from 'react-i18next';
import { queries } from '../../../../../../wailsjs/go/models';

interface ReceiptDetailsProps {
    receipt: queries.Receipt | null;
    onDelete?: (id: number) => void;
}

export default function ReceiptDetails({ receipt, onDelete }: ReceiptDetailsProps) {
    const { t } = useTranslation();

    if (!receipt) return null;

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col gap-1">
          <span className="text-gh-muted uppercase text-[10px] font-bold tracking-wider">
            {t('PERSONAL.TABLE_ID')}
          </span>
                    <span className="text-smoky dark:text-gh-text font-mono bg-smoky/5 dark:bg-gh-bg px-2 py-1 rounded w-fit">
            #{receipt.id}
          </span>
                </div>

                <div className="flex flex-col gap-1 text-right">
          <span className="text-gh-muted uppercase text-[10px] font-bold tracking-wider">
            {t('PERSONAL.TABLE_DATE')}
          </span>
                    <span className="text-smoky dark:text-gh-text font-medium">
            {receipt.date}
          </span>
                </div>

                <div className="flex flex-col gap-1 col-span-2 p-4 bg-smoky/5 dark:bg-gh-bg rounded-xl border border-smoky/5 dark:border-gh-border mt-2">
          <span className="text-gh-muted uppercase text-[10px] font-bold tracking-wider mb-1">
            {t('PERSONAL.TABLE_AMOUNT')}
          </span>
                    <span className="text-3xl font-extrabold text-smoky dark:text-gh-accent">
            ${(receipt.amount_cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
                </div>

                <div className="flex flex-col gap-1 col-span-2">
          <span className="text-gh-muted uppercase text-[10px] font-bold tracking-wider">
            {t('PERSONAL.TABLE_DESCRIPTION')}
          </span>
                    <p className="text-smoky dark:text-gh-text leading-relaxed">
                        {receipt.description?.String || t('UTIL.NO_DESCRIPTION')}
                    </p>
                </div>
            </div>

            {onDelete && (
                <div className="mt-4 pt-6 border-t border-smoky/10 dark:border-gh-border flex justify-end">
                    <button
                        onClick={() => onDelete(receipt.id)}
                        className="px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors font-semibold text-sm border border-red-500/20"
                    >
                        {t('UTIL.DELETE_RECEIPT')}
                    </button>
                </div>
            )}
        </div>
    );
}