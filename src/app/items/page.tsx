"use client"

import * as Tabs from '@radix-ui/react-tabs';

import { Loader, errorToast } from '@/components';
import { Berries, Heading, Items, useItemsQuery } from '@/modules/items';

function ItemsPage() {
  const { itemsStatus, berries, berriesStatus } = useItemsQuery();

  if (itemsStatus === `error` || berriesStatus === `error`) {
    errorToast(undefined, `item`);
  }

  if (itemsStatus === `loading` || berriesStatus === `loading`) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <Tabs.Root className="TabsRootMain" defaultValue="tab1">
        <Tabs.List
          className="TabsList"
          aria-label="Switch between items and berries"
        >
          <Tabs.Trigger value="tab1" className="TabsTrigger">
            Items
          </Tabs.Trigger>
          <Tabs.Trigger value="tab2" className="TabsTrigger">
            Berries
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
          <Items />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          <Berries berries={berries} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}

export default ItemsPage;
