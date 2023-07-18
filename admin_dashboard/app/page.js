import { useSession, signIn, signOut } from "next-auth/react"
import RootLayout from "./layout.js"


export default function Home() {
  // const { data: session } = useSession()
  
  // if (!session) {
    return (
        <div className="bg-blue-200 w-screen h-screen flex items-center">HERE
          {/* // <div className="text-center w-full">
          //   <button className='bg-white p-2 rounded-lg px-4' onClick={signIn}>Login</button>
          // </div> */}
        </div>
    );
  // }
  // return (
  //   <div className="bg-blue-200 w-screen h-screen flex items-center">
  //     <div className="text-center w-full">
  //       <button className='bg-white p-2 rounded-lg px-4' onClick={signOut}>Logout</button>
  //     </div>
  //   </div>
  // );
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

