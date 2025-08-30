import { Star, Truck, ReceiptPoundSterling } from 'lucide-react'

const WelcomeSection = () => {
  return (
    <section className="bg-background px-8 py-12">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-foreground mb-10">
          Welcome to QuickMart, Earlham Street
        </h2>

        <div className="flex gap-16 mb-6">
          <div className="flex items-center gap-4">
            <Star className="h-10 w-10 text-primary fill-primary" />
            <div>
              <span className="text-3xl font-bold text-primary">4.8</span>
              <span className="text-3xl text-primary ml-3">Excellent</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Truck className="h-10 w-10 text-primary" />
            <div>
              <span className="text-3xl text-foreground">Deliver in</span>
              <span className="text-3xl font-semibold text-primary ml-3">
                15-30 minutes
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ReceiptPoundSterling className="h-10 w-10 text-primary" />
            <div>
              <span className="text-3xl text-foreground">Minimum order</span>
              <span className="text-3xl font-semibold text-primary ml-3">
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
