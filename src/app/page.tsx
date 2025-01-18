import * as React from "react"
import Link from "next/link"
import { Metadata } from "next"

import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  PremiumCard,
  PremiumCardContent,
  PremiumCardHeader
} from "@/components/ui/premium-card"
import { PremiumImage } from "@/components/ui/premium-image"
import { routes } from "@/config/routes"

// ... existing code ...

            <Link key={adiso.id} href={routes.adisos.show(adiso.id)}>
              <PremiumCard>
                <PremiumCardHeader>
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <PremiumImage
                      src={adiso.imagenes[0] || "/placeholder.png"}
                      alt={adiso.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>
                </PremiumCardHeader>
                <PremiumCardContent>
                  <h3 className="line-clamp-2 text-lg font-semibold">
                    {adiso.titulo}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {adiso.descripcion}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-medium">€{adiso.precio}</span>
                    <span className="text-sm text-muted-foreground">
                      {adiso.categoria.nombre}
                    </span>
                  </div>
                </PremiumCardContent>
              </PremiumCard>
            </Link>

// ... existing code ... 