import { FaChevronRight } from '@meronex/icons/fa';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { SmallLoader, errorToast } from '@/components';
import { getAllEvo, QueryKeys, removeDash } from '@/utils';

import styles from './Evolution.module.scss';

import type { IEvolutionChain, IPokemon } from '@/types';

type Props = {
  evolution: IEvolutionChain;
  name: string;
};

export function Evolution({ evolution, name }: Props) {
  const {
    isLoading,
    isError,
    error,
    data: evo,
  }: UseQueryResult<IPokemon[], Error> = useQuery({
    queryKey: [QueryKeys.EVOLUTIONS, name, evolution],
    queryFn: () => getAllEvo(evolution),
    enabled: !!evolution,
  });

  if (isError && error instanceof Error) {
    errorToast(error.message, `evolution`);
  }

  if (isLoading) {
    return <SmallLoader />;
  }

  return (
    <section className={styles.section} id="evolution">
      <h3 className="h3">Evolution chain</h3>
      <div className={styles.container}>
        <div className={styles.base}>
          <div>
            <>
              {evo?.map(
                (e: IPokemon) =>
                  e?.name === evolution?.chain?.species?.name && (
                    <Image
                      key={e.name}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.id}.png`}
                      alt=""
                      width={96}
                      height={96}
                    />
                  ),
              )}
              <Link
                href={`/pokemon/${evolution?.chain?.species?.name}`}
              >
                {removeDash(evolution?.chain?.species?.name)}
              </Link>
            </>
          </div>
        </div>
        {evolution?.chain?.evolves_to?.length !== 0 && (
          <div className={styles.evolution}>
            <div className={styles.stage}>
              {evolution?.chain?.evolves_to?.map((ee) => (
                <div
                  className={styles.element}
                  key={evolution?.chain?.species?.name}
                >
                  <div>
                    {ee?.evolution_details?.map((eed) => (
                      <>
                        {eed.gender &&
                          (eed.gender === 1 ? (
                            <p className={styles.text}>
                              <span> Female</span>
                            </p>
                          ) : (
                            <p className={styles.text}>
                              <span> Male</span>
                            </p>
                          ))}
                        {eed.trigger.name === `trade` && !eed.held_item && (
                          <p className={styles.text}>Trade</p>
                        )}
                        {eed.held_item && eed.trigger.name === `trade` && (
                          <p className={styles.text}>
                            Trade holding
                            <span>
                              {` `}
                              {removeDash(eed.held_item.name)}
                            </span>
                          </p>
                        )}
                        {eed.held_item && eed.trigger.name === `level-up` && (
                          <p className={styles.text}>
                            Level up holding{` `}
                            <span>
                              {` `}
                              {removeDash(eed.held_item.name)}
                            </span>
                            {` `}
                            during the <span> {eed.time_of_day}</span>
                          </p>
                        )}
                        {eed.item && (
                          <p className={styles.text}>
                            Use{` `}
                            <span> {removeDash(eed.item.name)}</span>
                          </p>
                        )}
                        {eed.known_move && (
                          <p className={styles.text}>
                            Learn{` `}
                            <span>
                              {` `}
                              {removeDash(eed.known_move.name)}
                            </span>
                          </p>
                        )}
                        {eed.known_move_type && eed.min_affection && (
                          <p className={styles.text}>
                            Level up with{` `}
                            <span> {eed.min_affection}+ affection</span>
                            {` `}
                            while knowing a{` `}
                            <span>
                              {` `}
                              {removeDash(eed.known_move_type.name)}
                            </span>
                            {` `}
                            type move
                          </p>
                        )}
                        {eed.known_move_type && eed.min_happiness && (
                          <p className={styles.text}>
                            Level up with{` `}
                            <span> {eed.min_happiness}+ happiness</span>
                            {` `}
                            while knowing a{` `}
                            <span>
                              {` `}
                              {removeDash(eed.known_move_type.name)}
                            </span>
                            {` `}
                            type move
                          </p>
                        )}
                        {eed.location && (
                          <p className={styles.text}>
                            Level up at{` `}
                            <span>
                              {` `}
                              {removeDash(eed.location.name)}
                            </span>
                          </p>
                        )}
                        {eed.min_beauty && (
                          <p className={styles.text}>
                            Level up with{` `}
                            <span> {eed.min_beauty}+ beauty</span>
                          </p>
                        )}
                        {eed.min_happiness && eed.time_of_day !== `` && (
                          <p className={styles.text}>
                            Level up with{` `}
                            <span> {eed.min_happiness}+ happiness</span> during
                            the <span> {eed.time_of_day}</span>
                          </p>
                        )}
                        {eed.min_happiness && eed.time_of_day === `` && (
                          <p className={styles.text}>
                            Level up with{` `}
                            <span> {eed.min_happiness}+ happiness</span>
                          </p>
                        )}
                        {eed.min_level &&
                          eed.time_of_day === `` &&
                          !eed.party_type &&
                          !eed.relative_physical_stats &&
                          eed.turn_upside_down === false && (
                            <p className={styles.text}>
                              Level <span> {eed.min_level}</span>
                            </p>
                          )}
                        {eed.min_level && eed.time_of_day !== `` && (
                          <p className={styles.text}>
                            Level <span> {eed.min_level}</span> during the{` `}
                            <span> {eed.time_of_day}</span>
                          </p>
                        )}
                        {eed.needs_overworld_rain === true && (
                          <p className={styles.text}>
                            Level <span> {eed.min_level}</span> while{` `}
                            <span>raining</span>
                          </p>
                        )}
                        {eed.party_species && (
                          <p className={styles.text}>
                            Level up with a{` `}
                            <span>
                              {` `}
                              {removeDash(eed.party_species.name)}
                            </span>
                            {` `}
                            in the party
                          </p>
                        )}
                        {eed.party_type && (
                          <p className={styles.text}>
                            Level <span> {eed.min_level}</span> with a{` `}
                            <span> {eed.party_type.name}</span> type pokémon in
                            the party
                          </p>
                        )}
                        {eed.relative_physical_stats && (
                          <p className={styles.text}>
                            Level <span> {eed.min_level}</span> with
                            <span>
                              {eed.relative_physical_stats === 1
                                ? ` Attack > Defense`
                                : eed.relative_physical_stats === 0
                                ? ` Attack = Defense`
                                : ` Defense > Attack`}
                            </span>
                          </p>
                        )}
                        {eed.trade_species && (
                          <p className={styles.text}>
                            Trade with <span> {eed.trade_species.name}</span>
                          </p>
                        )}
                        {eed.turn_upside_down === true && (
                          <p className={styles.text}>
                            Level <span> {eed.min_level} </span> while{` `}
                            <span>holding the console upside-down</span>
                          </p>
                        )}
                        {eed.trigger.name === `shed` && (
                          <p className={styles.text}>
                            Level <span>20</span> with an{` `}
                            <span>empty slot in the party</span> and an{` `}
                            <span>extra PokéBall</span>
                          </p>
                        )}
                        {eed.trigger.name === `take-damage` && (
                          <p className={styles.text}>
                            Travel{` `}
                            <span>under the stone bridge in Dusty Bowl</span>
                            {` `}
                            after taking at least <span>49 HP in damage</span>
                            {` `}
                            without fainting
                          </p>
                        )}
                      </>
                    ))}
                    <FaChevronRight />
                  </div>
                  <div>
                    {evo?.map(
                      (e: IPokemon) =>
                        e.name === ee.species.name && (
                          <Image
                            key={e.name}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.id}.png`}
                            alt=""
                            width={96}
                            height={96}
                          />
                        ),
                    )}
                    <Link
                      href={`/pokemon/${ee.species.name}`}
                    >
                      {removeDash(ee.species.name)}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {evolution?.chain?.evolves_to?.map(
              (ee) =>
                ee?.evolves_to?.length !== 0 && (
                  <div className={styles.final} key={ee.species.name}>
                    {ee?.evolves_to?.map((eee) => (
                      <div className={styles.stage} key={ee.species.name}>
                        <div className={styles.element}>
                          <div>
                            {eee?.evolution_details?.map((eeed) => (
                              <>
                                {eeed.gender &&
                                  (eeed.gender === 1 ? (
                                    <p className={styles.text}>
                                      <span> Female</span>
                                    </p>
                                  ) : (
                                    <p className={styles.text}>
                                      <span> Male</span>
                                    </p>
                                  ))}
                                {eeed.trigger.name === `trade` &&
                                  !eeed.held_item && (
                                    <p className={styles.text}>Trade</p>
                                  )}
                                {eeed.held_item &&
                                  eeed.trigger.name === `trade` && (
                                    <p className={styles.text}>
                                      Trade holding
                                      <span>
                                        {` `}
                                        {removeDash(eeed.held_item.name)}
                                      </span>
                                    </p>
                                  )}
                                {eeed.held_item &&
                                  eeed.trigger.name === `level-up` && (
                                    <p className={styles.text}>
                                      Level up holding{` `}
                                      <span>
                                        {` `}
                                        {removeDash(eeed.held_item.name)}
                                      </span>
                                      {` `}
                                      during the{` `}
                                      <span> {eeed.time_of_day}</span>
                                    </p>
                                  )}
                                {eeed.item && (
                                  <p className={styles.text}>
                                    Use{` `}
                                    <span>
                                      {` `}
                                      {removeDash(eeed.item.name)}
                                    </span>
                                  </p>
                                )}
                                {eeed.known_move && (
                                  <p className={styles.text}>
                                    Learn{` `}
                                    <span>
                                      {` `}
                                      {removeDash(eeed.known_move.name)}
                                    </span>
                                  </p>
                                )}
                                {eeed.known_move_type && eeed.min_affection && (
                                  <p className={styles.text}>
                                    Level up with{` `}
                                    <span>
                                      {` `}
                                      {eeed.min_affection}+ affection
                                    </span>
                                    {` `}
                                    while knowing a{` `}
                                    <span>
                                      {` `}
                                      {eeed.known_move_type.name.replace(
                                        /-/g,
                                        ` `,
                                      )}
                                    </span>
                                    {` `}
                                    type move
                                  </p>
                                )}
                                {eeed.known_move_type && eeed.min_happiness && (
                                  <p className={styles.text}>
                                    Level up with{` `}
                                    <span>
                                      {` `}
                                      {eeed.min_happiness}+ happiness
                                    </span>
                                    {` `}
                                    while knowing a{` `}
                                    <span>
                                      {` `}
                                      {eeed.known_move_type.name.replace(
                                        /-/g,
                                        ` `,
                                      )}
                                    </span>
                                    {` `}
                                    type move
                                  </p>
                                )}
                                {eeed.location && (
                                  <p className={styles.text}>
                                    Level up at{` `}
                                    <span>
                                      {` `}
                                      {removeDash(eeed.location.name)}
                                    </span>
                                  </p>
                                )}
                                {eeed.min_beauty && (
                                  <p className={styles.text}>
                                    Level up with{` `}
                                    <span> {eeed.min_beauty}+ beauty</span>
                                  </p>
                                )}
                                {eeed.min_happiness &&
                                  eeed.time_of_day !== `` && (
                                    <p className={styles.text}>
                                      Level up with{` `}
                                      <span>
                                        {` `}
                                        {eeed.min_happiness}+ happiness
                                      </span>
                                      {` `}
                                      during the{` `}
                                      <span> {eeed.time_of_day}</span>
                                    </p>
                                  )}
                                {eeed.min_happiness &&
                                  eeed.time_of_day === `` && (
                                    <p className={styles.text}>
                                      Level up with{` `}
                                      <span>
                                        {` `}
                                        {eeed.min_happiness}+ happiness
                                      </span>
                                    </p>
                                  )}
                                {eeed.min_level &&
                                  eeed.time_of_day === `` &&
                                  !eeed.party_type &&
                                  !eeed.relative_physical_stats &&
                                  eeed.turn_upside_down === false && (
                                    <p className={styles.text}>
                                      Level <span> {eeed.min_level}</span>
                                    </p>
                                  )}
                                {eeed.min_level && eeed.time_of_day !== `` && (
                                  <p className={styles.text}>
                                    Level <span> {eeed.min_level}</span> during
                                    the <span> {eeed.time_of_day}</span>
                                  </p>
                                )}
                                {eeed.needs_overworld_rain === true && (
                                  <p className={styles.text}>
                                    Level <span> {eeed.min_level}</span> while
                                    {` `}
                                    <span>raining</span>
                                  </p>
                                )}
                                {eeed.party_species && (
                                  <p className={styles.text}>
                                    Level up with a{` `}
                                    <span>
                                      {` `}
                                      {eeed.party_species.name.replace(
                                        /-/g,
                                        ` `,
                                      )}
                                    </span>
                                    {` `}
                                    in the party
                                  </p>
                                )}
                                {eeed.party_type && (
                                  <p className={styles.text}>
                                    Level <span> {eeed.min_level}</span> with a
                                    {` `}
                                    <span> {eeed.party_type.name}</span> type
                                    pokémon in the party
                                  </p>
                                )}
                                {eeed.relative_physical_stats && (
                                  <p className={styles.text}>
                                    Level <span> {eeed.min_level}</span> with
                                    <span>
                                      {eeed.relative_physical_stats === 1
                                        ? ` Attack > Defense`
                                        : eeed.relative_physical_stats === 0
                                        ? ` Attack = Defense`
                                        : ` Defense > Attack`}
                                    </span>
                                  </p>
                                )}
                                {eeed.trade_species && (
                                  <p className={styles.text}>
                                    Trade with{` `}
                                    <span> {eeed.trade_species.name}</span>
                                  </p>
                                )}
                                {eeed.turn_upside_down === true && (
                                  <p className={styles.text}>
                                    Level <span> {eeed.min_level} </span> while
                                    {` `}
                                    <span>holding the console upside-down</span>
                                  </p>
                                )}
                                {eeed.trigger.name === `shed` && (
                                  <p className={styles.text}>
                                    Level <span>20</span> with an{` `}
                                    <span>empty slot in the party</span> and an
                                    {` `}
                                    <span>extra PokéBall</span>
                                  </p>
                                )}
                                {eeed.trigger.name === `take-damage` && (
                                  <p className={styles.text}>
                                    Travel{` `}
                                    <span>
                                      under the stone bridge in Dusty Bowl
                                    </span>
                                    {` `}
                                    after taking at least{` `}
                                    <span>49 HP in damage</span> without
                                    fainting
                                  </p>
                                )}
                              </>
                            ))}
                            <FaChevronRight />
                          </div>
                          <div>
                            {evo?.map(
                              (e: IPokemon) =>
                                e.name === eee.species.name && (
                                  <Image
                                    key={e.name}
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.id}.png`}
                                    alt=""
                                    width={96}
                                    height={96}
                                  />
                                ),
                            )}
                            <Link
                              href={`/pokemon/${eee.species.name}`}
                            >
                              {removeDash(eee.species.name)}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
