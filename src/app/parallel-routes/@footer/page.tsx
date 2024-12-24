export default async function FooterPage() {
  // const now = Date.now() + 3000;
  // while (now > Date.now()) {}

  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });

  // 故意抛出一个错误
  throw new Error('/parallel-routes @footer page.tsx error');

  return <h1 className="text-2xl text-center">@footer page.tsx content</h1>;
}
