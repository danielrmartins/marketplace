import { Helmet } from 'react-helmet-async';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SignUp() {
  return (
    <>
      <Helmet title="Cadastro" />
      <div>
        <h1>Crie sua conta</h1>
        <p>Informe os seus dados pessoais e de acesso</p>
        <p>Perfil</p>
        <form className="space-y-4">
          <input id="avatar" type="file" accept="image/png, image/jpeg" />
          <div className="space-y-2">
            <Label htmlFor="name">NOME</Label>
            <Input id="name" type="text" placeholder="Seu nome completo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">TELEFONE</Label>
            <Input id="phone" type="tel" placeholder="(00) 00000-0000" />
          </div>

          <p>Acesso</p>

          <div className="space-y-2">
            <Label htmlFor="email">E-MAIL</Label>
            <Input id="email" type="email" placeholder="Seu nome completo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">SENHA</Label>
            <Input id="password" type="password" placeholder="Senha de acesso" />
          </div>

          <Button className="w-full" type="submit">
            Cadastrar
          </Button>
        </form>
      </div>
    </>
  );
}
