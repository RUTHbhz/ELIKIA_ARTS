import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useFirestoreConfig = (collectionName, conditions = [], orderByField = null) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let q = collection(db, collectionName);

        if (conditions && conditions.length > 0) {
            conditions.forEach(condition => {
                q = query(q, where(condition.field, condition.operator, condition.value));
            });
        }

        if (orderByField) {
            q = query(q, orderBy(orderByField));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id });
            });
            console.log(`Firestore [${collectionName}]:`, results.length, "documents found");
            setData(results);
            setLoading(false);
        }, (err) => {
            console.error(`Firestore [${collectionName}] Error:`, err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [collectionName, JSON.stringify(conditions), orderByField]);

    return { data, loading, error };
};
