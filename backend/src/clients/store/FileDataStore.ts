import fs from 'fs-extra';
import path from 'path';
import { IDataStore } from './DataStore';

const historyDirectoryPath = path.resolve(__dirname, '../../../storage');

export class FileDataStore<T> implements IDataStore<T> {
    constructor() {
        if (!fs.existsSync(historyDirectoryPath)) {
            fs.mkdirSync(historyDirectoryPath);
        }
    }

    async loadData(key: string): Promise<T | null> {
        const filePath = path.join(historyDirectoryPath, `${key}.json`);

        if (await fs.pathExists(filePath)) {
            return await fs.readJSON(filePath);
        }

        return null;
    }

    async saveData(data: T): Promise<string> {
        const key = new Date().toISOString();
        const safeKey = key.replace(/:/g, '-');
        const filePath = path.join(historyDirectoryPath, `${safeKey}.json`);

        await fs.writeJSON(filePath, data);

        return safeKey;
    }

    private async getKeys(): Promise<string[]> {
        const files = await fs.readdir(historyDirectoryPath);
        return files.map(file => path.parse(file).name);
    }

    async getLatest(count: number) {
        const keys = await this.getKeys();
        keys.sort().reverse();
        const latestKeys = keys.slice(0, count);
        const dataPromises = latestKeys.map(key => this.loadData(key));
        return ((await Promise.all(dataPromises)) ?? []) as T[];
    }
}
