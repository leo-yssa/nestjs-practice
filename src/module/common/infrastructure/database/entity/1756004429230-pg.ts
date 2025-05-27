// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class CreatePgInfoTable1710000000000 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     // Create pg_info table
//     await queryRunner.query(`
//       CREATE TABLE "public"."pg_info" (
//         "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
//         "paymentType" character varying(50) NOT NULL,
//         "paymentName" character varying(50) NOT NULL,
//         "paymentMethod" character varying(50) NOT NULL,
//         "merchantId" character varying(100) NOT NULL,
//         "merchantKey" character varying(100) NOT NULL,
//         "isActive" boolean NOT NULL DEFAULT true,
//         "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
//         "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
//         CONSTRAINT "PK_pg_info" PRIMARY KEY ("id")
//       )
//     `);

//     // Insert initial data
//     await queryRunner.query(`
//       INSERT INTO "public"."pg_info" ("paymentType", "paymentName", "paymentMethod", "merchantId", "merchantKey", "isActive")
//       VALUES
//         ('BANK', '계좌이체', 'trans', 'settle_acc.M2286221', 'SZYIANVIHAEMJEJFHHYWYVXWMRRVYIAD', true),
//         ('CARD', '카드', 'bluewalnut.modern005m', 'R8lb56HQYSzuVjbbiqkzqx4v4qauY/C744rWeikSvyZpc0JixF/Baq7Bio/h5XbujS8wnErodBdmkmFX/EzlbQ==', true),
//         ('CARD_HYUNDAI', '현대카드', 'bluewalnut.modern004m', 'jNq8oZDEAEknKCwMOV5V0uzV2OlL/NXwOB1j1e0Szs+/ounnDK/2B/XVDVZlwL9Tk4WL+R8czWDeS7hedULipQ==', true),
//         ('PAYPAL', '페이팔', 'paypal_v2', 'RYDVFYZ9EKWZL', NULL, false)
//     `);
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`DROP TABLE "public"."pg_info"`);
//   }
// }
