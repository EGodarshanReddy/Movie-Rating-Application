/*
  Warnings:

  - You are about to alter the column `watchedCount` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "watchedCount" SET DATA TYPE INTEGER;
