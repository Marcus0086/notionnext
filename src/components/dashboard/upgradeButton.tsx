"use client";

import { PiWarningCircleDuotone } from "react-icons/pi";
import { IoIosCheckmarkCircle as CheckIcon } from "react-icons/io";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const UpgardeButton = () => {
  const plans = [
    {
      title: "Pro Plan",
      price: "$16 / month",
      features: [
        "Custom domains",
        "Custom code",
        "Designer templates",
        "Unlimited pages",
        "Password protected pages",
      ],
      buttonText: "Upgrade to pro",
    },
    {
      title: "Enterprise Plan",
      price: "$28 / month",
      features: [
        "Everything in pro",
        "Pause site syncing",
        "Advanced site search",
        "Redirect & 404 pages",
        "Priority support",
      ],
      buttonText: "Upgrade to enterprise",
    },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="border-orange-200 flex items-center justify-center gap-1"
          variant={"outline"}
        >
          <PiWarningCircleDuotone className="w-4 h-4" />
          Upgrade
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold mb-4">
            Upgrade Your Site
          </DialogTitle>
          <DialogDescription className="flex justify-center items-center gap-2 mb-6">
            <Button className="text-white" variant="ghost">
              Monthly
            </Button>
            <Switch id="billing-cycle" />
            <Label className="text-white" htmlFor="billing-cycle">
              Yearly
            </Label>
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription className="text-4xl font-bold">
                  {plan.price}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col items-start justify-center w-full">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon /> {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className={`w-full bg-yellow-400`}>
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgardeButton;
