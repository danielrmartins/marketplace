import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { ButtonWithIcon } from '@/components/button-with-icon/button-with-icon';
import { Input } from '@/components/ui/input';

const ACCEPTED_IMAGE_TYPES = ['image/png'];

const signUpForm = z
  .object({
    name: z.string().min(3),
    phone: z
      .string()
      .min(11, 'telefone inválido')
      .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'telefone inválido'),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
    file: z
      .custom<FileList>()
      .refine((files) => {
        return Array.from(files ?? []).length !== 0;
      }, 'Selecione uma imagem.')
      .refine((files) => {
        return Array.from(files ?? []).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
      }, 'Tipo de arquivo precisar ser PNG.'),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      console.log('senhas não conferem');
      ctx.addIssue({
        code: 'custom',
        message: 'senhas não conferem',
        path: ['passwordConfirmation'],
      });
    }
    return true;
  });

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpForm), reValidateMode: 'onSubmit' });

  async function handleSignUp(data: SignUpForm) {
    console.log(data);
    console.log(errors.root);
  }

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <>
      <Helmet title="Cadastro" />
      <div className="flex h-full w-full flex-col justify-between rounded-3xl border px-16 py-20">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Crie sua conta</h1>
          <p>Informe os seus dados pessoais e de acesso</p>
        </div>
        <form className="gap-2 space-y-8" onSubmit={handleSubmit(handleSignUp)}>
          <div>
            <p className="py-6 text-xl font-semibold tracking-tight">Perfil</p>
            <input id="file" type="file" accept="image/png" {...register('file')} />
            {errors.file && <span className="text-xs text-red-500">{errors.file.message}</span>}
          </div>
          <div>
            <Input id="name" inputMode="tel" type="text" placeholder="Seu nome completo" icon="user" label="nome" {...register('name')} />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>
          <div>
            <Input id="phone" type="tel" placeholder="(00) 00000-0000" icon="phone" label="telefone" {...register('phone')} />
            {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
          </div>

          <div>
            <p className="pb-8 text-xl font-semibold tracking-tight">Acesso</p>
            <Input id="email" type="email" placeholder="Seu nome completo" icon="email" label="email" {...register('email')} />
            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
          </div>
          <div>
            <Input id="password" type="password" placeholder="Senha de acesso" icon="password" label="senha" {...register('password')} />
            {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
          </div>
          <div>
            <Input
              id="passwordConfirmation"
              type="password"
              placeholder="Confirme a senha"
              icon="password"
              label="senha"
              {...register('passwordConfirmation')}
            />
            {errors.passwordConfirmation && <span className="text-xs text-red-500">{errors.passwordConfirmation.message}</span>}
          </div>

          <ButtonWithIcon
            type="submit"
            text="Cadastrar"
            disabled={isSubmitting}
            className="flex w-full justify-between text-base"
            size="lg"
            iconColor="text-white"
          />
        </form>

        <div className="pt-10">
          <h2>Já tem uma conta?</h2>
          <Link to="/sign-in">
            <ButtonWithIcon
              className="flex w-full justify-between border border-orange-500 bg-white text-base text-orange-500"
              size="lg"
              variant="secondary"
              type="button"
              text="Acessar"
              iconColor="text-orange-500"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
