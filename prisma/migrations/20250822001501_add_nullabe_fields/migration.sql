-- AlterTable
ALTER TABLE "public"."Address" ALTER COLUMN "complement" DROP NOT NULL,
ALTER COLUMN "reference" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Category" ALTER COLUMN "active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "imgUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Topping" ALTER COLUMN "active" SET DEFAULT true,
ALTER COLUMN "imgUrl" DROP NOT NULL;
