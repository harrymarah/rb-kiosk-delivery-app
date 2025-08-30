import { Star, Truck, ReceiptPoundSterling } from 'lucide-react'

const WelcomeSection = () => {
  return (
    <section className="bg-background px-[clamp(1rem,2vw,4rem)] py-[clamp(2rem,3vw,6rem)]">
      <div className="container mx-auto">
        <h2 className="text-[clamp(2rem,5vw,6rem)] font-bold text-foreground mb-[clamp(2rem,3vw,5rem)]">
          Welcome to QuickMart, Earlham Street
        </h2>

        <div className="flex gap-[clamp(2rem,4vw,8rem)] mb-6">
          <div className="flex items-center gap-[clamp(1rem,2vw,3rem)]">
            <Star className="h-[clamp(2rem,3vw,4rem)] w-[clamp(2rem,3vw,4rem)] text-primary fill-primary" />
            <div>
              <span className="text-[clamp(1.5rem,3vw,4rem)] font-bold text-primary">4.8</span>
              <span className="text-[clamp(1.5rem,3vw,4rem)] text-primary ml-3">Excellent</span>
            </div>
          </div>

          <div className="flex items-center gap-[clamp(1rem,2vw,3rem)]">
            <Truck className="h-[clamp(2rem,3vw,4rem)] w-[clamp(2rem,3vw,4rem)] text-primary" />
            <div>
              <span className="text-[clamp(1.5rem,3vw,4rem)] text-foreground">Deliver in</span>
              <span className="text-[clamp(1.5rem,3vw,4rem)] font-semibold text-primary ml-3">
                15-30 minutes
              </span>
            </div>
          </div>

          <div className="flex items-center gap-[clamp(1rem,2vw,3rem)]">
            <ReceiptPoundSterling className="h-[clamp(2rem,3vw,4rem)] w-[clamp(2rem,3vw,4rem)] text-primary" />
            <div>
              <span className="text-[clamp(1.5rem,3vw,4rem)] text-foreground">Minimum order</span>
              <span className="text-[clamp(1.5rem,3vw,4rem)] font-semibold text-primary ml-3">
                £15
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
