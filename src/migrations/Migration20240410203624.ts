import { Migration } from '@mikro-orm/migrations';

export class Migration20240410203624 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "order" drop column "total";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order" add column "total" int not null;');
  }

}
