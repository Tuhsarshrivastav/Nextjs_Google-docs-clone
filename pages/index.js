import Head from "next/head";
import Header from "../components/Header";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from "next/image";
import { getSession, useSession } from "next-auth/client";
import Login from "../components/Login";
import Model from "@material-tailwind/react/Modal";
import Modelbody from "@material-tailwind/react/ModalBody";
import ModelFooter from "@material-tailwind/react/ModalFooter";
import { useState } from "react";
export default function Home() {
  const [session] = useSession();
  const [showModel, setShowmodel] = useState(false);
  const [input, setInput] = useState("");

  if (!session) return <Login />;

  const model = (
    <Model size="sm" active={showModel} toggler={() => setShowmodel(false)}>
      <Modelbody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of document"
        />
      </Modelbody>
      <ModelFooter>
        <Button
          onClick={() => setShowmodel(false)}
          color="blue"
          buttonType="link"
          ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" ripple="light">
          Create
        </Button>
      </ModelFooter>
    </Model>
  );

  return (
    <div>
      <Head>
        <title>Google-Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {model}
      <section className="bg-[#f8f9fa] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center py-6 justify-between">
            <h2
              className="to-gray-700
            text-lg"
            >
              Start a new document
            </h2>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>

          <div>
            <div
              onClick={() => setShowmodel(true)}
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow ">My Document</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
