import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { createSeller } from '@/api/create-seller';
import { uploadFile } from '@/api/upload-file';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ArrowRight02Icon from '@/icons/arrow-right-02-stroke-rounded';

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
    avatarId: z.string().optional(),
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

  const navigate = useNavigate();

  const { mutateAsync: createSellerFn, isPending: isCreating } = useMutation({ mutationFn: createSeller });

  const { mutateAsync: uploadFileFn } = useMutation({ mutationFn: uploadFile });

  async function handleSignUp(data: SignUpForm) {
    try {
      if (data.file.length && data.file.length > 0) {
        const { data: uploadedFile } = await uploadFileFn(data.file[0]);

        data.avatarId = uploadedFile.attachments[0].id;

        if (data.avatarId) {
          await createSellerFn({
            name: data.name,
            phone: data.phone,
            email: data.email,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation,
            avatarId: data.avatarId,
          });
        }
      }

      toast.success('Conta criada com sucesso', {
        action: {
          label: 'Acessar',
          onClick: () => navigate('/sign-in'),
        },
      });
    } catch (error) {
      console.log(error);
      toast.error('Erro ao criar conta');
    }
  }

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-white px-16 py-20">
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

          <Button type="submit" disabled={isSubmitting || isCreating} className="flex w-full justify-between text-base" size="lg">
            Cadastrar
            <ArrowRight02Icon className="h-6 w-6 text-white" />
          </Button>
        </form>

        <div className="pt-10">
          <h2>Já tem uma conta?</h2>
          <Button
            onClick={handleSignIn}
            className="flex w-full justify-between border border-orange-500 bg-white text-base text-orange-500"
            size="lg"
            variant="secondary"
            type="button"
          >
            Acessar
            <ArrowRight02Icon className="h-6 w-6 text-orange-500" />
          </Button>
        </div>
      </div>
    </>
  );
}
