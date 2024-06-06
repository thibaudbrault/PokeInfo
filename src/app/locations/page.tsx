"use client"

import { useEffect, useState } from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import { errorToast, Loader } from '@/components';
import { Heading, List } from '@/modules/locations';
import { BASE_URL, getMultiple, Limit, QueryKeys, regions } from '@/utils';

import type { IRegion } from '@/types';

const RegionsMethod = dynamic(() =>
  import(`@/utils`).then((res) => res.RegionsMethod),
);

function LocationsPage() {
  const [location, setLocation] = useState<string | null>(null);
  const [toggle, setToggle] = useState<number>(0);
  const {
    isLoading,
    isError,
    error,
    data: locations,
  }: UseQueryResult<IRegion[], Error> = useQuery({
    queryKey: [QueryKeys.REGIONS],
    queryFn: () => getMultiple(`${BASE_URL}/region?limit=${Limit.REGIONS}`),
  });

  useEffect(() => {
    setLocation(regions[toggle + 1]);
  }, [toggle]);

  if (isError && error instanceof Error) {
    errorToast(error.message, `regions`);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <Tabs.Root className="TabsRootMain" defaultValue={String(toggle)}>
        <RegionsMethod setToggle={setToggle} />
        <Tabs.Content value={String(toggle)}>
          <List location={location} locations={locations} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}

export default LocationsPage;
