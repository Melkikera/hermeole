import { Prim } from '../models/Prim';
import { fetchPrimData } from '../../api/prim';

export class PrimRepository {
    async getPrimData(): Promise<Prim> {
        try {
            const data = await fetchPrimData();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch PRIM data: ' + error.message);
        }
    }
}