import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { signIn } from '@/api/sign-in';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ArrowRight02Icon from '@/icons/arrow-right-02-stroke-rounded';

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

  const navigate = useNavigate();

  const { mutateAsync: authenticate } = useMutation({ mutationFn: signIn });

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate(data);

      navigate('/');
    } catch (error) {
      toast.error('E-mail ou senha inválidos');
    }
  }

  function handleSignUp() {
    navigate('/sign-up');
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-white px-16 py-20">
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
            <Button className="flex w-full justify-between text-base" size="lg" disabled={isSubmitting} type="submit">
              Acessar
              <ArrowRight02Icon className="h-6 w-6 text-white" />
            </Button>
          </form>
        </div>
        <div>
          <h2 className="pb-2 text-base tracking-tight">Ainda não tem uma conta?</h2>
          <Button
            variant="secondary"
            className="flex w-full justify-between border border-orange-500 bg-white text-base text-orange-500"
            size="lg"
            type="button"
            onClick={handleSignUp}
          >
            Cadastrar
            <ArrowRight02Icon className="h-6 w-6 text-orange-500" />
          </Button>
        </div>
      </div>
    </>
  );
}
