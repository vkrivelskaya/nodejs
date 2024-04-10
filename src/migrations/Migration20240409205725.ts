import { Migration } from '@mikro-orm/migrations';

export class Migration20240409205725 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "cart" drop column "total";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart" add column "total" int not null;');
  }

}
