import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializeSchema1744793425332 implements MigrationInterface {
    name = 'InitializeSchema1744793425332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`item\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`stock\` int NOT NULL, \`event_option_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`item\` ADD CONSTRAINT \`FK_a6472b7cc4e4bc1e6491e5d678b\` FOREIGN KEY (\`event_option_id\`) REFERENCES \`event_options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_a6472b7cc4e4bc1e6491e5d678b\``);
        await queryRunner.query(`DROP TABLE \`item\``);
    }

}
