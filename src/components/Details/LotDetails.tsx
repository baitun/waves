import { Typography, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { withKeeper } from '../../utils/tmpSimpleKeeper';
import { getLots } from '../../utils/api';
import { ILotDetails } from '../../utils/api';
import { Section } from '../Section/Section';
import { navigate } from 'hookrouter';

type Props = {
  id: string;
};
export const LotDetails: React.FC<Props> = ({ id }) => {
  const [lot, setLot] = useState<ILotDetails>();

  useEffect(() => {
    withKeeper((api) => {
      api.publicState().then((ps) => {
        const address = ps.account && ps.account.address;

        if (address) {
          getLots(address).then((result) => {
            setLot(
              result
                .map((lot) => {
                  return {
                    id: lot.id,
                    name: lot.name,
                    imageUrl: lot.description,
                  };
                })
                .find((lot) => lot.id === id)
            );
          });
        }
      });
    });
  }, [id]);

  if (lot === undefined) return <>Lot not found</>;

  return (
    <Section>
      <Typography.Title level={1}>{lot.name}</Typography.Title>
      <img src={lot.imageUrl} alt={''} />
      <br />
      <br />
      <Button onClick={() => navigate('/waves/create/auction')} type="primary">
        Send to auction
      </Button>
    </Section>
  );
};
