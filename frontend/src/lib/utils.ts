import { clsx, type ClassValue } from "clsx"
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge"
import { BACKEND_DOMAIN, getDomainUrl } from "@/env";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isEmptyReactNode(node: ReactNode): boolean {
  return (
    node === null ||
    node === undefined ||
    (typeof node === 'string' && node.trim() === '') ||
    (Array.isArray(node) && node.every(isEmptyReactNode)) // rekursif untuk array
  );
}

export function formatDate(isoString: string) {
  const tanggal = new Date(isoString);
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function toInitials(username: string): string {
  if (!username) return "";

  // 1) Sisipkan spasi sebelum huruf kapital yg didahului huruf/angka
  //    → "LowScarlet" → "Low Scarlet"
  const spaced = username.replace(/([a-z0-9])([A-Z])/g, "$1 $2");

  // 2) Pecah berdasarkan spasi, underscore, atau minus
  const parts = spaced.split(/[\s_-]+/).filter(Boolean);

  // 3) Ambil huruf pertama tiap bagian, gabungkan, lalu kapitalisasi
  return parts.map(word => word[0]).join("").toUpperCase();
}

export function getPublicMediaUrl(group: string, filePath: string) {
  return getDomainUrl(BACKEND_DOMAIN) + `/media/${group}/` + filePath
}

export function formatPhoneLocal(number: string) {
  const digits: string = number.replace(/\D/g, '');

  const parts: string[] = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.substring(i, i + 4));
  }

  return parts.join('-');
}

export function formatToRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 7) {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  if (hours >= 1) {
    return `${hours} jam lalu`;
  }

  if (minutes >= 1) {
    return `${minutes} menit lalu`;
  }

  return `beberapa detik lalu`;
}
