export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  vatNumber: string;
  termsAccepted: boolean;
}

export interface BookingResponse {
  success: boolean;
  message: string;
} 