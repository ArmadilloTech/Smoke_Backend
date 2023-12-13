/**
 * Shape of a record saved in `in-memory`  cache
 */
export declare type CacheRecord<T> = {
    data: T;
    /**
     * Timestamp in milliseconds
     */
    expire: number;
};
export declare type InMemoryCacheModuleOptions = {
    /**
     * Time to keep data in cache (in seconds)
     */
    ttl?: number;
};
