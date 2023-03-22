import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/pokemon");
    }
  }, [router]);

  return <></>;
};

export default Home;
