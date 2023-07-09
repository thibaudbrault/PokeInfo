import { Loader } from '@/components';
import { Heading, Moves, Stats, Status, useMovesQuery } from '@/modules/moves';
import * as Tabs from '@radix-ui/react-tabs';
import toast from 'react-hot-toast';

function MovesPage() {
  const { moves, status, stats } = useMovesQuery();

  if (
    moves.status === `error` ||
    status.status === `error` ||
    stats.status === `error`
  ) {
    return toast.error(`Something went wrong`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
  }

  if (
    moves.status === `loading` ||
    status.status === `loading` ||
    stats.status === `loading`
  ) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <Tabs.Root className="TabsRootMain" defaultValue="tab1">
        <Tabs.List
          className="TabsList"
          aria-label="Switch between moves, status and stats"
        >
          <Tabs.Trigger value="tab1" className="TabsTrigger">
            Moves
          </Tabs.Trigger>
          <Tabs.Trigger value="tab2" className="TabsTrigger">
            Status
          </Tabs.Trigger>
          <Tabs.Trigger value="tab3" className="TabsTrigger">
            Stats
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
          <Moves moves={moves.data} />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          <Status status={status.data} />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab3">
          <Stats stats={stats.data} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}

export default MovesPage;
