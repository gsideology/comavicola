export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  termsAccepted: boolean;
}

export interface BookingResponse {
  success: boolean;
  message: string;
} 