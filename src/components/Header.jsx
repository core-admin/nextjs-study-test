import { signIn, signOut, auth } from '@/auth';
import Link from 'next/link';

function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <button type="submit">使用 GitHub 登录</button>
    </form>
  );
}

function SignOut(props = {}) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({
          // redirectTo: '/',
          // redirect: true,
        });
      }}
    >
      <button {...props} type="submit">
        退出登录
      </button>
    </form>
  );
}

export default async function Header() {
  const session = await auth();
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '16px',
      }}
    >
      <Link href="/client">客户端组件</Link>

      {session?.user ? (
        <>
          <span>{session.user.name}</span>
          <SignOut />
        </>
      ) : (
        <SignIn />
      )}
    </header>
  );
}

/*

login >>>

decodeURIComponent(
  decodeURIComponent(
    'https://github.com/login?client_id=Ov23liFTtW4Z1nvY7Y34&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3DOv23liFTtW4Z1nvY7Y34%26code_challenge%3Du35hcVAw0QitUndjKBQu1n4-pWPMlxOZsonl_FBLS7U%26code_challenge_method%3DS256%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Fapi%252Fauth%252Fcallback%252Fgithub%26response_type%3Dcode%26scope%3Dread%253Auser%2Buser%253Aemail'
  )
)

https://github.com/login
  ?client_id=Ov23liFTtW4Z1nvY7Y34
  &return_to=/login/oauth/authorize
    ?client_id=Ov23liFTtW4Z1nvY7Y34
      &
      code_challenge=u35hcVAw0QitUndjKBQu1n4-pWPMlxOZsonl_FBLS7U
      &
      code_challenge_method=S256
      &
      redirect_uri=http://localhost:3000/api/auth/callback/github&response_type=code&scope=read:user+user:email



  /api/auth/callback/github?code=c5feed43d33161c51f06
*/
