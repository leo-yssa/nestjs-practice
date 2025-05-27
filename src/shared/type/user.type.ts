export const USER_TYPE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  PARTNER: 'PARTNER',
} as const;

export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];
export const USER_TYPE_ARRAY = Object.values(USER_TYPE);
