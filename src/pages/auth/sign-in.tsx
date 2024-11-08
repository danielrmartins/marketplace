import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { ButtonWithIcon } from '@/components/button-with-icon/button-with-icon';
import { Input } from '@/components/ui/input';

const signInForm = z.object({
  email: z.string().email({ message: 'email inválido' }),
  password: z.string().min(6, 'mínimo 6 caracteres'),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({ resolver: zodResolver(signInForm) });

  async function handleSignIn(data: SignInForm) {
    console.log(data);
    console.log(errors);
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="flex h-full w-full flex-col justify-between rounded-3xl border px-16 py-20">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Acesse sua conta</h1>
          <p>Informe seu e-mail e senha para entrar</p>
        </div>
        <div>
          <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
            <div>
              <Input id="email" type="email" placeholder="Seu e-mail cadastrado" icon="email" label="email" {...register('email')} />
              {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
            </div>
            <div>
              <Input id="password" type="password" placeholder="Sua senha de acesso" icon="password" label="senha" {...register('password')} />
              {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
            </div>
            <ButtonWithIcon
              type="submit"
              text="Acessar"
              disabled={isSubmitting}
              className="flex w-full justify-between text-base"
              size="lg"
              iconColor="text-white"
            />
          </form>
        </div>
        <div>
          <h2 className="pb-2 text-base tracking-tight">Ainda não tem uma conta?</h2>
          <Link to="/sign-up">
            <ButtonWithIcon
              className="flex w-full justify-between border border-orange-500 bg-white text-base text-orange-500"
              size="lg"
              variant="secondary"
              type="button"
              text="Cadastrar"
              iconColor="text-orange-500"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
