import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Star } from "lucide-react"

import { cn } from "@/lib/utils"
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
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"

          <motion.div
            key={adiso.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/adisos/${adiso.id}`}>
              <PremiumCard className="h-full transition-all hover:scale-[1.02]">
                <PremiumCardHeader>
                  <div className="relative aspect-square w-full overflow-hidden rounded-t-xl">
                    <PremiumImage
                      src={JSON.parse(adiso.imagenes)[0] || "/placeholder.png"}
                      alt={adiso.titulo}
                      fill
                      className="object-cover"
                    />
                    {adiso.isPremium && (
                      <Badge
                        variant="premium"
                        className="absolute left-2 top-2"
                      >
                        PREMIUM
                      </Badge>
                    )}
                  </div>
                </PremiumCardHeader>
                <PremiumCardContent>
                  <PremiumCardTitle>{adiso.titulo}</PremiumCardTitle>
                  <PremiumCardDescription>
                    {adiso.descripcion}
                  </PremiumCardDescription>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold">€{adiso.precio}</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Me gusta"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="ml-1 text-xs">
                          {adiso._count.favoritos}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Mensajes"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="ml-1 text-xs">
                          {adiso._count.mensajes}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Reviews"
                      >
                        <Star className="h-4 w-4" />
                        <span className="ml-1 text-xs">
                          {adiso._count.reviews}
                        </span>
                      </Button>
                    </div>
                  </div>
                </PremiumCardContent>
                <PremiumCardFooter>
                  <div className="flex items-center gap-2">
                    <PremiumImage
                      src={adiso.usuario.image || "/placeholder-user.png"}
                      alt={adiso.usuario.name || ""}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-sm text-muted-foreground">
                      {adiso.usuario.name}
                    </span>
                    {adiso.usuario.isPremium && (
                      <Badge variant="premium" className="h-4 px-1 text-[10px]">
                        PRO
                      </Badge>
                    )}
                  </div>
                </PremiumCardFooter>
              </PremiumCard>
            </Link>
          </motion.div> 