/*
  Warnings:

  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT;

-- CreateTable
CREATE TABLE "UserGoogle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "googleId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserGoogle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HeroToUserGoogle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGoogle_email_key" ON "UserGoogle"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_HeroToUserGoogle_AB_unique" ON "_HeroToUserGoogle"("A", "B");

-- CreateIndex
CREATE INDEX "_HeroToUserGoogle_B_index" ON "_HeroToUserGoogle"("B");

-- AddForeignKey
ALTER TABLE "_HeroToUserGoogle" ADD CONSTRAINT "_HeroToUserGoogle_A_fkey" FOREIGN KEY ("A") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeroToUserGoogle" ADD CONSTRAINT "_HeroToUserGoogle_B_fkey" FOREIGN KEY ("B") REFERENCES "UserGoogle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
