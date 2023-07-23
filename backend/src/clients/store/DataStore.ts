
export interface IDataStore<T> {
    loadData: (key: string) => Promise<T | null>;
    saveData: (data: T) => Promise<string>;
    getLatest: (count: number) => Promise<T[]>;
}


