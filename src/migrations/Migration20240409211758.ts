import { Migration } from '@mikro-orm/migrations';

export class Migration20240409211758 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "cart_item" drop constraint "cart_item_cart_uuid_foreign";');

    this.addSql('alter table "cart_item" alter column "cart_uuid" drop default;');
    this.addSql('alter table "cart_item" alter column "cart_uuid" type uuid using ("cart_uuid"::text::uuid);');
    this.addSql('alter table "cart_item" alter column "cart_uuid" drop not null;');
    this.addSql('alter table "cart_item" add constraint "cart_item_cart_uuid_foreign" foreign key ("cart_uuid") references "cart" ("uuid") on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart_item" drop constraint "cart_item_cart_uuid_foreign";');

    this.addSql('alter table "cart_item" alter column "cart_uuid" drop default;');
    this.addSql('alter table "cart_item" alter column "cart_uuid" type uuid using ("cart_uuid"::text::uuid);');
    this.addSql('alter table "cart_item" alter column "cart_uuid" set not null;');
    this.addSql('alter table "cart_item" add constraint "cart_item_cart_uuid_foreign" foreign key ("cart_uuid") references "cart" ("uuid") on update cascade;');
  }

}
