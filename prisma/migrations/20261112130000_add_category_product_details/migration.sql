CREATE TABLE "SareeDetails" (
    "productId" TEXT NOT NULL,
    "fabric" TEXT,
    "weave" TEXT,
    "lengthMeters" DECIMAL(6,2),
    "blouseIncluded" BOOLEAN NOT NULL DEFAULT false,
    "occasion" TEXT,
    "careInstructions" TEXT,
    CONSTRAINT "SareeDetails_pkey" PRIMARY KEY ("productId")
);

CREATE TABLE "SnackDetails" (
    "productId" TEXT NOT NULL,
    "ingredients" TEXT[] NOT NULL,
    "allergens" TEXT[] NOT NULL,
    "netQuantity" DECIMAL(10,3),
    "unit" "UnitOfMeasure" NOT NULL DEFAULT 'GRAM',
    "dietaryTags" TEXT[] NOT NULL,
    "bestBeforeDays" INTEGER,
    CONSTRAINT "SnackDetails_pkey" PRIMARY KEY ("productId")
);

ALTER TABLE "SareeDetails" ADD CONSTRAINT "SareeDetails_productId_fkey"
FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "SnackDetails" ADD CONSTRAINT "SnackDetails_productId_fkey"
FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
