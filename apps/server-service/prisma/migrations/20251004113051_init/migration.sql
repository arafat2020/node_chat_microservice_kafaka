-- CreateEnum
CREATE TYPE "public"."ChannelType" AS ENUM ('TEXT', 'AUDIO', 'VIDEO');

-- CreateEnum
CREATE TYPE "public"."MemberRole" AS ENUM ('ADMIN', 'MODERATOR', 'GUEST');

-- CreateTable
CREATE TABLE "public"."Member" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "serverId" UUID NOT NULL,
    "role" "public"."MemberRole" NOT NULL DEFAULT 'GUEST',
    "nickname" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Channel" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."ChannelType" NOT NULL DEFAULT 'TEXT',
    "profileId" UUID NOT NULL,
    "serverId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Server" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_serverId_key" ON "public"."Member"("userId", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Server_inviteCode_key" ON "public"."Server"("inviteCode");

-- CreateIndex
CREATE INDEX "Server_profileId_idx" ON "public"."Server"("profileId");

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "public"."Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Channel" ADD CONSTRAINT "Channel_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "public"."Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
