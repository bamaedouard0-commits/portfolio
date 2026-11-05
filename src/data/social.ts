/**
 * Liens de reseaux sociaux et coordonnees.
 * Modifiez les valeurs ci-dessous avec vos vraies URL.
 * Les valeurs entre {{ }} sont des emplacements a remplacer.
 */
export const social = {
  github: '{{LIEN_GITHUB}}',
  linkedin: 'https://www.linkedin.com/in/edouard-bama-7056ba432',
  facebook: 'https://www.facebook.com/profile.php?id=61596243659966',
  tiktok: '{{LIEN_TIKTOK}}',
  whatsapp: '+22664371012',
  email: 'bamaedouard0@gmail.com',
  phone: '+226 64 37 10 12',
} as const;

/** Verifie si un lien est un placeholder */
export function isPlaceholder(value: string): boolean {
  return value.startsWith('{{') && value.endsWith('}}');
}
