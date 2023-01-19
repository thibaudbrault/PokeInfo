import React from 'react';
import { Abilities } from '@/types/types';
import { H3 } from '@/components/common/styles/Headings';
import { AbilityCardSection, AbilityCardTable } from '../Styled.AbilityCard';

type Props = {
  filterDesc?: Abilities.FlavorText[];
};

function DescAbilityCard({ filterDesc }: Props) {
  return (
    <AbilityCardSection>
      <H3>Game descriptions</H3>
      <AbilityCardTable>
        <tbody>
          {filterDesc?.map((fd) => (
            <tr key={fd.flavor_text}>
              <th>{fd?.version_group.name.replace(/-/g, ` `)}</th>
              <td>{fd?.flavor_text}</td>
            </tr>
          ))}
        </tbody>
      </AbilityCardTable>
    </AbilityCardSection>
  );
}

export default DescAbilityCard;
