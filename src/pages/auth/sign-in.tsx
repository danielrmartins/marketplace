import { Helmet } from 'react-helmet-async';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SignIn() {
  return (
    <>
      <Helmet title="Login" />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Crie sua conta</h1>
        <p>Informe os seus dados pessoais e de acesso</p>
        <p>Perfil</p>
        <form className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">E-MAIL</Label>
            <Input id="email" type="email" placeholder="Seu e-mail cadastrado" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">SENHA</Label>
            <Input id="password" type="password" placeholder="Sua senha de acesso" />
          </div>

          <Button className="w-full" type="submit">
            Acessar
          </Button>
        </form>
      </div>
    </>
  );
}
