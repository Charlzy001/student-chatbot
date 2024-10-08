// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           {/* Get started by editing&nbsp; */}
//           {/* <code className="font-mono font-bold">src/app/page.tsx</code> */}
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{" "}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="text-center w-full flex items-center justify-center">
//         <a
//           href="/query"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Chat{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Move to Chat
//           </p>
//         </a>

//       </div>

     
//     </main>
//   );
// }
// "use client";
// import EvaluationComponent from "./EvaluationComponent"; // Adjust the path if necessary

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-cover bg=center"
      style={{ backgroundImage: 'url("images/8.jpg")' }} // Add your background image here 
      >
      {/* Top Section: University Logo and Welcome Message */}
      <div className="text-center w-full flex flex-col items-center justify-center mb-10">
        <Image
          src="/smalllogo.png" // Replace with your actual university logo image path
          alt="University Logo"
          width={170}
          height={170}
          priority
          className="mb-5"
        />
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to the Adekunle Ajasin University Student Registration Bot
        </h1>
        {/* <EvaluationComponent /> Add the evaluation component here */}
        <p className="text-lg text-black-700 mb-6 max-w-3xl">
          Our AI-powered bot is here to assist you with your student registration journey! Get help with course registration, login issues, hostel bookings, and more.
        </p>
        <p className="text-md text-black-600 mb-8 max-w-2xl">
          Click the button below to chat with the bot and get immediate assistance for all your registration-related queries.
        </p>
      </div>

      {/* Get Started Button */}
      <div className="text-center w-full flex items-center justify-center">
        <a
          href="/query"  // The path to your chat page
          className="group rounded-lg border border-transparent px-6 py-4 bg-blue-500 text-white transition-colors hover:border-blue-600 hover:bg-blue-600"
        >
          <h2 className={`text-2xl font-semibold`}>
            Get Started
            {/* <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span> */}
          </h2>
          {/* <p className={`m-0 max-w-[30ch] text-sm`}>
            Move to Chat
          </p> */}
        </a>
      </div>

      {/* Footer: Vercel Link (Optional) */}
      <div className="fixed bottom-0 left-0 w-full items-end justify-center flex bg-gradient-to-t from-white via-white dark:from-black dark:via-black p-4">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-none lg:pointer-events-auto"
        >
         {/* by{" "}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          /> */}
        </a>
      </div>
    </main>
  );
}
