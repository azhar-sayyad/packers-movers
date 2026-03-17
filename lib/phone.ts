export function phoneDigits(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

export function whatsappLink(phone: string, text?: string): string {
  const base = `https://wa.me/${phoneDigits(phone)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function telLink(phone: string): string {
  return `tel:${phoneDigits(phone)}`;
}
