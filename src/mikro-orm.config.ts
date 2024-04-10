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
