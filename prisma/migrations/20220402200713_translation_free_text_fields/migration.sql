-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "arrival_instructions_translation" JSONB,
ADD COLUMN     "description_translation" JSONB,
ADD COLUMN     "house_rules_translation" JSONB,
ADD COLUMN     "title_translation" JSONB;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description_translation" JSONB,
ADD COLUMN     "title_translation" JSONB;
