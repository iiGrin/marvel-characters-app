import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false); // state ошибки и загрузки
    const [error, setError] = useState(null);

    const request = // запрос char на сервер
        useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {

            setLoading(true); // отрисовка spinner

            try {
                const response = await fetch(url, { method, body, headers }); // получение ответа с данными 

                if (!response.ok) { // если ответ не успешен
                    throw new Error(`Couldn't fetch ${url}, status: ${response.status}`);
                }

                const data = await response.json();  // успешное получение char, конвертация в json 
                setLoading(false); // удаление spinner 
                return data; // возвращаем char из промиса

            } catch (e) { // блок ошибки
                setLoading(false); // удаление spinner 
                setError(e.message);
                throw e; // возвращаем сообщение ошибки из промиса
            }
        }, []);

    const clearError = useCallback(() => setError(null), []); // удаление ошибки при получении пустых данных

    return { loading, request, error, clearError };
}