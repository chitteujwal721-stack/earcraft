/**
 * Centralized WhatsApp Configuration for EarCraft
 * 
 * Keep the WhatsApp phone number in this single variable.
 * Format: International format without '+', spaces, brackets, or dashes.
 * For India (+91) with 9920349076 -> '919920349076'
 */
export const WHATSAPP_CONFIG = {
  phoneNumber: '919920349076',
  storeName: 'EarCraft',
  baseUrl: 'https://wa.me',
};

/**
 * Returns the formatted WhatsApp click-to-chat URL with properly encoded message text.
 * Works seamlessly on both desktop (WhatsApp Web / tab) and mobile (WhatsApp App).
 */
export function buildWhatsAppUrl(messageText: string): string {
  const cleanNumber = WHATSAPP_CONFIG.phoneNumber.replace(/[^\d]/g, '');
  const encodedMessage = encodeURIComponent(messageText);
  return `${WHATSAPP_CONFIG.baseUrl}/${cleanNumber}?text=${encodedMessage}`;
}
