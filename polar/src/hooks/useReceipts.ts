import { useState, useEffect, useMemo, useCallback } from 'react';
import { CreateReceipt, GetAllReceipts, GetReceiptById, DeleteReceipt } from '../wailsjs/go/main/App';
import { queries } from '../wailsjs/go/models';

export function useReceipts() {
    const [receipts, setReceipts] = useState<queries.Receipt[]>([]);
    const [selectedReceipt, setSelectedReceipt] = useState<queries.Receipt | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const loadReceipts = useCallback(async () => {
        try {
            const data = await GetAllReceipts();
            setReceipts(data || []);
        } catch (error) {
            console.error("Failed to fetch:", error);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            await loadReceipts();
        };

        init();
    }, [loadReceipts]);

    const saveReceipt = async (formData: { amount: number, date: string, description: string }) => {
        try {
            await CreateReceipt(formData.amount, formData.date, formData.description);
            await loadReceipts();
            return true;
        } catch (error) {
            console.error("Failed to save receipt:", error);
            return false;
        }
    };

    const deleteReceipt = async (id: number)=> {
        try {
            await DeleteReceipt(id);
            await loadReceipts();
            return true;
        } catch (error) {
            console.error("Delete failed:", error);
            return false;
        }
    }

    const viewReceipt = async (id: number) => {
        try {
            const data = await GetReceiptById(id);
            setSelectedReceipt(data);
            return data;
        } catch (error) {
            console.error("Failed to fetch detail:", error);
        }
    };

    const paginatedReceipts = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return receipts.slice(start, start + pageSize);
    }, [receipts, currentPage]);

    const nextPage = () => {
        if (currentPage * pageSize < receipts.length) setCurrentPage(p => p + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(p => p - 1);
    };

    return {
        receipts,
        selectedReceipt,
        setSelectedReceipt,
        currentPage,
        paginatedReceipts,
        nextPage,
        prevPage,
        saveReceipt,
        deleteReceipt,
        viewReceipt,
        pageSize
    };
}