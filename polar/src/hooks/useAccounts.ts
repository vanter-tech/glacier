import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {
    GetAllAccounts,
    CreateAccount, DeleteAccount, GetAccountByID
} from '../wailsjs/go/main/App';
import {queries} from '../wailsjs/go/models';

export function useAccounts() {
    const [accounts, setAccounts] = useState<queries.Account[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<queries.Account | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const isMounted = useRef(true);

    const loadAccounts = useCallback(async () => {
        try {
            const data = await GetAllAccounts();
            if (isMounted.current) {
                setAccounts(data || []);
            }
        } catch (error) {
            console.error("Failed to fetch accounts:", error);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadAccounts().catch(console.error);
    }, [loadAccounts]);

    const saveAccount = async (formData: { name: string, accType: string, bank: string, balance: number }) => {
        try {
            await CreateAccount(formData.name, formData.accType, formData.bank, formData.balance);
            await loadAccounts();
            return true;
        } catch (error) {
            console.error("Failed to save receipt:", error);
            return false;
        }
    };

    const deleteAccount = async (id: number) => {
        try {
            await DeleteAccount(id);
            await loadAccounts();
            return true;
        } catch (error) {
            console.error("Delete failed:", error);
            return false;
        }
    }

    const viewAccount = async (id: number) => {
        try {
            const data = await GetAccountByID(id);
            setSelectedAccount(data);
            return data;
        } catch (error) {
            console.error("Failed to fetch detail:", error);
            return null
        }
    };

    const paginatedAccounts = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return accounts.slice(start, start + pageSize);
    }, [accounts, currentPage]);

    const nextPage = () => {
        if (currentPage * pageSize < accounts.length) setCurrentPage(p => p + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(p => p - 1);
    };

    return {
        accounts,
        selectedAccount,
        setSelectedAccount,
        currentPage,
        paginatedAccounts,
        nextPage,
        prevPage,
        saveAccount,
        deleteAccount,
        viewAccount,
        pageSize
    };
}
