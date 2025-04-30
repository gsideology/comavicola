import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BookingFormData } from "../types/booking";
import { supabase } from "../lib/supabase";

interface BookingFormProps {
  onSubmitSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmitSuccess }) => {
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
    // Add a small delay to ensure the form appears after the screensaver transition
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
            message:
              "Errore di configurazione. Si prega di contattare l'amministratore.",
          });
        } else if (error.message.includes("permission")) {
          setError("root", {
            message:
              "Errore di autorizzazione. Si prega di contattare l'amministratore.",
          });
        } else {
          setError("root", {
            message:
              "Si è verificato un errore durante il salvataggio della prenotazione. Riprova più tardi.",
          });
        }
        return;
      }

      // Reset form and show success
      reset();
      onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("root", {
        message:
          "Si è verificato un errore durante il salvataggio della prenotazione. Riprova più tardi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`form-container ${isVisible ? 'active' : ''}`}>
      <h1>Riserva il tuo posto per un'esperienza unica con il nostro chef!</h1>
      <h2>
        Inserisci i tuoi dati e preparati per un viaggio tra sapori
        indimenticabili.
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
        {errors.root && (
          <div className="form-errors">
            <p className="error-message">{errors.root.message}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="firstName">Nome</label>
          <input
            id="firstName"
            type="text"
            placeholder="Mario"
            {...register("firstName", { required: "Il nome è obbligatorio" })}
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
          <label htmlFor="lastName">Cognome</label>
          <input
            id="lastName"
            type="text"
            placeholder="Rossi"
            {...register("lastName", { required: "Il cognome è obbligatorio" })}
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
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="mariorossi@gmail.com"
            {...register("email", {
              required: "L'email è obbligatoria",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Inserisci un indirizzo email valido",
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
          <label htmlFor="vatNumber">Partita IVA</label>
          <input
            id="vatNumber"
            type="text"
            placeholder="12345678901"
            {...register("vatNumber", {
              required: "La partita IVA è obbligatoria",
              pattern: {
                value: /^[0-9]{11}$/,
                message: "La partita IVA deve essere composta da 11 numeri",
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
              required: "Devi accettare i termini e le condizioni",
            })}
            disabled={isSubmitting}
          />
          <label htmlFor="termsAccepted">
            Accetta i termini e condizioni di Comavicola
          </label>
          {errors.termsAccepted && (
            <div className="field-errors">
              <p className="error-message">{errors.termsAccepted.message}</p>
            </div>
          )}
        </div>

        <button type="submit" className="cta-button" disabled={isSubmitting}>
          {isSubmitting ? "Invio in corso..." : "Prenota un posto"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
