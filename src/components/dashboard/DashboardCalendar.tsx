import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: Date;
  time?: string;
  location?: string;
  attendees?: number;
  type: "exam" | "meeting" | "holiday" | "activity";
}

interface DashboardCalendarProps {
  events?: Event[];
}

const defaultEvents: Event[] = [
  {
    id: 1,
    title: "Final Exams",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    time: "9:00 AM - 12:00 PM",
    location: "Exam Hall",
    attendees: 120,
    type: "exam",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
    time: "2:00 PM - 5:00 PM",
    location: "Conference Room",
    attendees: 45,
    type: "meeting",
  },
  {
    id: 3,
    title: "School Holiday",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
    type: "holiday",
  },
  {
    id: 4,
    title: "Science Fair",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
    time: "10:00 AM - 3:00 PM",
    location: "School Auditorium",
    attendees: 200,
    type: "activity",
  },
];

const DashboardCalendar = ({
  events = defaultEvents,
}: DashboardCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  // Get events for the selected date
  const selectedDateEvents = selectedDate
    ? events.filter(
        (event) =>
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear(),
      )
    : [];

  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    );
  };

  // Get event type color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "meeting":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "holiday":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "activity":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Card className="w-full h-full bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">School Calendar</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border border-white/10"
            modifiersClassNames={{
              selected: "bg-purple-500 text-white",
            }}
            modifiers={{
              highlighted: (date) => isDayWithEvent(date),
            }}
            modifiersStyles={{
              highlighted: {
                fontWeight: "bold",
                border: "2px solid var(--primary-color)",
                color: "var(--primary-color)",
              },
            }}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {selectedDate
              ? format(selectedDate, "MMMM d, yyyy")
              : "Select a date"}
          </h3>

          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-3 rounded-lg border",
                    getEventTypeColor(event.type),
                  )}
                >
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="mt-2 space-y-1 text-sm">
                    {event.time && (
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.attendees && (
                      <div className="flex items-center">
                        <Users className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-white/60">
              <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No events scheduled for this date</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DashboardCalendar;
