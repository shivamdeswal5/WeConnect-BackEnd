import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750134167687 implements MigrationInterface {
    name = 'Migration1750134167687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uid" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "photoURL" character varying, CONSTRAINT "UQ_df955cae05f17b2bcf5045cc021" UNIQUE ("uid"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
