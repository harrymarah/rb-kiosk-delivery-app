import { CalendarDays } from "lucide-react";
import MainNav from "@/components/MainNav";

const Reservations = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b">
        <MainNav activeItem="reservations" className="border-b-0" />
      </div>

      <div className="px-4 py-16 max-w-6xl mx-auto text-center">
        <CalendarDays className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Reservations</h1>
        <p className="text-muted-foreground">
          Book a table at restaurants near Earlham Street. Coming soon.
        </p>
      </div>
    </div>
  );
};

export default Reservations;
