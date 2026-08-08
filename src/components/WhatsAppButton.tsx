'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+8801777995995?text=Hello%20IMIC%2C%20I%20would%20like%20to%20inquire%20about%20medical%20treatment%20abroad."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 group"
      aria-label="Chat with IMIC on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium text-xs pl-0 group-hover:pl-2">
        Chat on WhatsApp
      </span>
    </a>
  );
}
