import { getProviders, signIn } from "next-auth/react";
import { useEffect } from "react";
import styles from "../../styles/auth.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default function SignIn({ providers }) {
  const router = useRouter();
  const session = useSession();

  useEffect(
    () => {
      if (session.status === "authenticated") {
        console.log("Session detected, pushing to dashboard.");
        router.push("/juicebox");
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [session]
  );

  return (
    <>
      <div className={styles.signInContainer}>
        <h3>Twitch account required</h3>
        <p>
          At the moment, our choice of platform is Twitch, though we will
          integrate more streaming platforms in the future.
        </p>
        <div className={styles.buttonsContainer}>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
