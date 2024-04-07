import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';

const config: Options<PostgreSqlDriver> = {
  clientUrl: 'postgresql://node_gmp:password123@localhost:5432/node_gmp',
  driver: PostgreSqlDriver,
  entities: ['./dist/models/*.entity.js'],
  entitiesTs: ['./src/models/*.entity.ts'],
  debug: process.env.NODE_ENV !== 'production',
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
  extensions: [SeedManager, Migrator],
};

 export default config;

// import * as dotenv from 'dotenv'
// dotenv.config()
// import {Options} from '@mikro-orm/core';
// import {PostgreSqlDriver} from "@mikro-orm/postgresql";

// const options: Options<PostgreSqlDriver> = {
//     entities: ['./dist/entities'], // path to your JS entities (dist), relative to `baseDir`
//     entitiesTs: ['./app/entities'], // path to our TS entities (src), relative to `baseDir`
//     migrations: {
//         path: './dist/migrations', // path to the folder with migrations
//         pathTs: './app/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
//     },
//     type: 'postgresql',
// };

// export default options