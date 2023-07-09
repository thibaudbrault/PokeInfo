import { Button, ErrorToast, Loader, Separator } from '@/components';
import { Data, Heading, List, Nav, useFetchMove } from '@/modules/moves/move';
import styles from '@/modules/moves/move/Move.module.scss';
import { removeDash } from '@/utils';
import { FaChevronLeft } from '@meronex/icons/fa';
import * as Tabs from '@radix-ui/react-tabs';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';

const LearnMethod = dynamic(() =>
  import(`@/utils`).then((res) => res.LearnMethod),
);

type Props = {
  name: string;
};

function MoveCard({ name }: Props) {
  const [_learn, setLearn] = useState<string>(`level-up`);

  const {
    move,
    isLoading,
    isError,
    error,
    pokemon,
    status,
    machine,
    version,
    setVersion,
    toggle,
    setToggle,
  } = useFetchMove(name);

  if (isError) {
    return <ErrorToast error={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading name={name} />
      {move && (
        <main className={styles.main}>
          <h2 className="pageTitle">{removeDash(move.name)}</h2>
          <h4 className="subtitle">{removeDash(move.generation.name)}</h4>

          <Nav move={move} setVersion={setVersion} />

          <Data move={move} machine={machine} version={version} />

          <Separator />
          <Tabs.Root className="TabsRootSection" defaultValue={String(toggle)}>
            <LearnMethod setToggle={setToggle} setLearn={setLearn} />
          </Tabs.Root>

          <List
            pokemon={pokemon}
            toggle={toggle}
            status={status}
            moveName={move.name}
            version={version}
          />

          <Button intent="back" asChild>
            <Link href="/moves">
              <FaChevronLeft />
              Back to Moves
            </Link>
          </Button>
        </main>
      )}
    </>
  );
}

export default MoveCard;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
}
