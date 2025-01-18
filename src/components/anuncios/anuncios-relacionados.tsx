"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  PremiumCard,
  PremiumCardHeader,
  PremiumCardContent,
  PremiumCardTitle,
  PremiumCardDescription,
  PremiumCardFooter
} from "@/components/ui/premium-card"
import { PremiumImage } from "@/components/ui/premium-image"
import { Badge } from "@/components/ui/badge"

// ... existing code ...

            <Link href={`/adisos/${adiso.id}`}>
              <PremiumCard className="group h-full transition-all hover:shadow-lg">
                <PremiumCardHeader>
                  <PremiumImage
                    src={JSON.parse(adiso.imagenes)[0]}
                    alt={adiso.titulo}
                    width={400}
                    height={300}
                    className="aspect-[4/3] rounded-t-xl object-cover"
                  />
                </PremiumCardHeader>
                <PremiumCardContent>
                  <PremiumCardTitle className="line-clamp-2">
                    {adiso.titulo}
                  </PremiumCardTitle>
                  <PremiumCardDescription>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(adiso.precio)}
                      </span>
                      {adiso.precioNegociable && (
                        <Badge variant="secondary">Negociable</Badge>
                      )}
                    </div>
                  </PremiumCardDescription>
                </PremiumCardContent>
                <PremiumCardFooter>
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full">
                      <PremiumImage
                        src={adiso.user.image || "/placeholder.png"}
                        alt={adiso.user.name || "Avatar"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {adiso.user.name}
                    </span>
                  </div>
                </PremiumCardFooter>
              </PremiumCard>
            </Link>

// ... existing code ... 