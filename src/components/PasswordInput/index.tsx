import { UseFormRegister, FieldValues, Path } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { passwordValidationRules } from "@/helpers/validators/passwordValidator";

import { cn } from "@/lib/utils";

interface PasswordInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  error?: string;
  name: Path<T>;
}
/**
 * Reusable PasswordInput component for rendering a password input field
 * with integrated validation and error display.
 *
 * @template T Field values for the form (ensures strong typing for form inputs).
 * @param {UseFormRegister<T>} register - The register function for the form.
 * @param {string | undefined} error - Error message to display if validation fails.
 * @param {Path<T>} name - The name of the field to register.
 * @returns {JSX.Element} The rendered password input field.
 */
const PasswordInput = <T extends FieldValues>(props: PasswordInputProps<T>): JSX.Element => {
  const { register, error, name } = props;
  return (
    <div className="grid gap-1 py-2">
      <Label htmlFor="password">Contraseña</Label>
      <Input
        {...register(name, passwordValidationRules)}
        type="password"
        className={cn({"focus-visible:ring-red-500": error})}
        placeholder="Contraseña"
        autoComplete="current-password"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordInput;
