import { IDataStore } from "./store/DataStore";
import { FileDataStore } from "./store/FileDataStore";

interface IHistory {
    timestamp: string;
    data: string
}
const dataStore: IDataStore<IHistory> = new FileDataStore();

export async function addToHistory(object: string, data: string): Promise<void> {
    const timestamp = new Date().toISOString();
    await dataStore.saveData({
        timestamp: timestamp,
        data: data,
    });
}

export async function getRecentHistory(maxResults: number): Promise<Array<IHistory>> {
    const histories = await dataStore.getLatest(maxResults);
    return histories;
}
