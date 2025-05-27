import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductInitialSchema1747700580148 implements MigrationInterface {
  name = 'ProductInitialSchema1747700580148';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_content_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "sort_order" smallint NOT NULL, "image_url" character varying NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_30b3ab862701f1a4216e680110c" PRIMARY KEY ("id")); COMMENT ON COLUMN "product_content_images"."sort_order" IS '이미니 노출 순서'; COMMENT ON COLUMN "product_content_images"."image_url" IS '이미지 경로'`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "option1_value_id" uuid NOT NULL, "option2_value_id" uuid, "option3_value_id" uuid, "is_active" boolean NOT NULL DEFAULT true, "max_purchase_quantity" integer NOT NULL, "sale_quantity" integer NOT NULL, "sale_start_at" TIMESTAMP WITH TIME ZONE NOT NULL, "sale_end_at" TIMESTAMP WITH TIME ZONE NOT NULL, "use_start_at" TIMESTAMP WITH TIME ZONE NOT NULL, "use_end_at" TIMESTAMP WITH TIME ZONE NOT NULL, "price" numeric(12,2), "product_id" uuid NOT NULL, CONSTRAINT "REL_e634fca34f6b594b87fdbee95f" UNIQUE ("product_id"), CONSTRAINT "PK_4cf3c467e9bc764bdd32c4cd938" PRIMARY KEY ("id")); COMMENT ON COLUMN "product_option"."option1_value_id" IS '옵션 1 값 ID'; COMMENT ON COLUMN "product_option"."option2_value_id" IS '옵션 2 값 ID'; COMMENT ON COLUMN "product_option"."option3_value_id" IS '옵션 3 값 ID'; COMMENT ON COLUMN "product_option"."is_active" IS '옵션 활성화 여부'; COMMENT ON COLUMN "product_option"."max_purchase_quantity" IS '인당 최대 구매 수량'; COMMENT ON COLUMN "product_option"."sale_quantity" IS '판매 수량'; COMMENT ON COLUMN "product_option"."sale_start_at" IS '판매 시작일'; COMMENT ON COLUMN "product_option"."sale_end_at" IS '판매 종료일'; COMMENT ON COLUMN "product_option"."use_start_at" IS '사용 시작일'; COMMENT ON COLUMN "product_option"."use_end_at" IS '사용 종료일'; COMMENT ON COLUMN "product_option"."price" IS '가격'`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_option_value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "value_index" smallint NOT NULL, "value_string" character varying, "value_date" TIMESTAMP WITH TIME ZONE, "price" numeric(12,2) NOT NULL, "product_option_slot_id" uuid NOT NULL, CONSTRAINT "uq_product_option_value_a" UNIQUE ("product_option_slot_id", "value_index"), CONSTRAINT "PK_2ab71ed3b21be5800905c621535" PRIMARY KEY ("id")); COMMENT ON COLUMN "product_option_value"."value_index" IS '옵션 값 순서'; COMMENT ON COLUMN "product_option_value"."value_string" IS '옵션 문자열 값'; COMMENT ON COLUMN "product_option_value"."value_date" IS '옵션 날짜 값'; COMMENT ON COLUMN "product_option_value"."price" IS '옵션 개별 가격'`,
    );
    await queryRunner.query(`CREATE TYPE "public"."product_option_slot_slot_value_type_enum" AS ENUM('date', 'text')`);
    await queryRunner.query(
      `CREATE TABLE "product_option_slot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "slot_index" smallint NOT NULL, "slot_value_type" "public"."product_option_slot_slot_value_type_enum" NOT NULL, "slot_label" character varying(30) NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "uq_product_option_slot_a" UNIQUE ("product_id", "slot_index"), CONSTRAINT "PK_ee3c5f5434766dbce95f365c9c5" PRIMARY KEY ("id")); COMMENT ON COLUMN "product_option_slot"."slot_index" IS '옵션 슬롯 순서'; COMMENT ON COLUMN "product_option_slot"."slot_value_type" IS '슬롯 값 타입'; COMMENT ON COLUMN "product_option_slot"."slot_label" IS '옵션 타이틀'`,
    );
    await queryRunner.query(`CREATE TYPE "public"."product_detail_customer_inquiry_type_enum" AS ENUM('url', 'phone')`);
    await queryRunner.query(
      `CREATE TABLE "product_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "organizer" character varying NOT NULL, "customer_inquiry_type" "public"."product_detail_customer_inquiry_type_enum" NOT NULL, "customer_inquiry_value" character varying NOT NULL, "running_time" character varying NOT NULL, "use_info" text, "notice" text, "location_name" character varying NOT NULL, "location_address" character varying NOT NULL, "radius_km" integer NOT NULL, "longitude" numeric(9,6) NOT NULL, "latitude" numeric(8,6) NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "REL_38145409fc923c67bffc76bdb6" UNIQUE ("product_id"), CONSTRAINT "PK_12ea67a439667df5593ff68fc33" PRIMARY KEY ("id")); COMMENT ON COLUMN "product_detail"."organizer" IS '주최사, 발행처'; COMMENT ON COLUMN "product_detail"."customer_inquiry_type" IS '고객 문의 타입'; COMMENT ON COLUMN "product_detail"."customer_inquiry_value" IS '고객 문의 창구 상세 정보 (e.g. 전화번호, url)'; COMMENT ON COLUMN "product_detail"."running_time" IS '운영 시간'; COMMENT ON COLUMN "product_detail"."use_info" IS '이용 조건'; COMMENT ON COLUMN "product_detail"."notice" IS '공지 사항'; COMMENT ON COLUMN "product_detail"."location_name" IS '장소명'; COMMENT ON COLUMN "product_detail"."location_address" IS '상세 주소'; COMMENT ON COLUMN "product_detail"."radius_km" IS '반경'; COMMENT ON COLUMN "product_detail"."longitude" IS '공연 장소 경도'; COMMENT ON COLUMN "product_detail"."latitude" IS '공연 장소 위도'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_sale_setting_sale_type_enum" AS ENUM('voucher', 'date_select', 'reserved_seat')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_sale_setting_sale_status_enum" AS ENUM('pending', 'on_sale', 'sold_out', 'ended')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_sale_setting" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "sale_type" "public"."product_sale_setting_sale_type_enum" NOT NULL, "sale_status" "public"."product_sale_setting_sale_status_enum" NOT NULL DEFAULT 'pending', "sale_start_at" TIME WITH TIME ZONE NOT NULL, "sale_end_at" TIME WITH TIME ZONE NOT NULL, "age_limit" smallint, "is_immediate_use" boolean NOT NULL DEFAULT false, "max_purchase_quantity" integer NOT NULL, "option_count" integer NOT NULL, "is_option_price_enabled" boolean NOT NULL DEFAULT false, "product_id" uuid NOT NULL, CONSTRAINT "REL_0274e3c02aa0171b75ec19c469" UNIQUE ("product_id"), CONSTRAINT "PK_33f6fe0c483205ae4a440f4b97a" PRIMARY KEY ("id")); COMMENT ON COLUMN "product_sale_setting"."sale_type" IS '판매 타입'; COMMENT ON COLUMN "product_sale_setting"."sale_status" IS '판매 상태'; COMMENT ON COLUMN "product_sale_setting"."sale_start_at" IS '판매 시작 시간'; COMMENT ON COLUMN "product_sale_setting"."sale_end_at" IS '판매 종료 시간'; COMMENT ON COLUMN "product_sale_setting"."age_limit" IS '구매 제한 연령'; COMMENT ON COLUMN "product_sale_setting"."is_immediate_use" IS '즉시 사용 가능 여부'; COMMENT ON COLUMN "product_sale_setting"."max_purchase_quantity" IS '최대 구매 수량'; COMMENT ON COLUMN "product_sale_setting"."option_count" IS '옵션 갯수'; COMMENT ON COLUMN "product_sale_setting"."is_option_price_enabled" IS '옵션별 판매 금액 설정 가능 여부'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_status_enum" AS ENUM('draft', 'required', 'deploying', 'deployed', 'creating_item', 'minting', 'minted')`,
    );
    await queryRunner.query(`CREATE TYPE "public"."product_category_enum" AS ENUM('TICKET', 'MEMBERSHIP')`);
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "status" "public"."product_status_enum" NOT NULL, "is_verified" boolean NOT NULL DEFAULT false, "verified_at" TIME WITH TIME ZONE, "address" character varying, "category" "public"."product_category_enum" NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "symbol" character varying NOT NULL, "is_displayed" boolean NOT NULL DEFAULT false, "display_start_at" TIME WITH TIME ZONE, "display_end_at" TIME WITH TIME ZONE, "main_image_url" character varying NOT NULL, "is_resalable" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")); COMMENT ON COLUMN "product"."status" IS '컬렉션 상태'; COMMENT ON COLUMN "product"."is_verified" IS '검수 완료 여부'; COMMENT ON COLUMN "product"."verified_at" IS '검수 완료 시간'; COMMENT ON COLUMN "product"."address" IS '컬렉션 주소'; COMMENT ON COLUMN "product"."category" IS '컬렉션 카테고리'; COMMENT ON COLUMN "product"."title" IS '상품명'; COMMENT ON COLUMN "product"."description" IS '상품 설명'; COMMENT ON COLUMN "product"."is_displayed" IS '상품 노출 여부'; COMMENT ON COLUMN "product"."display_start_at" IS '상품 노출 시작 시간'; COMMENT ON COLUMN "product"."display_end_at" IS '상품 노출 종료 시간'; COMMENT ON COLUMN "product"."main_image_url" IS '대표 이미지 URL(1:1)'; COMMENT ON COLUMN "product"."is_resalable" IS 'n차 거래 가능 여부'`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_content_images" ADD CONSTRAINT "FK_9f93fd885b878aeb2070922aa91" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option" ADD CONSTRAINT "FK_2e294f84f7c032cc1c6e2a55ca2" FOREIGN KEY ("option1_value_id") REFERENCES "product_option_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option" ADD CONSTRAINT "FK_2c9002ae5d46e7f6447fd30f523" FOREIGN KEY ("option2_value_id") REFERENCES "product_option_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option" ADD CONSTRAINT "FK_11f34e7544809b5fc55726f6ff3" FOREIGN KEY ("option3_value_id") REFERENCES "product_option_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option" ADD CONSTRAINT "FK_e634fca34f6b594b87fdbee95f6" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_value" ADD CONSTRAINT "FK_ddb9f86821dec240d670a562861" FOREIGN KEY ("product_option_slot_id") REFERENCES "product_option_slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_slot" ADD CONSTRAINT "FK_c387cf716932c2febab811f0a6b" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_detail" ADD CONSTRAINT "FK_38145409fc923c67bffc76bdb68" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_sale_setting" ADD CONSTRAINT "FK_0274e3c02aa0171b75ec19c469d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product_sale_setting" DROP CONSTRAINT "FK_0274e3c02aa0171b75ec19c469d"`);
    await queryRunner.query(`ALTER TABLE "product_detail" DROP CONSTRAINT "FK_38145409fc923c67bffc76bdb68"`);
    await queryRunner.query(`ALTER TABLE "product_option_slot" DROP CONSTRAINT "FK_c387cf716932c2febab811f0a6b"`);
    await queryRunner.query(`ALTER TABLE "product_option_value" DROP CONSTRAINT "FK_ddb9f86821dec240d670a562861"`);
    await queryRunner.query(`ALTER TABLE "product_option" DROP CONSTRAINT "FK_e634fca34f6b594b87fdbee95f6"`);
    await queryRunner.query(`ALTER TABLE "product_option" DROP CONSTRAINT "FK_11f34e7544809b5fc55726f6ff3"`);
    await queryRunner.query(`ALTER TABLE "product_option" DROP CONSTRAINT "FK_2c9002ae5d46e7f6447fd30f523"`);
    await queryRunner.query(`ALTER TABLE "product_option" DROP CONSTRAINT "FK_2e294f84f7c032cc1c6e2a55ca2"`);
    await queryRunner.query(`ALTER TABLE "product_content_images" DROP CONSTRAINT "FK_9f93fd885b878aeb2070922aa91"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TYPE "public"."product_category_enum"`);
    await queryRunner.query(`DROP TYPE "public"."product_status_enum"`);
    await queryRunner.query(`DROP TABLE "product_sale_setting"`);
    await queryRunner.query(`DROP TYPE "public"."product_sale_setting_sale_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."product_sale_setting_sale_type_enum"`);
    await queryRunner.query(`DROP TABLE "product_detail"`);
    await queryRunner.query(`DROP TYPE "public"."product_detail_customer_inquiry_type_enum"`);
    await queryRunner.query(`DROP TABLE "product_option_slot"`);
    await queryRunner.query(`DROP TYPE "public"."product_option_slot_slot_value_type_enum"`);
    await queryRunner.query(`DROP TABLE "product_option_value"`);
    await queryRunner.query(`DROP TABLE "product_option"`);
    await queryRunner.query(`DROP TABLE "product_content_images"`);
  }
}
