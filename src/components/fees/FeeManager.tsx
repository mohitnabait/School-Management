import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Grid } from "@/components/ui/grid";
import { getFees } from "@/lib/queries";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FeeManager = () => {
  const fees = getFees();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
          Fee Management
        </h2>
      </div>

      <Grid>
        {fees.map((fee, idx) => (
          <Dialog key={fee.id}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="cursor-pointer"
              >
                <Card
                  className={cn(
                    "group relative overflow-hidden",
                    "bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-orange-500/10",
                    "border-2 border-amber-500/20",
                    "hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/20",
                    "transition-all duration-300 ease-out",
                    "backdrop-blur-sm",
                    "hover:scale-[1.02]",
                    "animate-border",
                  )}
                >
                  <div className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300">
                        <DollarSign className="w-6 h-6" />
                      </div>
                      <div
                        className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium",
                          fee.status === "PAID"
                            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-200"
                            : "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-200",
                        )}
                      >
                        {fee.status}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {fee.student_name}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300 group-hover:text-amber-200">
                        <DollarSign className="w-4 h-4 mr-2 text-amber-400" />
                        <span className="text-sm">${fee.amount}</span>
                      </div>
                      <div className="flex items-center text-gray-300 group-hover:text-amber-200">
                        <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                        <span className="text-sm">Due: {fee.due_date}</span>
                      </div>
                      <div className="flex items-center text-gray-300 group-hover:text-amber-200">
                        {fee.status === "PAID" ? (
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 mr-2 text-red-400" />
                        )}
                        <span className="text-sm">
                          {fee.status === "PAID"
                            ? "Payment Complete"
                            : "Payment Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-black/90 border-amber-500/20">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  Fee Details
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-gray-400">Student Name</p>
                    <p className="text-white font-medium">{fee.student_name}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">Amount</p>
                    <p className="text-white font-medium">${fee.amount}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">Due Date</p>
                    <p className="text-white font-medium">{fee.due_date}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">Status</p>
                    <p
                      className={cn(
                        "font-medium",
                        fee.status === "PAID"
                          ? "text-green-400"
                          : "text-red-400",
                      )}
                    >
                      {fee.status}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="border-amber-500/20 hover:border-amber-500/40 text-amber-400"
                    onClick={() => {}}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => {}}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </Grid>
    </motion.div>
  );
};

export default FeeManager;
