-- CreateTable
CREATE TABLE "Villain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "debilityId" INTEGER NOT NULL,
    "enemyId" INTEGER NOT NULL,

    CONSTRAINT "Villain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Villain_name_key" ON "Villain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Villain_debilityId_key" ON "Villain"("debilityId");

-- CreateIndex
CREATE UNIQUE INDEX "Villain_enemyId_key" ON "Villain"("enemyId");

-- AddForeignKey
ALTER TABLE "Villain" ADD CONSTRAINT "Villain_debilityId_fkey" FOREIGN KEY ("debilityId") REFERENCES "Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Villain" ADD CONSTRAINT "Villain_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
