import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeSchema1745381914442 implements MigrationInterface {
  name = 'InitializeSchema1745381914442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`devices\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`unique_id\` varchar(255) NOT NULL, \`os\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`public_key\` text NOT NULL, \`user_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`items\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`phone_number\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`items\` DROP COLUMN \`user_id\``);
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD \`user_id\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD \`quantity\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD \`price_at_purchase\` decimal NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD \`order_id\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD \`item_id\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD \`price\` decimal NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`items\` ADD \`stock\` int NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD \`cart_id\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD UNIQUE INDEX \`IDX_3b934e62fb52bac909e0ddf542\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_3b934e62fb52bac909e0ddf542\` ON \`items\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`devices\` ADD CONSTRAINT \`FK_5e9bee993b4ce35c3606cda194c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD CONSTRAINT \`FK_3b934e62fb52bac909e0ddf5422\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD CONSTRAINT \`FK_f3dcaa16e13ff84a647c6410e15\` FOREIGN KEY (\`order_id\`) REFERENCES \`items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD CONSTRAINT \`FK_d0249fbc104e3bd71b5a0ecf3b1\` FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD CONSTRAINT \`FK_e18e87dca227ffef10b99c8dae3\` FOREIGN KEY (\`cart_id\`) REFERENCES \`items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_e18e87dca227ffef10b99c8dae3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_d0249fbc104e3bd71b5a0ecf3b1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_f3dcaa16e13ff84a647c6410e15\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_3b934e62fb52bac909e0ddf5422\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`devices\` DROP FOREIGN KEY \`FK_5e9bee993b4ce35c3606cda194c\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_3b934e62fb52bac909e0ddf542\` ON \`items\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`items\` DROP INDEX \`IDX_3b934e62fb52bac909e0ddf542\``,
    );
    await queryRunner.query(`ALTER TABLE \`items\` DROP COLUMN \`cart_id\``);
    await queryRunner.query(`ALTER TABLE \`items\` DROP COLUMN \`stock\``);
    await queryRunner.query(`ALTER TABLE \`items\` DROP COLUMN \`price\``);
    await queryRunner.query(`ALTER TABLE \`items\` DROP COLUMN \`name\``);
    await queryRunner.query(`ALTER TABLE \`items\` DROP COLUMN \`item_id\``);
    await queryRunner.query(`ALTER TABLE \`items\` DROP COLUMN \`order_id\``);
    await queryRunner.query(
      `ALTER TABLE \`items\` DROP COLUMN \`price_at_purchase\``,
    );
    await queryRunner.query(`ALTER TABLE \`items\` DROP COLUMN \`quantity\``);
    await queryRunner.query(`ALTER TABLE \`items\` DROP COLUMN \`user_id\``);
    await queryRunner.query(
      `ALTER TABLE \`items\` ADD \`user_id\` varchar(255) NULL`,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`items\``);
    await queryRunner.query(`DROP TABLE \`devices\``);
  }
}
