export const escapeWildcardCharacter = (text: string) => {
  return text.replace(/[%_]/g, '\\$&');
};
