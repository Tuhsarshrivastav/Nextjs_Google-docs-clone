import { useSession } from "next-auth/client";
import Login from "../../components/Login";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/router";
const Doc = () => {
  const [session] = useSession();
  const router = useRouter();
  if (!session) return <Login />;
  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          <Icon name="description" size="5xl" color="blue" />
        </span>
      </header>
    </div>
  );
};

export default Doc;
