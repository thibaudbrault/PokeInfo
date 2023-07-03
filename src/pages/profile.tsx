import { auth, db } from '@/firebase-config';
import styles from '@/modules/profile/Profile.module.scss';
import { capitalize, removeDash } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  DocumentData,
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
});

type FormInput = yup.Asserts<typeof schema>;

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<DocumentData | undefined>();

  const getUserDoc = async () => {
    if (auth.currentUser) {
      const usersCollectionRef = doc(db, `users`, auth.currentUser.uid);
      const docSnap = await getDoc(usersCollectionRef);
      setUser(docSnap.data());
    }
  };

  const releaseHandler = async (name: string, img: string) => {
    if (auth.currentUser) {
      try {
        const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
        await updateDoc(usersCollectionRef, {
          caught: arrayRemove({
            0: name,
            1: img,
          }),
        });
        toast.success(`You released ${capitalize(name)}`, {
          style: {
            fontSize: `1.7rem`,
          },
        });
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message, {
            style: {
              fontSize: `1.7rem`,
            },
          });
        }
      }
    }
  };

  const { register, handleSubmit, reset, formState } = useForm<FormInput>({
    resolver: yupResolver<FormInput>(schema),
    defaultValues: {
      username: ``,
      email: ``,
    },
  });

  const submitForm = async (data: FormInput) => {
    try {
      if (auth.currentUser) {
        const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
        await updateDoc(usersCollectionRef, {
          name: data.username !== `` ? data.username : user?.name,
          email: data.email !== `` ? data.email : user?.email,
        });
        toast.success(`Your profile is modified`, {
          style: {
            fontSize: `1.7rem`,
          },
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          style: {
            fontSize: `1.7rem`,
          },
        });
      }
    }
  };

  const _deleteAccount = async () => {
    if (auth.currentUser) {
      try {
        const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
        await deleteDoc(usersCollectionRef);
        await auth.currentUser.delete();
        toast.success(`Congrats 🎉! Your account is now created`, {
          style: {
            fontSize: `1.7rem`,
          },
        });
        router.push(`/`);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message, {
            style: {
              fontSize: `1.7rem`,
            },
          });
        }
      }
    }
  };

  useEffect(() => {
    if (!auth.currentUser) {
      router.push(`/`);
    } else {
      getUserDoc();
      const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
      const unsubscribe = onSnapshot(usersCollectionRef, (doc) => {
        setUser(doc.data());
      });
      return () => {
        unsubscribe();
      };
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    user && (
      <main className="mainBig">
        <section className="section">
          <h2 className="leftH2">{user.name}'s caught pokémon</h2>
          <h4 className="leftSubtitle">
            You caught {user.caught.length} / 1010 Pokémon
          </h4>
          <ul className={styles.caught}>
            {user?.caught.map((p: string[], index: number) => (
              <li key={p[index]}>
                <Image src={p[1]} alt="" width={96} height={96} />
                <Link
                  href={{
                    pathname: `/pokemon/[name]`,
                    query: { name: p[0] },
                  }}
                >
                  {removeDash(p[0])}
                </Link>
                <button onClick={() => releaseHandler(p[0], p[1])}>
                  Release
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className="section">
          <details className={styles.details}>
            <summary>Modify your profile</summary>
            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
              <div className="input">
                <label htmlFor="username">Your trainer name</label>
                <input
                  type="text"
                  id="username"
                  placeholder={user.name}
                  {...register(`username`)}
                />
              </div>
              <div className="input">
                <label htmlFor="email">Your email</label>
                <input
                  type="text"
                  id="email"
                  placeholder={user.email}
                  {...register(`email`)}
                />
              </div>
              <button type="submit">Update</button>
            </form>
          </details>
        </section>
      </main>
    )
  );
}

export default Profile;
