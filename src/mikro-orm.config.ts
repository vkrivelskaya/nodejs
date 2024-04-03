import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  clientUrl: 'postgresql://node_gmp:password123@localhost:5432/node_gmp',
  driver: PostgreSqlDriver,
  entities: ['dist/models/*.entity.js'],
  entitiesTs: ['src/models/*.entity.ts'],
  debug: process.env.NODE_ENV !== 'production',
  metadataProvider: TsMorphMetadataProvider,
};

export default config;