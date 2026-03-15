import {useCallback, useEffect, useState} from "react";
import {GetTotalBalance, GetTotalSpent, GetTotalSpentByDateRange} from "../wailsjs/go/main/App";

export function useSummary(startDate: string, endDate: string) {
    const [balance, setBalance] = useState<number>(0);
    const [spent, setSpent] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSummary = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const balancePromise = GetTotalBalance();
            let spentPromise: Promise<number>;

            if (startDate && endDate) {
                spentPromise = GetTotalSpentByDateRange(startDate, endDate);
            } else {
                spentPromise = GetTotalSpent();
            }
            const [balanceCents, spentCents] = await Promise.all([
                balancePromise,
                spentPromise
            ]);

            setBalance(balanceCents / 100);
            setSpent(spentCents / 100);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === 'string') {
                setError(err);
            } else {
                setError('Failed to fetch summary metrics');
            }
        } finally {
            setIsLoading(false);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        void fetchSummary();
    }, [fetchSummary]);

    return {
        balance,
        spent,
        isLoading,
        error,
        refetch: fetchSummary
    }
}