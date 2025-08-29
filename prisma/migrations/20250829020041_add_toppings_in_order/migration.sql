-- CreateTable
CREATE TABLE "public"."_OrderToTopping" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OrderToTopping_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrderToTopping_B_index" ON "public"."_OrderToTopping"("B");

-- AddForeignKey
ALTER TABLE "public"."_OrderToTopping" ADD CONSTRAINT "_OrderToTopping_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_OrderToTopping" ADD CONSTRAINT "_OrderToTopping_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Topping"("id") ON DELETE CASCADE ON UPDATE CASCADE;
