import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750151789280 implements MigrationInterface {
    name = 'Migration1750151789280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chatroom" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uid" character varying NOT NULL, CONSTRAINT "UQ_45aa6d204662d503091623384e6" UNIQUE ("uid"), CONSTRAINT "PK_1e5ce0a999152e29952194d01ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uid" character varying NOT NULL, "senderId" character varying NOT NULL, "text" character varying NOT NULL, "timestamp" character varying NOT NULL, "userId" uuid, CONSTRAINT "UQ_5a493f6d32f38e2b225437a1fa6" UNIQUE ("uid"), CONSTRAINT "UQ_d697f19c9c7778ed773b449ce70" UNIQUE ("senderId"), CONSTRAINT "UQ_197ef2e79804f366b15f9cad78e" UNIQUE ("text"), CONSTRAINT "UQ_f6a18e888bf4f1cc4090590d730" UNIQUE ("timestamp"), CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uid" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "photoURL" character varying, CONSTRAINT "UQ_df955cae05f17b2bcf5045cc021" UNIQUE ("uid"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_ae8951c0a763a060593606b7e2d" FOREIGN KEY ("userId") REFERENCES "chatroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_ae8951c0a763a060593606b7e2d"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "chats"`);
        await queryRunner.query(`DROP TABLE "chatroom"`);
    }

}
