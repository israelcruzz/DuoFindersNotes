-- DropForeignKey
ALTER TABLE "link" DROP CONSTRAINT "link_noteId_fkey";

-- DropForeignKey
ALTER TABLE "tag" DROP CONSTRAINT "tag_noteId_fkey";

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link" ADD CONSTRAINT "link_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
