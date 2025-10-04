"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Package, MapPin, User, Weight, FileText, Gift, Calendar, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api"
import { useGetAllReceiverQuery } from "@/redux/features/user/user.api"
import { toast } from "sonner"

const parcelSchema = z.object({
  parcelType: z.string().min(1, "Type is required"),
  weight: z.number().min(0.1, "Weight must be positive"),
  
  deliveryAddress: z.string().min(1, "Delivery address is required"),

  receiver: z.string().email("Receiver email is required"),
  DeliveryDate: z
    .string()
    .refine((val) => {
      if (!val) return false; // empty check
      const selectedDate = new Date(val);
      const now = new Date();
      return selectedDate > now; // must be future
    }, { message: " This field is required  Delivery date must be in the future" }),

  parcelFee: z.number().min(1, "Parcel fee is required"),
  couponCode: z.string().optional(),
})

const CreateParcel = () => {
  const [createParcel] = useCreateParcelMutation()
  useUserInfoQuery(undefined)
  const { data: receiver } = useGetAllReceiverQuery(undefined)

  const form = useForm<z.infer<typeof parcelSchema>>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      parcelType: "",
      weight: 0,
      deliveryAddress: "",
      receiver: "",
      parcelFee: 0,
      DeliveryDate: "",
      couponCode: "50",
    },
  })

  const allReceiver = receiver?.data?.data

  const onSubmit = async (data: any) => {
    data.DeliveryDate = new Date(data.DeliveryDate).toISOString()
    const toastId = toast.loading("Parcel creating...")

    try {
      const res = await createParcel(data).unwrap()
      console.log(res)
      toast.success("Parcel created successfully", { id: toastId })
    } catch (error) {
      toast.error("Parcel creation failed", { id: toastId })
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen text-black  bg-gradient-to-br from-emerald-50 via-white to-orange-50 p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-60 right-20 w-40 h-40 bg-gradient-to-r from-orange-400/30 to-pink-400/30 rounded-full blur-xl"
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-32 w-48 h-48 bg-gradient-to-r from-emerald-300/20 to-cyan-300/20 rounded-full blur-2xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="w-full max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100/50 p-8 md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-500/50"
              >
                <Package className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                Create New Parcel
              </h2>
            </div>
            <p className="text-gray-600 text-lg">Fill in the details to create your parcel shipment</p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Parcel Type */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="parcelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          Parcel Type
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-emerald-400 focus:border-emerald-500 transition-colors rounded-xl bg-white/50">
                              <SelectValue placeholder="Select parcel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Document">📄 Document</SelectItem>
                            <SelectItem value="Package">📦 Package</SelectItem>
                            <SelectItem value="Fragile">⚠️ Fragile</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Weight */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Weight className="w-4 h-4 text-emerald-600" />
                          Weight (kg)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            className="h-12 border-2 border-gray-200 hover:border-emerald-400 focus:border-emerald-500 transition-colors rounded-xl bg-white/50"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              {/* Delivery Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        Delivery Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter full delivery address"
                          className="h-12 border-2 border-gray-200 hover:border-emerald-400 focus:border-emerald-500 transition-colors rounded-xl bg-white/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Receiver */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  <FormField
                    control={form.control}
                    name="receiver"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <User className="w-4 h-4 text-emerald-600" />
                          Receiver
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-emerald-400 focus:border-emerald-500 transition-colors rounded-xl bg-white/50">
                              <SelectValue placeholder="Select receiver" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {allReceiver?.map((r: any) => (
                              <SelectItem key={r?._id} value={r?.email}>
                                {r?.email}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Delivery Date */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <FormField
                    control={form.control}
                    name="DeliveryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Calendar className="w-4 h-4 text-emerald-600" />
                          Delivery Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="h-12 border-2 border-gray-200 hover:border-emerald-400 focus:border-emerald-500 transition-colors rounded-xl bg-white/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Parcel Fee */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                >
                  <FormField
                    control={form.control}
                    name="parcelFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <DollarSign className="w-4 h-4 text-emerald-600" />
                          Parcel Fee
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="h-12 border-2 border-gray-200 hover:border-emerald-400 focus:border-emerald-500 transition-colors rounded-xl bg-white/50"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Coupon Code */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <FormField
                    control={form.control}
                    name="couponCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Gift className="w-4 h-4 text-orange-600" />
                          Coupon Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter coupon code (optional)"
                            className="h-12 border-2 border-gray-200 hover:border-orange-400 focus:border-orange-500 transition-colors rounded-xl bg-white/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
              >
                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-500/50 hover:shadow-xl hover:shadow-emerald-600/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Package className="w-5 h-5 mr-2" />
                  Create Parcel
                </Button>
              </motion.div>
            </form>
          </Form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8 p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl border-2 border-emerald-200/50 shadow-inner"
          >
            <div className="flex items-center justify-center gap-2 text-emerald-700 mb-2">
              <Package className="w-5 h-5" />
              <span className="font-bold text-lg">Secure & Fast Delivery Guaranteed</span>
            </div>
            <p className="text-center text-emerald-600 text-sm">
              Your parcel will be handled with care and delivered safely to the destination.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default CreateParcel
