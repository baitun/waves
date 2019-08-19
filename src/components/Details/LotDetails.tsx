import { Typography, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { getLots } from '../../mocks';
import { ILotDetails } from '../../utils/api';
import { Section } from '../Section/Section';
import { navigate } from 'hookrouter';

type Props = {
  id: string;
};
export const LotDetails: React.FC<Props> = ({ id }) => {
  const [lot, setLot] = useState<ILotDetails>();

  useEffect(() => {
    const lots = getLots();
    setLot(lots.find((l) => l.id === id));
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
