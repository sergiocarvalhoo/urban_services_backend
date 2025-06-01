/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'documentValidator', async: false })
export class DocumentValidator implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments) {
    return cpf.isValid(value) || cnpj.isValid(value);
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Documento inválido: informe um CPF ou CNPJ válido';
  }
}
