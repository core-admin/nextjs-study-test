import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-5">
      <h1 className="text-4xl font-black">Home Page black</h1>
      <h1 className="text-4xl font-extrabold">Home Page extrabold</h1>
      <h1 className="text-4xl font-bold">Home Page bold</h1>
      <h1 className="text-4xl font-semibold">Home Page semibold</h1>
      <h2 className="text-3xl font-medium">Home Page medium</h2>
      <h3 className="text-2xl font-medium">Home Page medium</h3>
      <h4 className="text-xl font-normal">Home Page normal</h4>
      <h5 className="text-lg font-light">Home Page light</h5>
      <span className="text-base font-thin">Home Page thin</span>

      <div className="bg-slate-400 border-t"></div>

      <h1 className="text-4xl font-black"></h1>
      <h1 className="text-4xl font-extrabold">
        落霞与孤鹜齐飞，秋水共长天一色。 <span className="text-red-500 font-inter">Home Page</span>
      </h1>
      <h1 className="text-4xl">
        落霞与孤鹜齐飞，秋水共长天一色。{' '}
        <span className="text-red-500 font-lxgw-wen-kai-regular">Home Page</span>
      </h1>
      <h1 className="text-4xl font-bold">
        落霞与孤鹜齐飞，秋水共长天一色。 <span className="text-red-500 font-light">Home Page</span>
      </h1>
      <h1 className="text-4xl font-semibold">落霞与孤鹜齐飞，秋水共长天一色。</h1>
      <h2 className="text-3xl font-medium">落霞与孤鹜齐飞，秋水共长天一色。</h2>
      <h3 className="text-2xl font-medium">落霞与孤鹜齐飞，秋水共长天一色。 medium</h3>
      <h4 className="text-xl font-normal">落霞与孤鹜齐飞，秋水共长天一色。 normal</h4>
      <h5 className="text-lg font-light">落霞与孤鹜齐飞，秋水共长天一色。 light</h5>
      <span className="text-base font-thin">落霞与孤鹜齐飞，秋水共长天一色。 thin</span>
    </main>
  );
}
