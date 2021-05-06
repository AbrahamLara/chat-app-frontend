export enum ErrorPayloadType {
  REGISTER = 'register',
  LOGIN = 'login',
}

/**
 * An alert message object.
 */
export interface AlertMessage {
  /**
   * The message to display.
   */
  message: string;
}

/**
 * Describes an alert banner that displays messages for the user to see on a page.
 */
export interface AlertBarOptions extends AlertMessage {
  /**
   * Determines if the banner should be visible.
   */
  visible: boolean;

  /**
   * The type of alert.
   */
  type: string;
}

/**
 * Describes an error message for an invalid form field value.
 */
export interface FormAlertMessage extends AlertMessage {
  /**
   * The form field the error message is for. This may not to be provided if a form error wasn't due to an invalid field
   * value.
   */
  field?: string;
}

/**
 * Describes the payload to return for a failed request.
 */
export interface ErrorPayload {
  /**
   * The error type.
   *
   * Note: This might not actually be needed.
   */
  type: ErrorPayloadType;

  /**
   * The error messages produced. Right now the backend only serves form errors.
   */
  errors: FormAlertMessage[];
}

export const DEFAULT_ALERT_BAR_OPTIONS: AlertBarOptions = {
  visible: false,
  type: '',
  message: '',
};

/**
 * Determines if the give value is an error response object sent from a server request.
 */
export function isFormErrorMessage(response: any) {
  return typeof response === 'object' && response.type && response.errors;
}

/**
 * Creates a generic message object to display as an alert.
 */
export function createAlertMessage(message: string): AlertMessage {
  return { message };
}
