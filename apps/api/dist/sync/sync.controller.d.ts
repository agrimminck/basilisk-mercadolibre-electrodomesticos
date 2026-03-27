import { SyncService, SyncResult } from './sync.service';
export declare class SyncController {
    private readonly syncService;
    constructor(syncService: SyncService);
    SyncAsin(asin: string, categorySlug: string): Promise<SyncResult>;
    SyncSearch(keyword: string, categorySlug: string, searchIndex?: string): Promise<SyncResult[]>;
}
