// src/auth/dto/token-verification.dto.ts

export interface TokenVerificationSuccess {
  valid: true;
  payload: any; // replace with your JWT payload type
}

export interface TokenVerificationFailure {
  valid: false;
  message: string;
}

export type TokenVerificationResult =
  | TokenVerificationSuccess
  | TokenVerificationFailure;
