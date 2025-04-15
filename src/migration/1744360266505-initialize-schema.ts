import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeSchema1744360266505 implements MigrationInterface {
  name = 'InitializeSchema1744360266505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_device\` (\`id\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`public_key\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_device\` ADD CONSTRAINT \`FK_4875276d131a82b6792e73b9b1a\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_device\` DROP FOREIGN KEY \`FK_4875276d131a82b6792e73b9b1a\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`user_device\``);
  }
}
