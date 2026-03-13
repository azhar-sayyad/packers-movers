"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROPERTY_SIZES, QUOTE_SUBMIT_LABEL, QUOTE_SUBMITTING_LABEL } from "@/lib/constants";

export interface CityOption {
  value: string;
  label: string;
}

export interface ServiceOption {
  value: string;
  label: string;
}

interface QuoteFormProps {
  cities: CityOption[];
  services: ServiceOption[];
  variant?: "hero" | "full";
  prefillFromCity?: string;
  className?: string;
}

function getAttribution() {
  if (typeof window === "undefined") {
    return {
      landingPage: undefined,
      referrer: undefined,
      utmSource: undefined,
      utmMedium: undefined,
      utmCampaign: undefined,
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    landingPage: window.location.pathname + window.location.search,
    referrer: document.referrer || undefined,
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
  };
}

export function QuoteForm({
  cities,
  services,
  variant = "full",
  prefillFromCity,
  className,
}: QuoteFormProps) {
  const [moveFrom, setMoveFrom] = useState(prefillFromCity ?? "");
  const [moveTo, setMoveTo] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [moveDate, setMoveDate] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    const attribution = getAttribution();
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          moveFrom,
          moveTo,
          serviceType,
          moveDate,
          propertyType,
          message,
          honeypot,
          ...attribution,
        }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center",
          className
        )}
      >
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        <h3 className="font-display text-xl font-bold text-emerald-900">Thank You!</h3>
        <p className="text-sm text-emerald-800">
          Your quote request has been received. Our team will contact you shortly with the best
          estimate.
        </p>
      </div>
    );
  }

  const isHero = variant === "hero";

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {/* Honeypot - hidden from humans */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {!isHero && (
        <div className="space-y-2">
          <Label htmlFor="inquiry-name">Your Name</Label>
          <Input
            id="inquiry-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Verma"
            required
            minLength={2}
          />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="inquiry-from">Moving From</Label>
          <Select value={moveFrom} onValueChange={setMoveFrom} required>
            <SelectTrigger id="inquiry-from">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="inquiry-to">Moving To</Label>
          <Select value={moveTo} onValueChange={setMoveTo} required>
            <SelectTrigger id="inquiry-to">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry-phone">Phone Number</Label>
        <Input
          id="inquiry-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 98765 43210"
          required
          minLength={10}
          maxLength={15}
        />
      </div>

      {isHero && (
        <div className="space-y-2">
          <Label htmlFor="inquiry-property-quick">Property Type</Label>
          <div className="flex flex-wrap gap-2">
            {PROPERTY_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setPropertyType(propertyType === size ? "" : size)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all",
                  propertyType === size
                    ? "border-cta bg-cta text-proof-ink shadow-cta/30 shadow-sm"
                    : "text-muted hover:border-brand-500 hover:text-brand-600 border-black/10"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {!isHero && (
        <>
          <div className="space-y-2">
            <Label htmlFor="inquiry-email">Email (optional)</Label>
            <Input
              id="inquiry-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inquiry-service">Service Type</Label>
            <Select value={serviceType} onValueChange={setServiceType} required>
              <SelectTrigger id="inquiry-service">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="inquiry-date">Move Date (optional)</Label>
              <Input
                id="inquiry-date"
                type="date"
                value={moveDate}
                onChange={(e) => setMoveDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inquiry-property">Property Type (optional)</Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger id="inquiry-property">
                  <SelectValue placeholder="Optional" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_SIZES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="inquiry-message">Message (optional)</Label>
            <Textarea
              id="inquiry-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about the items you need to move..."
            />
          </div>
        </>
      )}

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          Could not submit your request. Please try again.
        </p>
      )}

      <Button
        type="submit"
        size={isHero ? "lg" : "default"}
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {QUOTE_SUBMITTING_LABEL}
          </>
        ) : (
          QUOTE_SUBMIT_LABEL
        )}
      </Button>
    </form>
  );
}