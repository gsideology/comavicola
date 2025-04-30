export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  vatNumber: string;
  companyName: string;
  termsAccepted: boolean;
}

export interface BookingResponse {
  success: boolean;
  message: string;
} 