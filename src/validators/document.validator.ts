/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'documentValidator', async: false })
export class DocumentValidator implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments) {
    return cpf.isValid(value) || cnpj.isValid(value);
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Documento inválido: informe um CPF ou CNPJ válido';
  }
}
