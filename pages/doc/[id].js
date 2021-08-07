import { getSession, useSession } from "next-auth/client";
import Login from "../../components/Login";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Button from "@material-tailwind/react/Button";
import TextEditer from "../../components/TextEditer";
const Doc = () => {
  const [session] = useSession();
  if (!session) return <Login />;
  const router = useRouter();
  const { id } = router.query;
  const [snapshot, looadingSnapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
  );

  if (!looadingSnapshot && !snapshot?.data()?.fileName) {
    router.replace("/");
  }
  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          <Icon name="description" size="5xl" color="blue" />
        </span>

        <div className=" flex-grow px-2">
          <h2>{snapshot?.data()?.fileName}</h2>
          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>
        <Button
          color="lightBlue"
          buttonType="fillted"
          iconOnly={true}
          block={false}
          iconOnly={false}
          ripple="dark"
          className="hidden sm:inline-flex h-10"
        >
          <Icon name="people" size="md" />
          Share
        </Button>
        <img
          src={session.user.image}
          className=" h-10 w-10 ml-2 cursor-pointer rounded-full"
        />
      </header>
      <TextEditer />
    </div>
  );
};

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
