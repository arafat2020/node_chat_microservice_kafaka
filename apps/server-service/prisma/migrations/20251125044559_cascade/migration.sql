-- DropForeignKey
ALTER TABLE "public"."Channel" DROP CONSTRAINT "Channel_serverId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Channel" ADD CONSTRAINT "Channel_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "public"."Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
