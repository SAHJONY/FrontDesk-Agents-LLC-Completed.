import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'url';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  autoComplete?: string;
  disabled?: boolean;
  className?: string;
}

export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder,
  helpText,
  autoComplete,
  disabled = false,
  className = '',
}: FormInputProps) {
  const inputId = `input-${name}`;
  const errorId = `${inputId}-error`;
  const helpId = `${inputId}-help`;

  return (
    <div className={className}>
      <label 
        htmlFor={inputId} 
        className="block text-sm font-medium text-slate-300 mb-2"
      >
        {label}
        {required && (
          <span className="text-red-400 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={
          error ? errorId : helpText ? helpId : undefined
        }
        className={`w-full bg-slate-900 border ${
          error ? 'border-red-500' : 'border-slate-700'
        } rounded-lg px-4 py-3 text-white placeholder-slate-500 
        focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
        disabled:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50
        transition-colors`}
      />
      
      {error && (
        <p 
          id={errorId} 
          className="mt-1 text-sm text-red-400" 
          role="alert"
        >
          {error}
        </p>
      )}
      
      {!error && helpText && (
        <p 
          id={helpId} 
          className="mt-1 text-sm text-slate-400"
        >
          {helpText}
        </p>
      )}
    </div>
  );
}
