/*
  Warnings:

  - You are about to drop the `otra_cosa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "otra_cosa";

-- CreateTable
CREATE TABLE "Hero" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Power" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Power_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HeroToPower" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Hero_name_key" ON "Hero"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Power_name_key" ON "Power"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_HeroToPower_AB_unique" ON "_HeroToPower"("A", "B");

-- CreateIndex
CREATE INDEX "_HeroToPower_B_index" ON "_HeroToPower"("B");

-- AddForeignKey
ALTER TABLE "_HeroToPower" ADD CONSTRAINT "_HeroToPower_A_fkey" FOREIGN KEY ("A") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeroToPower" ADD CONSTRAINT "_HeroToPower_B_fkey" FOREIGN KEY ("B") REFERENCES "Power"("id") ON DELETE CASCADE ON UPDATE CASCADE;
