import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisCacheService {
    private redisClient: Redis

    constructor() {
        this.redisClient = new Redis({
            port: 10310, // Redis port
            host: "redis-10310.c114.us-east-1-4.ec2.cloud.redislabs.com", // Redis host
            password: "Iw9KLndY5afm98Y8nyObzq9rXry5JLS6",
          })
    }

    async set(key: string, value: any, ttl: number) {
        // console.log("set value: ",value);
        const serializedValue = JSON.stringify(value);
        // console.log("set serializedValue:", serializedValue);
        await this.redisClient.setex(key, ttl, serializedValue)
    }

    async del(key: string) {
        await this.redisClient.del(key)
    }

    async get(key: string) {
        // console.log(key);
        const serializedValue = await this.redisClient.get(key)
        // console.log(serializedValue);
        if (serializedValue) {
            return serializedValue
        }
        return null
    }
}
