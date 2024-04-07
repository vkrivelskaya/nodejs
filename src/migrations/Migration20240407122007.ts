import { Migration } from '@mikro-orm/migrations';

export class Migration20240407122007 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("uuid" uuid not null default uuid_generate_v4(), "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("uuid"));');

    this.addSql('create table "user" ("uuid" uuid not null default uuid_generate_v4(), constraint "user_pkey" primary key ("uuid"));');

    this.addSql('create table "cart" ("uuid" uuid not null default uuid_generate_v4(), "user_uuid" uuid not null, "total" int not null, constraint "cart_pkey" primary key ("uuid"));');
    this.addSql('alter table "cart" add constraint "cart_user_uuid_unique" unique ("user_uuid");');

    this.addSql('create table "order" ("id" uuid not null default uuid_generate_v4(), "user_uuid" uuid not null, "cart_uuid" uuid not null, "payment_type" varchar(255) not null, "payment_address" varchar(255) null, "credit_card" varchar(255) null, "delivery_type" varchar(255) not null, "delivery_address" varchar(255) not null, "comments" varchar(255) not null, "status" varchar(255) not null, "total" int not null, constraint "order_pkey" primary key ("id"));');

    this.addSql('create table "cart_item" ("uuid" uuid not null default uuid_generate_v4(), "cart_uuid" uuid not null, "product_uuid" uuid not null, "order_id" uuid null, "count" int not null, constraint "cart_item_pkey" primary key ("uuid"));');

    this.addSql('alter table "cart" add constraint "cart_user_uuid_foreign" foreign key ("user_uuid") references "user" ("uuid") on update cascade;');

    this.addSql('alter table "order" add constraint "order_user_uuid_foreign" foreign key ("user_uuid") references "user" ("uuid") on update cascade;');
    this.addSql('alter table "order" add constraint "order_cart_uuid_foreign" foreign key ("cart_uuid") references "cart" ("uuid") on update cascade;');

    this.addSql('alter table "cart_item" add constraint "cart_item_cart_uuid_foreign" foreign key ("cart_uuid") references "cart" ("uuid") on update cascade;');
    this.addSql('alter table "cart_item" add constraint "cart_item_product_uuid_foreign" foreign key ("product_uuid") references "product" ("uuid") on update cascade;');
    this.addSql('alter table "cart_item" add constraint "cart_item_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart_item" drop constraint "cart_item_product_uuid_foreign";');

    this.addSql('alter table "cart" drop constraint "cart_user_uuid_foreign";');

    this.addSql('alter table "order" drop constraint "order_user_uuid_foreign";');

    this.addSql('alter table "order" drop constraint "order_cart_uuid_foreign";');

    this.addSql('alter table "cart_item" drop constraint "cart_item_cart_uuid_foreign";');

    this.addSql('alter table "cart_item" drop constraint "cart_item_order_id_foreign";');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "order" cascade;');

    this.addSql('drop table if exists "cart_item" cascade;');
  }

}
