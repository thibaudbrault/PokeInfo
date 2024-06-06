import { useCallback, useMemo } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { useTableParams } from '@/hooks';
import {
  IEncounter,
  IEncounterConditionValue,
  IEncounterMethod,
  ILocationArea,
  IName,
  IPokemonEncounter,
} from '@/types';
import { removeDash } from '@/utils';

import styles from '../../Locations.module.scss';

type Props = {
  area: ILocationArea;
  encounter?: IEncounterConditionValue[];
  method?: IEncounterMethod[];
  game?: string;
};

export function Area({ area, encounter, method, game }: Props) {
  const filteredArea = useMemo(() => {
    return area?.pokemon_encounters
      .map((a) => {
        const version_details = a.version_details.filter(
          (av) => av.version.name === game,
        );
        return {
          ...a,
          version_details,
        };
      })
      .filter((a) => a.version_details.length);
  }, [area, game]);

  const filteredEncounter = useCallback(
    (condition: string) => {
      return encounter?.find(
        (e: IEncounterConditionValue) => e.name === condition,
      );
    },
    [encounter],
  );

  const filteredMethod = useCallback(
    (condition: string) => {
      return method?.find((m: IEncounterMethod) => m.name === condition);
    },
    [method],
  );

  const data = useMemo(() => filteredArea, [filteredArea]);

  const columns = useMemo<ColumnDef<IPokemonEncounter>[]>(
    () => [
      {
        accessorKey: `pokemon.name`,
        id: `sort`,
        header: `Pokemon`,
        cell: (info) => (
          <td className="tBold">
            <Link
              className="tLink"
              href={`/pokemon/${info.getValue()}`}
            >
              {removeDash(info.getValue<string>())}
            </Link>
          </td>
        ),
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: `level`,
        header: `Level`,
        cell: (info) => (
          <td>
            {info.getValue<IEncounter[]>().map((i) => (
              <p key={uuidv4()}>{i.max_level}</p>
            ))}
          </td>
        ),
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: `chance`,
        header: `Probability`,
        cell: (info) => (
          <td>
            {info.getValue<IEncounter[]>().map((i) => (
              <p key={uuidv4()}>{i.chance} %</p>
            ))}
          </td>
        ),
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: `method`,
        header: `Method`,
        cell: (info) => (
          <td>
            {info.getValue<IEncounter[]>().map((i) => (
              <p key={uuidv4()}>
                {
                  filteredMethod(i.method.name)?.names.find(
                    (en: IName) => en.language.name === `en`,
                  )?.name
                }
              </p>
            ))}
          </td>
        ),
      },
      {
        accessorFn: (row) => row.version_details[0].encounter_details,
        id: `condition`,
        header: `Condition`,
        cell: (info) => (
          <td>
            {info.getValue<IEncounter[]>().map((i) =>
              i.condition_values.length > 1 ? (
                <p key={uuidv4()}>
                  {i.condition_values.map((icv) => (
                    <span key={uuidv4()}>
                      {
                        filteredEncounter(icv.name)?.names.find(
                          (en: IName) => en.language.name === `en`,
                        )?.name
                      }
                    </span>
                  ))}
                </p>
              ) : i.condition_values.length === 1 ? (
                <p>
                  {
                    filteredEncounter(i.condition_values[0].name)?.names.find(
                      (en: IName) => en.language.name === `en`,
                    )?.name
                  }
                </p>
              ) : (
                <p key={uuidv4()}>-</p>
              ),
            )}
          </td>
        ),
      },
    ],
    [filteredEncounter, filteredMethod],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  return (
    <section className="section">
      <div className="tableContainer" ref={tableContainerRef}>
        <table className={styles.table}>
          {tableHeader()}
          {tableBody()}
          <tfoot>
            <tr>
              <td colSpan={5}>This area is not present in this game</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
