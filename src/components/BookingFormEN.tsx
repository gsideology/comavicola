import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BookingFormData } from "../types/booking";
import { supabase } from "../lib/supabase";

interface BookingFormProps {
  onSubmitSuccess: () => void;
}

const BookingFormEN: React.FC<BookingFormProps> = ({ onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<BookingFormData>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("bookings")
        .insert([
          {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            vatNumber: data.vatNumber,
            companyName: data.companyName,
            termsAccepted: data.termsAccepted,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        if (
          error.message.includes("API key") ||
          error.message.includes("apikey")
        ) {
          setError("root", {
            message: "Configuration error. Please contact the administrator.",
          });
        } else if (error.message.includes("permission")) {
          setError("root", {
            message: "Authorization error. Please contact the administrator.",
          });
        } else {
          setError("root", {
            message: "An error occurred while saving the booking. Please try again later.",
          });
        }
        return;
      }

      reset();
      onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("root", {
        message: "An error occurred while saving the booking. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`form-container ${isVisible ? 'active' : ''}`}>
      <h1>Claim your free gadget</h1>
      <h2>
      Enter your Info below:
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
        {errors.root && (
          <div className="form-errors">
            <p className="error-message">{errors.root.message}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="John"
            {...register("firstName", { required: "First name is required" })}
            className={errors.firstName ? "error" : ""}
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <div className="field-errors">
              <p className="error-message">{errors.firstName.message}</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Doe"
            {...register("lastName", { required: "Last name is required" })}
            className={errors.lastName ? "error" : ""}
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <div className="field-errors">
              <p className="error-message">{errors.lastName.message}</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="companyName">Company</label>
          <input
            id="companyName"
            type="text"
            placeholder="Your company"
            {...register("companyName", { required: "Company name is required" })}
            className={errors.companyName ? "error" : ""}
            disabled={isSubmitting}
          />
          {errors.companyName && (
            <div className="field-errors">
              <p className="error-message">{errors.companyName.message}</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            className={errors.email ? "error" : ""}
            disabled={isSubmitting}
          />
          {errors.email && (
            <div className="field-errors">
              <p className="error-message">{errors.email.message}</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="vatNumber">VAT Number</label>
          <input
            id="vatNumber"
            type="text"
            placeholder="12345678901"
            {...register("vatNumber", {
              required: "VAT number is required",
              pattern: {
                value: /^[0-9]{11}$/,
                message: "VAT number must be 11 digits",
              },
            })}
            className={errors.vatNumber ? "error" : ""}
            disabled={isSubmitting}
          />
          {errors.vatNumber && (
            <div className="field-errors">
              <p className="error-message">{errors.vatNumber.message}</p>
            </div>
          )}
        </div>

        <div className="checkbox-group">
          <input
            id="termsAccepted"
            type="checkbox"
            {...register("termsAccepted", {
              required: "You must accept the terms and conditions",
            })}
            disabled={isSubmitting}
          />
          <label htmlFor="termsAccepted">
            Accept Comavicola's terms and conditions
          </label>
          {errors.termsAccepted && (
            <div className="field-errors">
              <p className="error-message">{errors.termsAccepted.message}</p>
            </div>
          )}
        </div>

        <button type="submit" className="cta-button" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Claim Your Gadget"}
        </button>
      </form>
    </div>
  );
};

export default BookingFormEN; 