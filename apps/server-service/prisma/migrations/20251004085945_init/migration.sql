-- CreateEnum
CREATE TYPE "public"."MemberRole" AS ENUM ('ADMIN', 'MODERATOR', 'GUEST');

-- AlterTable
ALTER TABLE "public"."Channel" ALTER COLUMN "serverId" DROP NOT NULL,
ALTER COLUMN "serverId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "public"."Member" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "role" "public"."MemberRole" NOT NULL DEFAULT 'GUEST',
    "nickname" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Server" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_serverId_key" ON "public"."Member"("userId", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Server_inviteCode_key" ON "public"."Server"("inviteCode");

-- CreateIndex
CREATE INDEX "Server_profileId_idx" ON "public"."Server"("profileId");

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "public"."Server"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Channel" ADD CONSTRAINT "Channel_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "public"."Server"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
