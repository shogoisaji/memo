export const passwordValidation = (value: string): boolean => {
  // 許可する文字のみで構成されているかチェック
  const allowedCharsOnly = /^[a-zA-Z0-9!@#$%^&*]+$/.test(value);

  // 許可されていない文字が含まれていればfalseを返す
  if (!allowedCharsOnly) {
    return false;
  }

  // 以下は基本的な強度チェック
  const hasLowerCase = /[a-z]/.test(value);
  const hasUpperCase = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[!@#$%^&*]/.test(value);

  // 最低8文字以上
  const hasMinLength = value.length >= 8;

  // 文字種の要件（例：少なくとも3種類の文字タイプ）
  const validTypesCount = [
    hasLowerCase,
    hasUpperCase,
    hasNumber,
    hasSymbol,
  ].filter(Boolean).length;
  const hasEnoughTypes = validTypesCount >= 3;

  return allowedCharsOnly && hasMinLength && hasEnoughTypes;
};
