import { Star, Truck, ReceiptPoundSterling } from 'lucide-react'

const WelcomeSection = () => {
  return (
    <section className="bg-background px-4 py-5">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl font-bold text-foreground mb-4">
          Welcome to QuickMart, Earlham Street
        </h2>

        <div className="flex flex-col gap-2.5 mb-2">
          <div className="flex items-center gap-2.5">
            <Star className="h-5 w-5 shrink-0 text-primary fill-primary" />
            <div>
              <span className="text-sm font-bold text-primary">4.8</span>
              <span className="text-sm text-primary ml-2">Excellent</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Truck className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <span className="text-sm text-foreground">Deliver in</span>
              <span className="text-sm font-semibold text-primary ml-2">
                15-30 minutes
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ReceiptPoundSterling className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <span className="text-sm text-foreground">Minimum order</span>
              <span className="text-sm font-semibold text-primary ml-2">
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
