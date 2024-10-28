import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false); // state ошибки и загрузки
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => { // запрос chars

        setLoading(true); // отрисовка spinner

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(`Couldn't fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();  // успешное получение char, конвертация в json и удаление spinner 
            setLoading(false);
            return data;

        } catch (e) { // блок ошибки
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []); // удаление ошибки при получении пустых данных

    return { loading, request, error, clearError };
}